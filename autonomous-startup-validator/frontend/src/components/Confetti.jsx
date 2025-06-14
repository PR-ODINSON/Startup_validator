import React, { useEffect, useRef } from 'react';

export default function Confetti({ show }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!show) return;
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    let particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H - H,
      r: Math.random() * 6 + 4,
      d: Math.random() * 120,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      tilt: Math.random() * 10 - 10
    }));
    let angle = 0;
    let anim;
    let fadeTimeout;
    let fadeAnim;
    let opacity = 1;
    const fadeDuration = 2000; // 2 seconds
    const fadeStep = 50; // ms per step
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = opacity;
      angle += 0.01;
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;
        if (p.y > H) {
          p.x = Math.random() * W;
          p.y = -10;
        }
      }
      ctx.globalAlpha = 1;
      anim = requestAnimationFrame(draw);
    }
    draw();
    fadeTimeout = setTimeout(() => {
      function fade() {
        opacity -= fadeStep / fadeDuration;
        if (opacity <= 0) {
          opacity = 0;
          if (canvas) canvas.style.display = 'none';
          return;
        }
        fadeAnim = setTimeout(fade, fadeStep);
      }
      fade();
    }, 5000);
    return () => {
      cancelAnimationFrame(anim);
      clearTimeout(fadeAnim);
      clearTimeout(fadeTimeout);
      if (canvas) {
        canvas.style.display = '';
        canvas.style.opacity = '';
      }
    };
  }, [show]);
  return show ? <canvas ref={canvasRef} id="confetti-canvas" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999, transition: 'opacity 2s' }} /> : null;
}
