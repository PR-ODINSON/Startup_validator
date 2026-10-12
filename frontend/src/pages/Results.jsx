import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  AlertCircle,
  Check,
  Search,
  PieChart,
  Landmark,
  Kanban,
  Presentation,
  ShieldCheck,
} from 'lucide-react';
import { getResults } from '../api/client';

const POLL_INTERVAL_MS = 3000;
const TOTAL_AGENTS = 6;

const PIPELINE_STEPS = [
  {
    id: 'research',
    name: 'Research',
    icon: Search,
    description: 'Searching the web and summarizing competitors, signals, and sources.',
  },
  {
    id: 'market',
    name: 'Market',
    icon: PieChart,
    description: 'Sizing TAM / SAM / SOM, personas, and market viability.',
  },
  {
    id: 'investor',
    name: 'Investor',
    icon: Landmark,
    description: 'Evaluating business model, monetization, risks, and investor fit.',
  },
  {
    id: 'pm',
    name: 'PM',
    icon: Kanban,
    description: 'Drafting MVP roadmap, milestones, and product readiness.',
  },
  {
    id: 'pitch',
    name: 'Pitch',
    icon: Presentation,
    description: 'Crafting one-liner, elevator pitch, and slide outlines.',
  },
  {
    id: 'validation',
    name: 'Validation',
    icon: ShieldCheck,
    description: 'Scoring all dimensions and writing your top recommendations.',
  },
];

const URL_IN_TEXT = /(https?:\/\/[^\s)\]"']+)/g;

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

function formatElapsed(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function truncateLine(text, max = 120) {
  if (!text || typeof text !== 'string') return '';
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1)}…`;
}

function formatUrlLabel(url) {
  try {
    const parsed = new URL(url);
    const path =
      parsed.pathname.length > 28
        ? `${parsed.pathname.slice(0, 25)}…`
        : parsed.pathname;
    return `${parsed.hostname}${path === '/' ? '' : path}`;
  } catch {
    return truncateLine(url, 48);
  }
}

function LinkifiedText({ text, className = '' }) {
  if (!text) return null;
  const parts = String(text).split(URL_IN_TEXT);
  return (
    <span className={className}>
      {parts.map((part, index) =>
        /^https?:\/\//.test(part) ? (
          <a
            key={`${part}-${index}`}
            href={part.replace(/[.,;]+$/g, '')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-orange-700 underline underline-offset-2 break-all"
          >
            {formatUrlLabel(part.replace(/[.,;]+$/g, ''))}
          </a>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
}

function ReportSection({ title, agentName, index, children }) {
  const attribution =
    title && agentName ? `${title} — ${agentName}` : null;
  return (
    <motion.section
      custom={index}
      variants={reveal}
      initial="hidden"
      animate="visible"
      className="scroll-mt-24"
    >
      {title && (
        <div className="mb-4 md:mb-5">
          {attribution && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-600/90 mb-1.5">
              {attribution}
            </p>
          )}
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        </div>
      )}
      {children}
    </motion.section>
  );
}

function DimensionScorecard({ dimensions }) {
  if (!dimensions?.length) return null;
  return (
    <div className="space-y-8">
      {dimensions.map((dim, index) => {
        const score = Math.min(100, Math.max(0, Number(dim.score) || 0));
        return (
          <div key={dim.key}>
            <div className="flex justify-between items-baseline gap-3 mb-2">
              <span className="font-medium text-slate-800">{dim.label}</span>
              <span className="text-sm font-mono tabular-nums text-orange-600">
                {Math.round(score)}/100
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{
                  delay: 0.1 + index * 0.07,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
            {dim.justification?.trim() && (
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                <LinkifiedText text={dim.justification} />
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function sectionAgent(report, key) {
  return report?.sectionAgents?.[key] ?? null;
}

const VERDICT_STYLES = {
  go: {
    label: 'Go',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    ring: 'ring-emerald-200',
  },
  pivot: {
    label: 'Pivot',
    badge: 'bg-amber-100 text-amber-900 border-amber-200',
    ring: 'ring-amber-200',
  },
  kill: {
    label: 'Kill',
    badge: 'bg-red-100 text-red-800 border-red-200',
    ring: 'ring-red-200',
  },
};

function CompetitorMatrix({ competitors }) {
  if (!competitors?.length) return null;
  const columns = [
    { key: 'targetUser', label: 'Target user' },
    { key: 'pricing', label: 'Pricing' },
    { key: 'aiDepth', label: 'AI depth' },
    { key: 'differentiation', label: 'Differentiation' },
  ];
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80">
            <th
              scope="col"
              className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap"
            >
              Competitor
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-4 py-3 font-semibold text-slate-700 min-w-[9rem]"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {competitors.map((comp, i) => (
            <tr
              key={`${comp.name}-${i}`}
              className="border-b border-slate-100 last:border-0 align-top"
            >
              <td className="px-4 py-3 font-medium text-slate-900">
                <div>{comp.name}</div>
                {comp.websiteUrl && (
                  <a
                    href={comp.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-orange-600 hover:text-orange-700 underline underline-offset-2 mt-1 inline-block"
                  >
                    {formatUrlLabel(comp.websiteUrl)}
                  </a>
                )}
              </td>
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-slate-600 leading-relaxed">
                  <LinkifiedText text={comp[col.key] || '—'} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ValidationReportView({ report }) {
  if (!report) return null;

  let sectionIndex = 0;
  const validationAgent = sectionAgent(report, 'overall') ?? 'Validation Agent';

  const hasMarket =
    report.market &&
    (report.market.tamSamSom?.length > 0 || report.market.personas?.length > 0);
  const hasBusiness =
    report.businessModel?.trim() || report.monetization?.length > 0;
  const hasRoadmap = report.roadmap?.length > 0 || report.milestones?.length > 0;
  const hasPitch =
    report.pitch?.oneLiner?.trim() || report.pitch?.elevatorPitch?.trim();

  return (
    <div className="space-y-12 md:space-y-14 pb-8">
      {report.overall && (
        <motion.header
          custom={sectionIndex++}
          variants={reveal}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-600/90 mb-2">
            Validation Report — {validationAgent}
          </p>
          <p className="text-7xl md:text-8xl font-bold gradient-text leading-none tabular-nums">
            {Math.round(Number(report.overall.score) || 0)}
          </p>
          <p className="text-slate-500 mt-2">out of 100</p>
          {report.overall.summary?.trim() && (
            <p className="text-slate-600 max-w-2xl mx-auto mt-5 leading-relaxed text-sm md:text-base">
              <LinkifiedText text={report.overall.summary} />
            </p>
          )}
        </motion.header>
      )}

      {report.verdict?.stance && (
        <ReportSection
          title="Verdict"
          agentName={sectionAgent(report, 'verdict')}
          index={sectionIndex++}
        >
          <div
            className={`rounded-2xl border bg-white p-5 md:p-6 shadow-sm ring-1 ${
              VERDICT_STYLES[report.verdict.stance]?.ring ?? 'ring-slate-200'
            }`}
          >
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                VERDICT_STYLES[report.verdict.stance]?.badge ??
                'bg-slate-100 text-slate-800'
              }`}
            >
              {VERDICT_STYLES[report.verdict.stance]?.label ??
                report.verdict.stance}
            </span>
            {report.verdict.paragraph?.trim() && (
              <p className="text-slate-700 mt-4 leading-relaxed">
                <LinkifiedText text={report.verdict.paragraph} />
              </p>
            )}
            {report.verdict.biggestRisk?.trim() && (
              <div className="mt-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-red-700 mb-1">
                  Biggest risk
                </p>
                <p className="text-sm text-red-900 leading-relaxed">
                  <LinkifiedText text={report.verdict.biggestRisk} />
                </p>
              </div>
            )}
          </div>
        </ReportSection>
      )}

      {report.dimensions?.length > 0 && (
        <ReportSection
          title="Scorecard"
          agentName={sectionAgent(report, 'dimensions')}
          index={sectionIndex++}
        >
          <DimensionScorecard dimensions={report.dimensions} />
        </ReportSection>
      )}

      {hasMarket && (
        <ReportSection
          title="Market Opportunity"
          agentName={sectionAgent(report, 'market')}
          index={sectionIndex++}
        >
          {report.market.tamSamSom?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {report.market.tamSamSom.map((fig) => (
                <div
                  key={fig.label}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {fig.label}
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-2 leading-snug">
                    <LinkifiedText text={fig.value} />
                  </p>
                  {fig.sourceUrl ? (
                    <a
                      href={fig.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs text-orange-600 hover:text-orange-700 underline underline-offset-2"
                    >
                      Source: {formatUrlLabel(fig.sourceUrl)}
                    </a>
                  ) : (
                    <p className="mt-2 text-xs text-amber-700">Source URL missing</p>
                  )}
                </div>
              ))}
            </div>
          )}
          {report.market.personas?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {report.market.personas.map((persona) => (
                <span
                  key={persona}
                  className="px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-800 text-sm"
                >
                  {persona}
                </span>
              ))}
            </div>
          )}
        </ReportSection>
      )}

      {report.competitors?.length > 0 && (
        <ReportSection
          title="Competitor comparison"
          agentName={sectionAgent(report, 'competitors')}
          index={sectionIndex++}
        >
          <CompetitorMatrix competitors={report.competitors} />
        </ReportSection>
      )}

      {report.next30Days?.length > 0 && (
        <ReportSection
          title="Next 30 days"
          agentName={sectionAgent(report, 'next30Days')}
          index={sectionIndex++}
        >
          <ol className="space-y-3 list-decimal list-inside">
            {report.next30Days.map((action, i) => (
              <li
                key={i}
                className="text-slate-700 leading-relaxed pl-1 marker:text-orange-500 marker:font-bold"
              >
                <LinkifiedText text={action} />
              </li>
            ))}
          </ol>
        </ReportSection>
      )}

      {hasBusiness && (
        <ReportSection
          title="Business Model"
          agentName={sectionAgent(report, 'businessModel')}
          index={sectionIndex++}
        >
          {report.businessModel?.trim() && (
            <p className="text-slate-700 leading-relaxed mb-4">
              <LinkifiedText text={report.businessModel} />
            </p>
          )}
          {report.monetization?.length > 0 && (
            <ul className="list-disc list-inside space-y-2 text-slate-700 marker:text-orange-500">
              {report.monetization.map((line, i) => (
                <li key={i} className="leading-relaxed">
                  <LinkifiedText text={line} />
                </li>
              ))}
            </ul>
          )}
        </ReportSection>
      )}

      {report.risks?.length > 0 && (
        <ReportSection
          title="Risks"
          agentName={sectionAgent(report, 'risks')}
          index={sectionIndex++}
        >
          <ul className="list-disc list-inside space-y-2 text-slate-700 marker:text-red-400">
            {report.risks.map((risk, i) => (
              <li key={i} className="leading-relaxed">
                <LinkifiedText text={risk} />
              </li>
            ))}
          </ul>
        </ReportSection>
      )}

      {hasRoadmap && (
        <ReportSection
          title="MVP Roadmap"
          agentName={sectionAgent(report, 'roadmap')}
          index={sectionIndex++}
        >
          {report.roadmap?.length > 0 && (
            <ol className="relative border-l-2 border-orange-200 ml-2 space-y-5 pl-6 mb-6">
              {report.roadmap.map((step, i) => (
                <li key={i} className="relative">
                  <span
                    className="absolute -left-[1.6rem] top-1.5 w-3 h-3 rounded-full bg-orange-500 ring-4 ring-orange-50"
                    aria-hidden
                  />
                  <p className="font-semibold text-slate-900">{step.phase}</p>
                  {step.description?.trim() && (
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      <LinkifiedText text={step.description} />
                    </p>
                  )}
                </li>
              ))}
            </ol>
          )}
          {report.milestones?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Milestones
              </h3>
              <ul className="list-disc list-inside space-y-1 text-slate-700 marker:text-orange-500">
                {report.milestones.map((m, i) => (
                  <li key={i}>
                    <LinkifiedText text={m} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </ReportSection>
      )}

      {hasPitch && (
        <ReportSection
          title="Pitch"
          agentName={sectionAgent(report, 'pitch')}
          index={sectionIndex++}
        >
          {report.pitch.oneLiner?.trim() && (
            <blockquote className="border-l-4 border-orange-400 pl-4 py-1 text-lg font-medium text-slate-800 italic mb-4">
              <LinkifiedText text={report.pitch.oneLiner} />
            </blockquote>
          )}
          {report.pitch.elevatorPitch?.trim() && (
            <p className="text-slate-700 leading-relaxed">
              <LinkifiedText text={report.pitch.elevatorPitch} />
            </p>
          )}
        </ReportSection>
      )}

      {report.recommendations?.length > 0 && (
        <ReportSection
          title="Recommendations"
          agentName={sectionAgent(report, 'recommendations')}
          index={sectionIndex++}
        >
          <ol className="space-y-4 list-decimal list-inside">
            {report.recommendations.map((rec, index) => (
              <li
                key={index}
                className="text-slate-700 leading-relaxed pl-1 marker:text-orange-500 marker:font-bold"
              >
                <LinkifiedText text={rec} />
              </li>
            ))}
          </ol>
        </ReportSection>
      )}

      {report.keyFindings?.length > 0 && (
        <ReportSection
          title="Key Findings"
          agentName={sectionAgent(report, 'keyFindings')}
          index={sectionIndex++}
        >
          <ul className="list-disc list-inside space-y-2 text-slate-700 marker:text-orange-500">
            {report.keyFindings.map((finding, i) => (
              <li key={i} className="leading-relaxed">
                <LinkifiedText text={finding} />
              </li>
            ))}
          </ul>
        </ReportSection>
      )}

      {report.sources?.length > 0 && (
        <ReportSection
          title="Sources"
          agentName={sectionAgent(report, 'sources')}
          index={sectionIndex++}
        >
          <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {report.sources.map((url) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-orange-600 hover:text-orange-700 underline underline-offset-2 break-all"
                >
                  {formatUrlLabel(url)}
                </a>
              </li>
            ))}
          </ul>
        </ReportSection>
      )}
    </div>
  );
}

function formatAgentResultLine(stepId, output) {
  if (!output || typeof output !== 'object') return null;

  switch (stepId) {
    case 'research': {
      const competitors = Array.isArray(output.competitors)
        ? output.competitors.length
        : 0;
      const sources = Array.isArray(output.sources) ? output.sources.length : 0;
      return `${competitors} competitor${competitors === 1 ? '' : 's'}, ${sources} source${sources === 1 ? '' : 's'}`;
    }
    case 'market': {
      const tam = output.tamSamSom?.tam?.value ?? output.tamSamSom?.tam;
      return tam ? `TAM: ${truncateLine(String(tam), 80)}` : null;
    }
    case 'investor': {
      const model = output.businessModel;
      return model ? truncateLine(String(model)) : null;
    }
    case 'pm': {
      const count = Array.isArray(output.milestones) ? output.milestones.length : 0;
      return `${count} milestone${count === 1 ? '' : 's'} mapped`;
    }
    case 'pitch': {
      const line = output.oneLiner;
      return line ? truncateLine(String(line)) : null;
    }
    case 'validation': {
      const score =
        output.overall && typeof output.overall === 'object'
          ? output.overall.score
          : output.overall;
      return typeof score === 'number'
        ? `Overall score: ${Math.round(score)}/100`
        : null;
    }
    default:
      return null;
  }
}

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1 ml-2" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-orange-400"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </span>
  );
}

const Results = () => {
  const { id } = useParams();
  const [status, setStatus] = useState('processing');
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({ completed: [], current: null });
  const [submittedAt, setSubmittedAt] = useState(null);
  const [elapsedMs, setElapsedMs] = useState(0);

  const completedByAgent = useMemo(() => {
    const map = new Map();
    for (const item of progress.completed || []) {
      if (item?.name) map.set(item.name, item.output);
    }
    return map;
  }, [progress.completed]);

  const completedCount = progress.completed?.length ?? 0;

  useEffect(() => {
    if (!id) return undefined;

    let cancelled = false;
    let timerId = null;

    const poll = async () => {
      try {
        const data = await getResults(id);
        if (cancelled) return;

        setStatus(data.status);

        if (data.status === 'completed') {
          setReport(data.report || null);
          return;
        }

        if (data.status === 'failed') {
          setError('Validation failed. Please try submitting again.');
          return;
        }

        if (data.progress) {
          setProgress(data.progress);
        }
        if (data.submittedAt) {
          setSubmittedAt(data.submittedAt);
        }

        timerId = setTimeout(poll, POLL_INTERVAL_MS);
      } catch (err) {
        if (cancelled) return;
        setError(
          err.response?.data?.message ||
            err.message ||
            'Could not load validation results.'
        );
        setStatus('failed');
      }
    };

    poll();

    return () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [id]);

  useEffect(() => {
    if (status !== 'processing' || !submittedAt) return undefined;

    const start = new Date(submittedAt).getTime();
    const tick = () => setElapsedMs(Date.now() - start);
    tick();
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [status, submittedAt]);

  const getStepState = (stepId) => {
    if (completedByAgent.has(stepId)) return 'completed';
    if (progress.current === stepId) return 'current';
    return 'upcoming';
  };

  const isProcessing = status === 'processing' && !error;

  return (
    <div
      className={
        isProcessing
          ? 'relative min-h-screen hero-aurora pt-24 pb-16 overflow-hidden'
          : 'min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 pt-24 pb-16'
      }
    >
      {isProcessing && (
        <div className="absolute inset-0 mesh-gradient pointer-events-none" aria-hidden />
      )}

      <div
        className={`relative z-10 container-custom ${
          isProcessing ? 'max-w-2xl' : 'max-w-4xl'
        }`}
      >
        <Link
          to="/submit"
          className={`inline-flex items-center gap-2 transition-colors mb-8 ${
            isProcessing
              ? 'text-slate-300 hover:text-orange-300'
              : 'text-slate-600 hover:text-orange-600'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Submit another idea
        </Link>

        {isProcessing && (
          <div className="py-4 md:py-8">
            <header className="text-center mb-8 md:mb-10">
              <h1 className="text-2xl md:text-4xl font-bold gradient-text mb-3 text-balance">
                Analyzing your idea
              </h1>
              <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto text-balance">
                This usually takes a few minutes.
              </p>
              {submittedAt && (
                <div className="mt-5 inline-flex items-center gap-2 rounded-full glass-card-dark px-4 py-1.5 text-sm font-mono text-slate-200 tabular-nums">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                  {formatElapsed(elapsedMs)}
                </div>
              )}
            </header>

            <div className="mb-8">
              <div className="flex justify-between text-xs text-slate-400 mb-2 px-0.5">
                <span>Pipeline progress</span>
                <span className="tabular-nums">
                  {completedCount} of {TOTAL_AGENTS} agents
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-300"
                  initial={false}
                  animate={{ width: `${(completedCount / TOTAL_AGENTS) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
              </div>
            </div>

            <motion.ul layout className="space-y-3 md:space-y-4">
              {PIPELINE_STEPS.map((step) => {
                const stepState = getStepState(step.id);
                const Icon = step.icon;
                const output = completedByAgent.get(step.id);
                const resultLine = formatAgentResultLine(step.id, output);

                return (
                  <motion.li
                    key={step.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div
                      className={`rounded-2xl glass-card-dark p-4 md:p-5 transition-opacity duration-300 ${
                        stepState === 'upcoming' ? 'opacity-40' : 'opacity-100'
                      } ${
                        stepState === 'current'
                          ? 'ring-2 ring-orange-500/80 ring-offset-2 ring-offset-slate-950 shadow-[0_0_24px_rgba(249,115,22,0.25)]'
                          : ''
                      }`}
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${
                            stepState === 'completed'
                              ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                              : stepState === 'current'
                                ? 'bg-orange-500/15 border-orange-400/50 text-orange-300'
                                : 'bg-white/5 border-white/10 text-slate-500'
                          }`}
                        >
                          {stepState === 'completed' ? (
                            <Check className="w-5 h-5" strokeWidth={2.5} />
                          ) : (
                            <Icon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-x-2">
                            <p
                              className={`font-semibold ${
                                stepState === 'current'
                                  ? 'text-orange-200'
                                  : 'text-slate-100'
                              }`}
                            >
                              {step.name}
                            </p>
                            {stepState === 'current' && (
                              <span className="text-xs text-orange-300/90 font-medium">
                                Running
                                <ThinkingDots />
                              </span>
                            )}
                            {stepState === 'completed' && (
                              <span className="text-xs text-emerald-400/90 font-medium">
                                Done
                              </span>
                            )}
                          </div>
                          {stepState === 'current' && (
                            <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                              {step.description}
                            </p>
                          )}
                          <AnimatePresence mode="wait">
                            {stepState === 'completed' && resultLine && (
                              <motion.p
                                key={resultLine}
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                className="text-sm text-emerald-200/90 leading-snug border-l-2 border-emerald-500/40 pl-3"
                              >
                                {resultLine}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        )}

        {(status === 'failed' || error) && status !== 'completed' && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Validation failed
            </h1>
            <p className="text-slate-600 max-w-md mb-8">
              {error || 'Something went wrong while validating your idea.'}
            </p>
            <Link to="/submit" className="btn-primary">
              Try again
            </Link>
          </div>
        )}

        {status === 'completed' && report && <ValidationReportView report={report} />}
      </div>
    </div>
  );
};

export default Results;
