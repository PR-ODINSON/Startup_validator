import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useComingSoon } from '../App';
import { Check, Star, Zap, Crown, Clock, Bell, Gift } from 'lucide-react';

const PricingSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { openComingSoonModal } = useComingSoon();

  const features = [
    {
      name: 'Early Access',
      description: 'Be the first to validate your ideas',
      icon: Zap,
      benefits: [
        'First 100 users get lifetime 50% discount',
        'Priority customer support',
        'Exclusive beta features access',
        'Direct feedback channel to our team',
        'Free consultation session'
      ],
      highlight: 'Limited Time',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Launch Special',
      description: 'Exclusive benefits for early supporters',
      icon: Gift,
      benefits: [
        'Free Pro plan for first 3 months',
        'Unlimited validations during beta',
        'Personal onboarding session',
        'Featured case study opportunity',
        'Lifetime founder badge',
        'Access to private community'
      ],
      highlight: 'Most Popular',
      gradient: 'from-purple-500 to-purple-600',
      popular: true
    },
    {
      name: 'VIP Access',
      description: 'For serious entrepreneurs',
      icon: Crown,
      benefits: [
        'Skip the waitlist completely',
        'Custom AI agent training',
        'White-label opportunity',
        'Revenue sharing program',
        'Co-marketing opportunities',
        'Direct line to founders'
      ],
      highlight: 'Exclusive',
      gradient: 'from-emerald-500 to-emerald-600'
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
    <section id="pricing" className="section-padding bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 animate-pulse"></div>
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 50%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold mb-8 shadow-2xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-5 h-5" />
            </motion.div>
            <span>Launching Soon - Limited Access</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            Get{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Exclusive Access
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Be among the first to experience the future of startup validation. Limited spots available.
          </motion.p>

          {/* Countdown or urgency element */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20"
          >
            <Bell className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">Only 500 early access spots remaining</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -12,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className={`relative group ${feature.popular ? 'lg:-mt-4' : ''}`}
              >
                {/* Popular badge */}
                {feature.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-2xl animate-pulse">
                      {feature.highlight}
                    </div>
                  </div>
                )}

                <div className={`relative p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden group-hover:bg-white/15`}>
                  
                  {/* Animated background gradient */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    whileHover={{ scale: 1.1 }}
                  />
                  
                  {/* Header */}
                  <div className="relative text-center mb-8">
                    <motion.div 
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-2xl mb-6`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">{feature.name}</h3>
                    <p className="text-slate-300">{feature.description}</p>
                  </div>

                  {/* Highlight badge */}
                  <div className="relative text-center mb-8">
                    <div className={`inline-flex px-4 py-2 rounded-full bg-gradient-to-r ${feature.gradient} text-white font-bold text-sm shadow-lg`}>
                      {feature.highlight}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="relative mb-8">
                    <ul className="space-y-4">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <motion.li 
                          key={benefitIndex} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: 0.1 * benefitIndex }}
                        >
                          <div className={`flex-shrink-0 p-1 rounded-full bg-gradient-to-r ${feature.gradient} mt-1`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-slate-300 text-sm leading-relaxed">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>



                  {/* Decorative glow */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>


      </div>
    </section>
  );
};

export default PricingSection; 