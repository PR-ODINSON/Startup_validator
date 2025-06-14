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
        { label: 'Report', href: '/report' }
      ],
      signInText: 'Sign In',
      heroTitle: `Validate Your Startup Idea in Minutes`,
      heroSubtitle: `Get instant expert analysis from AI agents acting as market analysts, investors, and product managers. Turn weeks of research into minutes of actionable insights.`,
      heroButton: 'Submit Your Idea',
      featureSectionTitle: 'Why Use Autonomous Startup Validator?',
      featureSectionText: 'Cut weeks of research and validation down to minutes. Our AI agents analyze your idea from every angle—market, competition, product, and more.',
      features: features,         // expects [{title, desc}, ...]
      stats: stats,               // dynamic stats for display
      testimonials: testimonials  // optional, for testimonials section
    };
  }
};

export default platformAPI;
