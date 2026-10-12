import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Sparkles } from 'lucide-react';
import { sectionReveal } from '../utils/landingMotion';

const FinalCTASection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={sectionReveal}
          className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-950 px-8 py-14 lg:px-16 lg:py-16 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.25),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(251,191,36,0.12),_transparent_45%)]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Ready when you are</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              Put your idea through the full agent pipeline
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Submit a short brief and get a structured validation report in minutes.
            </p>
            <Link to="/submit" className="inline-flex">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex items-center gap-2 px-8"
              >
                Validate your idea
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
