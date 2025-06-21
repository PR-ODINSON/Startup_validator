import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Star, Zap, Crown } from 'lucide-react';

const PricingSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for testing your first idea',
      icon: Zap,
      features: [
        '1 idea validation per month',
        'Basic market analysis',
        'Competition overview',
        'Email support',
        'PDF report export'
      ],
      buttonText: 'Get Started Free',
      popular: false,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For serious entrepreneurs',
      icon: Star,
      features: [
        '10 idea validations per month',
        'Advanced AI analysis',
        'Detailed competitor research',
        'Investor perspective insights',
        'Priority support',
        'Custom branding',
        'API access'
      ],
      buttonText: 'Start Pro Trial',
      popular: true,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'For teams and agencies',
      icon: Crown,
      features: [
        'Unlimited validations',
        'White-label solution',
        'Team collaboration',
        'Advanced analytics',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee'
      ],
      buttonText: 'Contact Sales',
      popular: false,
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
    <section id="pricing" className="section-padding bg-gradient-to-b from-blue-50 to-white">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6"
          >
            <Star className="w-4 h-4" />
            <span>Simple Pricing</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Choose Your{' '}
            <span className="gradient-text">Perfect Plan</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Start free and scale as you grow. All plans include our core AI validation features.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className={`relative group ${plan.popular ? 'lg:-mt-4' : ''}`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`relative p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${
                  plan.popular ? 'border-purple-200' : 'border-slate-100'
                } overflow-hidden`}>
                  
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Header */}
                  <div className="relative text-center mb-8">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${plan.gradient} shadow-lg mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <p className="text-slate-600">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="relative text-center mb-8">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                      {plan.period && (
                        <span className="text-slate-600">/{plan.period}</span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="relative mb-8">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <div className={`flex-shrink-0 p-1 rounded-full bg-gradient-to-r ${plan.gradient}`}>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                      }`}
                    >
                      {plan.buttonText}
                    </motion.button>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-slate-100 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-slate-500">
            Questions? <a href="#contact" className="text-blue-600 hover:text-blue-700 font-medium">Contact our sales team</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection; 