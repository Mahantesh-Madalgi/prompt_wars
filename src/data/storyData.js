// src/data/storyData.js
export const storyNodes = {
  intro: {
    id: 'intro',
    speaker: 'Rahul',
    translations: {
      English: {
        text: "Hi! I'm Rahul. I just turned 18 and I'm excited but a bit nervous about voting for the first time. Can you help me navigate this journey?",
        choices: [
          { text: "Let's do it!", nextNode: 'id_check', milestone: 'journey_started' }
        ]
      },
      Hindi: {
        text: "नमस्ते! मैं राहुल हूँ। मैं अभी 18 साल का हुआ हूँ और पहली बार वोट देने को लेकर उत्साहित हूँ लेकिन थोड़ा घबराया हुआ भी हूँ। क्या आप मुझे इस यात्रा में मार्गदर्शन कर सकते हैं?",
        choices: [
          { text: "चलो करते हैं!", nextNode: 'id_check', milestone: 'journey_started' }
        ]
      },
      Marathi: {
        text: "नमस्कार! मी राहुल आहे. मी नुकताच १८ वर्षांचा झालो आहे आणि पहिल्यांदा मतदान करण्याबद्दल उत्साही आहे पण थोडा घाबरलोही आहे. तुम्ही मला या प्रवासात मदत करू शकता का?",
        choices: [
          { text: "चला करूया!", nextNode: 'id_check', milestone: 'journey_started' }
        ]
      }
    }
  },
  id_check: {
    id: 'id_check',
    speaker: 'Rahul',
    translations: {
      English: {
        text: "First things first. I heard I need a valid ID to register. I have my Aadhaar card, is that enough?",
        choices: [
          { text: "Yes, that's perfect!", nextNode: 'registration_step', milestone: 'id_verified' },
          { text: "I don't have any valid ID.", nextNode: 'no_id_help' },
          { text: "Actually, let's check other options.", nextNode: 'id_help', milestone: 'id_needed' }
        ]
      },
      Hindi: {
        text: "सबसे पहले, मैंने सुना है कि पंजीकरण के लिए एक वैध आईडी की आवश्यकता है। मेरे पास आधार कार्ड है, क्या यह काफी है?",
        choices: [
          { text: "हाँ, यह सही है!", nextNode: 'registration_step', milestone: 'id_verified' },
          { text: "मेरे पास कोई वैध आईडी नहीं है।", nextNode: 'no_id_help' },
          { text: "दरअसल, अन्य विकल्पों की जांच करते हैं।", nextNode: 'id_help', milestone: 'id_needed' }
        ]
      },
      Marathi: {
        text: "सर्वात आधी, मी ऐकले आहे की नोंदणीसाठी वैध ओळखपत्र आवश्यक आहे. माझ्याकडे आधार कार्ड आहे, ते पुरेसे आहे का?",
        choices: [
          { text: "हो, ते अगदी योग्य आहे!", nextNode: 'registration_step', milestone: 'id_verified' },
          { text: "माझ्याकडे कोणतेही वैध ओळखपत्र नाही.", nextNode: 'no_id_help' },
          { text: "खरं तर, इतर पर्याय तपासूया.", nextNode: 'id_help', milestone: 'id_needed' }
        ]
      }
    }
  },
  no_id_help: {
    id: 'no_id_help',
    speaker: 'Rahul',
    translations: {
      English: {
        text: "Oh no! Without an ID, we can't register. We need to apply for one first. You can apply for a Voter ID online via NVSP or by visiting a local Registration Center. They'll guide you on Form 6.",
        choices: [
          { text: "Apply Online via NVSP", nextNode: 'registration_step', action: 'open_nvsp' },
          { text: "View Registration Centers on Map", nextNode: 'registration_step', action: 'show_reg_center' }
        ]
      },
      Hindi: {
        text: "ओह नहीं! आईडी के बिना हम पंजीकरण नहीं कर सकते। हमें पहले एक के लिए आवेदन करना होगा। आप NVSP के माध्यम से ऑनलाइन या स्थानीय पंजीकरण केंद्र पर जाकर मतदाता आईडी के लिए आवेदन कर सकते हैं। वे आपको फॉर्म 6 पर मार्गदर्शन करेंगे।",
        choices: [
          { text: "NVSP के माध्यम से ऑनलाइन आवेदन करें", nextNode: 'registration_step', action: 'open_nvsp' },
          { text: "नक्शे पर पंजीकरण केंद्र देखें", nextNode: 'registration_step', action: 'show_reg_center' }
        ]
      },
      Marathi: {
        text: "अरे बापरे! ओळखपत्राशिवाय आपण नोंदणी करू शकत नाही. आपल्याला प्रथम एकासाठी अर्ज करावा लागेल. आपण NVSP द्वारे ऑनलाइन किंवा स्थानिक नोंदणी केंद्राला भेट देऊन मतदार ओळखपत्रासाठी अर्ज करू शकता. ते तुम्हाला फॉर्म ६ बद्दल माहिती देतील.",
        choices: [
          { text: "NVSP द्वारे ऑनलाइन अर्ज करा", nextNode: 'registration_step', action: 'open_nvsp' },
          { text: "नकाशावर नोंदणी केंद्रे पहा", nextNode: 'registration_step', action: 'show_reg_center' }
        ]
      }
    }
  },
  id_help: {
    id: 'id_help',
    speaker: 'Rahul',
    translations: {
      English: {
        text: "Ah, okay. I also have a Voter ID application in progress. Should we wait or use my passport?",
        choices: [
          { text: "Use your Passport.", nextNode: 'registration_step', milestone: 'id_verified' },
          { text: "Wait for Voter ID.", nextNode: 'registration_step', milestone: 'id_verified' }
        ]
      },
      Hindi: {
        text: "अह, ठीक है। मेरा वोटर आईडी आवेदन भी प्रक्रिया में है। क्या हमें इंतजार करना चाहिए या मेरे पासपोर्ट का उपयोग करना चाहिए?",
        choices: [
          { text: "अपने पासपोर्ट का उपयोग करें।", nextNode: 'registration_step', milestone: 'id_verified' },
          { text: "वोटर आईडी का इंतजार करें।", nextNode: 'registration_step', milestone: 'id_verified' }
        ]
      },
      Marathi: {
        text: "बरं, ठीक आहे. माझा मतदार ओळखपत्राचा अर्जही प्रक्रियेत आहे. आपण वाट पाहायची की माझा पासपोर्ट वापरायचा?",
        choices: [
          { text: "तुमचा पासपोर्ट वापरा.", nextNode: 'registration_step', milestone: 'id_verified' },
          { text: "मतदार ओळखपत्राची वाट पहा.", nextNode: 'registration_step', milestone: 'id_verified' }
        ]
      }
    }
  },
  registration_step: {
    id: 'registration_step',
    speaker: 'Rahul',
    translations: {
      English: {
        text: "Great! Now I need to make sure I'm on the electoral roll. Have you checked the National Voters' Service Portal (NVSP) lately?",
        choices: [
          { text: "Let's check together.", nextNode: 'campaign_step', milestone: 'registered' },
          { text: "I'm already registered!", nextNode: 'campaign_step', milestone: 'registered' },
          { text: "I am not registered.", nextNode: 'not_registered_help' }
        ]
      },
      Hindi: {
        text: "बहुत बढ़िया! अब मुझे यह सुनिश्चित करने की आवश्यकता है कि मैं मतदाता सूची में हूँ। क्या आपने हाल ही में राष्ट्रीय मतदाता सेवा पोर्टल (NVSP) की जाँच की है?",
        choices: [
          { text: "चलो मिलकर जाँचते हैं।", nextNode: 'campaign_step', milestone: 'registered' },
          { text: "मैं पहले से ही पंजीकृत हूँ!", nextNode: 'campaign_step', milestone: 'registered' },
          { text: "मैं पंजीकृत नहीं हूँ।", nextNode: 'not_registered_help' }
        ]
      },
      Marathi: {
        text: "छान! आता मला खात्री करून घ्यायची आहे की माझे नाव मतदार यादीत आहे. तुम्ही अलीकडे राष्ट्रीय मतदार सेवा पोर्टल (NVSP) तपासले आहे का?",
        choices: [
          { text: "चला एकत्र तपासूया.", nextNode: 'campaign_step', milestone: 'registered' },
          { text: "मी आधीच नोंदणी केली आहे!", nextNode: 'campaign_step', milestone: 'registered' },
          { text: "मी नोंदणीकृत नाही.", nextNode: 'not_registered_help' }
        ]
      }
    }
  },
  not_registered_help: {
    id: 'not_registered_help',
    speaker: 'Rahul',
    translations: {
      English: {
        text: "I see. To register, you need to fill out Form 6. You can easily do this online on the NVSP portal, or by visiting a nearby Voter Registration Center. What's the plan?",
        choices: [
          { text: "Apply Online via NVSP", nextNode: 'campaign_step', action: 'open_nvsp', milestone: 'registered' },
          { text: "View Registration Centers on Map", nextNode: 'campaign_step', action: 'show_reg_center', milestone: 'registered' }
        ]
      },
      Hindi: {
        text: "मैं समझ गया। पंजीकरण के लिए, आपको फॉर्म 6 भरना होगा। आप इसे NVSP पोर्टल पर आसानी से ऑनलाइन कर सकते हैं, या पास के मतदाता पंजीकरण केंद्र पर जाकर कर सकते हैं। क्या योजना है?",
        choices: [
          { text: "NVSP के माध्यम से ऑनलाइन आवेदन करें", nextNode: 'campaign_step', action: 'open_nvsp', milestone: 'registered' },
          { text: "नक्शे पर पंजीकरण केंद्र देखें", nextNode: 'campaign_step', action: 'show_reg_center', milestone: 'registered' }
        ]
      },
      Marathi: {
        text: "मला समजले. नोंदणी करण्यासाठी, तुम्हाला फॉर्म ६ भरावा लागेल. तुम्ही हे NVSP पोर्टलवर सहज ऑनलाइन करू शकता, किंवा जवळच्या मतदार नोंदणी केंद्राला भेट देऊ शकता. काय योजना आहे?",
        choices: [
          { text: "NVSP द्वारे ऑनलाइन अर्ज करा", nextNode: 'campaign_step', action: 'open_nvsp', milestone: 'registered' },
          { text: "नकाशावर नोंदणी केंद्रे पहा", nextNode: 'campaign_step', action: 'show_reg_center', milestone: 'registered' }
        ]
      }
    }
  },
  campaign_step: {
    id: 'campaign_step',
    speaker: 'Rahul',
    translations: {
      English: {
        text: "We're in! Now the real work begins. There are so many candidates and posters everywhere. How do we decide who to vote for?",
        choices: [
          { text: "Compare Candidates", nextNode: 'campaign_step', action: 'show_candidate_compare' },
          { text: "View Local Development & Issues", nextNode: 'campaign_step', action: 'show_local_news' },
          { text: "Read Manifestos", nextNode: 'campaign_step', action: 'show_manifesto' }
        ]
      },
      Hindi: {
        text: "हम अंदर हैं! अब असली काम शुरू होता है। हर जगह इतने सारे उम्मीदवार और पोस्टर हैं। हम कैसे तय करें कि किसे वोट देना है?",
        choices: [
          { text: "उम्मीदवारों की तुलना करें", nextNode: 'campaign_step', action: 'show_candidate_compare' },
          { text: "स्थानीय विकास और मुद्दों को देखें", nextNode: 'campaign_step', action: 'show_local_news' },
          { text: "घोषणापत्र पढ़ें", nextNode: 'campaign_step', action: 'show_manifesto' }
        ]
      },
      Marathi: {
        text: "आपण नोंदणी केली आहे! आता खरे काम सुरू होते. सर्वत्र इतके उमेदवार आणि पोस्टर्स आहेत. कोणाला मतदान करायचे हे आपण कसे ठरवायचे?",
        choices: [
          { text: "उमेदवारांची तुलना करा", nextNode: 'campaign_step', action: 'show_candidate_compare' },
          { text: "स्थानिक विकास आणि प्रश्न पहा", nextNode: 'campaign_step', action: 'show_local_news' },
          { text: "जाहीरनामा वाचा", nextNode: 'campaign_step', action: 'show_manifesto' }
        ]
      }
    }
  },
  voting_day: {
    id: 'voting_day',
    speaker: 'Rahul',
    translations: {
      English: {
        text: "It's finally Voting Day! I'm standing in line now. Anything else I should know?",
        choices: [
          { text: "Show my polling booth on map", nextNode: 'voting_day', action: 'show_polling_booth' },
          { text: "Don't forget your ink!", nextNode: 'complete', milestone: 'voted' }
        ]
      },
      Hindi: {
        text: "आखिरकार वोटिंग का दिन आ गया! मैं अभी लाइन में खड़ा हूँ। कुछ और है जो मुझे जानना चाहिए?",
        choices: [
          { text: "नक्शे पर मेरा मतदान केंद्र दिखाएं", nextNode: 'voting_day', action: 'show_polling_booth' },
          { text: "अपनी स्याही मत भूलना!", nextNode: 'complete', milestone: 'voted' }
        ]
      },
      Marathi: {
        text: "शेवटी मतदानाचा दिवस आला! मी आता रांगेत उभा आहे. मला अजून काही माहित असणे आवश्यक आहे का?",
        choices: [
          { text: "नकाशावर माझे मतदान केंद्र दाखवा", nextNode: 'voting_day', action: 'show_polling_booth' },
          { text: "तुमची शाई विसरू नका!", nextNode: 'complete', milestone: 'voted' }
        ]
      }
    }
  },
  complete: {
    id: 'complete',
    speaker: 'Rahul',
    translations: {
      English: {
        text: "We did it! I've officially cast my first vote. Thank you so much for guiding me through this journey. I feel like a responsible citizen now!",
        choices: []
      },
      Hindi: {
        text: "हमने कर दिखाया! मैंने आधिकारिक तौर पर अपना पहला वोट डाल दिया है। इस यात्रा में मेरा मार्गदर्शन करने के लिए बहुत-बहुत धन्यवाद। अब मैं एक जिम्मेदार नागरिक की तरह महसूस कर रहा हूँ!",
        choices: []
      },
      Marathi: {
        text: "आपण केले! मी अधिकृतपणे माझे पहिले मतदान केले आहे. या प्रवासात मला मार्गदर्शन केल्याबद्दल खूप खूप धन्यवाद. मला आता एक जबाबदार नागरिक असल्यासारखे वाटते!",
        choices: []
      }
    }
  }
};

export const milestones = [
  { 
    id: 'journey_started', 
    weight: 10,
    translations: {
      English: { label: 'Started Journey' },
      Hindi: { label: 'यात्रा शुरू की' },
      Marathi: { label: 'प्रवास सुरू झाला' }
    }
  },
  { 
    id: 'id_verified', 
    weight: 20,
    translations: {
      English: { label: 'Identity Verified' },
      Hindi: { label: 'पहचान सत्यापित' },
      Marathi: { label: 'ओळख सत्यापित' }
    }
  },
  { 
    id: 'registered', 
    weight: 30,
    translations: {
      English: { label: 'Registration Complete' },
      Hindi: { label: 'पंजीकरण पूरा हुआ' },
      Marathi: { label: 'नोंदणी पूर्ण' }
    }
  },
  { 
    id: 'candidates_researched', 
    weight: 20,
    translations: {
      English: { label: 'Candidates Researched' },
      Hindi: { label: 'उम्मीदवारों का शोध' },
      Marathi: { label: 'उमेदवारांचा शोध घेतला' }
    }
  },
  { 
    id: 'voted', 
    weight: 20,
    translations: {
      English: { label: 'Voted!' },
      Hindi: { label: 'वोट दिया!' },
      Marathi: { label: 'मतदान केले!' }
    }
  }
];
