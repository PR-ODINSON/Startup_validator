import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb,
  Target,
  Users,
  DollarSign,
  TrendingUp,
  Zap,
  Brain,
  Rocket,
  Star,
  Heart,
  Gem,
  Crown,
  Trophy,
  Award
} from 'lucide-react';
import { useComingSoon } from '../context/ComingSoonContext';

const SubmitIdea = () => {
  const { openComingSoonModal } = useComingSoon();
  const [formData, setFormData] = useState({
    ideaName: '',
    description: '',
    targetMarket: '',
    problem: '',
    solution: '',
    businessModel: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [particles, setParticles] = useState([]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        ideaName: '',
        description: '',
        targetMarket: '',
        problem: '',
        solution: '',
        businessModel: '',
        email: ''
      });
    }, 3000);
  };

  const features = [
    {
      icon: Target,
      title: "Market Analysis",
      description: "Get detailed insights into your target market size and potential",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      icon: Users,
      title: "Competitor Research",
      description: "Understand your competitive landscape and positioning",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50"
    },
    {
      icon: DollarSign,
      title: "Revenue Modeling",
      description: "Validate your business model and revenue projections",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      icon: TrendingUp,
      title: "Growth Potential",
      description: "Assess scalability and growth opportunities",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50"
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (isSubmitted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-orange-50 pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-black text-slate-900 mb-6"
            >
              Idea Submitted! 🚀
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-slate-600 mb-8"
            >
              Thank you for sharing your startup idea! Our AI is analyzing it now and you'll receive your personalized validation report within 2 minutes.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-4 h-4 bg-orange-500 rounded-full"
                  />
                  <span className="text-orange-600 font-semibold text-lg">Processing your idea...</span>
                </div>
                
                <div className="space-y-4">
                  {['Market Analysis', 'Competitor Research', 'Financial Modeling', 'Final Report'].map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.3 }}
                      className="flex items-center gap-4 text-slate-700 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-100"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                      >
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </motion.div>
                      <span className="font-semibold text-lg">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 pt-20 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + particle.speed,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Enhanced Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-lg font-bold mb-8 border-2 border-orange-200 shadow-lg"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Lightbulb className="w-6 h-6" />
              </motion.div>
              <span>Submit Your Startup Idea</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-3 bg-orange-500 rounded-full"
              />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-8 leading-tight"
            >
              Validate Your{' '}
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Startup Idea
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Get an AI-powered validation report in under 2 minutes. Used by 500+ founders to validate their ideas.
            </motion.p>

            {/* Floating Icons */}
            <div className="relative mt-12">
              {[Brain, Rocket, Star, Heart, Gem, Crown, Trophy, Award].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${10 + index * 10}%`,
                    top: '50%',
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                >
                  <Icon className="w-8 h-8 text-orange-400 opacity-60" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Enhanced Form */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className="bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-3xl p-10 shadow-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden backdrop-blur-sm"
              >
                {/* Form background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-white to-red-50/30 dark:from-orange-900/20 dark:via-slate-800 dark:to-red-900/20 rounded-3xl" />
                
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                </div>
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-8"
                  >
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Startup Details</h3>
                      <p className="text-slate-600">Tell us about your amazing idea</p>
                    </div>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-3"
                      >
                        <label className="block text-lg font-bold text-slate-700">
                          Startup Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="ideaName"
                            value={formData.ideaName}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('ideaName')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-lg ${
                              focusedField === 'ideaName' 
                                ? 'border-orange-500 bg-orange-50 shadow-lg' 
                                : 'border-slate-300 hover:border-orange-300'
                            }`}
                            placeholder="e.g., Uber for Pets"
                          />
                          {focusedField === 'ideaName' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                            >
                              <Sparkles className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-3"
                      >
                        <label className="block text-lg font-bold text-slate-700">
                          Target Market *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="targetMarket"
                            value={formData.targetMarket}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('targetMarket')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-lg ${
                              focusedField === 'targetMarket' 
                                ? 'border-orange-500 bg-orange-50 shadow-lg' 
                                : 'border-slate-300 hover:border-orange-300'
                            }`}
                            placeholder="e.g., Pet owners in urban areas"
                          />
                          {focusedField === 'targetMarket' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                            >
                              <Target className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="space-y-3"
                    >
                      <label className="block text-lg font-bold text-slate-700">
                        Problem You're Solving *
                      </label>
                      <div className="relative">
                        <textarea
                          name="problem"
                          value={formData.problem}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('problem')}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={4}
                          className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-lg resize-none ${
                            focusedField === 'problem' 
                              ? 'border-orange-500 bg-orange-50 shadow-lg' 
                              : 'border-slate-300 hover:border-orange-300'
                          }`}
                          placeholder="Describe the problem your startup solves..."
                        />
                        {focusedField === 'problem' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                          >
                            <AlertCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="space-y-3"
                    >
                      <label className="block text-lg font-bold text-slate-700">
                        Your Solution *
                      </label>
                      <div className="relative">
                        <textarea
                          name="solution"
                          value={formData.solution}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('solution')}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={4}
                          className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-lg resize-none ${
                            focusedField === 'solution' 
                              ? 'border-orange-500 bg-orange-50 shadow-lg' 
                              : 'border-slate-300 hover:border-orange-300'
                          }`}
                          placeholder="How does your product/service solve this problem?"
                        />
                        {focusedField === 'solution' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                          >
                            <Lightbulb className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="space-y-3"
                    >
                      <label className="block text-lg font-bold text-slate-700">
                        Business Model *
                      </label>
                      <div className="relative">
                        <textarea
                          name="businessModel"
                          value={formData.businessModel}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('businessModel')}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={4}
                          className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-lg resize-none ${
                            focusedField === 'businessModel' 
                              ? 'border-orange-500 bg-orange-50 shadow-lg' 
                              : 'border-slate-300 hover:border-orange-300'
                          }`}
                          placeholder="How do you plan to make money? (subscription, marketplace, etc.)"
                        />
                        {focusedField === 'businessModel' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                          >
                            <DollarSign className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="space-y-3"
                    >
                      <label className="block text-lg font-bold text-slate-700">
                        Brief Description
                      </label>
                      <div className="relative">
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('description')}
                          onBlur={() => setFocusedField(null)}
                          rows={3}
                          className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-lg resize-none ${
                            focusedField === 'description' 
                              ? 'border-orange-500 bg-orange-50 shadow-lg' 
                              : 'border-slate-300 hover:border-orange-300'
                          }`}
                          placeholder="Any additional details about your startup idea..."
                        />
                        {focusedField === 'description' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                          >
                            <Sparkles className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="space-y-3"
                    >
                      <label className="block text-lg font-bold text-slate-700">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-lg ${
                            focusedField === 'email' 
                              ? 'border-orange-500 bg-orange-50 shadow-lg' 
                              : 'border-slate-300 hover:border-orange-300'
                          }`}
                          placeholder="your@email.com"
                        />
                        {focusedField === 'email' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 25px 50px -12px rgba(251, 146, 60, 0.5)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 text-xl relative overflow-hidden group"
                    >
                      {/* Button background animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      <div className="relative z-10 flex items-center gap-4">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                            />
                            Analyzing Your Idea...
                          </>
                        ) : (
                          <>
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Zap className="w-6 h-6" />
                            </motion.div>
                            Get My Validation Report
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight className="w-6 h-6" />
                            </motion.div>
                          </>
                        )}
                      </div>
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Features Sidebar */}
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white rounded-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">What You'll Get</h3>
                  </div>
                  <div className="space-y-6">
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ scale: 1.05, x: 10 }}
                          className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-100 hover:border-orange-200 transition-all duration-300"
                        >
                          <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 mb-2 text-lg">{feature.title}</h4>
                            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden"
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-2xl font-bold">AI-Powered Analysis</h3>
                  </div>
                  <p className="text-orange-100 mb-6 text-lg leading-relaxed">
                    Our advanced AI analyzes market data, competitor information, and industry trends to provide you with actionable insights.
                  </p>
                  <div className="space-y-3">
                    {[
                      'Market size validation',
                      'Competitive analysis',
                      'Revenue potential',
                      'Risk assessment'
                    ].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-orange-200" />
                        <span className="font-medium">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SubmitIdea; 