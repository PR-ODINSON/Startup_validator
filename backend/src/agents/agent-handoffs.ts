import { InvestorAgentOutput } from './investor.agent';
import { MarketAgentOutput } from './market.agent';
import { PitchAgentOutput } from './pitch.agent';
import { PmAgentOutput } from './pm.agent';
import { ResearchAgentOutput } from './research.agent';

function trim(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

/** Shrink Tavily documents for the research agent prompt only. */
export function trimTavilyResultsForPrompt(results: unknown): unknown {
  if (!Array.isArray(results)) return results;
  return results.slice(0, 8).map((doc) => {
    if (!doc || typeof doc !== 'object') return doc;
    const row = doc as Record<string, unknown>;
    const metadata =
      row.metadata && typeof row.metadata === 'object'
        ? (row.metadata as Record<string, unknown>)
        : {};
    const content = String(row.pageContent ?? row.content ?? '');
    return {
      title: metadata.title ?? row.title,
      url: metadata.source ?? metadata.url ?? row.url,
      snippet: trim(content, 380),
    };
  });
}

export function researchHandoffForMarket(
  research: ResearchAgentOutput,
): Record<string, unknown> {
  return {
    summary: trim(research.summary, 500),
    competitors: research.competitors.map((c) => ({
      name: c.name,
      targetUser: c.targetUser,
      pricing: c.pricing,
      aiDepth: c.aiDepth,
      differentiation: trim(c.differentiation, 150),
      websiteUrl: c.websiteUrl,
    })),
    keyFindings: research.keyFindings.map((f) => trim(f, 220)),
    sources: research.sources,
  };
}

export function researchHandoffForInvestor(
  research: ResearchAgentOutput,
): Record<string, unknown> {
  return {
    summary: trim(research.summary, 400),
    competitors: research.competitors.map((c) => ({
      name: c.name,
      differentiation: trim(c.differentiation, 120),
      pricing: c.pricing,
    })),
    keyFindings: research.keyFindings.map((f) => trim(f, 180)),
  };
}

export function marketHandoffForDownstream(
  market: MarketAgentOutput,
): Record<string, unknown> {
  return {
    tamSamSom: market.tamSamSom,
    personas: market.personas,
    score: market.score,
  };
}

export function investorHandoffForPm(
  investor: InvestorAgentOutput,
): Record<string, unknown> {
  return {
    businessModel: trim(investor.businessModel, 400),
    monetization: investor.monetization,
    risks: investor.risks,
    score: investor.score,
  };
}

export function researchHandoffForPm(
  research: ResearchAgentOutput,
): Record<string, unknown> {
  return {
    summary: trim(research.summary, 350),
    competitors: research.competitors.map((c) => ({
      name: c.name,
      differentiation: trim(c.differentiation, 100),
    })),
    keyFindings: research.keyFindings.map((f) => trim(f, 160)),
  };
}

export function pitchHandoffResearch(
  research: ResearchAgentOutput,
): Record<string, unknown> {
  return {
    summary: trim(research.summary, 300),
    keyFindings: research.keyFindings.slice(0, 5).map((f) => trim(f, 140)),
    competitorNames: research.competitors.map((c) => c.name),
  };
}

export function pitchHandoffPm(pm: PmAgentOutput): Record<string, unknown> {
  return {
    mvpRoadmap: pm.mvpRoadmap.map((p) => ({
      phase: p.phase,
      description: trim(p.description, 120),
    })),
    milestones: pm.milestones,
    next30Days: pm.next30Days,
    score: pm.score,
  };
}

export function validationHandoffBundle(input: {
  research: ResearchAgentOutput;
  market: MarketAgentOutput;
  investor: InvestorAgentOutput;
  pm: PmAgentOutput;
  pitch: PitchAgentOutput;
}): Record<string, unknown> {
  const { research, market, investor, pm, pitch } = input;
  return {
    research: {
      summary: trim(research.summary, 350),
      competitors: research.competitors.map((c) => ({
        name: c.name,
        targetUser: c.targetUser,
        pricing: c.pricing,
        aiDepth: c.aiDepth,
        differentiation: trim(c.differentiation, 100),
      })),
      keyFindings: research.keyFindings.map((f) => trim(f, 160)),
      sources: research.sources,
    },
    market: marketHandoffForDownstream(market),
    investor: investorHandoffForPm(investor),
    pm: {
      mvpRoadmap: pm.mvpRoadmap.map((p) => ({
        phase: p.phase,
        description: trim(p.description, 100),
      })),
      milestones: pm.milestones,
      next30Days: pm.next30Days,
      score: pm.score,
    },
    pitch: {
      oneLiner: pitch.oneLiner,
      elevatorPitch: trim(pitch.elevatorPitch, 500),
      slideOutlines: pitch.slideOutlines,
    },
  };
}
