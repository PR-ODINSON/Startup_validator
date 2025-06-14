import React from 'react';

export default function AnimatedBackground() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
        <circle cx="10%" cy="20%" r="60" fill="#a5b4fc55">
          <animate attributeName="cy" values="20%;80%;20%" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="80%" cy="70%" r="40" fill="#f472b655">
          <animate attributeName="cy" values="70%;30%;70%" dur="10s" repeatCount="indefinite" />
        </circle>
        <circle cx="50%" cy="50%" r="90" fill="#22d3ee33">
          <animate attributeName="cx" values="50%;60%;50%" dur="12s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
