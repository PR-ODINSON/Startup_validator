// src/api/platform.js
import api from './config';

export const platformAPI = {
  // Get platform statistics for landing page
  getPlatformStats: async () => {
    const response = await api.get('/platform/stats');
    return response.data;
  },

  // Get featured testimonials
  getFeaturedTestimonials: async () => {
    const response = await api.get('/testimonials/featured');
    return response.data;
  },

  // Submit testimonial
  submitTestimonial: async (testimonialData) => {
    const response = await api.post('/testimonials', testimonialData);
    return response.data;
  },

  // Get system health
  getSystemHealth: async () => {
    const response = await api.get('/platform/health');
    return response.data;
  },

  // Get features for landing page
  getFeatures: async () => {
    const response = await api.get('/platform/features');
    return response.data;
  },

  // Fetch all landing content (for the landing page)
  fetchLandingContent: async () => {
    // Fetch stats, features, and testimonials in parallel
    const [stats, features, testimonials] = await Promise.all([
      platformAPI.getPlatformStats(),
      platformAPI.getFeatures(),
      platformAPI.getFeaturedTestimonials()
    ]);
    // Compose the expected content object
    return {
      navLinks: [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Submit Idea', href: '/submit-idea' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' }
      ],
      signInText: 'Sign In',
      heroTitle: `Validate Your Startup Idea in Minutes`,
      heroSubtitle: `Get instant, expert-level analysis from AI agents acting as market analysts, investors, and product managers. Turn weeks of research into minutes of actionable insights.`,
      heroButton: 'Get Started Free',
      heroImage: 'https://undraw.co/api/illustrations/startup.svg',
      featureSectionTitle: 'Why Choose Autonomous Startup Validator?',
      featureSectionText: 'Cut weeks of research and validation down to minutes. Our AI agents analyze your idea from every angle—market, competition, product, and more.',
      features: features,
      stats: stats,
      testimonials: testimonials,
      logos: [
        'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
        'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
      ],
      faqs: [
        { q: 'How does the AI validation work?', a: 'Our AI agents simulate expert analysis based on your input and market data.' },
        { q: 'Is my idea confidential?', a: 'Yes, your data is encrypted and never shared.' },
        { q: 'Can I share my report?', a: 'Absolutely! Download or share a link with your team or investors.' }
      ],
      contactEmail: 'support@startupvalidator.com'
    };
  }
};

export default platformAPI;
