import React from 'react';

export default function NewsletterSection({ newsletter, setNewsletter, subscribed, setSubscribed }) {
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletter && newsletter.includes('@')) {
      setSubscribed(true);
      setNewsletter('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section style={{ maxWidth: 600, margin: '0 auto', padding: '32px 0', textAlign: 'center' }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: '#18181b', marginBottom: 12 }}>Stay in the Loop</h2>
      <p style={{ color: '#52525b', fontSize: 16, marginBottom: 16 }}>Get product updates and startup tips.</p>
      <form onSubmit={handleSubscribe} style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <input
          type="email"
          value={newsletter}
          onChange={e => setNewsletter(e.target.value)}
          placeholder="Your email"
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            border: '1px solid #d1d5db',
            fontSize: 16,
            minWidth: 220
          }}
          required
        />
        <button
          type="submit"
          style={{
            background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 28px',
            fontWeight: 700,
            fontSize: 16,
            boxShadow: '0 2px 12px #2563eb22',
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.1s'
          }}
        >
          Subscribe
        </button>
      </form>
      {subscribed && <div style={{ color: '#2563eb', marginTop: 16, fontWeight: 600 }}>Subscribed!</div>}
    </section>
  );
}