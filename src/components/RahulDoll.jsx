import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';

const translations = {
  English: { verified: 'VERIFIED VOTER', guest: 'GUEST' },
  Hindi: { verified: 'सत्यापित मतदाता', guest: 'अतिथि' },
  Marathi: { verified: 'सत्यापित मतदार', guest: 'पाहुणे' }
};

const glassicGlossyStyle = {
  plasticSkin: "radial-gradient(circle at 35% 30%, #ffdfc4 0%, #ffccaa 50%, #e6a885 100%)",
  plasticHair: "linear-gradient(135deg, #444 0%, #111 60%, #000 100%)",
  vinylPupil: "radial-gradient(circle at 30% 30%, #222222 0%, #111111 60%, #000000 100%)"
};

const HairStrand = ({ className, delay = 0, style }) => (
  <motion.div 
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`absolute bg-[#1a1a1a] origin-top ${className}`}
    style={{ 
      clipPath: "polygon(50% 100%, 0 0, 100% 0)", 
      background: "linear-gradient(180deg, #2a2a2a 0%, #000 100%)",
      ...style 
    }}
  />
);

export default function RahulDoll({ isRegistered = false, scale = 1, isTalking = false }) {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const dollRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      setMousePos({ x: clientX, y: clientY });

      if (!dollRef.current) return;
      const rect = dollRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const xPercent = (clientX - centerX) / (window.innerWidth / 2);
      const yPercent = (clientY - centerY) / (window.innerHeight / 2);

      const maxRotation = 12; 
      setRotate({ 
        x: yPercent * maxRotation * -1, 
        y: xPercent * maxRotation 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const pupilPos = (() => {
    if (!dollRef.current) return { x: 0, y: 0 };
    const rect = dollRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
    return { x: Math.cos(angle) * 4, y: Math.sin(angle) * 4 };
  })();

  return (
    <motion.div 
      style={{ scale }} 
      className="flex items-center justify-center"
    >
      <div 
        ref={dollRef} 
        className="relative flex flex-col items-center justify-center p-6 bg-transparent w-80 h-[28rem]"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          className="relative flex flex-col items-center"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateX: rotate.x, rotateY: rotate.y }}
          transition={{ type: 'spring', stiffness: 70, damping: 20 }}
        >
          
          {/* HAIR - Advanced Sculpted Sections */}
          <div className="absolute -top-12 z-0 w-48 h-40" style={{ transform: 'translateZ(-10px)', transformStyle: 'preserve-3d' }}>
            {/* Main Volume */}
            <div 
              className="w-full h-32 rounded-t-[4.5rem] rounded-b-[2rem] relative" 
              style={{ 
                background: "radial-gradient(circle at 50% 0%, #333 0%, #000 100%)", 
                boxShadow: 'inset 0 -20px 40px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5)' 
              }}
            >
              {/* Top Spikes */}
              <HairStrand className="w-12 h-10 -top-4 left-4 -rotate-12" />
              <HairStrand className="w-16 h-12 -top-6 left-16 rotate-6" />
              <HairStrand className="w-12 h-8 -top-3 right-6 rotate-15" />
              
              {/* Front Bangs Layer 1 (Back) */}
              <div className="absolute -bottom-4 left-0 right-0 flex justify-around px-1" style={{ transform: 'translateZ(15px)' }}>
                <HairStrand className="w-10 h-14 rotate-[-10deg]" />
                <HairStrand className="w-12 h-16 rotate-[5deg]" />
                <HairStrand className="w-9 h-12 rotate-[15deg]" />
                <HairStrand className="w-11 h-14 rotate-[-5deg]" />
              </div>

              {/* Front Bangs Layer 2 (Detailed Strands) */}
              <div className="absolute -bottom-6 left-2 right-2 flex justify-center gap-1" style={{ transform: 'translateZ(25px)' }}>
                <HairStrand className="w-8 h-12 rotate-[-20deg]" delay={0.1} />
                <HairStrand className="w-10 h-16 rotate-[-5deg]" delay={0.2} />
                <HairStrand className="w-7 h-10 rotate-[20deg]" delay={0.3} />
              </div>
            </div>
          </div>

          {/* HEAD */}
          <div 
            className="relative w-44 h-38 rounded-[3.5rem] flex flex-col items-center pt-12"
            style={{
              background: glassicGlossyStyle.plasticSkin,
              boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 -12px 20px rgba(0,0,0,0.2), inset 10px 10px 25px rgba(255,255,255,0.3)',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(10px)'
            }}
          >
            {/* GLASSES */}
            <div className="relative flex items-center justify-center gap-4 z-10" style={{ transform: 'translateZ(35px)' }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-2 bg-[#1a1a1a] rounded-full" />
              
              {/* Left Eye */}
              <div className="w-16 h-16 rounded-full border-[7px] border-[#1a1a1a] bg-[#000]/10 flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
                <motion.div 
                  className="w-7 h-7 rounded-full relative"
                  style={{ background: glassicGlossyStyle.vinylPupil }}
                  animate={{ x: pupilPos.x, y: pupilPos.y }}
                >
                  <div className="absolute top-1 right-1.5 w-2 h-2 bg-white rounded-full opacity-30 blur-[0.5px]" />
                </motion.div>
              </div>

              {/* Right Eye */}
              <div className="w-16 h-16 rounded-full border-[7px] border-[#1a1a1a] bg-[#000]/10 flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
                <motion.div 
                  className="w-7 h-7 rounded-full relative"
                  style={{ background: glassicGlossyStyle.vinylPupil }}
                  animate={{ x: pupilPos.x, y: pupilPos.y }}
                >
                  <div className="absolute top-1 right-1.5 w-2 h-2 bg-white rounded-full opacity-30 blur-[0.5px]" />
                </motion.div>
              </div>
            </div>

            {/* NOSE */}
            <div 
              className="w-3 h-2 bg-[#e6a885] rounded-full mt-3 shadow-inner"
              style={{ transform: 'translateZ(45px)' }}
            />

            {/* MOUTH */}
            <div className="mt-4 z-10" style={{ transform: 'translateZ(20px)' }}>
              <AnimatePresence mode="wait">
                {isTalking ? (
                  <motion.div 
                    key="talking"
                    animate={{ scaleY: [1, 2.5, 1], scaleX: [1, 1.1, 1] }}
                    transition={{ duration: 0.15, repeat: Infinity }}
                    className="w-8 h-4 bg-[#4a2a15] rounded-full"
                  />
                ) : isRegistered ? (
                  <motion.div 
                    key="smile"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    className="w-12 h-4 border-b-4 border-[#4a2a15] rounded-full"
                  />
                ) : (
                  <motion.div 
                    key="line"
                    className="w-6 h-0.5 bg-[#4a2a15] rounded-full opacity-60"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* BODY */}
          <div 
            className="w-20 h-28 mt-[-10px] rounded-t-[1.2rem] flex flex-col items-center pt-2"
            style={{
              background: 'linear-gradient(180deg, #4f46e5 0%, #2e1065 100%)',
              boxShadow: '0 15px 30px rgba(0,0,0,0.4), inset 0 5px 15px rgba(255,255,255,0.1)',
              transform: 'translateZ(-5px)'
            }}
          >
            {/* Hands */}
            <div className="flex justify-between w-full px-1 mt-10">
              <div className="w-5 h-5 rounded-full bg-[#ffdfc4] shadow-md" />
              <div className="w-5 h-5 rounded-full bg-[#ffdfc4] shadow-md" />
            </div>

            {/* Badge */}
            <div className="mt-auto mb-4 bg-white/10 px-3 py-1 rounded-full border border-white/20 text-[8px] font-black text-white uppercase tracking-widest">
              {isRegistered ? t.verified : t.guest}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

