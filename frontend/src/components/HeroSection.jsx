import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle, Clock, Users, Star, TrendingUp } from 'lucide-react';
import { useComingSoon } from '../context/ComingSoonContext';
import TypewriterEffect from './TypewriterEffect';

const HeroSection = () => {
  const { openComingSoonModal, navigateToPage } = useComingSoon();

  const stats = [
    { icon: Users, value: '500+', label: 'Founders' },
    { icon: Clock, value: '1.8 min', label: 'Average Time' },
    { icon: Star, value: '4.9/5', label: 'Rating' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50 dark:from-neutral-dark dark:via-slate-900 dark:to-orange-900/50 pt-20 lg:pt-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 dark:bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 dark:bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-accent/20 text-orange-700 dark:text-accent text-sm font-semibold mb-8 border border-orange-200 dark:border-accent/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Validation</span>
            </motion.div>

            {/* Main Headline - Much larger and bolder */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-tight text-slate-900 dark:text-neutral-light tracking-tight"
            >
              Validate Your{' '}
              <span className="bg-gradient-to-r from-accent to-red-500 bg-clip-text text-transparent">
                Startup Idea
              </span>{' '}
              Instantly
            </motion.h1>

            {/* Subheadline - Larger and darker */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl md:text-3xl lg:text-4xl text-slate-800 dark:text-slate-300 mb-6 leading-relaxed font-bold"
            >
              Get a personalized AI-generated startup validation report in under 2 minutes.
            </motion.p>

            {/* Secondary 1-liner */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed font-medium"
            >
              Used by 500+ founders and hackathon teams.
            </motion.p>

            {/* CTA Button - Enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-12 flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={() => navigateToPage('submit-idea')}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(251, 146, 60, 0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-lg shadow-xl transition-all duration-300 inline-flex items-center gap-3 group"
              >
                <span>Submit Your Idea</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                onClick={openComingSoonModal}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-slate-800 border-2 border-accent dark:border-accent text-accent dark:text-accent hover:bg-orange-50 dark:hover:bg-slate-700 font-bold px-6 py-3 rounded-xl text-lg shadow-xl transition-all duration-300 inline-flex items-center gap-3 group"
              >
                <span>Get Early Access</span>
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-3 gap-6"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex p-2 rounded-lg bg-white dark:bg-slate-800 shadow-md mb-2">
                      <Icon className="w-5 h-5 text-accent dark:text-accent" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-neutral-light">{stat.value}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-slate-600">
              {/* Dashboard Preview */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-accent to-red-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-neutral-light text-lg">StartupX Report</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Validation Complete</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 dark:text-primary font-semibold">Live</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-primary/20 dark:to-emerald-900/50 p-5 rounded-xl border border-green-100 dark:border-primary/30">
                    <div className="text-4xl font-black text-green-600 dark:text-primary mb-2">92%</div>
                    <div className="text-sm text-green-700 dark:text-primary/80 font-semibold">Validation Score</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-secondary/20 dark:to-cyan-900/50 p-5 rounded-xl border border-blue-100 dark:border-secondary/30">
                    <div className="text-4xl font-black text-blue-600 dark:text-secondary mb-2">$5.2M</div>
                    <div className="text-sm text-blue-700 dark:text-secondary/80 font-semibold">TAM Size</div>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-4">
                  {[
                    { label: 'Market Analysis', progress: 95, color: 'bg-accent' },
                    { label: 'Competition Research', progress: 88, color: 'bg-purple-500' },
                    { label: 'Financial Modeling', progress: 92, color: 'bg-secondary' },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-700 dark:text-slate-300 font-semibold">{item.label}</span>
                        <span className="text-slate-600 dark:text-slate-400 font-bold">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ delay: 1.5 + index * 0.3, duration: 1.2, ease: "easeOut" }}
                          className={`h-3 ${item.color} rounded-full shadow-sm`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Insights */}
                <div className="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-xl border border-slate-200 dark:border-slate-600">
                  <div className="text-sm font-bold text-slate-900 dark:text-neutral-light mb-3">Key Insights</div>
                  <div className="space-y-3">
                    {[
                      'Strong product-market fit potential',
                      'Competitive landscape analysis complete',
                      'Revenue model validation successful'
                    ].map((insight, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-primary dark:text-primary flex-shrink-0" />
                        <span className="font-medium">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-600"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <TypewriterEffect 
                    texts={['AI Analyzing...', 'Researching market...', 'Validating idea...']}
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    speed={80}
                    deleteSpeed={40}
                    pauseTime={1500}
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-accent to-red-500 text-white p-4 rounded-xl shadow-lg"
              >
                <div className="text-sm font-bold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Report Ready! 🎉
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 