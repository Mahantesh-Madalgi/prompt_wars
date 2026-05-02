import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Quote, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function StoryCard({ node, onChoice, onBack, hasHistory }) {
  const { language } = useLanguage();
  
  if (!node) return null;

  const handleChoiceClick = (choice) => {
    onChoice(choice.nextNode, choice.milestone, choice.action);
  };

  const nodeContent = node.translations?.[language] || node;
  const nodeText = nodeContent.text;
  const nodeChoices = nodeContent.choices || node.choices;

  return (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="story-card-premium"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        borderRadius: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
      }}
    >
      {/* Back Button */}
      {hasHistory && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="absolute top-8 right-8 p-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all group z-20"
          title="Go back"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
        </motion.button>
      )}

      {/* Dynamic ambient background */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Header Section */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 border border-white/10">
            <Sparkles size={24} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-[#0d0d1f] flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          </div>
        </div>
        
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Narrative Guide</span>
            <div className="h-px w-8 bg-indigo-500/30" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight leading-none">
            {node.speaker}
          </h3>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative">
        <Quote className="absolute -top-4 -left-6 text-white/5 w-12 h-12 -z-0" />
        <div className="relative z-10 px-2">
          <p className="text-zinc-300 text-lg leading-relaxed font-medium">
            {nodeText}
          </p>
        </div>
      </div>

      {/* Choices Area */}
      <div className="flex flex-col gap-3 mt-auto">
        {nodeChoices && nodeChoices.length > 0 ? (
          nodeChoices.map((choice, index) => (
            <motion.button
              key={index}
              whileHover={{ x: 8, backgroundColor: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChoiceClick(choice)}
              className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-indigo-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm font-bold text-zinc-300 group-hover:text-white tracking-wide">
                  {choice.translations?.[language] || choice.text}
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg">
                <ChevronRight size={18} />
              </div>
            </motion.button>
          ))
        ) : (
          <div className="flex flex-col items-center gap-3 py-8 px-6 bg-indigo-600/5 border border-indigo-500/10 rounded-3xl border-dashed">
             <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
               <Sparkles size={18} />
             </div>
             <div className="text-center">
               <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.25em] mb-1">
                 {language === 'Hindi' ? 'अध्याय समाप्त' : language === 'Marathi' ? 'अध्याय संपला' : 'Chapter Concluded'}
               </p>
               <p className="text-[11px] text-zinc-500 font-medium">
                 {language === 'Hindi' ? 'आप इस कथा पथ के अंत तक पहुँच गए हैं।' : language === 'Marathi' ? 'तुम्ही या कथानकाच्या शेवटी पोहोचला आहात.' : "You've reached the end of this narrative path."}
               </p>
             </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
