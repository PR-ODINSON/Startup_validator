import React from 'react';

export default function PricingSection() {
  return (
    <section id="pricing" style={{ maxWidth: 900, margin: '0 auto', padding: '32px 0' }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: '#18181b', marginBottom: 16 }}>Pricing</h2>
      <div style={{
        display: 'flex',
        gap: 32,
        justifyContent: 'center'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 12px #2563eb11',
          padding: 32,
          minWidth: 220,
          maxWidth: 320,
          flex: '1 1 220px'
        }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#2563eb', marginBottom: 8 }}>Free</div>
          <div style={{ color: '#52525b', fontSize: 16, marginBottom: 12 }}>Validate 1 idea per week</div>
          <div style={{ fontWeight: 800, fontSize: 28, color: '#18181b' }}>$0</div>
        </div>
        <div style={{
          background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
          borderRadius: 12,
          boxShadow: '0 2px 12px #2563eb22',
          padding: 32,
          minWidth: 220,
          maxWidth: 320,
          flex: '1 1 220px',
          color: '#fff'
        }}>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Pro</div>
          <div style={{ fontSize: 16, marginBottom: 12 }}>Unlimited validations, priority support</div>
          <div style={{ fontWeight: 800, fontSize: 28 }}>$19/mo</div>
        </div>
      </div>
    </section>
  );
}