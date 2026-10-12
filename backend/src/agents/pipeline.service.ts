import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { InvestorAgent } from './investor.agent';

import { IdeaContext } from './idea-context';

import { MarketAgent } from './market.agent';

import { PitchAgent } from './pitch.agent';

import { PmAgent } from './pm.agent';

import { ResearchAgent } from './research.agent';

import { ValidationAgent, ValidationAgentOutput } from './validation.agent';

import {
  IdeaProgress,
  IdeaProgressCompletedItem,
  Json,
} from '../supabase/database.types';

import { SupabaseService } from '../supabase/supabase.service';

export type PipelineAgents = {
  research: Awaited<ReturnType<ResearchAgent['analyze']>>;

  market: Awaited<ReturnType<MarketAgent['analyze']>>;

  investor: Awaited<ReturnType<InvestorAgent['analyze']>>;

  pm: Awaited<ReturnType<PmAgent['analyze']>>;

  pitch: Awaited<ReturnType<PitchAgent['analyze']>>;
};

export type PipelineResult = {
  validation: ValidationAgentOutput;

  agents: PipelineAgents;
};

const PIPELINE_AGENT_ORDER = [
  'research',

  'market',

  'investor',

  'pm',

  'pitch',

  'validation',
] as const;

type PipelineAgentName = (typeof PIPELINE_AGENT_ORDER)[number];

const MAX_ATTEMPTS = 5;

const DEFAULT_RETRY_SECONDS = 10;

const DEFAULT_COOLDOWN_MS = 20_000;

export type PipelineRunStats = {
  rateLimitEvents: number;
  cooldownMs: number;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isJsonValidateError(err: unknown): boolean {
  if (!err || typeof err !== 'object') {
    return false;
  }

  const maybe = err as { message?: string };
  return (
    typeof maybe.message === 'string' &&
    /json_validate_failed|Failed to validate JSON/i.test(maybe.message)
  );
}

function isTransientModelError(err: unknown): boolean {
  if (!err || typeof err !== 'object') {
    return false;
  }

  const maybe = err as { message?: string };
  return (
    typeof maybe.message === 'string' &&
    /tool choice is none|tool_use_failed|called a tool/i.test(maybe.message)
  );
}

function isRateLimitError(err: unknown): boolean {
  if (!err || typeof err !== 'object') {
    return false;
  }

  const maybe = err as {
    status?: number;

    statusCode?: number;

    message?: string;
  };

  if (maybe.status === 429 || maybe.statusCode === 429) {
    return true;
  }

  return typeof maybe.message === 'string' && /\b429\b|rate.?limit/i.test(maybe.message);
}

function getRetrySeconds(err: unknown): number {
  if (!err || typeof err !== 'object') {
    return DEFAULT_RETRY_SECONDS;
  }

  const maybe = err as {
    headers?: Record<string, string | undefined>;

    response?: { headers?: Record<string, string | undefined> };

    message?: string;
  };

  const headerValue =
    maybe.headers?.['retry-after'] ??
    maybe.headers?.['Retry-After'] ??
    maybe.response?.headers?.['retry-after'] ??
    maybe.response?.headers?.['Retry-After'];

  if (headerValue) {
    const fromHeader = Number(headerValue);

    if (Number.isFinite(fromHeader) && fromHeader > 0) {
      return fromHeader;
    }
  }

  if (typeof maybe.message === 'string') {
    const minutesMatch = maybe.message.match(
      /try again in (\d+)m([\d.]+)s/i,
    );
    if (minutesMatch) {
      const seconds =
        Number(minutesMatch[1]) * 60 + Number(minutesMatch[2]);
      if (Number.isFinite(seconds) && seconds > 0) {
        return Math.ceil(seconds);
      }
    }

    const match =
      maybe.message.match(/try again in ([\d.]+)\s*s/i) ??
      maybe.message.match(/retry[- ]after[:\s]+([\d.]+)/i) ??
      maybe.message.match(/please try again in ([\d.]+)/i);

    if (match) {
      const seconds = Number(match[1]);

      if (Number.isFinite(seconds) && seconds > 0) {
        return Math.ceil(seconds);
      }
    }
  }

  return DEFAULT_RETRY_SECONDS;
}

function toJsonOutput(output: unknown): Json {
  return JSON.parse(JSON.stringify(output)) as Json;
}

@Injectable()
export class PipelineService {
  private readonly logger = new Logger(PipelineService.name);

  private readonly cooldownMs: number;

  private lastRunStats: PipelineRunStats = {
    rateLimitEvents: 0,
    cooldownMs: DEFAULT_COOLDOWN_MS,
  };

  constructor(
    private readonly configService: ConfigService,

    private readonly researchAgent: ResearchAgent,

    private readonly marketAgent: MarketAgent,

    private readonly investorAgent: InvestorAgent,

    private readonly pmAgent: PmAgent,

    private readonly pitchAgent: PitchAgent,

    private readonly validationAgent: ValidationAgent,

    private readonly supabaseService: SupabaseService,
  ) {
    const fromEnv = Number(
      this.configService.get<string>('PIPELINE_AGENT_COOLDOWN_MS'),
    );
    this.cooldownMs =
      Number.isFinite(fromEnv) && fromEnv >= 0
        ? fromEnv
        : DEFAULT_COOLDOWN_MS;
    this.lastRunStats.cooldownMs = this.cooldownMs;
  }

  getLastRunStats(): PipelineRunStats {
    return { ...this.lastRunStats };
  }

  async runPipeline(
    idea: IdeaContext,

    ideaId?: string,
  ): Promise<PipelineResult> {
    this.lastRunStats = {
      rateLimitEvents: 0,
      cooldownMs: this.cooldownMs,
    };

    const completed: IdeaProgressCompletedItem[] = [];

    const research = await this.runAgentStep(ideaId, 'research', completed, () =>
      this.researchAgent.analyze(idea),
    );

    const market = await this.runAgentStep(ideaId, 'market', completed, () =>
      this.marketAgent.analyze(idea, research),
    );

    const investor = await this.runAgentStep(ideaId, 'investor', completed, () =>
      this.investorAgent.analyze(idea, research, market),
    );

    const pm = await this.runAgentStep(ideaId, 'pm', completed, () =>
      this.pmAgent.analyze(idea, research, market, investor),
    );

    const pitch = await this.runAgentStep(ideaId, 'pitch', completed, () =>
      this.pitchAgent.analyze(idea, research, market, investor, pm),
    );

    const validation = await this.runAgentStep(
      ideaId,

      'validation',

      completed,

      () =>
        this.validationAgent.analyze(
          idea,

          research,

          market,

          investor,

          pm,

          pitch,
        ),
    );

    return {
      validation,

      agents: { research, market, investor, pm, pitch },
    };
  }

  private async runAgentStep<T>(
    ideaId: string | undefined,

    agentName: PipelineAgentName,

    completed: IdeaProgressCompletedItem[],

    fn: () => Promise<T>,
  ): Promise<T> {
    if (ideaId) {
      await this.setIdeaProgress(ideaId, {
        completed: [...completed],

        current: agentName,
      });
    }

    const result = await this.withRetry(agentName, fn);

    completed.push({
      name: agentName,

      output: toJsonOutput(result),
    });

    if (ideaId) {
      const nextIndex = PIPELINE_AGENT_ORDER.indexOf(agentName) + 1;

      const nextAgent = PIPELINE_AGENT_ORDER[nextIndex] ?? null;

      await this.setIdeaProgress(ideaId, {
        completed: [...completed],

        current: nextAgent,
      });
    }

    const nextIndex = PIPELINE_AGENT_ORDER.indexOf(agentName) + 1;
    const hasNextAgent = nextIndex < PIPELINE_AGENT_ORDER.length;
    if (hasNextAgent && this.cooldownMs > 0) {
      this.logger.log(
        `Cooldown ${this.cooldownMs}ms before ${PIPELINE_AGENT_ORDER[nextIndex]}`,
      );
      await sleep(this.cooldownMs);
    }

    return result;
  }

  private async setIdeaProgress(ideaId: string, progress: IdeaProgress) {
    const supabase = this.supabaseService.getClient();

    const { error } = await supabase
      .from('ideas')
      .update({ progress })
      .eq('id', ideaId);

    if (error) {
      this.logger.warn(
        `Failed to update progress for idea ${ideaId}: ${error.message}`,
      );
    }
  }

  private async withRetry<T>(
    agentName: string,

    fn: () => Promise<T>,
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;

        const retryable =
          isRateLimitError(err) ||
          isJsonValidateError(err) ||
          isTransientModelError(err);

        if (!retryable || attempt === MAX_ATTEMPTS) {
          throw err;
        }

        const rateLimited = isRateLimitError(err);
        if (rateLimited) {
          this.lastRunStats.rateLimitEvents += 1;
        }

        const waitSeconds = rateLimited
          ? getRetrySeconds(err)
          : DEFAULT_RETRY_SECONDS;

        this.logger.warn(
          `${agentName} retryable error${rateLimited ? ' (429 rate limit)' : ''} (attempt ${attempt}/${MAX_ATTEMPTS}); retrying in ${waitSeconds}s`,
        );

        await sleep(waitSeconds * 1000);
      }
    }

    throw lastError;
  }
}
