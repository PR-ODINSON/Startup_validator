import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Upload, 
  Brain, 
  BarChart3, 
  FileText,
  ArrowRight,
  Clock,
  CheckCircle,
  Zap
} from 'lucide-react';

const ProcessSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      step: '01',
      title: 'Submit Your Idea',
      description: 'Upload your startup idea via text, PDF, or connect your Notion workspace. Our system securely processes your information.',
      icon: Upload,
      color: 'from-blue-500 to-blue-600',
      time: '30 seconds'
    },
    {
      step: '02',
      title: 'AI Agents Activate',
      description: 'Six specialized AI agents simultaneously analyze your idea from different expert perspectives - market, investment, product, and more.',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      time: '2-3 minutes'
    },
    {
      step: '03',
      title: 'Deep Analysis',
      description: 'Each agent conducts comprehensive research: market sizing, competitor analysis, financial modeling, risk assessment, and validation scoring.',
      icon: BarChart3,
      color: 'from-emerald-500 to-emerald-600',
      time: '3-5 minutes'
    },
    {
      step: '04',
      title: 'Comprehensive Report',
      description: 'Receive a detailed validation report with scores, recommendations, pitch deck, MVP roadmap, and actionable next steps.',
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      time: 'Instant delivery'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="how-it-works" className="section-padding bg-gradient-to-b from-white to-blue-50">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            <span>How It Works</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            From Idea to{' '}
            <span className="gradient-text">Validation</span>{' '}
            in Minutes
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Our streamlined AI-powered process transforms weeks of manual research into minutes of expert analysis. Here's how your startup validation journey works.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative"
        >
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-emerald-200 to-orange-200 transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative group"
                >
                  <div className="professional-card card-glow p-10 relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-slate-50 to-transparent rounded-full transform translate-x-6 -translate-y-6" />
                    
                    {/* Step number */}
                    <div className="text-6xl font-bold text-slate-100 absolute top-4 right-6 z-0">
                      {step.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="relative z-10 mb-6">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${step.color} shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-6 text-balance font-medium">
                        {step.description}
                      </p>
                      
                      {/* Time indicator */}
                      <div className="flex items-center gap-3 text-sm text-blue-600 font-semibold bg-blue-50 px-4 py-2 rounded-full w-fit">
                        <Clock className="w-4 h-4" />
                        <span className="tracking-wide">{step.time}</span>
                      </div>
                    </div>

                    {/* Arrow for large screens */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                        <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-200">
                          <ArrowRight className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom section with benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-blue-100">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Why Choose AI-Powered Validation?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {[
                {
                  icon: Clock,
                  title: 'Save 40+ Hours',
                  description: 'Traditional validation takes weeks. Get comprehensive analysis in under 10 minutes.'
                },
                {
                  icon: Brain,
                  title: 'Expert-Level Insights',
                  description: 'Access to 6 specialized AI agents trained on thousands of successful startups.'
                },
                {
                  icon: CheckCircle,
                  title: '87% Accuracy Rate',
                  description: 'Our AI predictions have been validated against real startup outcomes.'
                }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="inline-flex p-3 rounded-xl bg-white shadow-lg mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{benefit.title}</h4>
                    <p className="text-slate-600 text-sm">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
            >
              <span>Start Your Validation Journey</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection; 