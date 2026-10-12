import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AgentPipelineSection from './components/AgentPipelineSection';
import HowItWorks from './components/HowItWorks';
import StatsBand from './components/StatsBand';
import EarlyPreviewSection from './components/EarlyPreviewSection';
import FinalCTASection from './components/FinalCTASection';
import Footer from './components/Footer';
import SubmitIdea from './pages/SubmitIdea';
import Results from './pages/Results';

function LandingPage() {
  return (
    <>
      <HeroSection />
      <AgentPipelineSection />
      <HowItWorks />
      <StatsBand />
      <EarlyPreviewSection />
      <FinalCTASection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/submit" element={<SubmitIdea />} />
          <Route path="/results/:id" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
