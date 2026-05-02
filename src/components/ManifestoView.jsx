import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const translations = {
  English: {
    title: 'Party Manifestos',
    subtitle: 'Read the officially published promises from each party.',
    continueBtn: 'Continue to Voting Day',
    highlights: 'Manifesto Highlights',
    manifestos: {
      'Party A': [
        'Increase healthcare budget by 15% over the next 5 years.',
        'Build 50 new primary schools in rural areas.',
        'Implement a strict zero-tolerance anti-corruption policy.'
      ],
      'Party B': [
        'Subsidize electricity up to 200 units for lower-income households.',
        'Generate 1 million jobs through local manufacturing incentives.',
        'Upgrade city public transport with 500 electric buses.'
      ],
      'Independent': [
        'Focus on environmental sustainability and banning single-use plastics.',
        'Increase transparency by publishing all municipal contracts online.',
        'Enhance local police patrolling for better neighborhood security.'
      ]
    }
  },
  Hindi: {
    title: 'पार्टी घोषणापत्र',
    subtitle: 'प्रत्येक पार्टी के आधिकारिक रूप से प्रकाशित वादों को पढ़ें।',
    continueBtn: 'वोटिंग के दिन तक जारी रखें',
    highlights: 'घोषणापत्र की मुख्य विशेषताएं',
    manifestos: {
      'Party A': [
        'अगले 5 वर्षों में स्वास्थ्य बजट में 15% की वृद्धि करें।',
        'ग्रामीण क्षेत्रों में 50 नए प्राथमिक स्कूल बनाएं।',
        'कठोर भ्रष्टाचार विरोधी नीति लागू करें।'
      ],
      'Party B': [
        'कम आय वाले परिवारों के लिए 200 यूनिट तक बिजली सब्सिडी दें।',
        'स्थानीय विनिर्माण प्रोत्साहनों के माध्यम से 10 लाख नौकरियां पैदा करें।',
        '500 इलेक्ट्रिक बसों के साथ शहर के सार्वजनिक परिवहन को अपग्रेड करें।'
      ],
      'Independent': [
        'पर्यावरणीय स्थिरता और एकल-उपयोग प्लास्टिक पर प्रतिबंध लगाने पर ध्यान दें।',
        'सभी नगर निगम अनुबंधों को ऑनलाइन प्रकाशित करके पारदर्शिता बढ़ाएं।',
        'बेहतर पड़ोस सुरक्षा के लिए स्थानीय पुलिस गश्त बढ़ाएं।'
      ]
    }
  },
  Marathi: {
    title: 'पक्ष जाहीरनामा',
    subtitle: 'प्रत्येक पक्षाने अधिकृतपणे प्रसिद्ध केलेली आश्वासने वाचा.',
    continueBtn: 'मतदानाच्या दिवसासाठी पुढे जा',
    highlights: 'जाहीरनाम्यातील ठळक मुद्दे',
    manifestos: {
      'Party A': [
        'पुढील ५ वर्षांत आरोग्य बजेटमध्ये १५% वाढ करा.',
        'ग्रामीण भागात ५० नवीन प्राथमिक शाळा बांधा.',
        'भ्रष्टाचारविरोधी कडक धोरण राबवा.'
      ],
      'Party B': [
        'कमी उत्पन्न असलेल्या कुटुंबांसाठी २०० युनिटपर्यंत वीज सवलत द्या.',
        'स्थानिक उत्पादन प्रोत्साहनांद्वारे १० लाख रोजगार निर्माण करा.',
        '५०० इलेक्ट्रिक बससह शहराची सार्वजनिक वाहतूक सुधारा.'
      ],
      'Independent': [
        'पर्यावरणीय स्थिरता आणि एकेरी वापरल्या जाणाऱ्या प्लास्टिकवर बंदी घालण्यावर लक्ष केंद्रित करा.',
        'सर्व महानगरपालिका कंत्राट ऑनलाइन प्रसिद्ध करून पारदर्शकता वाढवा.',
        'चांगल्या परिसर सुरक्षेसाठी स्थानिक पोलिस गस्त वाढवा.'
      ]
    }
  }
};

export default function ManifestoView({ onContinue }) {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const parties = Object.keys(t.manifestos);
  
  const [activeTab, setActiveTab] = useState(parties[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-[2rem] shadow-xl backdrop-blur-xl mt-8"
      style={{ padding: '2.5rem 3rem' }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6" style={{ marginBottom: '2.5rem' }}>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white" style={{ marginBottom: '0.5rem' }}>
            {t.title}
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {t.subtitle}
          </p>
        </div>
        <button
          onClick={onContinue}
          className="flex-shrink-0 px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-colors flex items-center gap-2"
        >
          {t.continueBtn} <CheckCircle2 size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row" style={{ gap: '2rem' }}>

        {/* Tabs column */}
        <div className="w-full md:w-1/3 flex flex-col" style={{ gap: '0.75rem' }}>
          {parties.map(party => (
            <button
              key={party}
              onClick={() => setActiveTab(party)}
              className={`rounded-xl text-left font-bold transition-all flex justify-between items-center ${
                activeTab === party
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-md shadow-indigo-500/10'
                  : 'bg-black/20 text-zinc-400 hover:bg-white/5 border border-transparent'
              }`}
              style={{ padding: '1rem 1.25rem', gap: '1rem' }}
            >
              <span>{party}</span>
              {activeTab === party && <ChevronRight size={18} className="flex-shrink-0" />}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div
          className="w-full md:w-2/3 bg-black/20 border border-white/5 rounded-2xl"
          style={{ padding: '2rem 2.25rem', minHeight: '280px' }}
        >
          {/* Panel header */}
          <div className="flex items-center" style={{ gap: '1rem', marginBottom: '1.75rem' }}>
            <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="text-indigo-400" size={20} />
            </div>
            <h3 className="text-lg font-bold text-white leading-snug">
              {activeTab} — {t.highlights}
            </h3>
          </div>

          {/* Points list */}
          <AnimatePresence mode="wait">
            <motion.ul
              key={activeTab + language}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {t.manifestos[activeTab]?.map((point, idx) => (
                <li
                  key={idx}
                  className="flex text-zinc-300"
                  style={{ gap: '1rem', lineHeight: '1.75' }}
                >
                  <span className="text-indigo-400 font-bold flex-shrink-0" style={{ marginTop: '0.2rem' }}>•</span>
                  <span>{point}</span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

