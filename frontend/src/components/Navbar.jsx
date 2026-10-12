import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { handleSmoothScroll } from '../utils/smoothScroll';

const Navbar = () => {
  const { pathname } = useLocation();
  const isLanding = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const overHero = isLanding && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Agents', href: '#agents' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Platform', href: '#stats' },
    { name: 'Contact', href: '#contact' },
  ];

  const linkClass = overHero
    ? 'text-slate-200 hover:text-white'
    : 'text-slate-600 hover:text-orange-600';

  const logoTextClass = overHero ? 'text-white' : 'text-slate-900';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        overHero
          ? 'bg-transparent border-b border-transparent'
          : 'bg-white/75 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md shadow-orange-500/25">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold ${logoTextClass}`}>
                Startup<span className="text-orange-500">X</span>
              </span>
            </motion.div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 + 0.25, duration: 0.5 }}
                className={`font-medium transition-colors duration-200 relative group cursor-pointer ${linkClass}`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <div className="hidden lg:flex items-center">
            <Link to="/submit">
              <motion.span
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary text-sm px-6 py-2 inline-flex items-center"
              >
                Validate your idea
              </motion.span>
            </Link>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${overHero ? 'text-white' : 'text-slate-700'}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200"
          >
            <div className="container-custom py-4">
              <div className="flex flex-col gap-3">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.25 }}
                    onClick={(e) => {
                      handleSmoothScroll(e, item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-slate-700 hover:text-orange-600 font-medium py-2"
                  >
                    {item.name}
                  </motion.a>
                ))}
                <div className="pt-4 border-t border-slate-200">
                  <Link
                    to="/submit"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary w-full text-sm inline-flex items-center justify-center"
                  >
                    Validate your idea
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
