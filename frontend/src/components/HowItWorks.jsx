import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Upload, 
  Brain, 
  Download,
  ArrowRight,
  Sparkles,
  Zap,
  Clock
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
      description: 'Share your startup concept in seconds',
      icon: Upload,
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50'
    },
    {
      step: '02',
      title: 'Let AI Agents Analyze',
      description: 'Our 6 AI experts evaluate your concept',
      icon: Brain,
      color: 'from-purple-400 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50'
    },
    {
      step: '03',
      title: 'Get a Downloadable Report',
      description: 'Receive actionable insights instantly',
      icon: Download,
      color: 'from-teal-400 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-50'
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section id="how-it-works" className="section-padding bg-slate-50 dark:bg-gray-950">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-semibold mb-6 border border-orange-200 dark:border-orange-800"
          >
            <Zap className="w-4 h-4" />
            <span>How It Works</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900 dark:text-white"
          >
            Get Validated in <span className="text-orange-500">3 Simple Steps</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Our AI-powered validation process transforms your startup idea into actionable insights in under 2 minutes.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative"
        >
          {/* Connection Line - only on large screens */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-1 bg-slate-200 dark:bg-slate-800 transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative text-center"
                >
                  {/* Card */}
                  <div className={`relative ${step.bgColor} dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 h-full backdrop-blur-sm overflow-hidden`}>
                    {/* Background gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                    
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                      }}></div>
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute top-6 right-6 text-5xl font-black text-slate-100 dark:text-slate-800 select-none">
                      {step.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="relative z-10 mb-6 flex justify-center">
                      <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-r ${step.color} shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-lg text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow for large screens */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-8 transform -translate-y-1/2 z-20 items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20"
        >
          <div className="bg-slate-900 dark:bg-gray-900 rounded-3xl p-10 lg:p-16 relative border border-transparent dark:border-slate-800">
            <div className="text-center">
              <Sparkles className="w-8 h-8 text-orange-400 mx-auto mb-4" />
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Validate Your Idea?
              </h3>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join 500+ founders who've already validated their startup ideas with StartupX
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span>2-minute process</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <span>AI-powered insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-blue-400" />
                  <span>Instant download</span>
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