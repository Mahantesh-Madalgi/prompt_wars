import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, AlertTriangle, Building, CheckCircle2 } from 'lucide-react';
import { candidates } from '../data/candidates';
import { maharashtraCities } from '../data/maharashtraCities';
import { LanguageContext } from '../context/LanguageContext';

const translations = {
  English: {
    title: 'Candidate Comparison',
    subtitle: 'Review candidate profiles neutrally before deciding.',
    noData: 'No data available for this city',
    continueBtn: 'Continue to Voting Day',
    education: 'Education',
    criminalCases: 'Criminal Cases',
    assets: 'Declared Assets',
    promises: 'Key Promises'
  },
  Hindi: {
    title: 'उम्मीदवार तुलना',
    subtitle: 'निर्णय लेने से पहले उम्मीदवार प्रोफाइल की तटस्थ रूप से समीक्षा करें।',
    noData: 'इस शहर के लिए कोई डेटा उपलब्ध नहीं है',
    continueBtn: 'वोटिंग के दिन तक जारी रखें',
    education: 'शिक्षा',
    criminalCases: 'आपराधिक मामले',
    assets: 'घोषित संपत्ति',
    promises: 'प्रमुख वादे'
  },
  Marathi: {
    title: 'उमेदवार तुलना',
    subtitle: 'निर्णय घेण्यापूर्वी उमेदवारांच्या प्रोफाइलचे निष्पक्षपणे पुनरावलोकन करा.',
    noData: 'या शहरासाठी डेटा उपलब्ध नाही',
    continueBtn: 'मतदानाच्या दिवसासाठी पुढे जा',
    education: 'शिक्षण',
    criminalCases: 'गुन्हेगारी प्रकरणे',
    assets: 'घोषित मालमत्ता',
    promises: 'प्रमुख आश्वासने'
  }
};

export default function CandidateCompare({ onContinue }) {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;

  const [selectedCity, setSelectedCity] = useState(
    () => localStorage.getItem('selectedPollingCity') || 'pune'
  );

  const cityCandidates = candidates[selectedCity];

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    localStorage.setItem('selectedPollingCity', city);
    window.dispatchEvent(new Event('cityChanged'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-[2rem] p-6 shadow-xl backdrop-blur-xl mt-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-1">{t.title}</h2>
          <p className="text-zinc-400 text-sm">{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="bg-zinc-800/80 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none capitalize cursor-pointer"
          >
            {maharashtraCities.map(city => (
              <option key={city} value={city} className="capitalize">
                {city.charAt(0).toUpperCase() + city.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={onContinue}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            {t.continueBtn} <CheckCircle2 size={18} />
          </button>
        </div>
      </div>

      {/* Candidate Cards */}
      {!cityCandidates ? (
        <div className="h-48 flex items-center justify-center text-zinc-400 bg-black/20 rounded-2xl border border-white/5">
          {t.noData}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cityCandidates.map((cand) => (
            <div
              key={cand.id}
              className="bg-black/20 border border-white/5 rounded-2xl p-7 hover:border-indigo-500/30 transition-colors flex flex-col gap-1"
            >
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mb-5">
                <User className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-1 leading-tight">{cand.name}</h3>
              <p className="text-sm font-semibold text-indigo-300 mb-7 tracking-wide">{cand.party}</p>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <GraduationCap className="text-zinc-500 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">{t.education}</p>
                    <p className="text-sm text-zinc-300">{cand.education}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={cand.criminalCases > 0 ? 'text-amber-500 mt-0.5' : 'text-zinc-500 mt-0.5'}
                    size={16}
                  />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">{t.criminalCases}</p>
                    <p className={`text-sm ${cand.criminalCases > 0 ? 'text-amber-400 font-bold' : 'text-zinc-300'}`}>
                      {cand.criminalCases}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="text-zinc-500 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">{t.assets}</p>
                    <p className="text-sm text-zinc-300">{cand.assets}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase className="text-zinc-500 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">{t.promises}</p>
                    <ul className="text-sm text-zinc-300 list-disc list-inside mt-1 space-y-1">
                      {cand.promises.map((promise, i) => (
                        <li key={i}>{promise}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

