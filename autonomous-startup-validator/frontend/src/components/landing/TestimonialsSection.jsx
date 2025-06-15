import React from 'react';

export default function TestimonialsSection({ testimonials }) {
  if (!testimonials) return null;
  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '32px 0' }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: '#18181b', marginBottom: 16 }}>Testimonials</h2>
      <div style={{
        display: 'flex',
        gap: 24,
        justifyContent: 'center'
      }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 12px #2563eb11',
            padding: 24,
            minWidth: 220,
            maxWidth: 320,
            flex: '1 1 220px'
          }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#2563eb', marginBottom: 8 }}>{t.name}</div>
            <div style={{ color: '#52525b', fontSize: 16 }}>{t.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}