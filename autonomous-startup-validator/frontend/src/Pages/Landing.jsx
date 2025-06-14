import React, { useEffect, useState } from 'react';
import { platformAPI } from '../api/platform'; // FIXED import

export default function LandingPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    platformAPI.fetchLandingContent() // FIXED usage
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
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', background: '#f8f9fb', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px 48px 0 48px', background: '#fff' }}>
        <div style={{ fontWeight: 700, fontSize: 20 }}>Autonomous Startup Validator</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {content.navLinks.map(link => (
            <a key={link.href} href={link.href} style={{ color: '#222', textDecoration: 'none', fontWeight: 500, fontSize: 16 }}>{link.label}</a>
          ))}
          <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 24px', fontWeight: 600, fontSize: 16, marginLeft: 16 }}>
            {content.signInText}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '64px 48px 32px 48px', background: '#f8f9fb' }}>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, marginBottom: 20, color: '#18181b' }}>
          {content.heroTitle}
        </div>
        <div style={{ fontSize: 20, color: '#52525b', marginBottom: 32, maxWidth: 600 }}>
          {content.heroSubtitle}
        </div>
        <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 36px', fontWeight: 600, fontSize: 18 }}>
          {content.heroButton}
        </button>
      </section>

      {/* Features Section */}
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: '#fff', borderRadius: 24, margin: '40px 48px', padding: '48px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', gap: 60 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 18, color: '#18181b' }}>{content.featureSectionTitle}</div>
          <div style={{ fontSize: 20, color: '#52525b', maxWidth: 440 }}>{content.featureSectionText}</div>
        </div>
        <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: 40 }}>
          {content.features.map((feature, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <span style={{ color: '#22c55e', fontSize: 28, marginTop: 2 }}>✔</span>
              <div>
                <span style={{ fontWeight: 700, fontSize: 22, color: '#18181b', marginBottom: 4 }}>{feature.title}</span>
                <div style={{ color: '#52525b', fontSize: 16, maxWidth: 340 }}>{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// This code defines a Landing page component for the Autonomous Startup Validator application.
// It includes a navigation bar, a hero section with dynamic statistics, and a testimonials section.