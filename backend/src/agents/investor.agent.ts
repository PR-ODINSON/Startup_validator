import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { z } from 'zod';
import { CITATION_SYSTEM_RULE } from './agent.constants';
import {
  marketHandoffForDownstream,
  researchHandoffForInvestor,
} from './agent-handoffs';
import { createChatGroq } from './groq-model';
import { formatIdeaContext, IdeaContext } from './idea-context';
import { MarketAgentOutput } from './market.agent';
import { ResearchAgentOutput } from './research.agent';

export const investorOutputSchema = z.object({
  businessModel: z.string(),
  monetization: z.array(
    z.object({
      path: z.string(),
      viabilityNote: z.string(),
    }),
  ).min(2),
  risks: z.array(z.string()).min(4),
  score: z.number().min(0).max(100),
});

export type InvestorAgentOutput = z.infer<typeof investorOutputSchema>;

const SYSTEM_PROMPT = `You are the Investor Agent — a skeptical VC partner stress-testing whether this idea can return fund-scale outcomes. You ONLY articulate business model logic, monetization paths, and deal-killing risks.

You do NOT run web research, calculate TAM/SAM/SOM, schedule engineering milestones, or polish pitch language. Ground every claim in Research and Market JSON (name competitors and figures when doubting viability).

Deliver:
- A crisp business-model narrative (how money flows, who pays, why now).
- At least two monetization paths, each with a viability note tied to evidence (not generic "SaaS works").
- At least four risks specific to THIS idea — name players, regulations, or market structure from the inputs; ban vague "competition is fierce" without names.

Your score reflects investability from a partner's lens, not product execution quality.

${CITATION_SYSTEM_RULE}`;

@Injectable()
export class InvestorAgent {
  constructor(private readonly configService: ConfigService) {}

  async analyze(
    idea: IdeaContext,
    research: ResearchAgentOutput,
    market: MarketAgentOutput,
  ): Promise<InvestorAgentOutput> {
    const model = createChatGroq(this.configService, 'investor');
    const structured = model.withStructuredOutput(investorOutputSchema);

    return structured.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(
        `${formatIdeaContext(idea)}\n\nResearch (condensed):\n${JSON.stringify(researchHandoffForInvestor(research))}\n\nMarket (condensed):\n${JSON.stringify(marketHandoffForDownstream(market))}`,
      ),
    ]);
  }
}
