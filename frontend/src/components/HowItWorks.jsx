import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Upload, Brain, FileText, Sparkles } from 'lucide-react';
import {
  staggerContainer,
  staggerItem,
  cardSpringHover,
} from '../utils/landingMotion';

const HowItWorks = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });

  const steps = [
    {
      step: '01',
      title: 'Submit Your Idea',
      description: 'Write your idea or upload a one-pager.',
      icon: Upload,
    },
    {
      step: '02',
      title: 'AI Agent Evaluation',
      description:
        'Simulated feedback from experts like investors and product managers.',
      icon: Brain,
    },
    {
      step: '03',
      title: 'Instant Report',
      description:
        'Get a full validation report with validation scores, SWOT, TAM/SAM/SOM.',
      icon: FileText,
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-14 lg:mb-20"
        >
          <motion.div
            variants={staggerItem}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-700 text-sm font-semibold mb-6 border border-orange-100"
          >
            <Sparkles className="w-4 h-4" />
            <span>How It Works</span>
          </motion.div>

          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-slate-900 tracking-tight"
          >
            How <span className="gradient-text">StartupX</span> works
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Get comprehensive startup validation in just 3 simple steps. Our
            AI-powered process delivers expert insights faster than ever.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                variants={staggerItem}
                {...cardSpringHover}
                className="relative group"
              >
                <div className="h-full rounded-3xl border border-slate-200/80 bg-slate-50/80 backdrop-blur-sm p-8 lg:p-10 shadow-lg shadow-slate-900/5 transition-shadow group-hover:shadow-xl group-hover:border-orange-200/60">
                  <div className="absolute top-6 right-6 text-4xl font-black text-slate-200 select-none">
                    {step.step}
                  </div>
                  <div className="mb-8">
                    <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25">
                      <Icon className="w-9 h-9 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
