import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useComingSoon } from '../context/ComingSoonContext';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Zap, 
  Shield,
  BarChart3,
  Lightbulb 
} from 'lucide-react';

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { openComingSoonModal } = useComingSoon();

  const features = [
    {
      icon: Brain,
      title: 'AI Market Analysis',
      description: 'Deep market research powered by AI agents analyzing trends, size, and opportunities in real-time.',
      color: 'from-blue-500 to-blue-600',
      delay: 0.1
    },
    {
      icon: Target,
      title: 'Competition Intelligence',
      description: 'Identify key competitors and discover your unique market positioning with comprehensive analysis.',
      color: 'from-indigo-500 to-indigo-600',
      delay: 0.2
    },
    {
      icon: TrendingUp,
      title: 'Investor Insights',
      description: 'Get feedback from our AI investor agent trained on successful funding patterns and pitch decks.',
      color: 'from-purple-500 to-purple-600',
      delay: 0.3
    },
    {
      icon: Lightbulb,
      title: 'Product Strategy',
      description: 'MVP recommendations and detailed product roadmap planning based on market demands.',
      color: 'from-cyan-500 to-cyan-600',
      delay: 0.4
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Identify potential risks and mitigation strategies early in your startup journey.',
      color: 'from-emerald-500 to-emerald-600',
      delay: 0.5
    },
    {
      icon: BarChart3,
      title: 'Financial Projections',
      description: 'AI-powered financial modeling and revenue projections with detailed breakdowns.',
      color: 'from-orange-500 to-orange-600',
      delay: 0.6
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="features" className="section-padding bg-gradient-to-b from-white to-blue-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-700 text-sm font-semibold mb-6"
          >
            <Zap className="w-4 h-4" />
            <span className="tracking-wide">Powerful Features</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Why Choose{' '}
            <span className="gradient-text">StartupValidator</span>?
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed text-balance"
          >
            Cut weeks of research and validation down to minutes. Our AI agents analyze your idea from every angle—market, competition, product, and more.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -12,
                  scale: 1.03,
                  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative cursor-pointer"
              >
                <div className="professional-card card-glow relative p-8 bg-gradient-to-br from-white to-slate-50/30">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} shadow-xl transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors duration-300 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed font-medium text-balance text-sm">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>


      </div>
    </section>
  );
};

export default FeaturesSection; 