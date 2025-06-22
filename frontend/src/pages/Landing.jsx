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
      <TestimonialsSection />
      <ComingSoonSection />
    </>
  );
};

export default Landing; 