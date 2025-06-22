import React, { useState, createContext, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, X, Mail, Bell } from 'lucide-react';
import { initSmoothScrolling } from './utils/smoothScroll';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ComingSoonSection from './components/ComingSoonSection';
import AIAgentsSection from './components/AIAgentsSection';
import ProcessSection from './components/ProcessSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';

// Create context for the coming soon modal
const ComingSoonContext = createContext();

export const useComingSoon = () => {
  const context = useContext(ComingSoonContext);
  if (!context) {
    throw new Error('useComingSoon must be used within a ComingSoonProvider');
  }
  return context;
};

// Coming Soon Modal Component
const ComingSoonModal = ({ showModal, setShowModal, email, setEmail, isSubmitted, setIsSubmitted }) => {
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      setTimeout(() => {
        setShowModal(false);
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>

            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mb-4"
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Get Early Access!</h3>
                  <p className="text-slate-600">
                    Be the first to experience the future of startup validation. Join our exclusive waitlist!
                  </p>
                </div>

                {/* Waitlist form */}
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Bell className="w-5 h-5" />
                    Get Early Access
                  </motion.button>
                </form>

                {/* Benefits */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-slate-600">Early access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-slate-600">Special pricing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-slate-600">No spam</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-slate-600">VIP support</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Success state */
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                  className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">You're In!</h3>
                <p className="text-slate-600 mb-4">
                  Thanks for joining our waitlist. You'll be among the first to know when we launch!
                </p>
                <div className="text-sm text-slate-500">
                  Check your email for confirmation 📧
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize smooth scrolling on component mount
  useEffect(() => {
    initSmoothScrolling();
  }, []);

  const openComingSoonModal = () => {
    setShowComingSoonModal(true);
  };

  const comingSoonContextValue = {
    openComingSoonModal
  };

  return (
    <ComingSoonContext.Provider value={comingSoonContextValue}>
      <div className="App">
        <Navbar />
        <HeroSection />
        <ComingSoonSection />
        <AIAgentsSection />
        <ProcessSection />
        <FeaturesSection />
        <PricingSection />
        <Footer />
        
        {/* Global Coming Soon Modal */}
        <ComingSoonModal 
          showModal={showComingSoonModal}
          setShowModal={setShowComingSoonModal}
          email={email}
          setEmail={setEmail}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
        />
      </div>
    </ComingSoonContext.Provider>
  );
}

export default App; 