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
      darkColor: 'dark:from-secondary dark:to-blue-600',
      delay: 0.1
    },
    {
      icon: Target,
      title: 'Competition Intelligence',
      description: 'Identify key competitors and discover your unique market positioning with comprehensive analysis.',
      color: 'from-indigo-500 to-indigo-600',
      darkColor: 'dark:from-indigo-500 dark:to-indigo-600',
      delay: 0.2
    },
    {
      icon: TrendingUp,
      title: 'Investor Insights',
      description: 'Get feedback from our AI investor agent trained on successful funding patterns and pitch decks.',
      color: 'from-purple-500 to-purple-600',
      darkColor: 'dark:from-purple-500 dark:to-purple-600',
      delay: 0.3
    },
    {
      icon: Lightbulb,
      title: 'Product Strategy',
      description: 'MVP recommendations and detailed product roadmap planning based on market demands.',
      color: 'from-cyan-500 to-cyan-600',
      darkColor: 'dark:from-primary dark:to-cyan-600',
      delay: 0.4
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Identify potential risks and mitigation strategies early in your startup journey.',
      color: 'from-emerald-500 to-emerald-600',
      darkColor: 'dark:from-emerald-500 dark:to-emerald-600',
      delay: 0.5
    },
    {
      icon: BarChart3,
      title: 'Financial Projections',
      description: 'AI-powered financial modeling and revenue projections with detailed breakdowns.',
      color: 'from-orange-500 to-orange-600',
      darkColor: 'dark:from-accent dark:to-orange-600',
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
    <section id="features" className="section-padding bg-gradient-to-b from-white to-blue-50 dark:from-neutral-dark dark:to-slate-900">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-primary/20 dark:to-emerald-900/30 text-emerald-700 dark:text-primary text-sm font-semibold mb-6 border border-transparent dark:border-emerald-800"
          >
            <Zap className="w-4 h-4" />
            <span className="tracking-wide">Powerful Features</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-slate-900 dark:text-neutral-light"
          >
            Why Choose{' '}
            <span className="gradient-text">StartupValidator</span>?
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed text-balance"
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
                <div className="bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 relative p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 backdrop-blur-sm overflow-hidden">
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} ${feature.darkColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                  
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} ${feature.darkColor} shadow-xl transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-neutral-light mb-3 group-hover:text-blue-500 dark:group-hover:text-secondary transition-colors duration-300 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-balance text-sm">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-secondary dark:to-blue-600 flex items-center justify-center shadow-lg">
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