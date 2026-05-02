// src/components/ChatInterface.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mic, MicOff, Volume2, Sparkles, MessageSquare, Activity, Undo2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ShinyText from './ShinyText';

export default function ChatInterface({ onClose, onTalkingStateChange }) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [messages, setMessages] = useState([
    { 
      role: 'model', 
      content: language === 'Hindi' 
        ? 'नमस्ते! मैं राहुल हूँ। मैं आपकी कैसे मदद कर सकता हूँ?' 
        : language === 'Marathi'
        ? 'नमस्कार! मी राहुल आहे. मी तुम्हाला निवडणुकीत कशी मदत करू शकतो?'
        : 'Hi! I\'m Rahul. How can I help you with the election today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // checking, online, offline
  const scrollRef = useRef(null);

  // Check backend health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/health`);
        if (res.ok) setBackendStatus('online');
        else setBackendStatus('offline');
      } catch (err) {
        setBackendStatus('offline');
      }
    };
    checkHealth();
  }, []);

  // Web Speech API: Text-to-Speech
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'Hindi' ? 'hi-IN' : language === 'Marathi' ? 'mr-IN' : 'en-US';
    utterance.onstart = () => onTalkingStateChange(true);
    utterance.onend = () => onTalkingStateChange(false);
    window.speechSynthesis.speak(utterance);
  };

  // Web Speech API: Speech-to-Text
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'Hindi' ? 'hi-IN' : language === 'Marathi' ? 'mr-IN' : 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.start();
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          userId: user?.uid,
          history: messages.slice(-5), // Send last 5 messages for context
          language
        })
      });

      if (!response.ok) throw new Error('Backend unreachabe');

      const data = await response.json();
      if (data.success) {
        const aiMsg = { role: 'model', content: data.reply };
        setMessages(prev => [...prev, aiMsg]);
        speak(data.reply);
      }
    } catch (err) {
      console.error('Chat error (Gemini Connection):', err);
      const errorMsg = { 
        role: 'model', 
        content: language === 'Hindi' 
          ? "माफ़ कीजिये, मैं अभी कनेक्ट नहीं हो पा रहा हूँ। कृपया सुनिश्चित करें कि बैकएंड सर्वर चल रहा है।" 
          : language === 'Marathi'
          ? "क्षमस्व, मी सध्या कनेक्ट होऊ शकत नाही. कृपया बॅकएंड सर्व्हर चालू असल्याची खात्री करा."
          : "I'm having trouble connecting to my Gemini brain. Please ensure the backend server is running on port 5000!" 
      };
      setMessages(prev => [...prev, errorMsg]);
      setBackendStatus('offline');
    } finally {
      setIsTyping(false);
    }
  };

  const handleBack = () => {
    if (messages.length <= 1 || isTyping) return;
    setMessages(prev => {
      if (prev[prev.length - 1].role === 'model') {
        return prev.slice(0, -2);
      }
      return prev.slice(0, -1);
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col h-[70vh] min-h-[500px] max-h-[750px] w-full bg-black/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
    >
      {/* Mini Header */}
      <div className="px-7 py-5 border-b border-white/5 flex items-center justify-between bg-zinc-900/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center">
            <Sparkles size={16} className="text-indigo-400" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">AI Intelligence</span>
            <span className="text-xs font-bold text-white tracking-tight">Rahul v1.2.2</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full border ${
            backendStatus === 'online' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
            backendStatus === 'offline' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
            'bg-zinc-500/10 border-zinc-500/20 text-zinc-400'
          }`}>
            <Activity size={10} className={backendStatus === 'online' ? 'animate-pulse' : ''} />
            <span className="text-[9px] font-black uppercase tracking-tighter">
              {backendStatus === 'online' ? (language === 'Hindi' ? 'जेमिनी लाइव' : language === 'Marathi' ? 'जेमिनी लाईव्ह' : 'Gemini Live') : 
               backendStatus === 'offline' ? (language === 'Hindi' ? 'इंजन ऑफलाइन' : language === 'Marathi' ? 'इंजिन ऑफलाइन' : 'Engine Offline') : 
               'Syncing...'}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-all text-zinc-500 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-7 space-y-8 custom-scrollbar"
      >
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[82%] px-5 py-4 rounded-[1.25rem] text-[14px] leading-relaxed shadow-sm tracking-wide ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-tr-sm shadow-indigo-500/10' 
                : 'bg-white/[0.03] hover:bg-white/[0.05] transition-colors text-zinc-200 border border-white/10 rounded-tl-sm'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
              <div className="bg-white/[0.03] px-5 py-4 rounded-[1.25rem] rounded-tl-sm border border-white/10 flex items-center gap-4 shadow-sm">
              <div className="flex gap-1">
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
              </div>
              <ShinyText 
                text={language === 'Hindi' ? 'राहुल सोच रहा है...' : language === 'Marathi' ? 'राहुल विचार करत आहे...' : "Rahul is thinking..."} 
                speed={2} 
                className="text-[10px] font-bold uppercase tracking-widest opacity-60" 
              />
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-5 bg-zinc-900/40 border-t border-white/5">
        <form onSubmit={handleSend} className="bg-white/5 border border-white/10 rounded-[1.25rem] p-2 flex items-center gap-3 focus-within:border-indigo-500/50 focus-within:bg-white/[0.08] transition-all shadow-sm">
          <button 
            type="button"
            onClick={startListening}
            className={`p-3.5 rounded-xl transition-all ${
              isListening ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-zinc-500 hover:text-white hover:bg-white/10'
            }`}
          >
            <Mic size={18} />
          </button>

          <button 
            type="button"
            onClick={handleBack}
            disabled={messages.length <= 1 || isTyping}
            title={language === 'Hindi' ? 'पिछला प्रश्न' : language === 'Marathi' ? 'मागील प्रश्न' : 'Previous question'}
            className="p-3.5 text-zinc-500 hover:text-white hover:bg-white/10 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <Undo2 size={18} />
          </button>
          
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === 'Hindi' ? 'राहुल से कुछ पूछें...' : language === 'Marathi' ? 'राहुलला काहीही विचारा...' : 'Ask Rahul anything...'}
            className="flex-1 bg-transparent border-none px-3 py-3 text-[15px] text-white placeholder-zinc-500 focus:outline-none"
          />
          
          <button 
            type="submit"
            disabled={!input.trim() || isTyping || backendStatus === 'offline'}
            className="p-3.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-50 disabled:grayscale transition-all shadow-md shadow-indigo-600/20"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-[10px] text-center text-zinc-500 mt-4 font-bold uppercase tracking-widest">
          Powered by Gemini 2.5 Flash · Multilingual Support
        </p>
      </div>
    </motion.div>
  );
}
