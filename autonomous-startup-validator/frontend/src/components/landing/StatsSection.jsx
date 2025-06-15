import React from 'react';

function Stat({ value, label }) {
  return (
    <div style={{
      minWidth: 120,
      padding: 16,
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 12px #2563eb11',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: 32, fontWeight: 800, color: '#2563eb' }}>{value}</div>
      <div style={{ fontSize: 16, color: '#52525b', fontWeight: 500 }}>{label}</div>
    </div>
  );
}

export default function StatsSection({ stats }) {
  if (!stats) return null;
  return (
    <section style={{
      display: 'flex',
      justifyContent: 'center',
      gap: 32,
      margin: '0 auto',
      maxWidth: 900
    }}>
      <Stat value={stats.startupsValidated} label="Startups Validated" />
      <Stat value={stats.avgValidationTime} label="Avg. Validation Time" />
      <Stat value={stats.userSatisfaction} label="User Satisfaction" />
      <Stat value={stats.countries} label="Countries" />
    </section>
  );
}