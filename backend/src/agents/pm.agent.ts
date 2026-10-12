import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { z } from 'zod';
import { CITATION_SYSTEM_RULE } from './agent.constants';
import {
  investorHandoffForPm,
  marketHandoffForDownstream,
  researchHandoffForPm,
} from './agent-handoffs';
import { createChatGroq } from './groq-model';
import { formatIdeaContext, IdeaContext } from './idea-context';
import { InvestorAgentOutput } from './investor.agent';
import { MarketAgentOutput } from './market.agent';
import { ResearchAgentOutput } from './research.agent';

const roadmapPhaseSchema = z.object({
  phase: z.string(),
  description: z.string(),
});

export const pmOutputSchema = z.object({
  mvpRoadmap: z.array(roadmapPhaseSchema).min(3),
  milestones: z.array(z.string()).min(5),
  next30Days: z.array(z.string()).min(4).max(6),
  score: z.number().min(0).max(100),
});

export type PmAgentOutput = z.infer<typeof pmOutputSchema>;

const SYSTEM_PROMPT = `You are the PM Agent — a delivery lead who turns strategy into a shippable MVP plan. You ONLY produce phased roadmaps and measurable milestones.

You do NOT research competitors, size markets, argue valuation, or write investor-facing pitch prose. Use Research, Market, and Investor JSON to prioritize what to build first (e.g., de-risk regulatory workflow before growth features).

Requirements:
- At least three ordered roadmap phases with phase name + description (scope, outcome, dependencies).
- At least five measurable milestones (metric, demo, or ship date — not vague "launch product").
- next30Days: 4–6 concrete actions for the founder's first month, each tied to THIS report (name a specific risk to de-risk, competitor to benchmark, milestone to hit, or validation experiment). No generic advice like "talk to customers" without a segment, count, or deliverable.

Your score reflects feasibility of reaching first validated MVP given risks and scope — not market attractiveness.

Do not cite URLs unless referencing a constraint from research; focus on execution sequencing.`;

@Injectable()
export class PmAgent {
  constructor(private readonly configService: ConfigService) {}

  async analyze(
    idea: IdeaContext,
    research: ResearchAgentOutput,
    market: MarketAgentOutput,
    investor: InvestorAgentOutput,
  ): Promise<PmAgentOutput> {
    const model = createChatGroq(this.configService, 'pm');
    const structured = model.withStructuredOutput(pmOutputSchema);

    return structured.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(
        `${formatIdeaContext(idea)}\n\nResearch (condensed):\n${JSON.stringify(researchHandoffForPm(research))}\n\nMarket (condensed):\n${JSON.stringify(marketHandoffForDownstream(market))}\n\nInvestor (condensed):\n${JSON.stringify(investorHandoffForPm(investor))}`,
      ),
    ]);
  }
}
