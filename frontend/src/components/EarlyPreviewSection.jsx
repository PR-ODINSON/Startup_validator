import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FlaskConical } from 'lucide-react';
import {
  sectionReveal,
  staggerContainer,
  staggerItem,
} from '../utils/landingMotion';

const EarlyPreviewSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={sectionReveal} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Early preview
            </h2>
          </motion.div>

          <motion.div
            variants={staggerItem}
            whileHover={{
              y: -4,
              transition: { type: 'spring', stiffness: 400, damping: 24 },
            }}
            className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-8 lg:p-10 shadow-xl shadow-slate-900/5 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 p-3 rounded-2xl bg-orange-100 text-orange-600">
                <FlaskConical className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 mb-2">
                  Honest status
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  StartupX is in active development. The six-agent pipeline and scoring
                  you see here are what runs in production today—we&apos;re improving
                  quality and UX before a wider launch.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  If you try it, you&apos;re helping shape the product. We&apos;re not
                  publishing founder testimonials until they&apos;re real and permissioned.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EarlyPreviewSection;
