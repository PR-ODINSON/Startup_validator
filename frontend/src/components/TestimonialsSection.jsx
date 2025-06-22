import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Star,
  Quote,
  Award,
  Users,
  Sparkles
} from 'lucide-react';

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      name: 'Arjun P.',
      tag: 'Hackathon Winner',
      quote: 'Helped me refine my MVP pitch in 10 minutes. Love the AI breakdown!',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      company: 'TechFlow',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      name: 'Sanya K.',
      tag: 'Aspiring Founder',
      quote: 'Saved me hours of research with just one click.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      company: 'InnovateLab',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      name: 'Emily Johnson',
      tag: 'Serial Entrepreneur',
      quote: 'Best validation tool I\'ve used. The AI agents provide perspectives I never considered. Game-changer!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      company: 'GrowthHack',
      gradient: 'from-teal-500 to-cyan-500'
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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
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
    <section id="testimonials" className="section-padding bg-gradient-to-b from-white to-slate-50">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 text-sm font-semibold mb-6"
          >
            <Users className="w-4 h-4" />
            <span>What Founders Say</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900"
          >
            What{' '}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Founders Say
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Real feedback from founders who've transformed their ideas into validated startups with StartUpX.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="relative group"
            >
              <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 h-full">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="w-12 h-12 text-slate-400" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg text-slate-700 leading-relaxed mb-8 relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center`}>
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-slate-600 font-medium">
                      {testimonial.tag}
                    </p>
                    <p className="text-sm text-slate-500">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                
                {/* Floating Sparkle */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.7
                  }}
                  className="absolute -top-2 -left-2 bg-white p-2 rounded-full shadow-lg border border-slate-100"
                >
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-3xl p-12 border border-teal-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                Join the Community
              </h3>
              <p className="text-lg text-slate-600">
                Become part of our growing founder ecosystem
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '200+', label: 'Happy Founders', icon: Users },
                { value: '4.9/5', label: 'Average Rating', icon: Star },
                { value: '98%', label: 'Would Recommend', icon: Award },
                { value: '24/7', label: 'Support Available', icon: Sparkles }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    className="group cursor-pointer"
                  >
                    <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg mb-4 group-hover:shadow-teal-500/50 transition-all duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-slate-600 text-sm font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 