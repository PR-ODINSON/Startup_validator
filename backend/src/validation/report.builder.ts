import {
  FounderVerdict,
  StoredScorecard,
  ScoredDimension,
} from '../supabase/database.types';

const URL_PATTERN = /https?:\/\/[^\s)\]"']+/gi;

const DIMENSION_META: { key: string; label: string }[] = [
  { key: 'marketViability', label: 'Market Viability' },
  { key: 'competitionAnalysis', label: 'Competition' },
  { key: 'businessModel', label: 'Business Model' },
  { key: 'pitchDeck', label: 'Pitch Deck' },
];

export type ReportDimensionDto = {
  key: string;
  label: string;
  score: number;
  justification: string;
};

export type ReportMarketFigureDto = {
  label: string;
  value: string;
  sourceUrl: string;
};

export type ReportCompetitorDto = {
  name: string;
  description: string;
  websiteUrl: string;
  targetUser: string;
  pricing: string;
  aiDepth: string;
  differentiation: string;
};

export type ReportRoadmapPhaseDto = {
  phase: string;
  description: string;
};

/** Agent display names for section attribution tags in the founder report. */
export const REPORT_SECTION_AGENTS: Record<string, string> = {
  overall: 'Validation Agent',
  verdict: 'Validation Agent',
  dimensions: 'Validation Agent',
  market: 'Market Agent',
  competitors: 'Research Agent',
  next30Days: 'PM Agent',
  businessModel: 'Investor Agent',
  risks: 'Investor Agent',
  roadmap: 'PM Agent',
  pitch: 'Pitch Agent',
  recommendations: 'Validation Agent',
  keyFindings: 'Research Agent',
  sources: 'Research Agent',
};

export type ReportDto = {
  overall?: { score: number; summary: string };
  verdict?: FounderVerdict;
  /** Section key → agent label for UI attribution tags */
  sectionAgents: Record<string, string>;
  dimensions: ReportDimensionDto[];
  market?: {
    tamSamSom: ReportMarketFigureDto[];
    personas: string[];
  };
  competitors: ReportCompetitorDto[];
  next30Days: string[];
  businessModel?: string;
  monetization: string[];
  risks: string[];
  roadmap: ReportRoadmapPhaseDto[];
  milestones: string[];
  pitch?: { oneLiner: string; elevatorPitch: string };
  keyFindings: string[];
  recommendations: string[];
  sources: string[];
};

type AgentBundle = Record<string, unknown> | undefined;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

function readScoredDimension(raw: unknown): ScoredDimension | null {
  if (typeof raw === 'number' && Number.isFinite(raw)) {
    return { score: raw, justification: '' };
  }
  if (!isRecord(raw)) return null;
  const score = Number(raw.score);
  const justification = asString(raw.justification) ?? '';
  if (!Number.isFinite(score)) return null;
  return { score, justification };
}

function collectUrlsFromValue(value: unknown, set: Set<string>) {
  if (typeof value === 'string') {
    const matches = value.match(URL_PATTERN);
    if (matches) {
      matches.forEach((url) => set.add(url.replace(/[.,;]+$/g, '')));
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectUrlsFromValue(item, set));
    return;
  }
  if (isRecord(value)) {
    Object.values(value).forEach((item) => collectUrlsFromValue(item, set));
  }
}

function extractSourceUrl(source: unknown): string | undefined {
  const text = asString(source);
  if (!text) return undefined;
  const match = text.match(URL_PATTERN);
  if (match?.[0]) return match[0].replace(/[.,;]+$/g, '');
  if (/^https?:\/\//i.test(text)) return text;
  return undefined;
}

function readMarketFigure(
  label: string,
  raw: unknown,
): ReportMarketFigureDto | null {
  if (!raw) return null;
  if (typeof raw === 'string') {
    const value = raw.trim();
    if (!value) return null;
    const sourceUrl = extractSourceUrl(value) ?? '';
    return { label, value, sourceUrl };
  }
  if (!isRecord(raw)) return null;
  const value = asString(raw.value);
  if (!value) return null;
  const sourceUrl =
    extractSourceUrl(raw.source) ??
    extractSourceUrl(raw.sourceUrl) ??
    extractSourceUrl(value) ??
    '';
  return { label, value, sourceUrl };
}

function readVerdict(scorecard: StoredScorecard): FounderVerdict | undefined {
  const raw = scorecard.verdict;
  if (!isRecord(raw)) return undefined;
  const stance = raw.stance;
  if (stance !== 'go' && stance !== 'pivot' && stance !== 'kill') {
    return undefined;
  }
  const paragraph = asString(raw.paragraph);
  const biggestRisk = asString(raw.biggestRisk);
  if (!paragraph || !biggestRisk) return undefined;
  return { stance, paragraph, biggestRisk };
}

export function buildReport(scorecard: StoredScorecard): ReportDto {
  const agents = scorecard.agents as AgentBundle;
  const research = isRecord(agents?.research) ? agents.research : undefined;
  const marketAgent = isRecord(agents?.market) ? agents.market : undefined;
  const investor = isRecord(agents?.investor) ? agents.investor : undefined;
  const pm = isRecord(agents?.pm) ? agents.pm : undefined;
  const pitchAgent = isRecord(agents?.pitch) ? agents.pitch : undefined;

  const dimensions: ReportDimensionDto[] = [];
  for (const { key, label } of DIMENSION_META) {
    const dim = readScoredDimension(scorecard[key as keyof StoredScorecard]);
    if (!dim) continue;
    dimensions.push({
      key,
      label,
      score: dim.score,
      justification: dim.justification,
    });
  }

  const overallRaw = scorecard.overall;
  let overall: ReportDto['overall'];
  if (typeof overallRaw === 'number' && Number.isFinite(overallRaw)) {
    overall = { score: overallRaw, summary: '' };
  } else if (isRecord(overallRaw)) {
    const score = Number(overallRaw.score);
    const summary = asString(overallRaw.summary) ?? '';
    if (Number.isFinite(score)) {
      overall = { score, summary };
    }
  }

  const tamSamSom: ReportMarketFigureDto[] = [];
  const tamSamSomRaw = isRecord(marketAgent?.tamSamSom)
    ? marketAgent.tamSamSom
    : undefined;
  if (tamSamSomRaw) {
    for (const label of ['TAM', 'SAM', 'SOM']) {
      const key = label.toLowerCase() as 'tam' | 'sam' | 'som';
      const figure = readMarketFigure(label, tamSamSomRaw[key]);
      if (figure) tamSamSom.push(figure);
    }
  }

  const personas = asStringArray(marketAgent?.personas);
  const market =
    tamSamSom.length > 0 || personas.length > 0
      ? { tamSamSom, personas }
      : undefined;

  const competitors: ReportCompetitorDto[] = [];
  const competitorList = research?.competitors;
  if (Array.isArray(competitorList)) {
    for (const item of competitorList) {
      if (!isRecord(item)) continue;
      const name = asString(item.name);
      const description = asString(item.description);
      const websiteUrl = asString(item.websiteUrl);
      if (!name || !description || !websiteUrl) continue;
      competitors.push({
        name,
        description,
        websiteUrl,
        targetUser: asString(item.targetUser) ?? '',
        pricing: asString(item.pricing) ?? '',
        aiDepth: asString(item.aiDepth) ?? '',
        differentiation: asString(item.differentiation) ?? '',
      });
    }
  }

  const next30Days = asStringArray(pm?.next30Days);

  const businessModel = asString(investor?.businessModel);

  const monetization: string[] = [];
  if (Array.isArray(investor?.monetization)) {
    for (const item of investor.monetization) {
      if (typeof item === 'string') {
        const line = item.trim();
        if (line) monetization.push(line);
        continue;
      }
      if (!isRecord(item)) continue;
      const path = asString(item.path);
      const note = asString(item.viabilityNote);
      if (path && note) monetization.push(`${path} — ${note}`);
      else if (path) monetization.push(path);
    }
  }

  const risks = asStringArray(investor?.risks);

  const roadmap: ReportRoadmapPhaseDto[] = [];
  if (Array.isArray(pm?.mvpRoadmap)) {
    for (const item of pm.mvpRoadmap) {
      if (typeof item === 'string') {
        const line = item.trim();
        if (line) roadmap.push({ phase: line, description: '' });
        continue;
      }
      if (!isRecord(item)) continue;
      const phase = asString(item.phase);
      const description = asString(item.description) ?? '';
      if (phase) roadmap.push({ phase, description });
    }
  }

  const milestones = asStringArray(pm?.milestones);

  const oneLiner = asString(pitchAgent?.oneLiner);
  const elevatorPitch = asString(pitchAgent?.elevatorPitch);
  const pitch =
    oneLiner || elevatorPitch
      ? {
          oneLiner: oneLiner ?? '',
          elevatorPitch: elevatorPitch ?? '',
        }
      : undefined;

  const keyFindings = asStringArray(research?.keyFindings);

  const recommendations = asStringArray(scorecard.recommendations);

  const sourceSet = new Set<string>();
  collectUrlsFromValue(scorecard, sourceSet);
  if (Array.isArray(research?.sources)) {
    for (const url of research.sources) {
      if (typeof url === 'string' && url.trim()) sourceSet.add(url.trim());
    }
  }
  if (tamSamSomRaw) {
    for (const key of ['tam', 'sam', 'som'] as const) {
      const fig = tamSamSomRaw[key];
      if (isRecord(fig)) {
        const url = extractSourceUrl(fig.source);
        if (url) sourceSet.add(url);
      }
    }
  }
  for (const comp of competitors) {
    if (comp.websiteUrl) sourceSet.add(comp.websiteUrl);
  }
  const sources = Array.from(sourceSet).sort((a, b) => a.localeCompare(b));

  const verdict = readVerdict(scorecard);

  const sectionAgents: Record<string, string> = { ...REPORT_SECTION_AGENTS };

  const report: ReportDto = {
    sectionAgents,
    dimensions,
    competitors,
    next30Days,
    monetization,
    risks,
    roadmap,
    milestones,
    keyFindings,
    recommendations,
    sources,
  };

  if (overall) report.overall = overall;
  if (verdict) report.verdict = verdict;
  if (market) report.market = market;
  if (businessModel) report.businessModel = businessModel;
  if (pitch) report.pitch = pitch;

  return report;
}

export const REPORT_SECTION_KEYS = [
  'overall',
  'verdict',
  'dimensions',
  'market',
  'competitors',
  'next30Days',
  'businessModel',
  'risks',
  'roadmap',
  'milestones',
  'pitch',
  'recommendations',
  'keyFindings',
  'sources',
] as const;

export function reportSectionCompleteness(report: ReportDto): Record<string, boolean> {
  return {
    overall: Boolean(
      report.overall &&
        Number.isFinite(report.overall.score) &&
        report.overall.summary.trim().length > 0,
    ),
    verdict: Boolean(
      report.verdict?.stance &&
        report.verdict.paragraph.trim().length > 0 &&
        report.verdict.biggestRisk.trim().length > 0,
    ),
    dimensions: report.dimensions.every((d) => d.justification.trim().length >= 20),
    market: Boolean(
      report.market &&
        (report.market.tamSamSom.length > 0 || report.market.personas.length > 0),
    ),
    competitors:
      report.competitors.length >= 5 &&
      report.competitors.every(
        (c) =>
          c.targetUser.trim() &&
          c.pricing.trim() &&
          c.aiDepth.trim() &&
          c.differentiation.trim(),
      ),
    next30Days: report.next30Days.length >= 4 && report.next30Days.length <= 6,
    businessModel: Boolean(
      (report.businessModel && report.businessModel.trim().length > 0) ||
        report.monetization.length > 0,
    ),
    risks: report.risks.length > 0,
    roadmap: report.roadmap.length > 0,
    milestones: report.milestones.length > 0,
    pitch: Boolean(
      report.pitch &&
        (report.pitch.oneLiner.trim().length > 0 ||
          report.pitch.elevatorPitch.trim().length > 0),
    ),
    recommendations: report.recommendations.length > 0,
    keyFindings: report.keyFindings.length > 0,
    sources: report.sources.length >= 8,
  };
}
