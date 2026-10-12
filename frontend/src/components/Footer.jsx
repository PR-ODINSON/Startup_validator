import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Mail, Linkedin, Github } from 'lucide-react';
import { staggerContainer, staggerItem, viewportOnce } from '../utils/landingMotion';

const Footer = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/startupx',
      icon: Linkedin,
      color: 'hover:text-sky-400',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/startupx',
      icon: Github,
      color: 'hover:text-slate-200',
    },
    {
      name: 'Email',
      href: 'mailto:hello@startupx.com',
      icon: Mail,
      color: 'hover:text-orange-400',
    },
  ];

  return (
    <footer id="contact" className="bg-slate-950 text-white relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="py-14 lg:py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div variants={staggerItem} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">StartupX</h3>
                  <p className="text-slate-500 text-sm">Multi-agent validation</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Six specialized agents, structured outputs, and a scored report—built
                for founders who want evidence, not fluff.
              </p>
            </motion.div>

            <motion.div variants={staggerItem} className="lg:text-right">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
                Connect
              </h4>
              <div className="flex items-center gap-3 lg:justify-end mb-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 ${social.color} transition-colors`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
              <a
                href="mailto:hello@startupx.com"
                className="text-slate-300 hover:text-orange-400 transition-colors"
              >
                hello@startupx.com
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          className="border-t border-white/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-slate-500"
        >
          <span>© {new Date().getFullYear()} StartupX</span>
          <span>Early preview · feedback welcome</span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
