import { ConfigService } from '@nestjs/config';
import { ChatGroq } from '@langchain/groq';
import { GROQ_MODEL } from './agent.constants';

export type AgentTokenBudget =
  | 'research'
  | 'market'
  | 'investor'
  | 'pm'
  | 'pitch'
  | 'validation';

const AGENT_MAX_TOKENS: Record<AgentTokenBudget, number> = {
  research: 1500,
  market: 1200,
  investor: 1200,
  pm: 1200,
  pitch: 800,
  validation: 1500,
};

export function createChatGroq(
  configService: ConfigService,
  budget: AgentTokenBudget,
): ChatGroq {
  const apiKey = configService.get<string>('GROQ_API_KEY');
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured');
  }

  return new ChatGroq({
    apiKey,
    model: GROQ_MODEL,
    temperature: 0.2,
    maxTokens: AGENT_MAX_TOKENS[budget],
  });
}
