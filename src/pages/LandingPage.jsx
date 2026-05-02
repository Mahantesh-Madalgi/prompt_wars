// src/pages/LandingPage.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Vote, Shield, Zap, ChevronRight, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BlurText from '../components/BlurText';
import ParticleField from '../components/ParticleField';
import GlowButton from '../components/GlowButton';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Answers',
    desc: 'Get instant, accurate answers about elections, candidates, and policies from Gemini AI.',
    color: '#6366f1',
  },
  {
    icon: Shield,
    title: 'Trusted Sources',
    desc: 'Every response is grounded in verified, non-partisan electoral data and official records.',
    color: '#8b5cf6',
  },
  {
    icon: Globe,
    title: 'Nationwide Coverage',
    desc: 'From local races to presidential elections — explore every level of government.',
    color: '#a78bfa',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function LandingPage() {
  const { signInWithGoogle } = useAuth();
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState('');
  const [titleDone, setTitleDone] = useState(false);

  const handleGoogleSignIn = async () => {
    setSigning(true);
    setError('');
    try {
      await signInWithGoogle();
      // App.jsx's onAuthStateChanged will redirect to /dashboard
    } catch (err) {
      console.error(err);
      setError('Sign-in failed. Please try again.');
      setSigning(false);
    }
  };

  return (
    <div className="landing">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero" id="hero">
        <ParticleField count={70} />

        {/* Radial glow orbs */}
        <div className="hero__orb hero__orb--1" aria-hidden="true" />
        <div className="hero__orb hero__orb--2" aria-hidden="true" />

        <motion.div
          className="hero__content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Vote size={14} />
            <span>AI-Powered Election Guide</span>
          </motion.div>

          {/* Main title — BlurText animation */}
          <h1 className="hero__title">
            <BlurText
              text="Your Vote,"
              delay={0.1}
              className="hero__title-line"
            />
            <br />
            <BlurText
              text="Your Voice."
              delay={0.12}
              className="hero__title-line hero__title-line--accent"
              onComplete={() => setTitleDone(true)}
            />
          </h1>

          {/* Subtitle */}
          <AnimatePresence>
            {titleDone && (
              <motion.p
                className="hero__subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                Navigate every ballot, candidate, and policy with confidence.
                <br />
                Powered by Gemini AI — your personal democracy assistant.
              </motion.p>
            )}
          </AnimatePresence>

          {/* CTA buttons */}
          <AnimatePresence>
            {titleDone && (
              <motion.div
                className="hero__cta-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              >
                <GlowButton
                  id="btn-google-signin"
                  onClick={handleGoogleSignIn}
                  disabled={signing}
                  icon={LogIn}
                  variant="primary"
                >
                  {signing ? 'Signing in…' : 'Continue with Google'}
                </GlowButton>

                <GlowButton variant="ghost" icon={ChevronRight} id="btn-learn-more">
                  Learn More
                </GlowButton>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                className="hero__error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          aria-hidden="true"
        >
          <div className="scroll-indicator__dot" />
        </motion.div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section className="features" id="features">
        <motion.div
          className="features__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map(({ icon: Icon, title, desc, color }) => (
            <motion.div
              key={title}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="feature-card__icon" style={{ '--icon-color': color }}>
                <Icon size={24} />
              </div>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__desc">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="footer">
        <p>© 2026 Election Guide AI · Powered by Gemini</p>
      </footer>
    </div>
  );
}
