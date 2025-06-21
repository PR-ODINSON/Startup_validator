import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AIAgentsSection from './components/AIAgentsSection';
import ProcessSection from './components/ProcessSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <AIAgentsSection />
      <ProcessSection />
      <FeaturesSection />
      <PricingSection />
      <Footer />
    </div>
  );
}

export default App; 