import { InvestorAgentOutput } from '../agents/investor.agent';
import { MarketAgentOutput } from '../agents/market.agent';
import { PitchAgentOutput } from '../agents/pitch.agent';
import { PmAgentOutput } from '../agents/pm.agent';
import { ResearchAgentOutput } from '../agents/research.agent';
import { ValidationAgentOutput } from '../agents/validation.agent';
import { ReportDto } from '../validation/report.builder';

const URL_PATTERN = /https?:\/\/[^\s)\]"']+/i;

const AGENT_NAME_PATTERN =
  /\b(Research Agent|Market Agent|Investor Agent|PM Agent|Pitch Agent)\b/;

const CONCRETE_EVIDENCE_PATTERN =
  /\$[\d,.]+[KMB]?|\b\d+(\.\d+)?%|\b(TAM|SAM|SOM)\b|https?:\/\/|\b(?:Inc|LLC|Ltd|Corp)\b|[“"][^”"]{3,}[”"]/i;

export function gateResearch(output: ResearchAgentOutput): {
  pass: boolean;
  detail: string;
} {
  const withUrls = output.competitors.filter((c) =>
    URL_PATTERN.test(c.websiteUrl ?? ''),
  );
  const ok =
    withUrls.length >= 5 && (output.sources?.length ?? 0) >= 8;
  return {
    pass: ok,
    detail: `${withUrls.length} competitors w/ URLs, ${output.sources?.length ?? 0} sources (need 5+, 8+)`,
  };
}

export function gateMarket(output: MarketAgentOutput): {
  pass: boolean;
  detail: string;
} {
  const figures = ['tam', 'sam', 'som'] as const;
  const missing: string[] = [];
  for (const key of figures) {
    const fig = output.tamSamSom[key];
    const value = fig?.value?.trim();
    const source = fig?.source?.trim() ?? '';
    if (!value) missing.push(`${key.toUpperCase()} value`);
    else if (!URL_PATTERN.test(source)) missing.push(`${key.toUpperCase()} source URL`);
  }
  return {
    pass: missing.length === 0,
    detail:
      missing.length === 0
        ? 'TAM/SAM/SOM values + source URLs'
        : `missing: ${missing.join(', ')}`,
  };
}

export function gateInvestor(output: InvestorAgentOutput): {
  pass: boolean;
  detail: string;
} {
  const count = output.risks?.length ?? 0;
  return {
    pass: count >= 4,
    detail: `${count} risks (need 4+)`,
  };
}

export function gatePm(output: PmAgentOutput): { pass: boolean; detail: string } {
  const phases = output.mvpRoadmap?.length ?? 0;
  const milestones = output.milestones?.length ?? 0;
  const next30 = output.next30Days?.length ?? 0;
  const ok =
    phases >= 3 && milestones >= 5 && next30 >= 4 && next30 <= 6;
  return {
    pass: ok,
    detail: `${phases} phases, ${milestones} milestones, ${next30} next-30-day actions (need 3+, 5+, 4–6)`,
  };
}

export function gatePitch(output: PitchAgentOutput): {
  pass: boolean;
  detail: string;
} {
  const one = output.oneLiner?.trim() ?? '';
  const elevator = output.elevatorPitch?.trim() ?? '';
  const ok = one.length > 0 && elevator.length > 0;
  return {
    pass: ok,
    detail: ok
      ? 'one-liner and elevator pitch present'
      : `one-liner ${one.length ? 'ok' : 'empty'}, elevator ${elevator.length ? 'ok' : 'empty'}`,
  };
}

export function justificationLinksEvidence(justification: string): boolean {
  const text = justification.trim();
  if (text.length < 20) return false;
  if (!AGENT_NAME_PATTERN.test(text)) return false;
  return CONCRETE_EVIDENCE_PATTERN.test(text);
}

export function gateResearchMatrix(output: ResearchAgentOutput): {
  pass: boolean;
  detail: string;
} {
  const withMatrix = output.competitors.filter(
    (c) =>
      c.targetUser?.trim() &&
      c.pricing?.trim() &&
      c.aiDepth?.trim() &&
      c.differentiation?.trim(),
  );
  const ok = withMatrix.length >= 5;
  return {
    pass: ok,
    detail: `${withMatrix.length} competitors with full matrix fields (need 5+)`,
  };
}

export function gateValidation(output: ValidationAgentOutput): {
  pass: boolean;
  detail: string;
} {
  const dims = [
    output.marketViability,
    output.competitionAnalysis,
    output.businessModel,
    output.pitchDeck,
  ];
  const scores = dims.map((d) => d.score);
  const uniqueScores = new Set(scores);
  const differentiated = uniqueScores.size > 1;
  const linked = dims.every((d) => justificationLinksEvidence(d.justification));
  const ok = differentiated && linked;
  const failed: string[] = [];
  if (!differentiated) failed.push('scores not differentiated');
  if (!linked) failed.push('justification missing agent-named evidence');
  const verdictOk =
    Boolean(output.verdict?.stance) &&
    (output.verdict?.paragraph?.trim().length ?? 0) >= 80 &&
    (output.verdict?.biggestRisk?.trim().length ?? 0) >= 20;
  if (!verdictOk) failed.push('verdict missing or incomplete');

  const allOk = ok && verdictOk;
  return {
    pass: allOk,
    detail: allOk
      ? `scores [${scores.join(', ')}], verdict ${output.verdict?.stance}, justifications linked`
      : failed.join('; '),
  };
}

export function gateFounderReport(report: ReportDto): {
  pass: boolean;
  detail: string;
} {
  const failed: string[] = [];
  if (!report.verdict?.stance || !report.verdict.paragraph?.trim()) {
    failed.push('verdict section');
  }
  const matrixOk =
    report.competitors.length >= 5 &&
    report.competitors.every(
      (c) =>
        c.targetUser?.trim() &&
        c.pricing?.trim() &&
        c.aiDepth?.trim() &&
        c.differentiation?.trim(),
    );
  if (!matrixOk) failed.push('competitor matrix');
  const next30 = report.next30Days?.length ?? 0;
  if (next30 < 4 || next30 > 6) failed.push('next 30 days (4–6 actions)');
  const dimsOk = report.dimensions.every((d) => d.justification.trim().length >= 20);
  if (!dimsOk) failed.push('dimension justifications');
  const tamUrls =
    report.market?.tamSamSom?.every((f) => /^https?:\/\//i.test(f.sourceUrl ?? '')) ??
    false;
  if (!tamUrls || (report.market?.tamSamSom?.length ?? 0) < 3) {
    failed.push('TAM/SAM/SOM source URLs');
  }
  if ((report.sources?.length ?? 0) < 8) {
    failed.push(`sources (${report.sources?.length ?? 0}/8 URLs)`);
  }
  return {
    pass: failed.length === 0,
    detail:
      failed.length === 0
        ? 'verdict, matrix, next30, justifications, market URLs, 8+ sources'
        : failed.join(', '),
  };
}

export type AgentGateRow = {
  agent: string;
  pass: boolean;
  detail: string;
};

export function evaluateAgentGates(result: {
  agents: {
    research: ResearchAgentOutput;
    market: MarketAgentOutput;
    investor: InvestorAgentOutput;
    pm: PmAgentOutput;
    pitch: PitchAgentOutput;
  };
  validation: ValidationAgentOutput;
}): AgentGateRow[] {
  const research = gateResearch(result.agents.research);
  const researchMatrix = gateResearchMatrix(result.agents.research);
  const market = gateMarket(result.agents.market);
  const investor = gateInvestor(result.agents.investor);
  const pm = gatePm(result.agents.pm);
  const pitch = gatePitch(result.agents.pitch);
  const validation = gateValidation(result.validation);

  return [
    { agent: 'research', ...research },
    { agent: 'research-matrix', ...researchMatrix },
    { agent: 'market', ...market },
    { agent: 'investor', ...investor },
    { agent: 'pm', ...pm },
    { agent: 'pitch', ...pitch },
    { agent: 'validation', ...validation },
  ];
}

export function printAgentGateTable(rows: AgentGateRow[]): boolean {
  const colAgent = 12;
  const colStatus = 6;
  console.log(
    `  ${'Agent'.padEnd(colAgent)} ${'Status'.padEnd(colStatus)} Detail`,
  );
  console.log(`  ${'-'.repeat(colAgent)} ${'-'.repeat(colStatus)} ${'-'.repeat(40)}`);
  let allPass = true;
  for (const row of rows) {
    if (!row.pass) allPass = false;
    const status = row.pass ? 'PASS' : 'FAIL';
    console.log(
      `  ${row.agent.padEnd(colAgent)} ${status.padEnd(colStatus)} ${row.detail}`,
    );
  }
  return allPass;
}
