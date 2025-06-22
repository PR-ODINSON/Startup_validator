import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, ArrowLeft } from 'lucide-react';
import { useComingSoon } from '../context/ComingSoonContext';
import { handleSmoothScroll } from '../utils/smoothScroll';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openComingSoonModal, navigateToPage, currentPage } = useComingSoon();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Submit Idea', href: 'submit-idea', isPage: true },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  // Filter out "Submit Idea" when on submit idea page
  const filteredNavItems = currentPage === 'submit-idea' 
    ? navItems.filter(item => item.href !== 'submit-idea')
    : navItems;

  const handleNavClick = (item, e) => {
    if (item.isPage) {
      e.preventDefault();
      navigateToPage(item.href);
      setIsMobileMenuOpen(false);
    } else {
      e.preventDefault();
      // If we're on submit idea page, navigate to home first, then scroll to section
      if (currentPage === 'submit-idea') {
        navigateToPage('home');
        // Wait for navigation to complete, then scroll to section
        setTimeout(() => {
          handleSmoothScroll(e, item.href);
        }, 300);
      } else {
        handleSmoothScroll(e, item.href);
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect shadow-lg backdrop-blur-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigateToPage('home')}
          >
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              Startup<span className="text-orange-500">X</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Back to Home button when on submit idea page */}
            {currentPage === 'submit-idea' && (
              <motion.button
                onClick={() => navigateToPage('home')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-slate-700 hover:text-orange-600 font-medium transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </motion.button>
            )}
            
            {filteredNavItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(item, e)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                className={`text-slate-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group cursor-pointer ${
                  currentPage === item.href ? 'text-orange-600' : ''
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <motion.button
              onClick={openComingSoonModal}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-sm px-6 py-2"
            >
              Get Early Access
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-orange-600 transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-effect border-t border-white/20"
          >
            <div className="container-custom py-4">
              <div className="flex flex-col gap-4">
                {/* Back to Home button when on submit idea page */}
                {currentPage === 'submit-idea' && (
                  <motion.button
                    onClick={() => {
                      navigateToPage('home');
                      setIsMobileMenuOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-slate-700 hover:text-orange-600 font-medium transition-colors duration-200 py-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </motion.button>
                )}
                
                {filteredNavItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={(e) => handleNavClick(item, e)}
                    className={`text-slate-700 hover:text-orange-600 font-medium transition-colors duration-200 py-2 cursor-pointer ${
                      currentPage === item.href ? 'text-orange-600' : ''
                    }`}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <div className="pt-4 border-t border-slate-200">
                  <motion.button
                    onClick={openComingSoonModal}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="btn-secondary w-full text-sm"
                  >
                    Get Early Access
                  </motion.button>
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