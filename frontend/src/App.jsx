import React from 'react';
import { ComingSoonProvider, useComingSoon } from './context/ComingSoonContext';
import { Navbar, Footer } from './components';
import { Landing, SubmitIdeaPage } from './pages';

function AppContent() {
  const { isComingSoonModalOpen, closeComingSoonModal, currentPage } = useComingSoon();

  // Render different pages based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'submit-idea':
        return <SubmitIdeaPage />;
      case 'home':
      default:
        return <Landing />;
    }
  };

  return (
    <div className="App">
      <Navbar />
      {renderPage()}
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
  );
}

function App() {
  return (
    <ComingSoonProvider>
      <AppContent />
    </ComingSoonProvider>
  );
}

export default App; 