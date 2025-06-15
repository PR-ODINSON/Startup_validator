import React from 'react';

export default function Navbar({ onSignIn }) {
  return (
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
            onClick={onSignIn}
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
        @keyframes glow {
          0% { box-shadow: 0 0 16px #2563eb55; }
          100% { box-shadow: 0 0 32px #60a5fa99; }
        }
      `}</style>
    </nav>
  );
}