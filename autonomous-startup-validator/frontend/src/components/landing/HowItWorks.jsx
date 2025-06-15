import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how" style={{ maxWidth: 900, margin: '0 auto', padding: '32px 0' }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: '#18181b', marginBottom: 16 }}>How It Works</h2>
      <ol style={{ color: '#2563eb', fontWeight: 600, fontSize: 18, paddingLeft: 24 }}>
        <li>Submit your startup idea in a few sentences.</li>
        <li>AI agents analyze your idea from multiple expert perspectives.</li>
        <li>Receive a detailed, actionable validation report in minutes.</li>
      </ol>
    </section>
  );
}