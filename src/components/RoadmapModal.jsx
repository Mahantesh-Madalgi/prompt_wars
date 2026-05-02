import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Circle, MapPin, Lock, MessageSquare } from 'lucide-react';
import RahulDoll from './RahulDoll';
import { storyNodes } from '../data/storyData';
import { LanguageContext } from '../context/LanguageContext';

const translations = {
  English: {
    title: 'Your Journey Tree',
    subtitle: 'Click on any unlocked node to view the question asked.',
    panelHeader: 'Question at this stage',
    nodes: {
      intro: 'Start',
      id_check: 'ID Verify',
      no_id_help: 'No ID',
      id_help: 'ID Help',
      registration_step: 'Registration',
      not_registered_help: 'Reg Help',
      campaign_step: 'Campaign',
      voting_day: 'Voting Day',
      complete: 'Citizen'
    }
  },
  Hindi: {
    title: 'आपकी यात्रा वृक्ष',
    subtitle: 'पूछे गए प्रश्न को देखने के लिए किसी भी अनलॉक किए गए नोड पर क्लिक करें।',
    panelHeader: 'इस स्तर पर प्रश्न',
    nodes: {
      intro: 'शुरुआत',
      id_check: 'आईडी सत्यापन',
      no_id_help: 'आईडी नहीं',
      id_help: 'आईडी सहायता',
      registration_step: 'पंजीकरण',
      not_registered_help: 'पंजीकरण सहायता',
      campaign_step: 'अभियान',
      voting_day: 'मतदान दिवस',
      complete: 'नागरिक'
    }
  },
  Marathi: {
    title: 'तुमचा प्रवास वृक्ष',
    subtitle: 'विचारलेला प्रश्न पाहण्यासाठी कोणत्याही अनलॉक केलेल्या नोडवर क्लिक करा.',
    panelHeader: 'या टप्प्यावरील प्रश्न',
    nodes: {
      intro: 'सुरुवात',
      id_check: 'ओळखपत्र पडताळणी',
      no_id_help: 'ओळखपत्र नाही',
      id_help: 'ओळखपत्र मदत',
      registration_step: 'नोंदणी',
      not_registered_help: 'नोंदणी मदत',
      campaign_step: 'मोहीम',
      voting_day: 'मतदानाचा दिवस',
      complete: 'नागरिक'
    }
  }
};

const treeNodes = [
  { id: 'intro', x: 50, y: 5 },
  { id: 'id_check', x: 50, y: 18 },
  { id: 'no_id_help', x: 25, y: 33 },
  { id: 'id_help', x: 75, y: 33 },
  { id: 'registration_step', x: 50, y: 48 },
  { id: 'not_registered_help', x: 75, y: 63 },
  { id: 'campaign_step', x: 50, y: 78 },
  { id: 'voting_day', x: 50, y: 92 },
  { id: 'complete', x: 50, y: 100 },
];

const treeEdges = [
  { from: 'intro', to: 'id_check' },
  { from: 'id_check', to: 'registration_step' },
  { from: 'id_check', to: 'no_id_help' },
  { from: 'id_check', to: 'id_help' },
  { from: 'no_id_help', to: 'registration_step' },
  { from: 'id_help', to: 'registration_step' },
  { from: 'registration_step', to: 'campaign_step' },
  { from: 'registration_step', to: 'not_registered_help' },
  { from: 'not_registered_help', to: 'campaign_step' },
  { from: 'campaign_step', to: 'voting_day' },
  { from: 'voting_day', to: 'complete' },
];

export default function RoadmapModal({ isOpen, onClose, currentNodeId, history }) {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  if (!isOpen) return null;

  // Build the user's path to determine unlocked nodes and active edges
  const fullPath = [...(history || []).map(h => h.nodeId), currentNodeId];
  const unlockedNodes = new Set(fullPath);
  
  const activeEdges = new Set();
  for (let i = 0; i < fullPath.length - 1; i++) {
    activeEdges.add(`${fullPath[i]}->${fullPath[i+1]}`);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)' }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-zinc-900 border border-white/10 rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[95vh] h-[850px] overflow-hidden flex flex-col relative"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-10 py-8 border-b border-white/10 bg-black/40 backdrop-blur-md z-20">
              <div className="space-y-1">
                <h2 className="text-3xl font-extrabold text-white tracking-tight leading-none">{t.title}</h2>
                <p className="text-zinc-400 text-sm font-medium">{t.subtitle}</p>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tree Area */}
            <div className="flex-1 overflow-y-auto relative bg-[#0a0a16] custom-scrollbar">
              <div className="relative w-full h-[1000px] min-h-[120%] py-20">
                
                {/* SVG Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  {treeEdges.map((edge, idx) => {
                    const fromNode = treeNodes.find(n => n.id === edge.from);
                    const toNode = treeNodes.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;
                    const isEdgeActive = activeEdges.has(`${edge.from}->${edge.to}`);
                    
                    return (
                      <motion.line 
                        key={idx}
                        x1={`${fromNode.x}%`} y1={`${fromNode.y}%`}
                        x2={`${toNode.x}%`} y2={`${toNode.y}%`}
                        stroke={isEdgeActive ? '#6366f1' : '#27272a'}
                        strokeWidth={isEdgeActive ? "4" : "2"}
                        strokeDasharray={isEdgeActive ? "0" : "6 6"}
                        initial={isEdgeActive ? { pathLength: 0 } : {}}
                        animate={isEdgeActive ? { pathLength: 1 } : {}}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                    );
                  })}
                </svg>

                {/* Nodes */}
                {treeNodes.map((node) => {
                  const isUnlocked = unlockedNodes.has(node.id);
                  const isActive = node.id === currentNodeId;
                  const isSelected = selectedNodeId === node.id;
                  const label = t.nodes[node.id] || node.id;

                  return (
                    <div 
                      key={node.id} 
                      className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                      <button
                        onClick={() => {
                          if (isUnlocked) setSelectedNodeId(node.id);
                        }}
                        className={`w-14 h-14 rounded-full border-[3px] flex items-center justify-center transition-all duration-300 relative ${
                          isActive ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.6)] scale-110 z-30' : 
                          isUnlocked ? 'bg-emerald-500/20 border-emerald-500/50 hover:bg-emerald-500/40 hover:scale-105 z-20' : 
                          'bg-zinc-800 border-zinc-700 cursor-not-allowed opacity-80 z-10'
                        } ${isSelected ? 'ring-4 ring-white/30' : ''}`}
                      >
                        {!isUnlocked ? <Lock size={20} className="text-zinc-500" /> :
                         isActive ? <MapPin size={24} className="text-white" /> : 
                         <CheckCircle size={24} className="text-emerald-400" />}

                        {/* Rahul Doll Indicator on Active Node */}
                        {isActive && (
                          <motion.div 
                            initial={{ scale: 0, y: -10, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            transition={{ type: 'spring', bounce: 0.5 }}
                            className="absolute -top-28 pointer-events-none"
                          >
                            <RahulDoll scale={0.25} isRegistered={fullPath.includes('registration_step')} isTalking={true} />
                          </motion.div>
                        )}
                      </button>
                      
                      <div className={`mt-3 text-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase transition-colors ${
                        isActive ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                        isUnlocked ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' :
                        'bg-zinc-800 text-zinc-500 border border-zinc-700'
                      }`}>
                        {label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Question Display Panel (Bottom) */}
            <AnimatePresence>
              {selectedNodeId && (
                <motion.div
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
                  transition={{ type: 'spring', bounce: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 bg-indigo-950/90 backdrop-blur-xl border-t border-indigo-500/30 p-6 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
                >
                  <button 
                    onClick={() => setSelectedNodeId(null)}
                    className="absolute top-4 right-4 text-indigo-300 hover:text-white bg-indigo-900/50 rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                  <div className="max-w-2xl mx-auto flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex flex-shrink-0 items-center justify-center border-2 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                      <MessageSquare size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">
                        {t.panelHeader}
                      </h4>
                      <p className="text-white text-lg font-medium leading-relaxed">
                        "{storyNodes[selectedNodeId]?.translations?.[language]?.text || storyNodes[selectedNodeId]?.text}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

