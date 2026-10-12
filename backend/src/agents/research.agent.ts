import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TavilySearchAPIRetriever } from '@langchain/community/retrievers/tavily_search_api';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { z } from 'zod';
import { CITATION_SYSTEM_RULE } from './agent.constants';
import { trimTavilyResultsForPrompt } from './agent-handoffs';
import { createChatGroq } from './groq-model';
import { formatIdeaContext, IdeaContext } from './idea-context';

const competitorSchema = z.object({
  name: z.string(),
  description: z.string(),
  websiteUrl: z.string(),
  targetUser: z.string(),
  pricing: z.string(),
  aiDepth: z.string(),
  differentiation: z.string(),
});

export const researchOutputSchema = z.object({
  summary: z.string(),
  competitors: z.array(competitorSchema).min(5),
  keyFindings: z.array(z.string()).min(5),
  sources: z.array(z.string()).min(8),
});

export type ResearchAgentOutput = z.infer<typeof researchOutputSchema>;

const SYSTEM_PROMPT = `You are the Research Agent — a primary-source fact finder for startup diligence. You ONLY discover and document what exists in the world: competitors, funding signals, regulatory context, and cited facts from Tavily search results.

You do NOT size TAM/SAM/SOM, score the idea, critique the business model, plan MVPs, or write pitch copy. Leave sizing and opinions to downstream agents.

Requirements:
- At least five direct competitors: real company name, what they sell, working https website URL, plus matrix fields for comparison — targetUser (primary buyer segment), pricing (model + typical price band), aiDepth (how AI-native vs rules/templates), differentiation (their wedge vs this idea).
- At least five key findings: each must be specific to this idea and traceable to search results (include inline source URLs for funding, revenue, or market claims).
- At least eight distinct source URLs in the sources array.

Be exhaustive and idea-specific — no generic industry filler. If search results cannot verify a claim, state that gap explicitly instead of guessing.

${CITATION_SYSTEM_RULE}`;

@Injectable()
export class ResearchAgent {
  constructor(private readonly configService: ConfigService) {}

  async analyze(input: IdeaContext): Promise<ResearchAgentOutput> {
    const tavilyApiKey = this.configService.get<string>('TAVILY_API_KEY');
    if (!tavilyApiKey) {
      throw new Error('TAVILY_API_KEY must be configured');
    }

    const searchTool = new TavilySearchAPIRetriever({
      apiKey: tavilyApiKey,
      k: 10,
      searchDepth: 'advanced',
      includeRawContent: false,
    });

    const searchQuery = [
      input.title,
      input.domain,
      'competitors market size funding startup',
    ]
      .filter(Boolean)
      .join(' ');

    const searchResults = await searchTool.invoke(searchQuery);

    const model = createChatGroq(this.configService, 'research');
    const structured = model.withStructuredOutput(researchOutputSchema);
    const trimmedResults = trimTavilyResultsForPrompt(searchResults);

    return structured.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(
        `${formatIdeaContext(input)}\n\nWeb search query: ${searchQuery}\n\nWeb search results:\n${JSON.stringify(trimmedResults)}`,
      ),
    ]);
  }
}
