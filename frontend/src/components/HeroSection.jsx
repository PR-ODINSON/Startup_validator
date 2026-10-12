import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';
import { handleSmoothScroll } from '../utils/smoothScroll';

const HEADLINE_WORDS = [
  'Validate',
  'your',
  'startup',
  'idea',
  'with',
  'six',
  'AI',
  'agents',
];

function LiveScoreTypewriter({ target = 87 }) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const targetStr = String(target);
    let i = 0;
    const tick = () => {
      if (i <= targetStr.length) {
        setDisplay(targetStr.slice(0, i));
        i += 1;
        setTimeout(tick, i === 1 ? 400 : 120);
      }
    };
    const start = setTimeout(tick, 800);
    return () => clearTimeout(start);
  }, [target]);

  return (
    <span className="font-mono tabular-nums">
      {display}
      <span className="text-orange-400/80">%</span>
    </span>
  );
}

const HeroSection = () => {
  const onSeeHow = (e) => {
    handleSmoothScroll(e, '#how-it-works');
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-aurora pt-24 lg:pt-28 pb-16">
      <div className="absolute inset-0 mesh-gradient pointer-events-none" aria-hidden />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-orange-200 text-sm font-semibold mb-8 border border-white/10 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>AI-powered validation</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.08] text-white tracking-tight">
              {HEADLINE_WORDS.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.06 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block mr-[0.28em] ${
                    word === 'AI' || word === 'agents'
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300'
                      : ''
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-300 mb-4 max-w-xl leading-relaxed"
            >
              Multi-agent analysis with real web research—market sizing, investor lens,
              MVP plan, pitch, and a scored validation report.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="text-base text-slate-500 mb-10 max-w-lg"
            >
              Structured JSON at every step, composed into one results view.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/submit" className="inline-flex">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Validate your idea
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
              <motion.button
                type="button"
                onClick={onSeeHow}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-colors w-full sm:w-auto min-h-[48px]"
              >
                See how it works
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:pl-4"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl p-6 lg:p-8 shadow-2xl shadow-black/40"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">Validation report</div>
                    <div className="text-sm text-slate-400">Preview</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold text-emerald-300">Live</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl bg-slate-900/50 border border-white/10 p-4">
                  <div className="text-3xl lg:text-4xl font-black text-white mb-1">
                    <LiveScoreTypewriter target={87} />
                  </div>
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Overall score
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-900/50 border border-white/10 p-4">
                  <div className="text-2xl font-bold text-orange-400 mb-1">5</div>
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Dimensions
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: 'Market viability', progress: 88 },
                  { label: 'Competition', progress: 76 },
                  { label: 'Business model', progress: 82 },
                ].map((item, index) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">{item.label}</span>
                      <span className="text-slate-500">{item.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ delay: 1.2 + index * 0.15, duration: 0.9, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-black/20 border border-white/10 p-4 space-y-2">
                {[
                  'Research agent cited live sources',
                  'Investor risks surfaced',
                  'Three actionable recommendations',
                ].map((line) => (
                  <div key={line} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
