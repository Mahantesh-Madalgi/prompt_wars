// src/components/VoterReadiness.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const translations = {
  English: {
    title: 'Voter Readiness',
    ready: 'Ready to Vote!',
  },
  Hindi: {
    title: 'मतदाता तत्परता',
    ready: 'वोट देने के लिए तैयार!',
  },
  Marathi: {
    title: 'मतदार तत्परता',
    ready: 'मतदानासाठी तयार!',
  }
};

export default function VoterReadiness({ milestones, completedMilestones }) {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;

  const totalWeight = milestones.reduce((sum, m) => sum + m.weight, 0);
  const currentWeight = milestones
    .filter(m => completedMilestones.includes(m.id))
    .reduce((sum, m) => sum + m.weight, 0);
  
  const progress = Math.min(100, Math.round((currentWeight / totalWeight) * 100));
  const isComplete = progress === 100;

  return (
    <div className="readiness-card">
      <div className="readiness-card__header">
        <h3 className="readiness-card__title">{t.title}</h3>
        <span className="readiness-card__percentage">{progress}%</span>
      </div>

      <div className="readiness-card__progress-container">
        <motion.div 
          className="readiness-card__progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      <div className="readiness-card__checklist">
        {milestones.map((m) => {
          const done = completedMilestones.includes(m.id);
          const milestoneLabel = m.translations?.[language]?.label || m.label;
          
          return (
            <div key={m.id} className={`checklist-item ${done ? 'checklist-item--done' : ''}`}>
              {done ? (
                <CheckCircle2 size={16} className="checklist-item__icon checklist-item__icon--done" />
              ) : (
                <Circle size={16} className="checklist-item__icon" />
              )}
              <span className="checklist-item__label">{milestoneLabel}</span>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="readiness-card__badge-container"
          >
            <div className="voter-badge">
              <Trophy size={20} />
              <span>{t.ready}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

