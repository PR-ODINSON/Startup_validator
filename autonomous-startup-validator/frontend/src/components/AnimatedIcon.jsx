import React from 'react';

export default function AnimatedIcon({ icon, color, delay = 0 }) {
  return (
    <span
      style={{
        display: 'inline-block',
        animation: `bounce 1.6s ${delay}s infinite`,
        fontSize: 32,
        color,
      }}
    >
      {icon}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px) scale(1.1); }
        }
      `}</style>
    </span>
  );
}
