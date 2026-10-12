import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Search,
  PieChart,
  Landmark,
  Kanban,
  Presentation,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  staggerContainer,
  staggerItem,
  cardSpringHover,
} from '../utils/landingMotion';

const AGENTS = [
  {
    name: 'Research',
    icon: Search,
    output: 'Web-backed summary, competitors, market signals, and sources.',
  },
  {
    name: 'Market',
    icon: PieChart,
    output: 'TAM / SAM / SOM sizing, personas, and market score.',
  },
  {
    name: 'Investor',
    icon: Landmark,
    output: 'Business model, monetization paths, risks, and investor score.',
  },
  {
    name: 'PM',
    icon: Kanban,
    output: 'MVP roadmap, milestones, and product readiness score.',
  },
  {
    name: 'Pitch',
    icon: Presentation,
    output: 'One-liner, elevator pitch, and slide outlines.',
  },
  {
    name: 'Validation',
    icon: ShieldCheck,
    output: 'Five dimension scores, overall grade, and three recommendations.',
  },
];

const AgentPipelineSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });

  return (
    <section
      id="agents"
      className="section-padding relative bg-slate-50 border-y border-slate-200/80"
    >
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-14 lg:mb-16"
        >
          <motion.div
            variants={staggerItem}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200 text-orange-700 text-sm font-semibold mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Multi-agent pipeline</span>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight"
          >
            Six specialists,{' '}
            <span className="gradient-text">one validation run</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Each agent produces structured JSON your report is built from—no
            single black-box prompt.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="relative"
        >
          <div className="hidden lg:block absolute top-[3.25rem] left-[8%] right-[8%] h-px overflow-hidden z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-orange-400/60 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={inView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ originX: 0 }}
            />
            <motion.div
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-orange-300 to-transparent blur-sm"
              animate={inView ? { left: ['0%', '100%'] } : {}}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-3 relative z-10">
            {AGENTS.map((agent, index) => {
              const Icon = agent.icon;
              return (
                <motion.div
                  key={agent.name}
                  variants={staggerItem}
                  {...cardSpringHover}
                  className="group"
                >
                  <div
                    className="h-full rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-5 shadow-lg shadow-slate-900/5 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-orange-500/10 group-hover:border-orange-200/80"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/30">
                        <Icon className="w-5 h-5" />
                      </div>
                      {index < AGENTS.length - 1 && (
                        <span className="hidden lg:inline text-[10px] font-mono text-slate-400">
                          →
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{agent.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                      {agent.output}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentPipelineSection;
