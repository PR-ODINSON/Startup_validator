import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Mail, 
  Linkedin, 
  Github,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const navigationLinks = [
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms', href: '#terms' }
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
    <footer id="contact" className="bg-gray-900 text-white relative overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Column 1: Brand + Navigation Links */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Brand */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">StartupX</h3>
                  <p className="text-slate-400 text-sm">AI-Powered Validation</p>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed max-w-md text-lg">
                Validate your startup idea in minutes, not months. Get expert-level insights from our AI agents.
              </p>

              {/* Navigation Links */}
              <div>
                <h4 className="text-xl font-bold mb-6">Quick Links</h4>
                <div className="grid grid-cols-2 gap-4">
                  {navigationLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      whileHover={{ x: 5 }}
                      className="text-slate-300 hover:text-white transition-all duration-300 flex items-center gap-2 group py-2 text-base"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Column 2: Social Icons + Beta Message */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h4 className="text-xl font-bold mb-6">Connect With Us</h4>
                
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
                        className={`p-4 bg-slate-800 rounded-xl text-slate-400 ${social.color} transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25`}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    );
                  })}
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-5 h-5 text-orange-400" />
                    <span className="text-lg">hello@startupx.com</span>
                  </div>
                  <div className="text-slate-400">
                    Response time: Usually within 24 hours
                  </div>
                </div>
              </div>

              {/* Beta Message */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🚧</div>
                  <h5 className="text-white font-bold text-lg mb-2">In Beta – Feedback helps us grow.</h5>
                  <p className="text-slate-300 text-sm">
                    We're constantly improving based on founder feedback. Join our beta community!
                  </p>
                </div>
              </motion.div>
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
            <div className="text-slate-400 text-base">
              © 2024 StartupX. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>🚀 Powered by AI</span>
              <span>•</span>
              <span>🔒 Secure & Private</span>
              <span>•</span>
              <span>⚡ 2-min validation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 