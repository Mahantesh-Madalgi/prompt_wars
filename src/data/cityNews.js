// src/data/cityNews.js
// Fallback news data when GNews API is unavailable or rate-limited.
export const cityNews = {
  maharashtra: {
    English: [
      { id: 'mh-n1', title: 'Maharashtra Election Commission Launches Voter Awareness Drive', type: 'development', summary: 'A state-wide campaign launched to increase voter turnout in urban areas.' },
      { id: 'mh-n2', title: 'New Digital Portal for Voter Registration Simplified', type: 'development', summary: 'The new portal allows citizens to update their details in under 5 minutes.' },
    ],
    Hindi: [
      { id: 'mh-n1-hi', title: 'महाराष्ट्र चुनाव आयोग ने मतदाता जागरूकता अभियान शुरू किया', type: 'development', summary: 'शहरी क्षेत्रों में मतदान प्रतिशत बढ़ाने के लिए राज्यव्यापी अभियान शुरू किया गया।' },
      { id: 'mh-n2-hi', title: 'मतदाता पंजीकरण के लिए नया डिजिटल पोर्टल सरल बनाया गया', type: 'development', summary: 'नया पोर्टल नागरिकों को 5 मिनट से कम समय में अपना विवरण अपडेट करने की अनुमति देता है।' },
    ],
    Marathi: [
      { id: 'mh-n1-mr', title: 'महाराष्ट्र निवडणूक आयोगाकडून मतदार जागृती मोहीम सुरू', type: 'development', summary: 'शहरी भागातील मतदानाचे प्रमाण वाढवण्यासाठी राज्यव्यापी मोहीम सुरू करण्यात आली.' },
      { id: 'mh-n2-mr', title: 'मतदार नोंदणीसाठी नवीन डिजिटल पोर्टल सुलभ झाले', type: 'development', summary: 'नवीन पोर्टल नागरिकांना ५ मिनिटांत तपशील अपडेट करण्याची परवानगी देते.' },
    ]
  },
  pune: {
    English: [
      { id: 'pn-n1', title: 'Pune Metro Phase 2 to Open by Year-End', type: 'development', summary: 'The state government confirmed Phase 2 of the Pune Metro will be operational by December, covering 23 additional stations.' },
      { id: 'pn-n2', title: 'Pothole Deaths Spark City-Wide Protest', type: 'issue', summary: 'Citizens march to the municipal office demanding faster road repair after three accidents in a week on Sinhagad Road.' },
      { id: 'pn-n3', title: 'Hinjewadi Gets New 200-Acre IT Park', type: 'development', summary: 'A major tech conglomerate announced a ₹1,800 Cr investment in a new IT campus, promising 12,000 jobs.' },
    ],
    Hindi: [
      { id: 'pn-n1-hi', title: 'पुणे मेट्रो फेज 2 साल के अंत तक खुलेगी', type: 'development', summary: 'राज्य सरकार ने पुष्टि की कि पुणे मेट्रो का फेज 2 दिसंबर तक चालू हो जाएगा।' },
      { id: 'pn-n2-hi', title: 'गड्ढों से हुई मौतों पर शहरव्यापी विरोध प्रदर्शन', type: 'issue', summary: 'सिंहगढ़ रोड पर हादसों के बाद नागरिकों ने सड़क मरम्मत की मांग को लेकर नगर निगम तक मार्च निकाला।' },
    ],
    Marathi: [
      { id: 'pn-n1-mr', title: 'पुणे मेट्रोचा दुसरा टप्पा वर्षाअखेरीस सुरू होणार', type: 'development', summary: 'पुणे मेट्रोचा दुसरा टप्पा डिसेंबरपर्यंत सुरू होईल, अशी पुष्टी राज्य सरकारने केली आहे.' },
      { id: 'pn-n2-mr', title: 'खड्ड्यांमुळे झालेल्या मृत्यूंनंतर शहरव्यापी निदर्शने', type: 'issue', summary: 'सिंहगड रोडवर झालेल्या अपघातांनंतर रस्ते दुरुस्तीच्या मागणीसाठी नागरिकांनी महापालिकेवर मोर्चा काढला.' },
    ]
  },
  mumbai: {
    English: [
      { id: 'mb-n1', title: 'Coastal Road Project Nears Completion', type: 'development', summary: 'The Marine Drive to Worli coastal road project is 90% complete and expected to ease traffic by 30%.' },
      { id: 'mb-n2', title: 'Dharavi Redevelopment Plan Gets Cabinet Nod', type: 'development', summary: 'The state cabinet approved a ₹20,000 Cr plan to redevelop Dharavi, Asia\'s largest informal settlement.' },
      { id: 'mb-n3', title: 'Waterlogging Paralyses Western Suburbs', type: 'issue', summary: 'Heavy rains caused severe waterlogging in Andheri and Malad, disrupting rail and road traffic.' },
    ],
    Hindi: [
      { id: 'mb-n1-hi', title: 'तटीय सड़क परियोजना पूर्ण होने के करीब', type: 'development', summary: 'मरीन ड्राइव से वर्ली तटीय सड़क परियोजना 90% पूरी हो चुकी है।' },
      { id: 'mb-n2-hi', title: 'धारावी पुनर्विकास योजना को कैबिनेट की मंजूरी', type: 'development', summary: 'राज्य कैबिनेट ने धारावी के पुनर्विकास के लिए ₹20,000 करोड़ की योजना को मंजूरी दी।' },
    ],
    Marathi: [
      { id: 'mb-n1-mr', title: 'कोस्टल रोड प्रकल्प पूर्णत्वाच्या मार्गावर', type: 'development', summary: 'मरीन ड्राइव्ह ते वरळी कोस्टल रोड प्रकल्प ९०% पूर्ण झाला असून वाहतूक कोंडी कमी होईल.' },
      { id: 'mb-n2-mr', title: 'धारावी पुनर्विकास योजनेला मंत्रिमंडळाची मंजुरी', type: 'development', summary: 'धारावीच्या पुनर्विकासासाठी २०,००० कोटी रुपयांच्या योजनेला राज्य मंत्रिमंडळाने मंजुरी दिली.' },
    ]
  },
  nagpur: {
    English: [
      { id: 'ng-n1', title: 'Nagpur AIIMS Phase 2 Construction Starts', type: 'development', summary: 'Construction of the second phase of AIIMS Nagpur began, adding 500 beds and new specialty departments.' },
      { id: 'ng-n2', title: 'Nagpur Residents Protest Water Shortage', type: 'issue', summary: 'Residents blocked the Wardha Road demanding uninterrupted water supply after 10 days of cuts.' },
      { id: 'ng-n3', title: 'Orange City Street Food Festival Draws Thousands', type: 'general', summary: 'The annual street food festival in Ambazari Lake Garden saw over 50,000 visitors.' },
    ],
    Hindi: [
      { id: 'ng-n1-hi', title: 'नागपुर एम्स फेज 2 का निर्माण शुरू', type: 'development', summary: 'नागपुर एम्स के दूसरे चरण का निर्माण शुरू हो गया है, जिसमें 500 नए बेड जोड़े जाएंगे।' },
      { id: 'ng-n2-hi', title: 'नागपुर के निवासियों ने पानी की किल्लत का विरोध किया', type: 'issue', summary: 'लगातार कटौती के बाद निवासियों ने वर्धा रोड जाम कर पानी की आपूर्ति की मांग की।' },
    ],
    Marathi: [
      { id: 'ng-n1-mr', title: 'नागपूर एम्सच्या दुसऱ्या टप्प्याचे बांधकाम सुरू', type: 'development', summary: 'नागपूर एम्सच्या दुसऱ्या टप्प्याचे बांधकाम सुरू झाले असून ५०० खाटा वाढवण्यात येणार आहेत.' },
      { id: 'ng-n2-mr', title: 'पाणीटंचाई विरोधात नागपूरकरांचे आंदोलन', type: 'issue', summary: 'पाणी कपातीनंतर सातत्यपूर्ण पाणीपुरवठ्याच्या मागणीसाठी नागरिकांनी वर्धा रोड रोखून धरला.' },
    ]
  },
  nashik: {
    English: [
      { id: 'nk-n1', title: 'Godavari Rejuvenation Project Kicks Off', type: 'development', summary: 'The state government launched a ₹600 Cr project to clean and revive the Godavari river.' },
      { id: 'nk-n2', title: 'Grape Farmers Demand Fair MSP', type: 'issue', summary: 'Hundreds of grape farmers from the Niphad belt rallied in Nashik demanding a minimum support price.' },
    ],
    Hindi: [
      { id: 'nk-n1-hi', title: 'गोदावरी पुनरुद्धार परियोजना शुरू', type: 'development', summary: 'राज्य सरकार ने गोदावरी नदी की सफाई के लिए ₹600 करोड़ की परियोजना शुरू की है।' },
    ],
    Marathi: [
      { id: 'nk-n1-mr', title: 'गोदावरी पुनरुज्जीवन प्रकल्पाला सुरुवात', type: 'development', summary: 'गोदावरी नदी स्वच्छ करण्यासाठी राज्य सरकारने ६०० कोटी रुपयांचा प्रकल्प सुरू केला आहे.' },
    ]
  },
  aurangabad: {
    English: [
      { id: 'ab-n1', title: 'Aurangabad Airport Gets International Status', type: 'development', summary: 'Ministry of Civil Aviation granted international airport status to Aurangabad.' },
      { id: 'ab-n2', title: 'Historic Bibi Ka Maqbara Restoration Completed', type: 'development', summary: 'ASI completed a 3-year restoration of Bibi Ka Maqbara, enhancing tourism infrastructure.' },
    ],
    Hindi: [
      { id: 'ab-n1-hi', title: 'औरंगाबाद हवाई अड्डे को अंतर्राष्ट्रीय दर्जा मिला', type: 'development', summary: 'नागर विमानन मंत्रालय ने औरंगाबाद को अंतरराष्ट्रीय हवाई अड्डे का दर्जा दिया।' },
    ],
    Marathi: [
      { id: 'ab-n1-mr', title: 'औरंगाबाद विमानतळाला आंतरराष्ट्रीय दर्जा', type: 'development', summary: 'नागरी विमानचालन मंत्रालयाने औरंगाबाद विमानतळाला आंतरराष्ट्रीय दर्जा दिला आहे.' },
    ]
  },
};

