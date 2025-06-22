import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Mail, 
  Linkedin, 
  Github,
  Heart,
  ExternalLink,
  Rocket
} from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms', href: '#terms' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/startupx', 
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com/startupx', 
      icon: Github,
      color: 'hover:text-slate-300'
    },
    { 
      name: 'Email', 
      href: 'mailto:hello@startupx.com', 
      icon: Mail,
      color: 'hover:text-orange-400'
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

  return (
    <footer id="contact" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="py-16 lg:py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">StartupX</h3>
                  <p className="text-slate-400 text-sm">AI-Powered Validation</p>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-8 max-w-md">
                Validate your startup idea in minutes, not months. Get expert-level insights from our AI agents and turn your vision into reality.
              </p>

              {/* Beta Message */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <Rocket className="w-5 h-5 text-orange-400" />
                  <span className="text-white font-medium">
                    We're in Beta. Feedback helps us grow 🚀
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Links Section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="text-xl font-bold mb-8">Quick Links</h4>
              <div className="grid grid-cols-2 gap-4">
                {footerLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-slate-300 hover:text-white transition-all duration-300 flex items-center gap-2 group py-2"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-slate-700">
                <h5 className="font-semibold mb-4">Get in Touch</h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-4 h-4 text-orange-400" />
                    <span>hello@startupx.com</span>
                  </div>
                  <div className="text-slate-400 text-sm">
                    Response time: Usually within 24 hours
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social & Newsletter */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="text-xl font-bold mb-8">Stay Connected</h4>
              
              {/* Social Links */}
              <div className="flex items-center gap-4 mb-8">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 bg-slate-800 rounded-xl text-slate-400 ${social.color} transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25`}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm border border-slate-700">
                <h5 className="font-semibold mb-4">Community Stats</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">500+</div>
                    <div className="text-sm text-slate-400">Founders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">1.8min</div>
                    <div className="text-sm text-slate-400">Avg Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-400 mb-1">87%</div>
                    <div className="text-sm text-slate-400">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">4.9/5</div>
                    <div className="text-sm text-slate-400">Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="border-t border-slate-700 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <span>© 2024 StartupX. Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for entrepreneurs.</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>🚀 Backed by AI</span>
              <span>•</span>
              <span>🔒 SOC 2 Compliant</span>
              <span>•</span>
              <span>⚡ 99.9% Uptime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 