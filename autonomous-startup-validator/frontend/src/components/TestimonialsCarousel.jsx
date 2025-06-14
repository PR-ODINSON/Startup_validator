import React, { useState } from 'react';

export default function TestimonialsCarousel({ testimonials }) {
  const [idx, setIdx] = useState(0);
  if (!testimonials || !testimonials.length) return null;
  const next = () => setIdx(i => (i + 1) % testimonials.length);
  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  return (
    <div style={{ position: 'relative', maxWidth: 340, margin: '0 auto' }}>
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: 20,
        minWidth: 220,
        maxWidth: 320,
        boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
        textAlign: 'center',
        margin: '0 auto',
        minHeight: 160
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#2563eb22',
          color: '#2563eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 18,
          margin: '0 auto 12px auto'
        }}>
          {testimonials[idx].name.split(' ').map(n => n[0]).join('')}
        </div>
        <div style={{ fontStyle: 'italic', marginBottom: 8, color: '#18181b' }}>
          "{testimonials[idx].text}"
        </div>
        <div style={{ fontWeight: 600, color: '#2563eb' }}>{testimonials[idx].name}</div>
      </div>
      <button onClick={prev} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#2563eb' }}>&lt;</button>
      <button onClick={next} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#2563eb' }}>&gt;</button>
    </div>
  );
}
