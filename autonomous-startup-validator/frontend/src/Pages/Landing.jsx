// src/pages/Landing.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Landing = () => {
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    avgScore: 0,
    successRate: 0
  });
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLandingData();
  }, []);

  const fetchLandingData = async () => {
    try {
      const [statsRes, testimonialsRes] = await Promise.all([
        axios.get('/api/platform/stats'),
        axios.get('/api/testimonials/featured')
      ]);
      
      setStats(statsRes.data);
      setTestimonials(testimonialsRes.data);
    } catch (error) {
      console.error('Error fetching landing data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🚀</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">Autonomous Startup Validator</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Sign In
              </Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Validate Your Startup Idea in
            <span className="text-blue-600"> Minutes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get instant expert analysis from AI agents acting as market analysts, investors, and product managers. 
            Turn weeks of research into minutes of actionable insights.
          </p>
          
          {/* Dynamic Stats */}
          {!loading && (
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.totalAnalyses.toLocaleString()}+</div>
                <div className="text-sm text-gray-600">Ideas Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{stats.avgScore}/100</div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{stats.successRate}%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/submit-idea" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium">
              Submit Your Idea
            </Link>
            <Link to="/dashboard" className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium">
              View Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Dynamic Testimonials */}
      {testimonials.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Founders Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
// This code defines a Landing page component for the Autonomous Startup Validator application.
// It includes a navigation bar, a hero section with dynamic statistics, and a testimonials section.