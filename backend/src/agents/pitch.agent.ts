import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { z } from 'zod';
import {
  marketHandoffForDownstream,
  pitchHandoffPm,
  pitchHandoffResearch,
} from './agent-handoffs';
import { createChatGroq } from './groq-model';
import { formatIdeaContext, IdeaContext } from './idea-context';
import { InvestorAgentOutput } from './investor.agent';
import { MarketAgentOutput } from './market.agent';
import { PmAgentOutput } from './pm.agent';
import { ResearchAgentOutput } from './research.agent';

export const pitchOutputSchema = z.object({
  oneLiner: z.string().min(1),
  elevatorPitch: z.string().min(1),
  slideOutlines: z.array(z.string()).min(3),
});

export type PitchAgentOutput = z.infer<typeof pitchOutputSchema>;

const SYSTEM_PROMPT = `You are the Pitch Agent — a storyteller who sells the idea to investors in one breath. You ONLY write founder-facing pitch copy: one-liner, elevator pitch, and slide outlines.

You do NOT discover facts, size markets, list diligence risks, or plan sprints. Pull proof points from Research and Market JSON (named competitors, TAM/SAM/SOM figures) and narrative angles from Investor JSON — weave them into compelling copy without inventing new statistics.

Requirements:
- oneLiner: non-empty hook (≤20 words) with clear who/what/outcome.
- elevatorPitch: non-empty 4–6 sentence pitch covering problem, solution, market proof, and ask.
- slideOutlines: at least three slide titles with bullet-level talking points (problem, solution, market, traction plan, team/ask).

Tone: confident, specific, investor-ready — not marketing fluff without numbers from prior agents.`;

@Injectable()
export class PitchAgent {
  constructor(private readonly configService: ConfigService) {}

  async analyze(
    idea: IdeaContext,
    research: ResearchAgentOutput,
    market: MarketAgentOutput,
    investor: InvestorAgentOutput,
    pm: PmAgentOutput,
  ): Promise<PitchAgentOutput> {
    const model = createChatGroq(this.configService, 'pitch');
    const structured = model.withStructuredOutput(pitchOutputSchema);

    return structured.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(
        `${formatIdeaContext(idea)}\n\nResearch (condensed):\n${JSON.stringify(pitchHandoffResearch(research))}\n\nMarket (condensed):\n${JSON.stringify(marketHandoffForDownstream(market))}\n\nInvestor (condensed):\n${JSON.stringify({ businessModel: investor.businessModel, risks: investor.risks })}\n\nPM (condensed):\n${JSON.stringify(pitchHandoffPm(pm))}`,
      ),
    ]);
  }
}
