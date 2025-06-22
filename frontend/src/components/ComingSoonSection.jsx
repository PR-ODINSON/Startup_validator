import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Rocket, 
  Star, 
  Zap, 
  Award, 
  Users, 
  Clock,
  Sparkles,
  TrendingUp,
  Shield,
  Target
} from 'lucide-react';
import { useComingSoon } from '../context/ComingSoonContext';

const ComingSoonSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { openComingSoonModal } = useComingSoon();

  const features = [
    {
      icon: Rocket,
      title: '6 AI Agents',
      subtitle: 'Expert Analysis',
      description: 'Market, Investment, Product, Pitch, Research & Validation specialists',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: '10 Minutes',
      subtitle: 'Lightning Fast',
      description: 'Complete startup validation in under 10 minutes vs weeks of manual work',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Award,
      title: '95% Accuracy',
      subtitle: 'Proven Results',
      description: 'Trained on 10,000+ successful startups and validated predictions',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Enterprise Grade',
      subtitle: 'Secure & Private',
      description: 'Bank-level security with complete data privacy and confidentiality',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Startups Analyzed', icon: TrendingUp },
    { number: '95%', label: 'Accuracy Rate', icon: Target },
    { number: '6', label: 'AI Specialists', icon: Users },
    { number: '10min', label: 'Average Time', icon: Clock }
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
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Starfield effect */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          {/* Coming Soon Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold text-xl shadow-2xl mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            <span className="tracking-wide">LAUNCHING SOON</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-white rounded-full"
            />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
          >
            The Future of{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Startup Validation
            </span>{' '}
            is Here
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Revolutionary AI technology that transforms how entrepreneurs validate their ideas. 
            <span className="text-cyan-300 font-semibold"> Be among the first to experience the future.</span>
          </motion.p>


        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 h-full">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`} />
                  
                  <div className="relative z-10">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-cyan-300 font-semibold mb-3">
                      {feature.subtitle}
                    </p>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          >
            Powered by Advanced AI Technology
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg mb-4 group-hover:shadow-cyan-400/50 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-blue-200 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoonSection; 