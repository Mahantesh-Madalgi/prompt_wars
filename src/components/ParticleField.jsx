// src/components/ParticleField.jsx
// GSAP-powered subtle particle field for hero background
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ParticleField({ count = 60 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    const colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#e879f9'];

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.className = 'particle';
      const size = Math.random() * 4 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];

      Object.assign(dot.style, {
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        borderRadius: '50%',
        position: 'absolute',
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: 0,
        pointerEvents: 'none',
      });

      container.appendChild(dot);
      particles.push(dot);

      gsap.to(dot, {
        opacity: Math.random() * 0.6 + 0.1,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      gsap.to(dot, {
        y: `${(Math.random() - 0.5) * 120}px`,
        x: `${(Math.random() - 0.5) * 80}px`,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }

    return () => {
      particles.forEach((p) => p.remove());
      gsap.killTweensOf(particles);
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
