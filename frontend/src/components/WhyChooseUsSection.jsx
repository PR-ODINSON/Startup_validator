import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Zap, 
  Brain, 
  BarChart3,
  Clock,
  Users,
  Target,
  TrendingUp,
  Shield,
  CheckCircle
} from 'lucide-react';

const WhyChooseUsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Zap,
      title: 'Fast Validation',
      subtitle: 'Results in under 2 mins',
      description: 'Get comprehensive startup validation faster than making coffee. Our AI processes your idea instantly.',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-200',
      stats: [
        { label: 'Average Time', value: '1.8 min' },
        { label: 'Success Rate', value: '95%' }
      ]
    },
    {
      icon: Brain,
      title: 'Expert Analysis',
      subtitle: 'Simulated feedback from 6 AI agents',
      description: 'Market researchers, investors, product managers, and pitch specialists analyze your startup idea.',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50',
      borderColor: 'border-purple-200',
      stats: [
        { label: 'AI Agents', value: '6' },
        { label: 'Data Points', value: '50+' }
      ]
    },
    {
      icon: BarChart3,
      title: 'Real Metrics',
      subtitle: 'Includes SWOT, TAM/SAM/SOM, GTM',
      description: 'Detailed market analysis, competitive landscape, financial projections, and go-to-market strategies.',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'from-teal-50 to-cyan-50',
      borderColor: 'border-teal-200',
      stats: [
        { label: 'Report Pages', value: '15+' },
        { label: 'Metrics', value: '25+' }
      ]
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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section id="why-choose-us" className="section-padding bg-gradient-to-b from-slate-50 to-white">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-sm font-semibold mb-6"
          >
            <Target className="w-4 h-4" />
            <span>Why Choose StartupX?</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900"
          >
            Built for{' '}
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Modern Founders
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            We've reimagined startup validation for the AI era. Get insights that traditionally take weeks in just minutes.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -15,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                className="relative group"
              >
                <div className={`relative bg-gradient-to-br ${feature.bgColor} p-8 lg:p-10 rounded-3xl border-2 ${feature.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 h-full`}>
                  {/* Icon */}
                  <div className="relative z-10 mb-8">
                    <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-r ${feature.color} shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 mb-8">
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-lg font-semibold text-slate-700 mb-4">
                      {feature.subtitle}
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="relative z-10 grid grid-cols-2 gap-4">
                    {feature.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50">
                        <div className="text-2xl font-bold text-slate-900 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-slate-600 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Floating Badge */}
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 2, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className="absolute -top-3 -right-3 bg-white p-2 rounded-full shadow-lg border-2 border-slate-100"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-12 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Trusted by 500+ Founders
                </h3>
                <p className="text-xl text-slate-300">
                  Join the community of validated entrepreneurs
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { icon: Users, value: '500+', label: 'Founders Validated' },
                  { icon: Clock, value: '1.8 min', label: 'Avg. Validation Time' },
                  { icon: TrendingUp, value: '87%', label: 'Success Rate' },
                  { icon: Shield, value: '100%', label: 'Data Security' }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.1 }}
                      className="group cursor-pointer"
                    >
                      <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg mb-4 group-hover:shadow-purple-500/50 transition-all duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-slate-300 text-sm font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection; 