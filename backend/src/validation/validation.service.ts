import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PipelineService } from '../agents/pipeline.service';
import {
  IdeaProgress,
  IdeaProgressCompletedItem,
  Json,
  StoredScorecard,
} from '../supabase/database.types';
import { SupabaseService } from '../supabase/supabase.service';
import { buildReport } from './report.builder';
import { SubmitIdeaDto } from './dto/submit-idea.dto';

@Injectable()
export class ValidationService {
  private readonly logger = new Logger(ValidationService.name);

  constructor(
    private readonly pipelineService: PipelineService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async submitIdea(ideaData: SubmitIdeaDto) {
    const supabase = this.supabaseService.getClient();

    const metadata = {
      domain: ideaData.domain ?? null,
      stage: ideaData.stage ?? null,
      type: ideaData.type ?? null,
    };

    const { data, error } = await supabase
      .from('ideas')
      .insert({
        title: ideaData.title,
        description: ideaData.description,
        status: 'processing',
        metadata,
      })
      .select('id, submitted_at')
      .single();

    if (error || !data) {
      this.logger.error(`Failed to insert idea: ${error?.message}`);
      throw new InternalServerErrorException('Failed to submit idea');
    }

    void this.runValidationInBackground(data.id, ideaData);

    return {
      id: data.id,
      message: 'Idea submitted successfully for validation',
      status: 'processing',
      submittedAt: new Date(data.submitted_at).toISOString(),
    };
  }

  async getValidationResults(id: string) {
    const supabase = this.supabaseService.getClient();

    const { data: idea, error: ideaError } = await supabase
      .from('ideas')
      .select('id, status, progress, submitted_at')
      .eq('id', id)
      .maybeSingle();

    if (ideaError) {
      this.logger.error(`Failed to load idea ${id}: ${ideaError.message}`);
      throw new InternalServerErrorException('Failed to load validation results');
    }

    if (!idea) {
      throw new NotFoundException(`Validation results not found for id: ${id}`);
    }

    if (idea.status === 'processing') {
      const progress = this.normalizeProgress(idea.progress);
      return {
        id: idea.id,
        status: 'processing',
        progress,
        submittedAt: new Date(idea.submitted_at).toISOString(),
      };
    }

    if (idea.status === 'failed') {
      return {
        id: idea.id,
        status: 'failed',
      };
    }

    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select('scorecard, created_at')
      .eq('idea_id', id)
      .maybeSingle();

    if (reportError) {
      this.logger.error(
        `Failed to load report for idea ${id}: ${reportError.message}`,
      );
      throw new InternalServerErrorException('Failed to load validation results');
    }

    if (!report) {
      return {
        id: idea.id,
        status: 'processing',
      };
    }

    const scorecard = report.scorecard as StoredScorecard;
    const { recommendations, agents, ...results } = scorecard;
    const validationReport = buildReport(scorecard);

    return {
      id: idea.id,
      status: 'completed',
      report: validationReport,
      results,
      recommendations,
      agents,
      completedAt: new Date(report.created_at).toISOString(),
    };
  }

  private runValidationInBackground(ideaId: string, ideaData: SubmitIdeaDto) {
    return this.executeValidation(ideaId, ideaData).catch((err) => {
      this.logger.error(
        `Unhandled error in background validation for ${ideaId}`,
        err instanceof Error ? err.stack : err,
      );
    });
  }

  private async executeValidation(ideaId: string, ideaData: SubmitIdeaDto) {
    const supabase = this.supabaseService.getClient();

    try {
      const { validation, agents } = await this.pipelineService.runPipeline(
        {
          title: ideaData.title,
          description: ideaData.description,
          domain: ideaData.domain,
          stage: ideaData.stage,
          type: ideaData.type,
        },
        ideaId,
      );

      const scorecard: Json = {
        marketViability: validation.marketViability,
        competitionAnalysis: validation.competitionAnalysis,
        businessModel: validation.businessModel,
        pitchDeck: validation.pitchDeck,
        overall: validation.overall,
        verdict: validation.verdict,
        recommendations: validation.recommendations,
        agents: JSON.parse(JSON.stringify(agents)) as Json,
      };

      const roadmapText = agents.pm.mvpRoadmap
        .map((item) => `${item.phase}: ${item.description}`)
        .join('\n');

      const { error: reportError } = await supabase.from('reports').insert({
        idea_id: ideaId,
        scorecard,
        tam: null,
        sam: null,
        som: null,
        roadmap: roadmapText,
        gtm_strategy: null,
        pitch_deck_url: null,
      });

      if (reportError) {
        throw new Error(`Report insert failed: ${reportError.message}`);
      }

      const { error: updateError } = await supabase
        .from('ideas')
        .update({ status: 'completed' })
        .eq('id', ideaId);

      if (updateError) {
        throw new Error(`Idea status update failed: ${updateError.message}`);
      }
    } catch (err) {
      this.logger.error(
        `Validation failed for idea ${ideaId}`,
        err instanceof Error ? err.stack : err,
      );

      const { error: failError } = await supabase
        .from('ideas')
        .update({ status: 'failed' })
        .eq('id', ideaId);

      if (failError) {
        this.logger.error(
          `Failed to mark idea ${ideaId} as failed: ${failError.message}`,
        );
      }
    }
  }

  private normalizeProgress(raw: unknown): IdeaProgress {
    if (!raw || typeof raw !== 'object') {
      return { completed: [], current: null };
    }

    const maybe = raw as { completed?: unknown; current?: unknown };
    const completed: IdeaProgressCompletedItem[] = [];

    if (Array.isArray(maybe.completed)) {
      for (const item of maybe.completed) {
        if (item && typeof item === 'object' && 'name' in item) {
          const entry = item as { name?: unknown; output?: unknown };
          if (typeof entry.name === 'string') {
            completed.push({
              name: entry.name,
              output: (entry.output ?? {}) as Json,
            });
          }
          continue;
        }

        if (typeof item === 'string') {
          completed.push({ name: item, output: {} });
        }
      }
    }

    const current =
      typeof maybe.current === 'string' ? maybe.current : null;

    return { completed, current };
  }
}
