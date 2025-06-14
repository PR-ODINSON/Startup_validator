import React, { useRef, useEffect, useState } from 'react';

export default function FadeInSection({ children, delay = 0, ...props }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(40px)',
        transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
