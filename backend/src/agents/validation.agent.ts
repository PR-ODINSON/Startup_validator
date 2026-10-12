import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { z } from 'zod';
import { CITATION_SYSTEM_RULE } from './agent.constants';
import { validationHandoffBundle } from './agent-handoffs';
import { createChatGroq } from './groq-model';
import { formatIdeaContext, IdeaContext } from './idea-context';
import { InvestorAgentOutput } from './investor.agent';
import { MarketAgentOutput } from './market.agent';
import { PitchAgentOutput } from './pitch.agent';
import { PmAgentOutput } from './pm.agent';
import { ResearchAgentOutput } from './research.agent';

const scoredDimensionSchema = z.object({
  score: z.number().min(0).max(100),
  justification: z.string().min(20),
});

const verdictSchema = z.object({
  stance: z.enum(['go', 'pivot', 'kill']),
  paragraph: z.string().min(80),
  biggestRisk: z.string().min(20),
});

export const validationOutputSchema = z.object({
  marketViability: scoredDimensionSchema,
  competitionAnalysis: scoredDimensionSchema,
  businessModel: scoredDimensionSchema,
  pitchDeck: scoredDimensionSchema,
  overall: z.object({
    score: z.number().min(0).max(100),
    summary: z.string().min(20),
  }),
  verdict: verdictSchema,
  recommendations: z.array(z.string()).length(3),
});

export type ValidationAgentOutput = z.infer<typeof validationOutputSchema>;

const SYSTEM_PROMPT = `You are the Validation Agent — an independent investment-committee judge. You do NOT research, size markets, write pitches, or plan roadmaps. You only read the five specialist JSON payloads and score how strong the case is.

Your job: assign 0–100 per dimension with evidence-linked justifications. Each justification MUST:
1. Open with the dimension label and score, e.g. "Market Viability 72:" or "Competition 58:".
2. Cite at least two concrete facts from the inputs, each tied to the producing agent using exact labels: "Research Agent", "Market Agent", "Investor Agent", "PM Agent", or "Pitch Agent".
3. Name the evidence (company names, $ figures, TAM/SAM/SOM values, specific risks, roadmap phases, pitch lines) — not vague adjectives.

Example (required style): "Market Viability 72: the Market Agent sized SOM at $265M (Grand View Research URL in source), but the Research Agent listed 7 direct competitors including ComplyAdvantage. Investor Agent flagged regulatory-change latency as a top risk."

A justification that names no agent, or cites no specific fact (number, named company, quoted risk, or pitch phrase), is a failure — rewrite before returning.

Differentiate scores across dimensions unless every axis truly deserves the same number. Overall score = weighted judgment (not a flat average) with a concise summary citing specialist evidence.

Verdict (founder decision):
- stance: exactly one of go | pivot | kill — go = proceed to build/MVP, pivot = change segment/model before building, kill = do not pursue.
- paragraph: one cohesive paragraph stating the stance in plain language and why, citing specific evidence (competitor names, TAM/SAM/SOM, top Investor Agent risks, PM feasibility).
- biggestRisk: the single risk most likely to kill the idea if unaddressed (name it concretely, from Investor or Research inputs).

Produce exactly three actionable recommendations grounded in the weakest dimensions.

${CITATION_SYSTEM_RULE}`;

@Injectable()
export class ValidationAgent {
  constructor(private readonly configService: ConfigService) {}

  async analyze(
    idea: IdeaContext,
    research: ResearchAgentOutput,
    market: MarketAgentOutput,
    investor: InvestorAgentOutput,
    pm: PmAgentOutput,
    pitch: PitchAgentOutput,
  ): Promise<ValidationAgentOutput> {
    const model = createChatGroq(this.configService, 'validation');
    const structured = model.withStructuredOutput(validationOutputSchema);
    const specialists = validationHandoffBundle({
      research,
      market,
      investor,
      pm,
      pitch,
    });

    return structured.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(
        `${formatIdeaContext(idea)}\n\nSpecialist outputs (condensed):\n${JSON.stringify(specialists)}`,
      ),
    ]);
  }
}
