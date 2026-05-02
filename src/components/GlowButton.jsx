// src/components/GlowButton.jsx
// Glassmorphism animated CTA button
import { motion } from 'framer-motion';

export default function GlowButton({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  icon: Icon,
  id,
}) {
  return (
    <motion.button
      id={id}
      className={`glow-button glow-button--${variant}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {Icon && <Icon size={20} className="glow-button__icon" />}
      <span>{children}</span>
    </motion.button>
  );
}
