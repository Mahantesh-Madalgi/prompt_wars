// src/pages/Dashboard.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, MessageSquare, Map, BookOpen, LogOut, User, Sparkles, ShieldAlert, ChevronRight, ChevronDown, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import GlowButton from '../components/GlowButton';
import StoryCard from '../components/StoryCard';
import VoterReadiness from '../components/VoterReadiness';
import RahulDoll from '../components/RahulDoll';
import ChatInterface from '../components/ChatInterface';
import PollingStationsCard from '../components/PollingStationsCard';
import CityNewsSidebar from '../components/CityNewsSidebar';
import CandidateCompare from '../components/CandidateCompare';
import ManifestoView from '../components/ManifestoView';
import RoadmapModal from '../components/RoadmapModal';
import { storyNodes, milestones } from '../data/storyData';

const quickActions = [
  { icon: MessageSquare, label: { English: 'Ask AI', Hindi: 'एआई से पूछें', Marathi: 'AI ला विचारा' },           desc: { English: 'Chat with Gemini about any election topic', Hindi: 'किसी भी चुनाव विषय पर जेमिनी के साथ चैट करें', Marathi: 'कोणत्याही निवडणूक विषयावर जेमिनीशी चॅट करा' },      color: '#6366f1', targetId: 'section-chat'     },
  { icon: Map,           label: { English: 'Find Polling Place', Hindi: 'मतदान केंद्र खोजें', Marathi: 'मतदान केंद्र शोधा' }, desc: { English: 'Locate your nearest voting location', Hindi: 'अपने निकटतम मतदान स्थान का पता लगाएं', Marathi: 'तुमचे जवळचे मतदान केंद्र शोधा' },             color: '#8b5cf6', targetId: 'map-section'      },
  { icon: BookOpen,      label: { English: 'Voter Guide', Hindi: 'मतदाता मार्गदर्शिका', Marathi: 'मतदार मार्गदर्शिका' },        desc: { English: 'Explore candidates and ballot measures', Hindi: 'उम्मीदवारों और मतपत्र उपायों का अन्वेषण करें', Marathi: 'उमेदवार आणि मतपत्रिका उपयांचा शोध घ्या' },          color: '#a78bfa', targetId: 'section-journey'  },
  { icon: Vote,          label: { English: 'My Ballot', Hindi: 'मेरा मतपत्र', Marathi: 'माझे मतपत्र' },          desc: { English: "See your voter readiness progress", Hindi: "अपनी मतदाता तत्परता प्रगति देखें", Marathi: "तुमची मतदार सज्जता प्रगती पहा" },               color: '#e879f9', targetId: 'section-readiness'},
];

const dashboardTranslations = {
  English: {
    welcome: "Welcome back",
    myJourney: "My Journey",
    chatHistory: "Chat History",
    pollingStations: "Polling Stations",
    signOut: "Sign Out",
    journeyTitle: "Your Journey with Rahul",
    voterReadiness: "Voter Readiness",
    quickActions: "Quick Actions",
    askAI: "Ask the AI",
    talkToRahul: "Talk to Rahul",
    offlineMode: "Offline Mode",
    connectionInterrupted: "Connection Interrupted",
    syncDisabled: "Sync is disabled. Please disable AdBlockers or VPN for real-time cloud sync.",
    synchronizing: "Synchronizing Journey...",
    profile: "Profile",
    localNewsTitle: "Local Development & Issues",
    localNewsDesc: "City-specific news from your area.",
    continueToVoting: "Continue to Voting Day",
  },
  Hindi: {
    welcome: "वापसी पर स्वागत है",
    myJourney: "मेरी यात्रा",
    chatHistory: "चैट इतिहास",
    pollingStations: "मतदान केंद्र",
    signOut: "साइन आउट",
    journeyTitle: "राहुल के साथ आपकी यात्रा",
    voterReadiness: "मतदाता तत्परता",
    quickActions: "त्वरित कार्रवाई",
    askAI: "एआई से पूछें",
    talkToRahul: "राहुल से बात करें",
    offlineMode: "ऑफलाइन मोड",
    connectionInterrupted: "कनेक्शन बाधित",
    syncDisabled: "सिंक अक्षम है। रीयल-टाइम क्लाउड सिंक के लिए कृपया एडब्लॉकर या वीपीएन अक्षम करें।",
    synchronizing: "यात्रा सिंक्रनाइज़ हो रही है...",
    profile: "प्रोफ़ाइल",
    localNewsTitle: "स्थानीय विकास और मुद्दे",
    localNewsDesc: "आपके क्षेत्र की शहर-विशिष्ट समाचार।",
    continueToVoting: "वोटिंग के दिन तक जारी रखें",
  },
  Marathi: {
    welcome: "परत स्वागत आहे",
    myJourney: "माझा प्रवास",
    chatHistory: "चॅट इतिहास",
    pollingStations: "मतदान केंद्रे",
    signOut: "साइन आउट",
    journeyTitle: "राहुलसोबत तुमचा प्रवास",
    voterReadiness: "मतदार सज्जता",
    quickActions: "त्वरित कृती",
    askAI: "AI ला विचारा",
    talkToRahul: "राहुलशी बोला",
    offlineMode: "ऑफलाइन मोड",
    connectionInterrupted: "कनेक्शन खंडित झाले",
    syncDisabled: "सिंक अक्षम आहे. रिअल-टाइम क्लाउड सिंकसाठी कृपया अ‍ॅडब्लॉकर किंवा व्हीपीएन अक्षम करा.",
    synchronizing: "प्रवास सिंक्रोनाइझ होत आहे...",
    profile: "प्रोफाइल",
    localNewsTitle: "स्थानिक विकास आणि प्रश्न",
    localNewsDesc: "तुमच्या भागातील शहर-विशिष्ट बातम्या.",
    continueToVoting: "मतदानाच्या दिवसाकडे पुढे जा",
  }
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState('intro');
  const [completedMilestones, setCompletedMilestones] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isRahulTalking, setIsRahulTalking] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  // 'compare' | 'local_news' | 'manifesto' | null
  const [activeResearchPanel, setActiveResearchPanel] = useState(null);

  // Load progress from Firestore with improved error handling
  useEffect(() => {
    if (!user) return;
    
    // Debug log to confirm file update
    console.log("[Dashboard] Initializing v1.2.2 (Added History Support)");

    const loadProgress = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef).catch(err => {
          if (err.message?.includes('offline') || err.code === 'unavailable' || err.message?.includes('blocked')) {
            setIsBlocked(true);
          }
          return null; 
        });

        if (userDoc && userDoc.exists()) {
          const data = userDoc.data();
          if (data.currentNodeId) setCurrentNodeId(data.currentNodeId);
          if (data.completedMilestones) setCompletedMilestones(data.completedMilestones);
          if (data.history) setHistory(data.history);
        }
      } catch (err) {
        setIsBlocked(true);
      } finally {
        setLoading(false);
      }
    };

    if (!navigator.onLine) setIsBlocked(true);
    loadProgress();
  }, [user]);

  const handleChoice = async (nextNodeId, milestoneKey, action) => {
    if (!user) return;

    // Handle research panel actions — do NOT advance node, just show panel
    if (action === 'show_candidate_compare') {
      setActiveResearchPanel('compare');
      return;
    } else if (action === 'show_local_news') {
      setActiveResearchPanel('local_news');
      return;
    } else if (action === 'show_manifesto') {
      setActiveResearchPanel('manifesto');
      return;
    }

    // Handle map/NVSP actions
    if (action === 'open_nvsp') {
      window.open('https://voters.eci.gov.in/', '_blank');
    } else if (action === 'show_reg_center') {
      window.dispatchEvent(new CustomEvent('showMapMarker', { detail: { type: 'registration_center' } }));
      document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'show_polling_booth') {
      window.dispatchEvent(new CustomEvent('showMapMarker', { detail: { type: 'polling_booth' } }));
      document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
    }

    // Save current state to history before changing
    const newHistory = [...history, { nodeId: currentNodeId, milestones: completedMilestones }];

    const newMilestones = milestoneKey && !completedMilestones.includes(milestoneKey)
      ? [...completedMilestones, milestoneKey]
      : completedMilestones;

    setCurrentNodeId(nextNodeId);
    setCompletedMilestones(newMilestones);
    setHistory(newHistory);

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        currentNodeId: nextNodeId,
        completedMilestones: newMilestones,
        history: newHistory,
        lastUpdated: new Date().toISOString()
      }, { merge: true }).catch(() => {
        setIsBlocked(true);
      });
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  const handleBack = async () => {
    if (history.length === 0 || !user) return;

    const prevHistory = [...history];
    const prevState = prevHistory.pop();

    setCurrentNodeId(prevState.nodeId);
    setCompletedMilestones(prevState.milestones);
    setHistory(prevHistory);

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        currentNodeId: prevState.nodeId,
        completedMilestones: prevState.milestones,
        history: prevHistory,
        lastUpdated: new Date().toISOString()
      }, { merge: true }).catch(() => {
        setIsBlocked(true);
      });
    } catch (err) {
      console.error('Error reverting progress:', err);
    }
  };

  const currentNode = storyNodes[currentNodeId] || storyNodes.intro;

  if (loading) {
    return (
      <div className="loading-screen bg-zinc-950 flex flex-col items-center justify-center min-h-screen">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full mb-4"
        />
        <p className="text-zinc-500 font-medium tracking-widest uppercase text-xs">{dashboardTranslations[language].synchronizing}</p>
      </div>
    );
  }

  const t = dashboardTranslations[language];

  return (
    <div className="dashboard">
      {/* Sidebar - Corrected and Polished */}
      <aside className="sidebar">
        <div className="sidebar__brand">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Vote size={18} className="text-white" />
          </div>
          <span className="font-bold tracking-tight">ElectionGuide AI</span>
        </div>

        <nav className="sidebar__nav">
          <button className="sidebar__nav-item" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
            <User size={18} className="text-indigo-400" /> {t.profile}
          </button>
          <button className="sidebar__nav-item" onClick={() => setIsRoadmapOpen(true)}>
            <Vote size={18} /> {t.myJourney}
          </button>
          <button className="sidebar__nav-item" onClick={() => {
            setIsChatActive(true);
            document.getElementById('section-chat')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}>
            <MessageSquare size={18} /> {t.chatHistory}
          </button>
          <button className="sidebar__nav-item" onClick={() => {
            document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}>
            <Map size={18} /> {t.pollingStations}
          </button>
        </nav>

        <div className="sidebar__footer">
           <div className="sidebar__user">
             {user?.photoURL ? (
               <img src={user.photoURL} alt="Avatar" className="sidebar__avatar" />
             ) : (
               <div className="sidebar__avatar sidebar__avatar--placeholder">
                 <User size={16} />
               </div>
             )}
             <div className="sidebar__user-info">
               <p className="sidebar__user-name">{user?.displayName || 'Voter'}</p>
               <p className="sidebar__user-email">{user?.email}</p>
             </div>
           </div>
           <button onClick={logout} className="sidebar__logout">
             <LogOut size={16} /> {t.signOut}
           </button>
        </div>
      </aside>

      {/* Two-column layout: main content + news sidebar */}
      <div className="flex flex-1 min-w-0 gap-6">
      <main className="dashboard__main flex-1 min-w-0">
        {/* AdBlocker / Blocked Notice */}
        <AnimatePresence>
          {isBlocked && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: 'auto', opacity: 1, marginBottom: 24 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              className="bg-amber-500/10 border border-amber-500/20 rounded-2xl px-6 py-3 flex items-center justify-between gap-3 overflow-hidden shadow-xl shadow-amber-500/5"
            >
              <div className="flex items-center gap-3">
                <ShieldAlert size={18} className="text-amber-500" />
                <div>
                  <p className="text-xs font-bold text-amber-200 uppercase tracking-widest">{t.connectionInterrupted}</p>
                  <p className="text-[11px] text-amber-200/60 font-medium">
                    {t.syncDisabled}
                  </p>
                </div>
              </div>
              <div className="px-2 py-1 bg-amber-500/20 rounded-md text-[10px] font-black text-amber-500 uppercase tracking-tighter">
                {t.offlineMode}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.header
          className="dashboard__header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="dashboard__greeting">
                {t.welcome}, {user?.displayName?.split(' ')[0] || 'Voter'} 👋
              </h1>
            </div>
            <p className="dashboard__date">
              {new Date().toLocaleDateString(language === 'Hindi' ? 'hi-IN' : language === 'Marathi' ? 'mr-IN' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group min-w-[140px] justify-between"
            >
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-indigo-400" />
                <span className="text-xs font-bold tracking-widest text-white uppercase">{language}</span>
              </div>
              <ChevronDown size={14} className={`text-zinc-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-full bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  {['English', 'Hindi', 'Marathi'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors hover:bg-white/5 ${language === lang ? 'text-indigo-400 bg-indigo-500/5' : 'text-zinc-400'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>

        {/* Journey Section */}
        <div className="dashboard__grid">
          <motion.section
            id="section-journey"
            className="dashboard__section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="dashboard__section-title">{t.journeyTitle}</h2>
            <div className="story-container">
              <AnimatePresence mode="wait">
                <StoryCard node={currentNode} onChoice={handleChoice} onBack={handleBack} hasHistory={history.length > 0} />
              </AnimatePresence>
            </div>

            {/* Research Panels — only shown during campaign_step */}
            <AnimatePresence mode="wait">
              {currentNodeId === 'campaign_step' && activeResearchPanel === 'compare' && (
                <CandidateCompare
                  key="compare"
                  onContinue={() => {
                    setActiveResearchPanel(null);
                    handleChoice('voting_day', 'candidates_researched', null);
                  }}
                />
              )}
              {currentNodeId === 'campaign_step' && activeResearchPanel === 'local_news' && (
                <motion.div
                  key="local_news"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8 bg-white/5 border border-white/10 rounded-[2rem] p-6 shadow-xl backdrop-blur-xl"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{t.localNewsTitle}</h2>
                      <p className="text-zinc-400 text-sm">{t.localNewsDesc}</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveResearchPanel(null);
                        handleChoice('voting_day', 'candidates_researched', null);
                      }}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-colors flex items-center gap-2"
                    >
                      {t.continueToVoting} <ChevronRight size={18} />
                    </button>
                  </div>
                  <div className="h-[600px]">
                    <CityNewsSidebar />
                  </div>
                </motion.div>
              )}
              {currentNodeId === 'campaign_step' && activeResearchPanel === 'manifesto' && (
                <ManifestoView
                  key="manifesto"
                  onContinue={() => {
                    setActiveResearchPanel(null);
                    handleChoice('voting_day', 'candidates_researched', null);
                  }}
                />
              )}
            </AnimatePresence>
          </motion.section>

          <motion.section
            id="section-readiness"
            className="dashboard__section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="dashboard__section-title">{t.voterReadiness}</h2>
            <VoterReadiness 
              milestones={milestones} 
              completedMilestones={completedMilestones} 
            />
          </motion.section>
        </div>

        {/* Quick actions grid */}
        <motion.section
          className="dashboard__section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="dashboard__section-title">{t.quickActions}</h2>
          <div className="dashboard__actions-grid">
            {quickActions.map(({ icon: Icon, label, desc, color, targetId }, i) => (
              <motion.button
                key={label.English}
                className="action-card text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => {
                  if (label.English === 'Ask AI') {
                    setIsChatActive(true);
                  }
                  const el = document.getElementById(targetId);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <div className="action-card__icon" style={{ '--card-color': color }}>
                  <Icon size={22} />
                </div>
                <h3 className="action-card__label">{label[language]}</h3>
                <p className="action-card__desc">{desc[language]}</p>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Polling Stations Leaflet Section */}
        <PollingStationsCard />

        {/* AI Chat Embedded Section */}
        <motion.section
          id="section-chat"
          className="dashboard__section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="dashboard__section-title">{t.askAI}</h2>
          
          <div className="relative min-h-[400px] bg-white/5 rounded-[2rem] border border-white/10 p-8 overflow-hidden">
            <AnimatePresence mode="wait">
              {!isChatActive ? (
                <motion.div 
                  key="teaser"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="chat-teaser flex flex-col md:flex-row items-center gap-8"
                >
                  <div className="flex-shrink-0 -ml-16 -mr-16">
                     <RahulDoll 
                       isRegistered={completedMilestones.includes('registered')} 
                       scale={0.45} 
                       isTalking={isRahulTalking}
                     />
                  </div>
                  <div className="flex-1">
                    <div className="chat-teaser__content mb-4">
                      <Sparkles size={24} className="chat-teaser__icon text-indigo-400" />
                      <p className="chat-teaser__prompt text-lg">
                        ✨ {language === 'Hindi' ? '"मेरे राज्य में सीनेट के लिए चुनाव लड़ने वाले उम्मीदवारों के बीच मुख्य अंतर क्या हैं?"' : language === 'Marathi' ? '"माझ्या राज्यातील सिनेट निवडणुकीसाठी उभ्या असलेल्या उमेदवारांमधील मुख्य फरक काय आहेत?"' : '"What are the key differences between the candidates running for Senate in my state?"'}
                      </p>
                    </div>
                    <GlowButton 
                      id="btn-open-chat" 
                      icon={MessageSquare} 
                      variant="primary"
                      onClick={() => setIsChatActive(true)}
                    >
                      {t.talkToRahul}
                    </GlowButton>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="active-chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col md:flex-row items-start gap-8"
                >
                  <div className="hidden md:block flex-shrink-0 -ml-20 -mr-20 sticky top-0">
                     <RahulDoll 
                       isRegistered={completedMilestones.includes('registered')} 
                       scale={0.4} 
                       isTalking={isRahulTalking}
                     />
                  </div>
                  <div className="flex-1 w-full">
                    <ChatInterface 
                      onClose={() => setIsChatActive(false)} 
                      onTalkingStateChange={setIsRahulTalking}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </main>

      {/* Right News Sidebar */}
      <aside className="hidden xl:flex flex-col w-[360px] flex-shrink-0 py-6 pr-6">
        <div className="sticky top-6 h-[calc(100vh-3rem)]">
          <CityNewsSidebar />
        </div>
      </aside>
      </div>

      <RoadmapModal 
        isOpen={isRoadmapOpen} 
        onClose={() => setIsRoadmapOpen(false)} 
        currentNodeId={currentNodeId} 
        history={history} 
      />
    </div>
  );
}
