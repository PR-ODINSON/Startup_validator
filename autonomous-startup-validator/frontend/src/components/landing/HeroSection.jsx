import React from 'react';

export default function HeroSection({ title, subtitle, button, image, onGetStarted }) {
  return (
    <section style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px 0 32px 0',
      gap: 48,
      maxWidth: 1200,
      margin: '0 auto'
    }}>
      <div style={{ flex: 1, minWidth: 320 }}>
        <h1 style={{
          fontSize: 44,
          fontWeight: 900,
          color: '#18181b',
          marginBottom: 16,
          lineHeight: 1.1
        }}>{title}</h1>
        <p style={{
          fontSize: 20,
          color: '#52525b',
          marginBottom: 32,
          fontWeight: 500
        }}>{subtitle}</p>
        <button
          style={{
            background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '14px 36px',
            fontWeight: 700,
            fontSize: 20,
            boxShadow: '0 2px 12px #2563eb22',
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.1s',
            animation: 'glow 2.5s infinite alternate'
          }}
          onClick={onGetStarted}
        >
          {button}
        </button>
      </div>
      <div style={{ flex: 1, minWidth: 320, display: 'flex', justifyContent: 'center' }}>
        <img src={image} alt="Startup" style={{ width: '90%', maxWidth: 420, borderRadius: 16, boxShadow: '0 4px 32px #2563eb11' }} />
      </div>
      <style>{`
        @keyframes glow {
          0% { box-shadow: 0 0 16px #2563eb55; }
          100% { box-shadow: 0 0 32px #60a5fa99; }
        }
      `}</style>
    </section>
  );
}