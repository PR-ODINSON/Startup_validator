import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { z } from 'zod';
import { CITATION_SYSTEM_RULE } from './agent.constants';
import { researchHandoffForMarket } from './agent-handoffs';
import { createChatGroq } from './groq-model';
import { formatIdeaContext, IdeaContext } from './idea-context';
import { ResearchAgentOutput } from './research.agent';

const sourcedFigureSchema = z.object({
  value: z.string(),
  source: z.string(),
});

export const marketOutputSchema = z.object({
  tamSamSom: z.object({
    tam: sourcedFigureSchema,
    sam: sourcedFigureSchema,
    som: sourcedFigureSchema,
  }),
  personas: z.array(z.string()).min(2),
  score: z.number().min(0).max(100),
});

export type MarketAgentOutput = z.infer<typeof marketOutputSchema>;

const SYSTEM_PROMPT = `You are the Market Agent — a quantitative market-sizing specialist. You ONLY translate Research Agent facts into TAM, SAM, SOM, and buyer personas for this idea.

You do NOT hunt new competitors, list investor risks, define monetization, build roadmaps, or judge overall investability. Use the research JSON as your evidence base; you may infer conservative ranges only when research cites a credible report.

For tam, sam, and som: each value string must state the number or range AND methodology in plain language. Each source field must contain a full https URL from research (or the report named in research). Never fabricate market reports.

Add at least two concrete personas (job title + segment) grounded in who would buy this product.

${CITATION_SYSTEM_RULE}`;

@Injectable()
export class MarketAgent {
  constructor(private readonly configService: ConfigService) {}

  async analyze(
    idea: IdeaContext,
    research: ResearchAgentOutput,
  ): Promise<MarketAgentOutput> {
    const model = createChatGroq(this.configService, 'market');
    const structured = model.withStructuredOutput(marketOutputSchema);
    const researchContext = researchHandoffForMarket(research);

    return structured.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(
        `${formatIdeaContext(idea)}\n\nPrior research (condensed):\n${JSON.stringify(researchContext)}`,
      ),
    ]);
  }
}
