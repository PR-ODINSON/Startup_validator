import React, { createContext, useContext, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import WhyUs from './components/WhyUs';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

// Coming Soon Modal Context
const ComingSoonContext = createContext();

export const useComingSoon = () => {
  const context = useContext(ComingSoonContext);
  if (!context) {
    throw new Error('useComingSoon must be used within a ComingSoonProvider');
  }
  return context;
};

function App() {
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);

  const openComingSoonModal = () => setIsComingSoonModalOpen(true);
  const closeComingSoonModal = () => setIsComingSoonModalOpen(false);

  return (
    <ComingSoonContext.Provider value={{ 
      openComingSoonModal, 
      closeComingSoonModal, 
      isComingSoonModalOpen 
    }}>
      <div className="App">
        <Navbar />
        <HeroSection />
        <HowItWorks />
        <WhyUs />
        <TestimonialsSection />
        <Footer />
        
        {/* Coming Soon Modal */}
        {isComingSoonModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
              <button
                onClick={closeComingSoonModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  StartupX is Coming Soon!
                </h3>
                
                <p className="text-gray-600 mb-6">
                  We're putting the finishing touches on our AI-powered startup validation platform. 
                  Be the first to know when we launch!
                </p>
                
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300">
                    Notify Me When Ready
                  </button>
                </div>
                
                <p className="text-sm text-gray-500 mt-4">
                  Join 200+ founders on our waitlist
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ComingSoonContext.Provider>
  );
}

export default App; 