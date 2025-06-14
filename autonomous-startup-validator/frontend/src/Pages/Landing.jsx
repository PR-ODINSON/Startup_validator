import React, { useEffect, useState } from 'react';
import { platformAPI } from '../api/platform';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import Typewriter from '../components/Typewriter';
import AnimatedIcon from '../components/AnimatedIcon';
import FadeInSection from '../components/FadeInSection';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import Confetti from '../components/Confetti';
import api from '../api/config';

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

  // Example usage of the api config
  useEffect(() => {
    api.get('/some-endpoint')
      .then(response => {
        // handle response
      })
      .catch(error => {
        // handle error
      });
  }, []);

  if (loading) return <div style={{ padding: 32 }}>Loading...</div>;
  if (error) return <div style={{ color: 'red', padding: 32 }}>{error}</div>;

  // Animated count up for stats
  const Stat = ({ value, label }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const end = parseInt(value.toString().replace(/\D/g, '')) || 0;
      if (start === end) return;
      let increment = end / 40;
      let timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCount(Math.floor(start));
      }, 20);
      return () => clearInterval(timer);
    }, [value]);
    return (
      <div style={{ textAlign: 'center', flex: 1 }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#2563eb' }}>{count}{typeof value === 'string' && value.replace(/\d/g, '')}</div>
        <div style={{ color: '#52525b' }}>{label}</div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', background: '#f9fafb', minHeight: '100vh', position: 'relative' }}>
      <AnimatedBackground />
      <Confetti show={subscribed} />
      {/* Sticky Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0',
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 2px 16px #2563eb11',
        minHeight: 72,
        transition: 'background 0.3s',
        backdropFilter: 'blur(8px)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          padding: '0 32px',
          width: '100%',
          maxWidth: 1200,
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontWeight: 900,
              fontSize: 28,
              color: '#2563eb',
              fontFamily: 'monospace',
              letterSpacing: '-2px',
              background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              userSelect: 'none',
              animation: 'navbarPulse 2.5s infinite alternate'
            }}>SV</span>
            <span style={{ fontWeight: 700, fontSize: 22, color: '#18181b', letterSpacing: '-1px' }}>Startup Validator</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <a href="#features" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500, fontSize: 16, transition: 'color 0.2s' }}>Features</a>
            <a href="#how" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500, fontSize: 16, transition: 'color 0.2s' }}>How it Works</a>
            <a href="#faqs" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500, fontSize: 16, transition: 'color 0.2s' }}>FAQs</a>
            <button style={{
              background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 28px',
              fontWeight: 700,
              fontSize: 16,
              boxShadow: '0 2px 12px #2563eb22',
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.1s',
              marginLeft: 12,
              animation: 'glow 2.5s infinite alternate'
            }}
              onClick={() => navigate('/login')}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.07)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Sign In
            </button>
          </div>
        </div>
        <style>{`
          @keyframes navbarPulse {
            0% { filter: brightness(1); }
            100% { filter: brightness(1.3) drop-shadow(0 0 8px #60a5fa88); }
          }
        `}</style>
      </nav>

      {/* Hero Section with Gradient and Vibrant CTA */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 24px 48px 24px',
        background: 'linear-gradient(120deg, #f9fafb 60%, #a5b4fc 100%)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          fontSize: 54,
          fontWeight: 800,
          color: '#18181b',
          textAlign: 'center',
          marginBottom: 18,
          letterSpacing: '-1px',
          lineHeight: 1.1
        }}>
          <Typewriter text={content.heroTitle} speed={40} />
        </div>
        <div style={{
          width: 80,
          height: 6,
          background: 'linear-gradient(90deg, #2563eb, #22c55e)',
          borderRadius: 3,
          margin: '16px auto 32px auto',
          animation: 'pulse 2s infinite alternate'
        }} />
        <div style={{
          fontSize: 22,
          color: '#52525b',
          textAlign: 'center',
          maxWidth: 600,
          marginBottom: 36
        }}>
          {content.heroSubtitle}
        </div>
        <button
          style={{
            background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '16px 44px',
            fontWeight: 700,
            fontSize: 20,
            boxShadow: '0 2px 12px #2563eb22',
            marginBottom: 32,
            cursor: 'pointer',
            transition: 'transform 0.1s',
            animation: 'glow 2.5s infinite alternate'
          }}
          onClick={() => navigate('/submit-idea')}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.07)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {content.heroButton}
        </button>
        <img src={content.heroImage} alt="" style={{
          marginTop: 24,
          width: 340,
          maxWidth: '90%',
          borderRadius: 18,
          boxShadow: '0 4px 24px #2563eb11'
        }} />
        <style>{`
          @keyframes pulse {
            0% { opacity: 1; }
            100% { opacity: 0.5; }
          }
          @keyframes glow {
            0% { box-shadow: 0 0 16px #2563eb55; }
            100% { box-shadow: 0 0 32px #60a5fa99; }
          }
        `}</style>
      </section>

      {/* Soft Separator */}
      <div style={{ height: 32 }} />

      {/* Stats Section */}
      <section style={{
        display: 'flex', justifyContent: 'center', gap: 48, margin: '0 0 32px 0'
      }}>
        <FadeInSection delay={0.1}><Stat value={content.stats.startupsValidated} label="Startups Validated" /></FadeInSection>
        <FadeInSection delay={0.2}><Stat value={content.stats.avgValidationTime} label="Avg. Validation Time" /></FadeInSection>
        <FadeInSection delay={0.3}><Stat value={content.stats.userSatisfaction} label="User Satisfaction" /></FadeInSection>
        <FadeInSection delay={0.4}><Stat value={content.stats.countries} label="Countries" /></FadeInSection>
      </section>

      {/* Soft Separator */}
      <div style={{ height: 32 }} />

      {/* Features Section with Pastel Background */}
      <section style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 32,
        background: 'linear-gradient(120deg, #f0fdf4 60%, #e0e7ff 100%)',
        borderRadius: 24,
        margin: '0 24px',
        padding: '48px 24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
      }}>
        {content.features.map((feature, idx) => (
          <FadeInSection key={idx} delay={0.1 * idx}>
            <div style={{
              flex: '1 1 220px',
              minWidth: 220,
              maxWidth: 320,
              background: '#fff',
              borderRadius: 12,
              padding: 24,
              margin: 8,
              boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
              textAlign: 'center'
            }}>
              <AnimatedIcon icon={['⚡', '🧠', '📊', '🏆', '📈', '🎯', '🔗'][idx % 7]} color={['#2563eb', '#22c55e', '#f59e42', '#e11d48', '#a21caf', '#0ea5e9', '#fbbf24'][idx % 7]} delay={0.1 * idx} />
              <div style={{ fontWeight: 700, fontSize: 20, color: '#18181b', marginBottom: 4 }}>{feature.title}</div>
              <div style={{ color: '#52525b', fontSize: 15 }}>{feature.desc}</div>
            </div>
          </FadeInSection>
        ))}
      </section>

      {/* How it Works Timeline */}
      <section style={{
        margin: '48px 24px', padding: 32, background: '#fff', borderRadius: 16,
        boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
      }}>
        <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 24, color: '#18181b', textAlign: 'center' }}>
          How It Works
        </div>
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 40, flexWrap: 'wrap'
        }}>
          <div style={{ textAlign: 'center', maxWidth: 200 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
            <div style={{ fontWeight: 600 }}>1. Submit Your Idea</div>
            <div style={{ color: '#52525b', fontSize: 15 }}>Describe your startup in a few sentences.</div>
          </div>
          <div style={{ fontSize: 32, alignSelf: 'center', color: '#2563eb' }}>→</div>
          <div style={{ textAlign: 'center', maxWidth: 200 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🤖</div>
            <div style={{ fontWeight: 600 }}>2. AI Analysis</div>
            <div style={{ color: '#52525b', fontSize: 15 }}>Our AI agents review your idea from every angle.</div>
          </div>
          <div style={{ fontSize: 32, alignSelf: 'center', color: '#2563eb' }}>→</div>
          <div style={{ textAlign: 'center', maxWidth: 200 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
            <div style={{ fontWeight: 600 }}>3. Get Your Report</div>
            <div style={{ color: '#52525b', fontSize: 15 }}>Receive a detailed, actionable validation report.</div>
          </div>
        </div>
      </section>

      {/* Pricing Section - moved and restyled */}
      <section id="pricing" style={{
        margin: '40px auto',
        maxWidth: 700,
        background: '#fff',
        borderRadius: 28,
        border: '2px solid #2563eb33',
        padding: 40,
        boxShadow: '0 8px 40px #2563eb11',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: 28,
          marginBottom: 24,
          color: '#18181b',
          textAlign: 'center'
        }}>Simple Pricing</div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 32,
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: '#f9fafb',
            borderRadius: 12,
            padding: 32,
            minWidth: 220,
            maxWidth: 320,
            boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
            textAlign: 'center',
            border: '1.5px solid #2563eb22'
          }}>
            <div style={{ fontWeight: 700, fontSize: 22, color: '#2563eb', marginBottom: 8 }}>Free</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#18181b', marginBottom: 8 }}>$0</div>
            <div style={{ color: '#52525b', marginBottom: 12 }}>Validate 1 idea per month</div>
            <ul style={{ listStyle: 'none', padding: 0, color: '#22c55e', fontWeight: 600 }}>
              <li>✔ Basic AI Report</li>
              <li>✔ Email Support</li>
            </ul>
          </div>
          <div style={{
            background: '#f9fafb',
            borderRadius: 12,
            padding: 32,
            minWidth: 220,
            maxWidth: 320,
            boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
            textAlign: 'center',
            border: '2px solid #2563eb'
          }}>
            <div style={{ fontWeight: 700, fontSize: 22, color: '#2563eb', marginBottom: 8 }}>Pro</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#18181b', marginBottom: 8 }}>$19<span style={{ fontSize: 16 }}>/mo</span></div>
            <div style={{ color: '#52525b', marginBottom: 12 }}>Unlimited validations</div>
            <ul style={{ listStyle: 'none', padding: 0, color: '#22c55e', fontWeight: 600 }}>
              <li>✔ Full AI Report</li>
              <li>✔ Priority Support</li>
              <li>✔ Shareable Reports</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Soft Pink Background */}
      <section style={{
        margin: '40px 24px',
        background: 'linear-gradient(90deg, #fdf2f8 60%, #f9fafb 100%)',
        borderRadius: 16,
        padding: 32,
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: 24,
          marginBottom: 24,
          color: '#18181b',
          textAlign: 'center'
        }}>What Our Users Say</div>
        <TestimonialsCarousel testimonials={content.testimonials} />
      </section>

      {/* Newsletter Signup */}
      <section style={{
        margin: '40px 24px', background: '#e0e7ff', borderRadius: 16, padding: 32, textAlign: 'center'
      }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 12, color: '#18181b' }}>
          Stay in the loop!
        </div>
        <div style={{ color: '#52525b', marginBottom: 18 }}>
          Get product updates and startup tips. No spam.
        </div>
        {!subscribed ? (
          <form onSubmit={e => {
            e.preventDefault();
            setSubscribed(true);
          }}>
            <input
              type="email"
              required
              placeholder="Your email"
              value={newsletter}
              onChange={e => setNewsletter(e.target.value)}
              style={{
                padding: '10px 16px', borderRadius: 6, border: '1px solid #cbd5e1',
                fontSize: 16, marginRight: 12, outline: 'none'
              }}
            />
            <button type="submit" style={{
              background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6,
              padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer'
            }}>
              Subscribe
            </button>
          </form>
        ) : (
          <div style={{ color: '#22c55e', fontWeight: 600, fontSize: 18 }}>Thanks for subscribing!</div>
        )}
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{
        margin: '40px 24px', padding: 32, background: '#fff', borderRadius: 16,
        boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
      }}>
        <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 24, color: '#18181b' }}>Frequently Asked Questions</div>
        {content.faqs.map((faq, idx) => (
          <div key={idx} style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 600, color: '#2563eb' }}>{faq.q}</div>
            <div style={{ color: '#52525b' }}>{faq.a}</div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        marginTop: 48, padding: 24, background: '#18181b', color: '#fff', textAlign: 'center', borderRadius: 12
      }}>
        <div>Contact us: <a href={`mailto:${content.contactEmail}`} style={{ color: '#60a5fa' }}>{content.contactEmail}</a></div>
        <div style={{ marginTop: 8 }}>© {new Date().getFullYear()} Autonomous Startup Validator. All rights reserved.</div>
      </footer>
    </div>
  );
}
