import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Upload, 
  Brain, 
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      step: '01',
      title: 'Submit Your Idea',
      description: 'Write your idea or upload a one-pager.',
      icon: Upload,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      step: '02',
      title: 'AI Agent Evaluation',
      description: 'Simulated feedback from experts like investors and product managers.',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50'
    },
    {
      step: '03',
      title: 'Instant Report',
      description: 'Get a full PDF with validation scores, SWOT, TAM/SAM/SOM.',
      icon: FileText,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'from-teal-50 to-cyan-50'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section id="how-it-works" className="section-padding bg-gradient-to-b from-white to-slate-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>How It Works</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900"
          >
            How{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              StartUpX
            </span>{' '}
            Works
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Get comprehensive startup validation in just 3 simple steps. Our AI-powered process delivers expert insights faster than ever.
          </motion.p>
        </motion.div>

        {/* Process Steps - Horizontal Layout */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative"
        >
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 via-purple-200 to-teal-200 transform -translate-y-1/2 z-0 rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative group"
                >
                  <div className={`relative bg-gradient-to-br ${step.bgColor} p-8 lg:p-10 rounded-3xl border border-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 h-full`}>
                    {/* Step Number */}
                    <div className="absolute top-6 right-6 text-5xl font-black text-slate-100 select-none">
                      {step.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="relative z-10 mb-8">
                      <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-r ${step.color} shadow-xl transform group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow for large screens */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-slate-100"
                        >
                          <ArrowRight className="w-6 h-6 text-slate-400" />
                        </motion.div>
                      </div>
                    )}

                    {/* Hover Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-orange-400 mr-3" />
                <h3 className="text-3xl lg:text-4xl font-bold text-white">
                  Ready to Validate Your Startup?
                </h3>
              </div>
              
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join 200+ founders who've already transformed their ideas into validated startups
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-orange-400" />
                    <span>2-minute setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span>AI-powered insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-400" />
                    <span>Instant PDF report</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 