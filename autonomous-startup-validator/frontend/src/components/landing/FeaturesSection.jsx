import React from 'react';

export default function FeaturesSection({ features }) {
  if (!features) return null;
  return (
    <section id="features" style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 0' }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: '#18181b', marginBottom: 16 }}>Features</h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        justifyContent: 'center'
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 12px #2563eb11',
            padding: 24,
            minWidth: 220,
            maxWidth: 320,
            flex: '1 1 220px'
          }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#2563eb', marginBottom: 8 }}>{f.title}</div>
            <div style={{ color: '#52525b', fontSize: 16 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}