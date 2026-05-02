// src/components/ShinyText.jsx
import { motion } from 'framer-motion';

export default function ShinyText({ text, speed = 2, className = '' }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="text-zinc-500 opacity-20">{text}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent bg-clip-text text-transparent"
        style={{ backgroundSize: '200% 100%' }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}
