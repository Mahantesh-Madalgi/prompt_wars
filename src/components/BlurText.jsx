// src/components/BlurText.jsx
// React Bits-style animated text component using Framer Motion
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const buildWordVariants = (delay) => ({
  hidden: {
    filter: 'blur(12px)',
    opacity: 0,
    y: 20,
  },
  visible: {
    filter: 'blur(0px)',
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.25, 0.1, 0.25, 1],
      delay,
    },
  },
});

/**
 * BlurText — animates each word in from a blurred, faded state.
 * Props:
 *   text       — string to animate
 *   className  — extra classes for the wrapper
 *   delay      — stagger delay between words (seconds), default 0.12
 *   onComplete — called when animation finishes
 */
export default function BlurText({
  text = '',
  className = '',
  delay = 0.12,
  onComplete,
}) {
  const words = text.split(' ');
  const [animationDone, setAnimationDone] = useState(false);
  const lastWordRef = useRef(null);

  return (
    <span className={`blur-text-wrapper ${className}`} aria-label={text}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={`${word}-${i}`}
            ref={isLast ? lastWordRef : null}
            variants={buildWordVariants(i * delay)}
            initial="hidden"
            animate="visible"
            onAnimationComplete={isLast && !animationDone ? () => {
              setAnimationDone(true);
              onComplete?.();
            } : undefined}
            style={{ display: 'inline-block', marginRight: '0.3em', willChange: 'transform, opacity, filter' }}
            aria-hidden="true"
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}
