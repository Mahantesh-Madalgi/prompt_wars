import { useState, useEffect } from 'react';
import { Newspaper, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { cityNews as cityNewsFallback } from '../data/cityNews';

export default function CityNewsSidebar() {
  const { language } = useLanguage();
  const [city, setCity] = useState(() => localStorage.getItem('selectedPollingCity') || 'Pune');
  const [news, setNews] = useState({ Development: [], Issues: [], General: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const translations = {
    English: {
      localInsights: "Local Insights",
      syncing: "Syncing Intelligence...",
      feedError: "Feed Error",
      noSignals: "No signals detected",
      quietFeed: "The local feed is currently quiet for",
      infrastructure: "Infrastructure & Growth",
      criticalIssues: "Critical Issues",
      generalPulse: "General Pulse",
      gnewsLang: "en"
    },
    Hindi: {
      localInsights: "स्थानीय अंतर्दृष्टि",
      syncing: "इंटेलिजेंस सिंक हो रहा है...",
      feedError: "फ़ीड त्रुटि",
      noSignals: "कोई संकेत नहीं मिले",
      quietFeed: "स्थानीय फ़ीड वर्तमान में शांत है",
      infrastructure: "बुनियादी ढांचा और विकास",
      criticalIssues: "महत्वपूर्ण मुद्दे",
      generalPulse: "सामान्य नब्ज",
      gnewsLang: "hi"
    },
    Marathi: {
      localInsights: "स्थानिक अंतर्दृष्टी",
      syncing: "इंटेलिजन्स सिंक्रोनाइझ होत आहे...",
      feedError: "फीड त्रुटी",
      noSignals: "कोणतेही संकेत आढळले नाहीत",
      quietFeed: "स्थानिक फीड सध्या शांत आहे",
      infrastructure: "पायाभूत सुविधा आणि विकास",
      criticalIssues: "गंभीर समस्या",
      generalPulse: "सामान्य नाडी",
      gnewsLang: "mr"
    }
  };

  const t = translations[language];

  // Listen for city changes from other components
  useEffect(() => {
    const handleCityChange = () => {
      const newCity = localStorage.getItem('selectedPollingCity') || 'Pune';
      if (newCity !== city) {
        setCity(newCity);
      }
    };

    window.addEventListener('cityChanged', handleCityChange);
    window.addEventListener('storage', handleCityChange);

    return () => {
      window.removeEventListener('cityChanged', handleCityChange);
      window.removeEventListener('storage', handleCityChange);
    };
  }, [city]);

  useEffect(() => {
    const fetchNews = async () => {
      if (!city) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const apiKey = import.meta.env.VITE_GNEWS_API_KEY;
        if (!apiKey) {
          throw new Error("Missing GNews API Key");
        }

        const lang = t.gnewsLang;
        const response = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(city)}&lang=${lang}&country=in&max=10&apikey=${apiKey}`);
        
        if (!response.ok) {
          if (response.status === 429) {
            throw new Error("RATE_LIMIT");
          }
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const articles = data.articles || [];

        if (articles.length === 0) {
          throw new Error("EMPTY_RESPONSE");
        }

        // Categorize articles
        const categorized = { Development: [], Issues: [], General: [] };
        
        articles.forEach(article => {
          const text = (article.title + " " + article.description).toLowerCase();
          if (text.match(/infrastructure|build|launch|inaugurate|project|fund|growth|economy|develop|smart|विकास|पायाभूत/i)) {
            categorized.Development.push(article);
          } else if (text.match(/issue|problem|protest|crime|accident|scam|delay|water|electricity|pothole|traffic|समस्या|मुद्दे/i)) {
            categorized.Issues.push(article);
          } else {
            categorized.General.push(article);
          }
        });

        setNews(categorized);
      } catch (err) {
        // Only log to console if it's NOT a rate limit (to keep console clean)
        if (err.message !== "RATE_LIMIT" && err.message !== "EMPTY_RESPONSE") {
          console.error("Error fetching news:", err);
        }
        
        const isFallbackTrigger = err.message === "RATE_LIMIT" || 
                                 err.message === "EMPTY_RESPONSE" ||
                                 err.message.includes("429") || 
                                 err.message.includes("Missing");

        if (isFallbackTrigger) {
          // Try to get city-specific localized fallback
          const cityKey = city.toLowerCase();
          const cityData = cityNewsFallback[cityKey] || cityNewsFallback['maharashtra'];
          const localizedItems = cityData[language] || cityData['English'] || [];

          if (localizedItems.length === 0) {
            setError(`No data available for ${city}`);
          } else {
            const categorized = { Development: [], Issues: [], General: [] };
            localizedItems.forEach(item => {
              const article = {
                title: item.title,
                description: item.summary,
                url: '#',
                publishedAt: new Date().toISOString(),
              };
              if (item.type === 'development') categorized.Development.push(article);
              else if (item.type === 'issue') categorized.Issues.push(article);
              else categorized.General.push(article);
            });
            setNews(categorized);
            setError(null);
          }
        } else {
          setError(err.message || "Failed to load news.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [city, language]);

  const NewsSection = ({ title, articles, colorClass }) => {
    if (!articles || articles.length === 0) return null;
    
    return (
      <div style={{ marginBottom: '2.5rem' }} className="last:mb-0">
        <h3 className={`text-[11px] font-bold uppercase tracking-[0.18em] opacity-90 flex items-center gap-2 ${colorClass}`}
          style={{ marginBottom: '1rem' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
          {title}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {articles.map((article, idx) => (
            <motion.a
              key={idx}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div
                className="relative bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300 rounded-2xl border border-white/5 group-hover:border-white/10 shadow-lg hover:shadow-indigo-500/5"
                style={{ padding: '1.125rem 1.25rem' }}
              >
                <div className="flex justify-between items-start" style={{ gap: '0.75rem', marginBottom: '0.6rem' }}>
                  <h4 className="text-[13px] font-bold text-zinc-100 leading-snug group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <ExternalLink size={14} className="text-zinc-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0 flex-shrink-0 mt-0.5" />
                </div>

                <p className="text-[12px] text-zinc-400 leading-relaxed line-clamp-2" style={{ marginBottom: '0.875rem' }}>
                  {article.description}
                </p>

                <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                  <span>{new Date(article.publishedAt).toLocaleDateString(language === 'Hindi' ? 'hi-IN' : language === 'Marathi' ? 'mr-IN' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col h-full shadow-xl backdrop-blur-xl">
      <div className="px-6 py-5 border-b border-white/5 bg-zinc-900/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/20">
            <Newspaper size={18} className="text-indigo-400" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-white tracking-tight mb-0.5">{t.localInsights}</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] text-emerald-400/90 font-bold uppercase tracking-widest">{city}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar" style={{ padding: '1.75rem 1.5rem' }}>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full min-h-[200px] text-zinc-500"
            >
              <div className="relative w-12 h-12 mb-4">
                <Loader2 size={48} className="animate-spin text-indigo-500/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <Newspaper size={16} className="text-indigo-400" />
                </div>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{t.syncing}</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-start gap-4 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} className="text-red-400" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-red-300 mb-1">{t.feedError}</p>
                <p className="text-[11px] text-red-200/70 leading-relaxed">{error}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <NewsSection title={t.infrastructure} articles={news.Development} colorClass="text-emerald-400" />
              <NewsSection title={t.criticalIssues} articles={news.Issues} colorClass="text-rose-400" />
              <NewsSection title={t.generalPulse} articles={news.General} colorClass="text-indigo-400" />
              
              {news.Development.length === 0 && news.Issues.length === 0 && news.General.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                    <Newspaper size={24} className="text-zinc-600" />
                  </div>
                  <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t.noSignals}</p>
                  <p className="text-[11px] text-zinc-600 mt-1 max-w-[150px] leading-relaxed">{t.quietFeed} {city}.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}} />
    </div>
  );
}
