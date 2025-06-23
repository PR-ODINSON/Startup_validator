import React from 'react';
import { ComingSoonProvider, useComingSoon } from './context/ComingSoonContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar, Footer } from './components';
import { Landing, SubmitIdeaPage, Login, Signup } from './pages';

function AppContent() {
  const { isComingSoonModalOpen, closeComingSoonModal, currentPage } = useComingSoon();

  // Render different pages based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'submit-idea':
        return <SubmitIdeaPage />;
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      case 'home':
      default:
        return <Landing />;
    }
  };

  // Don't show navbar and footer for auth pages
  const isAuthPage = currentPage === 'login' || currentPage === 'signup';

  return (
    <div className="App">
      {!isAuthPage && <Navbar />}
      {renderPage()}
      {!isAuthPage && <Footer />}
      
      {/* Coming Soon Modal */}
      {isComingSoonModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full relative border border-slate-200 dark:border-slate-700">
            <button
              onClick={closeComingSoonModal}
              className="absolute top-4 right-4 text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-300 text-2xl"
            >
              ×
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                StartupX is Coming Soon!
              </h3>
              
              <p className="text-gray-600 dark:text-slate-400 mb-6">
                We're putting the finishing touches on our AI-powered startup validation platform. 
                Be the first to know when we launch!
              </p>
              
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300">
                  Notify Me When Ready
                </button>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-slate-500 mt-4">
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
    <ThemeProvider>
      <ComingSoonProvider>
        <AppContent />
      </ComingSoonProvider>
    </ThemeProvider>
  );
}

export default App; 