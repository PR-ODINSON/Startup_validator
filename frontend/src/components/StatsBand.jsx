import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bot, Layers, Globe, FileJson } from 'lucide-react';
import { sectionReveal, staggerContainer, staggerItem } from '../utils/landingMotion';

function AnimatedNumber({ value, inView, suffix = '' }) {
  const spring = useSpring(0, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, value, spring]);

  return <motion.span>{display}</motion.span>;
}

const StatsBand = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 });

  const stats = [
    {
      icon: Bot,
      numeric: true,
      value: 6,
      label: 'AI agents',
      detail: 'Research through validation',
    },
    {
      icon: Layers,
      numeric: true,
      value: 5,
      label: 'Scoring dimensions',
      detail: 'Market, competition, model, pitch, overall',
    },
    {
      icon: Globe,
      numeric: false,
      display: 'Live',
      label: 'Web research',
      detail: 'Tavily-backed evidence in the Research agent',
    },
    {
      icon: FileJson,
      numeric: false,
      display: 'JSON',
      label: 'Structured reports',
      detail: 'Agent outputs stored and composed into your results',
    },
  ];

  return (
    <section id="stats" className="section-padding bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={sectionReveal} className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
              Built for depth, not vanity metrics
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              What actually runs when you submit an idea—no inflated user counts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  whileHover={{
                    y: -6,
                    transition: { type: 'spring', stiffness: 400, damping: 22 },
                  }}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
                >
                  <div className="inline-flex p-3 rounded-xl bg-orange-500/20 text-orange-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-4xl font-black text-white mb-1 tabular-nums">
                    {stat.numeric ? (
                      <AnimatedNumber value={stat.value} inView={inView} />
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.15 }}
                      >
                        {stat.display}
                      </motion.span>
                    )}
                  </div>
                  <div className="font-semibold text-slate-200">{stat.label}</div>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{stat.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBand;
