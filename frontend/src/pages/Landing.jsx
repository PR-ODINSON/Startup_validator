import React from 'react';
import { 
  HeroSection, 
  HowItWorks, 
  WhyChooseUsSection, 
  TestimonialsSection,
  ComingSoonSection,
  AIAgentsSection,
  FeaturesSection,
  PricingSection,
  ProcessSection
} from '../components';
import DashboardPreviewSection from '../components/DashboardPreviewSection';

const Landing = () => {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <WhyChooseUsSection />
      <AIAgentsSection />
      <FeaturesSection />
      <ProcessSection />
      <PricingSection />
      <DashboardPreviewSection />
      <TestimonialsSection />
      <ComingSoonSection />
    </>
  );
};

export default Landing; 