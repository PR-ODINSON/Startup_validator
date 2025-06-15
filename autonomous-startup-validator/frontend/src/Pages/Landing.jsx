import React, { useEffect, useState } from 'react';
import { platformAPI } from '../api/platform';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import Confetti from '../components/Confetti';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import StatsSection from '../components/landing/StatsSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorks from '../components/landing/HowItWorks';
import PricingSection from '../components/landing/PricingSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import NewsletterSection from '../components/landing/NewsletterSection';
import FAQSection from '../components/landing/FAQSection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newsletter, setNewsletter] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    platformAPI.fetchLandingContent()
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load landing content');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: 32 }}>Loading...</div>;
  if (error) return <div style={{ color: 'red', padding: 32 }}>{error}</div>;

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', background: '#f9fafb', minHeight: '100vh', position: 'relative' }}>
      <AnimatedBackground />
      <Confetti show={subscribed} />

      <Navbar onSignIn={() => navigate('/login')} />
      <HeroSection
        title={content && content.heroTitle ? content.heroTitle.replace('Vlidate', 'Validate').replace('undefined', '') : 'Validate Your Startup Idea in Minutes'}
        subtitle={content?.heroSubtitle}
        button={content?.heroButton}
        image={content?.heroImage}
        onGetStarted={() => navigate('/submit-idea')}
      />
      <div style={{ height: 32 }} />
      <StatsSection stats={content.stats} />
      <div style={{ height: 32 }} />
      <FeaturesSection features={content.features} />
      <HowItWorks />
      <PricingSection />
      <TestimonialsSection testimonials={content.testimonials} />
      <NewsletterSection
        newsletter={newsletter}
        setNewsletter={setNewsletter}
        subscribed={subscribed}
        setSubscribed={setSubscribed}
      />
      <FAQSection faqs={content.faqs} />
      <Footer contactEmail={content.contactEmail} />
    </div>
  );
}
