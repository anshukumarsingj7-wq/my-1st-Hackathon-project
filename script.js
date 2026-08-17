/* ==========================================================================
   FARMIQ - AI Powered Smart Farming Assistant
   Core Application Engine (Pure ES6+ JavaScript)
   ========================================================================== */

// Global State Management & Language Engine Configuration
let currentLanguage = 'en';
let recognition = null;
let isListening = false;
let currentSpeechResponse = '';
let currentMandiChart = null;

const languageConfig = {
  en: {
    name: "English",
    nativeName: "English",
    instruction: "Respond completely in natural English.",
    speechLanguage: "en-US",
    scriptRegex: /^[\x00-\x7F\s\d\p{P}]+$/u
  },
  hi: {
    name: "Hindi",
    nativeName: "हिंदी",
    instruction: "Respond completely in natural Hindi using Devanagari script.",
    speechLanguage: "hi-IN",
    scriptRegex: /[\u0900-\u097F]/
  },
  pa: {
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    instruction: "Respond completely in natural Punjabi using Gurmukhi script.",
    speechLanguage: "pa-IN",
    scriptRegex: /[\u0A00-\u0A7F]/
  },
  mr: {
    name: "Marathi",
    nativeName: "मराठी",
    instruction: "Respond completely in natural Marathi using Devanagari script.",
    speechLanguage: "mr-IN",
    scriptRegex: /[\u0900-\u097F]/
  },
  gu: {
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    instruction: "Respond completely in natural Gujarati using Gujarati script.",
    speechLanguage: "gu-IN",
    scriptRegex: /[\u0A80-\u0AFF]/
  },
  kn: {
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    instruction: "Respond completely in natural Kannada using Kannada script.",
    speechLanguage: "kn-IN",
    scriptRegex: /[\u0C80-\u0CFF]/
  },
  ta: {
    name: "Tamil",
    nativeName: "தமிழ்",
    instruction: "Respond completely in natural Tamil using Tamil script.",
    speechLanguage: "ta-IN",
    scriptRegex: /[\u0B80-\u0BFF]/
  },
  te: {
    name: "Telugu",
    nativeName: "తెలుగు",
    instruction: "Respond completely in natural Telugu using Telugu script.",
    speechLanguage: "te-IN",
    scriptRegex: /[\u0C00-\u0C7F]/
  },
  bn: {
    name: "Bengali",
    nativeName: "বাংলা",
    instruction: "Respond completely in natural Bengali using Bengali script.",
    speechLanguage: "bn-IN",
    scriptRegex: /[\u0980-\u09FF]/
  },
  ml: {
    name: "Malayalam",
    nativeName: "മലയാളം",
    instruction: "Respond completely in natural Malayalam using Malayalam script.",
    speechLanguage: "ml-IN",
    scriptRegex: /[\u0D00-\u0D7F]/
  },
  or: {
    name: "Odia",
    nativeName: "ଓଡ଼ିଆ",
    instruction: "Respond completely in natural Odia using Odia script.",
    speechLanguage: "or-IN",
    scriptRegex: /[\u0B00-\u0B7F]/
  },
  as: {
    name: "Assamese",
    nativeName: "অসমীয়া",
    instruction: "Respond completely in natural Assamese using Assamese script.",
    speechLanguage: "as-IN",
    scriptRegex: /[\u0980-\u09FF]/
  },
  ur: {
    name: "Urdu",
    nativeName: "اردو",
    instruction: "Respond completely in natural Urdu using Urdu script.",
    speechLanguage: "ur-IN",
    scriptRegex: /[\u0600-\u06FF]/
  }
};

/* ==========================================================================
   MULTILINGUAL TRANSLATION DICTIONARY (13 Native Languages)
   ========================================================================== */

const translations = {
  en: {
    navVoice: "Voice Assistant",
    navCropDoctor: "AI Crop Doctor",
    navWeather: "Weather Advisor",
    navFertilizer: "Fertilizer Calculator",
    navMandi: "Mandi Rates",
    navSchemes: "Govt Schemes",
    navSOS: "🚨 SOS HELP",
    heroTitle: "Empowering Farmers Through Artificial Intelligence",
    heroDesc: "Your all-in-one smart farming companion. Diagnose leaf diseases instantly, talk in your mother tongue, check dynamic Mandi prices, get weather alerts, and unlock government subsidies with AI.",
    heroCTA: "Start Farming Smart",
    heroSecondaryCTA: "Try AI Doctor",
    featVoice: "100% Voice Enabled",
    featLang: "5 Regional Languages",
    featOffline: "Works Offline Demo",
    previewTitle: "Kisan Mitra AI Assistant",
    previewSub: "Namaste Farmer! How can I assist your crop today?",
    prompt1: "Tomato Leaf Spots",
    prompt2: "Will it rain tomorrow?",
    prompt3: "Wheat Mandi Rate",
    prompt4: "Best Rice Fertilizer",
    tagVoice: "Feature 1",
    titleVoice: "Smart Voice Assistant",
    subVoice: "Designed for all farmers including illiterate and elderly users. Simply tap the microphone and speak in your language.",
    micTapPrompt: "Tap Microphone & Speak",
    micHintText: 'Example: "Kal barish hogi kya?" or "Mere tamatar me rog hai"',
    sampleTitle: "Or click any quick voice query below:",
    inputPlaceholder: "Type your query in Hindi/English...",
    btnAsk: "Ask AI",
    btnListen: "Listen Aloud",
    tagDoctor: "Feature 2",
    titleDoctor: "AI Crop Doctor",
    subDoctor: "Upload or select a photo of your infected crop leaf for instant AI disease diagnosis and spray remedies.",
    uploadTitle: "Click or Drag Leaf Photo Here",
    uploadSub: "Supports JPG, PNG, WEBP files",
    presetTitle: "Or select a demo crop sample to test AI:",
    sample1Name: "Tomato Early Blight",
    sample1Sub: "Tomato Leaf",
    sample2Name: "Rice Leaf Blast",
    sample2Sub: "Paddy Leaf",
    sample3Name: "Wheat Yellow Rust",
    sample3Sub: "Wheat Crop",
    sample4Name: "Cotton Bollworm",
    sample4Sub: "Cotton Leaf",
    scanningText: "AI Neural Scanner Analyzing Leaf...",
    diagConfidence: "AI Confidence Match",
    titleRemedies: "Chemical & Organic Remedies",
    btnReadDiagnosis: "Read Diagnosis Aloud in Voice",
    tagWeather: "Feature 3",
    titleWeather: "Smart Weather & Irrigation Advisor",
    subWeather: "Localized farming decisions based on humidity, temperature, wind, and rain forecasts.",
    wHumidity: "Humidity",
    wRain: "Rain Chance",
    wWind: "Wind Speed",
    wUV: "UV Index",
    titleFarmingAdvisory: "Today's Smart Farming Recommendations",
    advIrrigationTitle: "Irrigate Field Today",
    advIrrigationSub: "Low rain probability. Ideal for morning drip irrigation.",
    advPesticideTitle: "Do Not Spray Pesticides Today",
    advPesticideSub: "Wind speed is high; chemical drift risk is elevated.",
    advHarvestTitle: "Moderate Moisture Alert",
    advHarvestSub: "Dry harvested grain in shade to prevent humidity rot.",
    tagFertilizer: "Feature 4",
    titleFertilizer: "AI Fertilizer Recommendation Engine",
    subFertilizer: "Select crop, soil type, and growth phase to calculate exact N-P-K dosage and organic soil boosters.",
    labelCropType: "Select Crop Type",
    labelSoilType: "Select Soil Type",
    labelStage: "Crop Growth Stage",
    labelArea: "Field Size (Acres)",
    btnCalculateFert: "Calculate Dosage",
    doseUrea: "Urea (Nitrogen 46%)",
    doseDAP: "DAP (Phosphorus)",
    doseMOP: "MOP (Potash)",
    doseOrganic: "Organic Bio-Booster",
    titleBestTime: "Best Application Time:",
    tagMandi: "Feature 5",
    titleMandi: "Smart Mandi Price Dashboard",
    subMandi: "Live market price trends, AI buy/sell signals, and multi-mandi rate comparisons.",
    titleAISignal: "AI Market Recommendation",
    titleRegionalMandi: "Nearby Regional Mandi Comparisons",
    thMandi: "Mandi Name",
    thLocation: "District",
    thPrice: "Current Price (₹/Qtl)",
    thChange: "24h Change",
    thStatus: "Market Status",
    tagSchemes: "Feature 6",
    titleSchemes: "Government Scheme Finder",
    subSchemes: "Filter agricultural subsidies, crop insurance, and equipment grants matching your land size.",
    titleEmergency: "Kisan Emergency Assistance (SOS)",
    subEmergency: "Facing sudden locust attack, crop flood, or severe blight outbreak? Get emergency rescue protocols instantly.",
    sosPest: "Locust / Pest Attack",
    sosDisease: "Rapid Blight Outbreak",
    sosFlood: "Flash Flood Rescue",
    sosDrought: "Severe Drought Alert",
    tagImpact: "Real Results",
    titleImpact: "Empowering Thousands of Indian Farmers",
    impYield: "Yield Increase",
    impLoss: "Crop Loss Reduced",
    impIncome: "Higher Income Gain",
    impAccuracy: "AI Disease Accuracy",
    footerDesc: "AI-powered smart farming platform built for Indian agriculture. Empowering farmers with voice recognition, AI crop doctor, and dynamic market rates.",
    footFeatures: "Features",
    footGovt: "Govt Direct",
    footContact: "Support & Contact",
    kisanTitle: "Kisan Mitra AI",
    kisanStatus: "Online • Voice Enabled",
    kisanGreet: "Namaste! I am your AI Kisan Mitra. How can I help your crop today? You can ask me about pests, weather, or mandi prices!"
  },
  hi: {
    navVoice: "आवाज़ सहायक",
    navCropDoctor: "फसल डॉक्टर AI",
    navWeather: "मौसम सलाह",
    navFertilizer: "खाद कैलकुलेटर",
    navMandi: "मंडी भाव",
    navSchemes: "सरकारी योजनाएं",
    navSOS: "🚨 आपातकालीन मदद",
    heroTitle: "आर्टिफिशियल इंटेलिजेंस द्वारा किसानों का सशक्तिकरण",
    heroDesc: "आपकी संपूर्ण स्मार्ट खेती सहायक। फसल रोगों की पहचान करें, अपनी मातृभाषा में बोलें, मंडी भाव देखें और सरकारी योजनाओं का लाभ उठाएं।",
    heroCTA: "स्मार्ट खेती शुरू करें",
    heroSecondaryCTA: "रोग जांच करें",
    featVoice: "100% आवाज़ चालित",
    featLang: "5 क्षेत्रीय भाषाएं",
    featOffline: "बिना इंटरनेट सुलभ",
    previewTitle: "किसान मित्र AI सहायक",
    previewSub: "नमस्ते किसान भाई! आज आपकी फसल के लिए क्या सहायता करूं?",
    prompt1: "टमाटर के पत्ते में धब्बे",
    prompt2: "क्या कल बारिश होगी?",
    prompt3: "गेहूं का मंडी भाव",
    prompt4: "धान के लिए सर्वश्रेष्ठ खाद",
    tagVoice: "सुविधा 1",
    titleVoice: "स्मार्ट आवाज़ सहायक",
    subVoice: "बुजुर्ग और अनपढ़ किसानों के लिए सरल आवाज़ आधारित इंटरफ़ेस। बस माइक बटन दबाएं और बोलें।",
    micTapPrompt: "माइक दबाएं और बोलें",
    micHintText: 'उदाहरण: "कल बारिश होगी क्या?" या "मेरे टमाटर में रोग है"',
    sampleTitle: "या नीचे दिए गए प्रश्नों पर क्लिक करें:",
    inputPlaceholder: "हिंदी या अंग्रेजी में अपना सवाल लिखें...",
    btnAsk: "सवाल पूछें",
    btnListen: "आवाज़ में सुनें",
    tagDoctor: "सुविधा 2",
    titleDoctor: "AI फसल डॉक्टर",
    subDoctor: "रोगग्रस्त पत्ते की फोटो अपलोड करें और तुरंत सटीक इलाज तथा कीटनाशक की जानकारी पाएं।",
    uploadTitle: "यहाँ फोटो खींचें या अपलोड करें",
    uploadSub: "JPG, PNG फोटो समर्थित",
    presetTitle: "या परीक्षण के लिए नमूना चुनें:",
    sample1Name: "टमाटर अगेती झुलसा",
    sample1Sub: "टमाटर का पत्ता",
    sample2Name: "धान का झोंका रोग",
    sample2Sub: "धान का पत्ता",
    sample3Name: "गेहूं पीला रतुआ",
    sample3Sub: "गेहूं की फसल",
    sample4Name: "कपास गुलाबी सुंडी",
    sample4Sub: "कपास का पत्ता",
    scanningText: "AI न्यूरल स्कैनर पत्ती की जांच कर रहा है...",
    diagConfidence: "AI पहचान सटीकता",
    titleRemedies: "जैविक और रासायनिक उपचार",
    btnReadDiagnosis: "रिपोर्ट आवाज़ में सुनें",
    tagWeather: "सुविधा 3",
    titleWeather: "स्मार्ट मौसम एवं सिंचाई सलाहकार",
    subWeather: "तापमान, आर्द्रता और बारिश के पूर्वानुमान के आधार पर दैनिक खेती की सलाह।",
    wHumidity: "नमी (आर्द्रता)",
    wRain: "बारिश की संभावना",
    wWind: "हवा की गति",
    wUV: "धूप (UV)",
    titleFarmingAdvisory: "आज की स्मार्ट खेती की सिफारिशें",
    advIrrigationTitle: "आज खेत में पानी दें",
    advIrrigationSub: "बारिश की संभावना कम है। ड्रिप सिंचाई के लिए सही समय।",
    advPesticideTitle: "आज कीटनाशक का छिड़काव न करें",
    advPesticideSub: "हवा की गति तेज़ है; दवा बह जाने का जोखिम है।",
    advHarvestTitle: "नमी संबंधी चेतावनी",
    advHarvestSub: "काटी गई फसल को छांव में सुखाएं ताकि सड़न न हो।",
    tagFertilizer: "सुविधा 4",
    titleFertilizer: "AI उर्वरक सिफारिश इंजन",
    subFertilizer: "फसल, मिट्टी और विकास चरण के अनुसार यूरिया, DAP और जैविक खाद की सही मात्रा जानें।",
    labelCropType: "फसल चुनें",
    labelSoilType: "मिट्टी का प्रकार चुनें",
    labelStage: "फसल की अवस्था",
    labelArea: "खेत का क्षेत्रफल (एकड़)",
    btnCalculateFert: "खाद की मात्रा निकालें",
    doseUrea: "यूरिया (नाइट्रोजन 46%)",
    doseDAP: "DAP (फास्फोरस)",
    doseMOP: "MOP (पोटाश)",
    doseOrganic: "जैविक बायो-बूस्टर",
    titleBestTime: "छिड़काव का सही समय:",
    tagMandi: "सुविधा 5",
    titleMandi: "स्मार्ट मंडी भाव डैशबोर्ड",
    subMandi: "दैनिक बाजार भाव, AI बेचने या रोकने का संकेत और पास की मंडियों का तुलनात्मक भाव।",
    titleAISignal: "AI बाजार सलाह",
    titleRegionalMandi: "आसपास की मंडियों के भाव",
    thMandi: "मंडी का नाम",
    thLocation: "ज़िला",
    thPrice: "वर्तमान भाव (₹/क्विंटल)",
    thChange: "24h बदलाव",
    thStatus: "बाजार स्थिति",
    tagSchemes: "सुविधा 6",
    titleSchemes: "सरकारी योजना खोजक",
    subSchemes: "अपनी जमीन के अनुसार पीएम-किसान, फसल बीमा और सब्सिडी योजनाओं की खोज करें।",
    titleEmergency: "किसान आपातकालीन सहायता (SOS)",
    subEmergency: "टिड्डी दल का हमला, बाढ़ या अचानक महामारी? तुरंत आपातकालीन कदम उठाएं।",
    sosPest: "टिड्डी दल / कीट हमला",
    sosDisease: "अचानक बीमारी का फैलाव",
    sosFlood: "बाढ़ सुरक्षा उपाय",
    sosDrought: "सूखा प्रबंधन",
    tagImpact: "वास्तविक प्रभाव",
    titleImpact: "हजारों भारतीय किसानों का भरोसा",
    impYield: "फसल उपज वृद्धि",
    impLoss: "फसल नुकसान में कमी",
    impIncome: "आय में वृद्धि",
    impAccuracy: "AI रोग पहचान सटीकता",
    footerDesc: "भारतीय कृषि के लिए निर्मित AI स्मार्ट कृषि मंच। किसानों को आवाज़ पहचान और AI डॉक्टर से सशक्त बनाना।",
    footFeatures: "सुविधाएं",
    footGovt: "सरकारी सेवाएं",
    footContact: "संपर्क एवं सहायता",
    kisanTitle: "किसान मित्र AI",
    kisanStatus: "ऑनलाइन • आवाज़ समर्थित",
    kisanGreet: "नमस्ते! मैं आपका AI किसान मित्र हूँ। आज मैं आपकी फसल के लिए क्या मदद कर सकता हूँ?"
  },
  kn: {
    navVoice: "ಧ್ವನಿ ಸಹಾಯಕ",
    navCropDoctor: "AI ಬೆಳೆ ವೈದ್ಯ",
    navWeather: "ಹವಾಮಾನ ಸಲಹೆ",
    navFertilizer: "ಗೊಬ್ಬರ ಲೆಕ್ಕಾಚಾರ",
    navMandi: "ಮಾರುಕಟ್ಟೆ ದರ",
    navSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆ",
    navSOS: "🚨 ತುರ್ತು ನೆರವು",
    heroTitle: "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯ ಮೂಲಕ ರೈತರ ಸಬಲೀಕರಣ",
    heroDesc: "ನಿಮ್ಮ ಸಮಗ್ರ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಂಗಾತಿ. ಬೆಳೆ ರೋಗಗಳನ್ನು ಧ್ವನಿಯ ಮೂಲಕ ಸುಲಭವಾಗಿ ಪತ್ತೆಹಚ್ಚಿ.",
    heroCTA: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಪ್ರಾರಂಭಿಸಿ",
    heroSecondaryCTA: "ಬೆಳೆ ಪರಿಶೀಲಿಸಿ",
    featVoice: "100% ಧ್ವನಿ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ",
    featLang: "5 ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳು",
    featOffline: "ಆಫ್‌ಲೈನ್ ಬೆಂಬಲ",
    previewTitle: "ಕಿಸಾನ್ ಮಿತ್ರ AI",
    previewSub: "ನಮಸ್ಕಾರ ರೈತ ಬಂಧುವೇ! ಇಂದು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
    prompt1: "ಟೊಮೆಟೊ ಎಲೆ ಚುಕ್ಕೆ",
    prompt2: "ನಾಳೆ ಮಳೆ ಬರುತ್ತದೆಯೇ?",
    prompt3: "ಗೋಧಿ ಮಾರುಕಟ್ಟೆ ದರ",
    prompt4: "ಭತ್ತಕ್ಕೆ ಅತ್ಯುತ್ತಮ ಗೊಬ್ಬರ",
    tagVoice: "ವೈಶಿಷ್ಟ್ಯ 1",
    titleVoice: "ಸ್ಮಾರ್ಟ್ ಧ್ವನಿ ಸಹಾಯಕ",
    subVoice: "ಮೈಕ್ರೋಫೋನ್ ಕ್ಲಿಕ್ ಮಾಡಿ ನಿಮ್ಮ ಕನ್ನಡ ಭಾಷೆಯಲ್ಲೇ ಮಾತನಾಡಿ.",
    micTapPrompt: "ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ",
    micHintText: 'ಉದಾಹರಣೆಗೆ: "ನಾಳೆ ಮಳೆ ಬರುತ್ತದೆಯೇ?"',
    inputPlaceholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...",
    btnAsk: "ಪ್ರಶ್ನಿಸಿ",
    btnListen: "ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ",
    tagDoctor: "ವೈಶಿಷ್ಟ್ಯ 2",
    titleDoctor: "AI ಬೆಳೆ ವೈದ್ಯ",
    subDoctor: "ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ತಕ್ಷಣ ರೋಗ ಪತ್ತೆ ಮಾಡಿ.",
    uploadTitle: "ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    uploadSub: "JPG, PNG ಫೈಲ್‌ಗಳು ಬೆಂಬಲಿತವಾಗಿದೆ",
    tagWeather: "ವೈಶಿಷ್ಟ್ಯ 3",
    titleWeather: "ಹವಾಮಾನ ಮತ್ತು ನೀರಾವರಿ ಸಲಹೆ",
    subWeather: "ಮಳೆ ಮತ್ತು ತಾಪಮಾನಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಕೃಷಿ ಸಲಹೆಗಳು.",
    tagFertilizer: "ವೈಶಿಷ್ಟ್ಯ 4",
    titleFertilizer: "ಗೊಬ್ಬರ ಶಿಫಾರಸು",
    subFertilizer: "ಬೆಳೆ ಮತ್ತು ಮಣ್ಣಿಗೆ ಸೂಕ್ತವಾದ ಗೊಬ್ಬರದ ಪ್ರಮಾಣ ತಿಳಿಯಿರಿ.",
    tagMandi: "ವೈಶಿಷ್ಟ್ಯ 5",
    titleMandi: "ಮಾರುಕಟ್ಟೆ ದರಗಳ ಮಾಹಿತಿ",
    subMandi: "ದೈನಂದಿನ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು AI ಸಲಹೆಗಳು.",
    tagSchemes: "ವೈಶಿಷ್ಟ್ಯ 6",
    titleSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
    subSchemes: "ನಿಮ್ಮ ಜಮೀನಿಗೆ ಸೂಕ್ತವಾದ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ.",
    titleEmergency: "ರೈತರ ತುರ್ತು ಸಹಾಯ (SOS)",
    subEmergency: "ಕೀಟ ದಾಳಿ ಅಥವಾ ನೆರೆ ಹಾವಳಿಯ ಸಂದರ್ಭದಲ್ಲಿ ತಕ್ಷಣದ ನೆರವು.",
    tagImpact: "ನೈಜ ಫಲಿತಾಂಶಗಳು",
    titleImpact: "ಸಾವಿರಾರು ರೈತರ ನೆಚ್ಚಿನ ಕೃಷಿ ಆಪ್",
    footerDesc: "ಭಾರತೀಯ ರೈತರಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಆಧಾರಿತ ಕೃಷಿ ತಂತ್ರಜ್ಞಾನ.",
    kisanTitle: "ಕಿಸಾನ್ ಮಿತ್ರ AI",
    kisanGreet: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಕಿಸಾನ್ ಮಿತ್ರ. ಇಂದು ನಿಮಗೆ ಏನು ಸಹಾಯ ಬೇಕು?"
  },
  ta: {
    navVoice: "குரல் உதவியாளர்",
    navCropDoctor: "AI பயிர் மருத்துவர்",
    navWeather: "வானிலை ஆலோசனை",
    navFertilizer: "உர கணக்கீடு",
    navMandi: "சந்தை விலை",
    navSchemes: "அரசு திட்டங்கள்",
    navSOS: "🚨 அவசர உதவி",
    heroTitle: "செயற்கை நுண்ணறிவு மூலம் விவசாயிகளை மேம்படுத்துதல்",
    heroDesc: "உங்கள் ஸ்மார்ட் விவசாய உதவியாளர். பயிர் நோய்களை உடனுக்குடன் கண்டறியவும்.",
    heroCTA: "விவசாயத்தை தொடங்குங்கள்",
    heroSecondaryCTA: "நோயைக் கண்டறியவும்",
    featVoice: "100% குரல் வழி இயக்கம்",
    featLang: "5 மாநில மொழிகள்",
    featOffline: "ஆஃப்லைன் ஆதரவு",
    previewTitle: "கிசான் மித்ரா AI",
    previewSub: "வணக்கம் விவசாயி! இன்று உங்களுக்கு எவ்வாறு உதவட்டும்?",
    prompt1: "தக்காளி இலை புள்ளி",
    prompt2: "நாளை மழை பெய்யுமா?",
    prompt3: "கோதுமை சந்தை விலை",
    prompt4: "நெல்லுக்கு சிறந்த உரம்",
    tagVoice: "அம்சம் 1",
    titleVoice: "ஸ்மார்ட் குரல் உதவியாளர்",
    subVoice: "மைக் பொத்தானை அழுத்தி தமிழில் பேசுங்கள்.",
    micTapPrompt: "மைக்கை அழுத்தி பேசவும்",
    micHintText: 'உதாரணம்: "நாளை மழை பெய்யுமா?"',
    inputPlaceholder: "உங்கள் கேள்வியை தட்டச்சு செய்க...",
    btnAsk: "கேட்கவும்",
    btnListen: "குரலில் கேட்கவும்",
    tagDoctor: "அம்சம் 2",
    titleDoctor: "AI பயிர் மருத்துவர்",
    subDoctor: "இலையின் புகைப்படத்தைப் பதிவேற்றி நோய் தீர்வினைப் பெறுங்கள்.",
    uploadTitle: "இலை புகைப்படத்தை பதிவேற்றவும்",
    uploadSub: "JPG, PNG கோப்புகள் ஆதரவு",
    tagWeather: "அம்சம் 3",
    titleWeather: "வானிலை மற்றும் பாசன ஆலோசனை",
    subWeather: "வானிலைக்கு ஏற்ப விவசாய முடிவுகளை எடுங்கள்.",
    tagFertilizer: "அம்சம் 4",
    titleFertilizer: "உர பரிந்துரை",
    subFertilizer: "சரியான உர அளவை கணக்கிடுங்கள்.",
    tagMandi: "அம்சம் 5",
    titleMandi: "சந்தை விலை நிலவரம்",
    subMandi: "நேரலை சந்தை விலைகள் மற்றும் விற்பனை ஆலோசனைகள்.",
    tagSchemes: "அம்சம் 6",
    titleSchemes: "அரசு திட்டங்கள்",
    subSchemes: "விவசாய மானியங்கள் மற்றும் கடன் திட்டங்கள்.",
    titleEmergency: "அவசர உதவி (SOS)",
    subEmergency: "வெட்டுக்கிளி தாக்குதல் அல்லது வெள்ளம் ஏற்படும் போது அவசர உதவி.",
    tagImpact: "உண்மையான பலன்கள்",
    titleImpact: "ஆயிரக்கணக்கான விவசாயிகளின் நம்பிக்கை",
    footerDesc: "இந்திய விவசாயிகளுக்கான AI தொழில்நுட்ப மையம்.",
    kisanTitle: "கிசான் மித்ரா AI",
    kisanGreet: "வணக்கம்! நான் உங்கள் கிசான் மித்ரா. இன்று உங்களுக்கு என்ன உதவி தேவை?"
  },
  te: {
    navVoice: "వాయిస్ అసిస్టెంట్",
    navCropDoctor: "AI పంట డాక్టర్",
    navWeather: "వాతావరణ సలహా",
    navFertilizer: "ఎరువుల లెక్కింపు",
    navMandi: "మార్కెట్ ధరలు",
    navSchemes: "ప్రభుత్వ పథకాలు",
    navSOS: "🚨 అత్యవసర సాయం",
    heroTitle: "ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ ద్వారా రైతుల సాధికారత",
    heroDesc: "మీ స్మార్ట్ వ్యవసాయ మిత్రుడు. పంట తెగుళ్లను వాయిస్ ద్వారా సులభంగా గుర్తించండి.",
    heroCTA: "స్మార్ట్ వ్యవసాయం ప్రారంభించండి",
    heroSecondaryCTA: "పంటను తనిఖీ చేయండి",
    featVoice: "100% వాయిస్ మద్దతు",
    featLang: "5 ప్రాంతీయ భాషలు",
    featOffline: "ఆఫ్‌లైన్ సపోర్ట్",
    previewTitle: "కిసాన్ మిత్ర AI",
    previewSub: "నమస్తే రైతు సోదరా! ఈరోజు మీకు ఎలాంటి సాయం కావాలి?",
    prompt1: "టమోటా ఆకు మచ్చలు",
    prompt2: "రేపు వర్షం పడుతుందా?",
    prompt3: "గోధుమల మార్కెట్ ధర",
    prompt4: "వరికి ఉత్తమ ఎరువులు",
    tagVoice: "ఫీచర్ 1",
    titleVoice: "స్మార్ట్ వాయిస్ అసిస్టెంట్",
    subVoice: "మైక్ బటన్ నొక్కి మీ తెలుగు భాషలోనే మాట్లాడండి.",
    micTapPrompt: "మైక్ నొక్కి మాట్లాడండి",
    micHintText: 'ఉదాహరణ: "రేపు వర్షం పడుతుందా?"',
    inputPlaceholder: "మీ ప్రశ్నను ఇక్కడ టైప్ చేయండి...",
    btnAsk: "అడగండి",
    btnListen: "వాయిస్‌లో వినండి",
    tagDoctor: "ఫీచర్ 2",
    titleDoctor: "AI పంట డాక్టర్",
    subDoctor: "ఆకు ఫోటో అప్‌లోడ్ చేసి తక్షణమే నివారణ చర్యలు తెలుసుకోండి.",
    uploadTitle: "ఆకు ఫోటో అప్‌లోడ్ చేయండి",
    uploadSub: "JPG, PNG ఫైల్స్ సపోర్ట్ చేయబడతాయి",
    tagWeather: "ఫీచర్ 3",
    titleWeather: "వాతావరణ మరియు నీటిపారుదల సలహా",
    subWeather: "వాతావరణ మార్పులకు అనుగుణంగా వ్యవసాయ సలహాలు.",
    tagFertilizer: "ఫీచర్ 4",
    titleFertilizer: "ఎరువుల సిఫార్సు",
    subFertilizer: "పంట మరియు నేల స్వభావాన్ని బట్టి సరైన ఎరువుల లెక్కింపు.",
    tagMandi: "ఫీచర్ 5",
    titleMandi: "మార్కెట్ ధరల డాష్‌బోర్డ్",
    subMandi: "లైవ్ మార్కెట్ రేట్లు మరియు అమ్మకపు సలహాలు.",
    tagSchemes: "ఫీచర్ 6",
    titleSchemes: "ప్రభుత్వ పథకాలు",
    subSchemes: "మీ భూమి పరిమాణానికి సరిపోయే పథకాలను కనుగొనండి.",
    titleEmergency: "అత్యవసర సహాయం (SOS)",
    subEmergency: "మిడతల దాడి లేదా వరదల సమయంలో తక్షణ అత్యవసర చర్యలు.",
    tagImpact: "నిజమైన ఫలితాలు",
    titleImpact: "వేలాది మంది రైతుల నమ్మకం",
    footerDesc: "భారతీయ రైతుల కోసం రూపొందించబడిన ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ అసిస్టెంట్.",
    kisanTitle: "కిసాన్ మిత్ర AI",
    kisanGreet: "నమస్తే! నేను మీ AI కిసాన్ మిత్ర. ఈరోజు మీకు ఏ సాయం కావాలి?"
  },
  mr: {
    navVoice: "आवाज सहाय्यक",
    navCropDoctor: "AI पीक डॉक्टर",
    navWeather: "हवामान सल्ला",
    navFertilizer: "खत कॅल्क्युलेटर",
    navMandi: "बाजार भाव",
    navSchemes: "शासकीय योजना",
    navSOS: "🚨 आणीबाणी मदत",
    heroTitle: "कृत्रिम बुद्धिमत्ताद्वारे शेतकऱ्यांचे सक्षमीकरण",
    heroDesc: "तुमचा संपूर्ण स्मार्ट शेती सोबती. पिकांचे रोग ओळखा, तुमच्या मातृभाषेत बोला आणि शासकीय योजनांचा लाभ घ्या.",
    heroCTA: "स्मार्ट शेती सुरू करा",
    heroSecondaryCTA: "रोग तपासा",
    featVoice: "१००% आवाज सक्षम",
    featLang: "१३ मातृभाषा",
    featOffline: "ऑफलाइन सपोर्ट",
    previewTitle: "किसान मित्र AI",
    previewSub: "नमस्कार शेतकरी मित्र! आज मी तुमच्या पिकासाठी काय मदत करू?",
    prompt1: "टोमॅटो पानावरील ठिपके",
    prompt2: "उद्या पाऊस पडेल का?",
    prompt3: "गव्हाचा बाजार भाव",
    prompt4: "भातासाठी उत्तम खत",
    tagVoice: "वैशिष्ट्य १",
    titleVoice: "स्मार्ट आवाज सहाय्यक",
    subVoice: "मायक्रोफोनवर क्लिक करा आणि तुमच्या मराठी भाषेत बोला.",
    micTapPrompt: "माईक दाबा आणि बोला",
    micHintText: 'उदाहरण: "उद्या पाऊस पडेल का?"',
    inputPlaceholder: "तुमचा प्रश्न मराठीत लिहा...",
    btnAsk: "विचाऱा",
    btnListen: "आवाजात ऐका",
    tagDoctor: "वैशिष्ट्य २",
    titleDoctor: "AI पीक डॉक्टर",
    subDoctor: "पानाचा फोटो अपलोड करा आणि त्वरित उपाय मिळवा.",
    uploadTitle: "पानाचा फोटो अपलोड करा",
    uploadSub: "JPG, PNG फायली समर्थित",
    tagWeather: "वैशिष्ट्य ३",
    titleWeather: "हवामान व सिंचन सल्लागार",
    subWeather: "तापमान आणि पावसाच्या अंदाजानुसार शेतीचे निर्णय घ्या.",
    tagFertilizer: "वैशिष्ट्य ४",
    titleFertilizer: "खत शिफारस",
    subFertilizer: "पिकासाठी खताची योग्य मात्रा जाणून घ्या.",
    tagMandi: "वैशिष्ट्य ५",
    titleMandi: "बाजार भाव डॅशबोर्ड",
    subMandi: "दैनंदिन बाजार भाव आणि AI विक्री सल्ला.",
    tagSchemes: "वैशिष्ट्य ६",
    titleSchemes: "शासकीय योजना",
    subSchemes: "तुमच्या जमिनीनुसार कृषी योजना शोधा.",
    titleEmergency: "शेतकरी आणीबाणी मदत (SOS)",
    subEmergency: "कीड हल्ला किंवा आपत्तीच्या वेळी तात्काळ मदत.",
    tagImpact: "वास्तविक निकाल",
    titleImpact: "हजारो शेतकऱ्यांचा विश्वास",
    footerDesc: "भारतीय शेतीसाठी तयार केलेले AI व्यासपीठ.",
    kisanTitle: "किसान मित्र AI",
    kisanGreet: "नमस्कार! मी तुमचा AI किसान मित्र आहे. आज मी काय मदत करू?"
  },
  bn: {
    navVoice: "ভয়েস সহকারী",
    navCropDoctor: "AI শস্য ডাক্তার",
    navWeather: "আবহাওয়া পরামর্শ",
    navFertilizer: "সার ক্যালকুলেটর",
    navMandi: "বাজার দর",
    navSchemes: "সরকারী প্রকল্প",
    navSOS: "🚨 জরুরী সাহায্য",
    heroTitle: "কৃত্রিম বুদ্ধিমত্তার মাধ্যমে কৃষকদের ক্ষমতায়ন",
    heroDesc: "আপনার অল-ইন-ওয়ান স্মার্ট কৃষি সঙ্গী। আপনার মাতৃভাষায় কথা বলুন এবং শস্যের চিকিৎসা পান।",
    heroCTA: "স্মার্ট কৃষি শুরু করুন",
    heroSecondaryCTA: "রোগ পরীক্ষা করুন",
    featVoice: "১০০% ভয়েস চালিত",
    featLang: "১৩টি আঞ্চলিক ভাষা",
    featOffline: "অফলাইন সুবিধা",
    previewTitle: "কিষাণ মিত্র AI",
    previewSub: "নমস্কার কৃষক ভাই! আজ কীভাবে আপনার সাহায্য করতে পারি?",
    prompt1: "টমেটো পাতার দাগ",
    prompt2: "গতকাল কি বৃষ্টি হবে?",
    prompt3: "গমের বাজার দর",
    prompt4: "ধানের সেরা সার",
    tagVoice: "বৈশিষ্ট্য ১",
    titleVoice: "স্মার্ট ভয়েস সহকারী",
    subVoice: "মাইক বোতামে ক্লিক করুন এবং বাংলায় কথা বলুন।",
    micTapPrompt: "মাইক চাপুন এবং বলুন",
    micHintText: 'উদাহরণ: "কাল কি বৃষ্টি হবে?"',
    inputPlaceholder: "আপনার প্রশ্ন বাংলায় লিখুন...",
    btnAsk: "জিজ্ঞাসা করুন",
    btnListen: "ভয়েসে শুনুন",
    tagDoctor: "বৈশিষ্ট্য ২",
    titleDoctor: "AI শস্য ডাক্তার",
    subDoctor: "আক্রান্ত পাতার ছবি আপলোড করুন এবং তাৎক্ষণিক চিকিৎসা পান।",
    uploadTitle: "পাতার ছবি আপলোড করুন",
    uploadSub: "JPG, PNG ফাইল সমর্থিত",
    tagWeather: "বৈশিষ্ট্য ৩",
    titleWeather: "আবহাওয়া ও সেচ পরামর্শদাতা",
    subWeather: "আবহাওয়ার পূর্বাভাস অনুযায়ী কৃষিকাজের সিদ্ধান্ত নিন।",
    tagFertilizer: "বৈশিষ্ট্য ৪",
    titleFertilizer: "সার সুপারিশ ইঞ্জিন",
    subFertilizer: "সঠিক সারের মাত্রা গণনা করুন।",
    tagMandi: "বৈশিষ্ট্য ৫",
    titleMandi: "বাজার দর ড্যাশবোর্ড",
    subMandi: "লাইভ বাজার দর এবং AI বিক্রয় পরামর্শ।",
    tagSchemes: "বৈশিষ্ট্য ৬",
    titleSchemes: "সরকারী প্রকল্প সন্ধানকারী",
    subSchemes: "আপনার জমির পরিমাপ অনুযায়ী কৃষি প্রকল্প খুঁজুন।",
    titleEmergency: "জরুরী সাহায্য (SOS)",
    subEmergency: "পোকামাকড়ের আক্রমণ বা বন্যায় দ্রুত সাহায্য পান।",
    tagImpact: "প্রকৃত ফলাফল",
    titleImpact: "হাজার হাজার ভারতীয় কৃষকের ভরসা",
    footerDesc: "ভারতীয় কৃষির জন্য তৈরি AI প্রযুক্তি প্ল্যাটফর্ম।",
    kisanTitle: "কিষাণ মিত্র AI",
    kisanGreet: "নমস্কার! আমি আপনার AI কিষাণ মিত্র। আজ আপনাকে কীভাবে সাহায্য করতে পারি?"
  },
  gu: {
    navVoice: "વોઇસ સહાયક",
    navCropDoctor: "AI પાક ડોક્ટર",
    navWeather: "હવામાન સલાહ",
    navFertilizer: "ખાતર કેલ્ક્યુલેટર",
    navMandi: "મંડી ભાવ",
    navSchemes: "સરકારી યોજનાઓ",
    navSOS: "🚨 કટોકટી મદદ",
    heroTitle: "આર્ટિફિશિયલ ઇન્ટેલિજન્સ દ્વારા ખેડૂતોનું સશક્તિકરણ",
    heroDesc: "તમારો સ્માર્ટ ખેતી સાથી. પાકના રોગો ઓળખો અને તમારી માતૃભાષામાં વાત કરો.",
    heroCTA: "સ્માર્ટ ખેતી શરૂ કરો",
    heroSecondaryCTA: "રોગ તપાસો",
    featVoice: "100% વોઇસ સક્ષમ",
    featLang: "13 માતૃભાષાઓ",
    featOffline: "ઓફલાઇન સપોર્ટ",
    previewTitle: "કિસાન મિત્ર AI",
    previewSub: "નમસ્તે ખેડૂત મિત્ર! આજે હું તમને શું મદદ કરી શકું?",
    prompt1: "ટમેટાના પાંદડાના ટપકાં",
    prompt2: "શું કાલે વરસાદ પડશે?",
    prompt3: "ઘઉંનો બજાર ભાવ",
    prompt4: "ડાંગર માટે શ્રેષ્ઠ ખાતર",
    tagVoice: "વિશેષતા 1",
    titleVoice: "સ્માર્ટ વોઇસ સહાયક",
    subVoice: "માઇક બટન દબાવો અને તમારી ગુજરાતી ભાષામાં બોલો.",
    micTapPrompt: "માઇક દબાવો અને બોલો",
    micHintText: 'ઉદાહરણ: "કાલે વરસાદ પડશે?"',
    inputPlaceholder: "તમારો પ્રશ્ન ગુજરાતીમાં લખો...",
    btnAsk: "પૂછો",
    btnListen: "અવાજમાં સાંભળો",
    tagDoctor: "વિશેષતા 2",
    titleDoctor: "AI પાક ડોક્ટર",
    subDoctor: "પાંદડાનો ફોટો અપલોડ કરો અને ત્વરિત ઉપાય મેળવો.",
    uploadTitle: "પાંદડાનો ફોટો અપલોડ કરો",
    uploadSub: "JPG, PNG ફાઇલો સપોર્ટેડ",
    tagWeather: "વિશેષતા 3",
    titleWeather: "હવામાન અને સિંચાઈ સલાહકાર",
    subWeather: "હવામાન આગાહી મુજબ ખેતીના નિર્ણયો લો.",
    tagFertilizer: "વિશેષતા 4",
    titleFertilizer: "ખાતર ભલામણ",
    subFertilizer: "પાક માટે ખાતરનો સાચો ડોઝ જાણો.",
    tagMandi: "વિશેષતા 5",
    titleMandi: "મંડી ભાવ ડેશબોર્ડ",
    subMandi: "લાઇવ બજાર ભાવ અને AI વેચાણ સલાહ.",
    tagSchemes: "વિશેષતા 6",
    titleSchemes: "સરકારી યોજનાઓ",
    subSchemes: "તમારી જમીન મુજબ સરકારી યોજનાઓ શોધો.",
    titleEmergency: "કટોકટી મદદ (SOS)",
    subEmergency: "જીવાત હુમલો કે પૂર વખતે ત્વરિત મદદ.",
    tagImpact: "વાસ્તવિક પરિણામો",
    titleImpact: "હજારો ખેડૂતોનો વિશ્વાસ",
    footerDesc: "ભારતીય કૃષિ માટે નિર્મિત AI પ્લેટફોર્મ.",
    kisanTitle: "કિસાન મિત્ર AI",
    kisanGreet: "નમસ્તે! હું તમારો AI કિસાન મિત્ર છું. આજે હું શું મદદ કરું?"
  },
  pa: {
    navVoice: "ਆਵਾਜ਼ ਸਹਾਇਕ",
    navCropDoctor: "AI ਫ਼ਸਲ ਡਾਕਟਰ",
    navWeather: "ਮੌਸਮ ਸਲਾਹ",
    navFertilizer: "ਖਾਦ ਕੈਲਕੁਲੇਟਰ",
    navMandi: "ਮੰਡੀ ਭਾਅ",
    navSchemes: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ",
    navSOS: "🚨 ਸੰਕਟਕਾਲੀਨ ਮਦਦ",
    heroTitle: "ਆਰਟੀਫਿਸ਼ੀਅਲ ਇੰਟੈਲੀਜੈਂਸ ਰਾਹੀਂ ਕਿਸਾਨਾਂ ਦਾ ਸਸ਼ਕਤੀਕਰਨ",
    heroDesc: "ਤੁਹਾਡਾ ਸਮਾਰਟ ਖੇਤੀ ਸਾਥੀ। ਆਪਣੀ ਮਾਂ-ਬੋਲੀ ਵਿੱਚ ਗੱਲ ਕਰੋ ਅਤੇ ਫ਼ਸਲ ਦੇ ਰੋਗ ਪਛਾਣੋ।",
    heroCTA: "ਸਮਾਰਟ ਖੇਤੀ ਸ਼ੁਰੂ ਕਰੋ",
    heroSecondaryCTA: "ਫ਼ਸਲ ਜਾਂਚੋ",
    featVoice: "100% ਆਵਾਜ਼ ਸੰਚਾਲਿਤ",
    featLang: "13 ਮਾਂ-ਬੋਲੀਆਂ",
    featOffline: "ਆਫ਼ਲਾਈਨ ਸਪੋਰਟ",
    previewTitle: "ਕਿਸਾਨ ਮਿੱਤਰ AI",
    previewSub: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ! ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
    prompt1: "ਟਮਾਟਰ ਦੇ ਪੱਤਿਆਂ 'ਤੇ ਧੱਬੇ",
    prompt2: "ਕੀ ਕੱਲ੍ਹ ਮੀਂਹ ਪਵੇਗਾ?",
    prompt3: "ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ",
    prompt4: "ਝੋਨੇ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਖਾਦ",
    tagVoice: "ਫੀਚਰ 1",
    titleVoice: "ਸਮਾਰਟ ਆਵਾਜ਼ ਸਹਾਇਕ",
    subVoice: "ਮਾਈਕ ਬਟਨ ਦਬਾਓ ਅਤੇ ਆਪਣੀ ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਵਿੱਚ ਬੋਲੋ।",
    micTapPrompt: "ਮਾਈਕ ਦਬਾਓ ਅਤੇ ਬੋਲੋ",
    micHintText: 'ਉਦਾਹਰਨ: "ਕੱਲ੍ਹ ਮੀਂਹ ਪਵੇਗਾ?"',
    inputPlaceholder: "ਆਪਣਾ ਸਵਾਲ ਪੰਜਾਬੀ ਵਿੱਚ ਲਿਖੋ...",
    btnAsk: "ਪੁੱਛੋ",
    btnListen: "ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ",
    tagDoctor: "ਫੀਚਰ 2",
    titleDoctor: "AI ਫ਼ਸਲ ਡਾਕਟਰ",
    subDoctor: "ਪੱਤੇ ਦੀ ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ ਅਤੇ ਤੁਰੰਤ ਇਲਾਜ ਪਾਓ।",
    uploadTitle: "ਪੱਤੇ ਦੀ ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ",
    uploadSub: "JPG, PNG ਫਾਈਲਾਂ ਸਪੋਰਟਿਡ",
    tagWeather: "ਫੀਚਰ 3",
    titleWeather: "ਮੌਸਮ ਅਤੇ ਸਿੰਚਾਈ ਸਲਾਹਕਾਰ",
    subWeather: "ਮੌਸਮ ਦੇ ਹਿਸਾਬ ਨਾਲ ਖੇਤੀ ਦੇ ਫੈਸਲੇ ਲਓ।",
    tagFertilizer: "ਫੀਚਰ 4",
    titleFertilizer: "ਖਾਦ ਸਿਫਾਰਸ਼",
    subFertilizer: "ਫ਼ਸਲ ਲਈ ਖਾਦ ਦੀ ਸਹੀ ਮਾਤਰਾ ਜਾਣੋ।",
    tagMandi: "ਫੀਚਰ 5",
    titleMandi: "ਮੰਡੀ ਭਾਅ ਡੈਸ਼ਬੋਰਡ",
    subMandi: "ਤਾਜ਼ਾ ਮੰਡੀ ਭਾਅ ਅਤੇ AI ਵੇਚਣ ਦੀ ਸਲਾਹ।",
    tagSchemes: "ਫੀਚਰ 6",
    titleSchemes: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ",
    subSchemes: "ਆਪਣੀ ਜ਼ਮੀਨ ਮੁਤਾਬਕ ਖੇਤੀ ਸਕੀਮਾਂ ਲੱਭੋ।",
    titleEmergency: "ਕਿਸਾਨ ਸੰਕਟਕਾਲੀਨ ਮਦਦ (SOS)",
    subEmergency: "ਕੀੜਿਆਂ ਦੇ ਹਮਲੇ ਵੇਲੇ ਤੁਰੰਤ ਮਦਦ।",
    tagImpact: "ਅਸਲੀ ਨਤੀਜੇ",
    titleImpact: "ਹਜ਼ਾਰਾਂ ਪੰਜਾਬੀ ਕਿਸਾਨਾਂ ਦਾ ਭਰੋਸਾ",
    footerDesc: "ਭਾਰਤੀ ਖੇਤੀਬਾੜੀ ਲਈ ਤਿਆਰ ਕੀਤਾ AI ਮੰਚ।",
    kisanTitle: "ਕਿਸਾਨ ਮਿੱਤਰ AI",
    kisanGreet: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਕਿਸਾਨ ਮਿੱਤਰ ਹਾਂ। ਅੱਜ ਕੀ ਮਦਦ ਚਾਹੀਦੀ ਹੈ?"
  },
  ml: {
    navVoice: "ശബ്ദ സഹായി",
    navCropDoctor: "AI വിള ഡോക്ടർ",
    navWeather: "കാലാവസ്ഥ ഉപദേശം",
    navFertilizer: "വള കാൽക്കുലേറ്റർ",
    navMandi: "വിപണി വില",
    navSchemes: "സർക്കാർ പദ്ധതികൾ",
    navSOS: "🚨 അടിയന്തര സഹായം",
    heroTitle: "കൃത്രിമ ബുദ്ധിയിലൂടെ കർഷക ശാക്തീകരണം",
    heroDesc: "നിങ്ങളുടെ സ്മാർട്ട് കാർഷിക സഹായി. മാതൃഭാഷയിൽ സംസാരിച്ച് വിള രോഗങ്ങൾ കണ്ടെത്തൂ.",
    heroCTA: "സ്മാർട്ട് കൃഷി തുടങ്ങൂ",
    heroSecondaryCTA: "രോഗം പരിശോധിക്കൂ",
    featVoice: "100% ശബ്ദ നിയന്ത്രിതം",
    featLang: "13 മാതൃഭാഷകൾ",
    featOffline: "ഓഫ്‌ലൈൻ പിന്തുണ",
    previewTitle: "കിസാൻ മിത്ര AI",
    previewSub: "നമസ്കാരം കർഷക മിത്രമേ! ഇന്ന് ഞാൻ എങ്ങനെ സഹായിക്കണം?",
    prompt1: "തക്കാളി ഇലപ്പുള്ളി",
    prompt2: "നാളെ മഴ പെയ്യുമോ?",
    prompt3: "ഗോതമ്പ് വിപണി വില",
    prompt4: "നെല്ലിന് മികച്ച വളം",
    tagVoice: "സവിശേഷത 1",
    titleVoice: "സ്മാർട്ട് ശബ്ദ സഹായി",
    subVoice: "മൈക്ക് ബട്ടൺ അമർത്തി മലയാളത്തിൽ സംസാരിക്കൂ.",
    micTapPrompt: "മൈക്ക് അമർത്തി സംസാരിക്കൂ",
    micHintText: 'ഉദാഹരണം: "നാളെ മഴ പെയ്യുമോ?"',
    inputPlaceholder: "ചോദ്യം മലയാളത്തിൽ ടൈപ്പ് ചെയ്യൂ...",
    btnAsk: "ചോദിക്കൂ",
    btnListen: "ശബ്ദത്തിൽ കേൾക്കൂ",
    tagDoctor: "സവിശേഷത 2",
    titleDoctor: "AI വിള ഡോക്ടർ",
    subDoctor: "ഇലയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്ത് രോഗപരിഹാരം കാണൂ.",
    uploadTitle: "ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യൂ",
    uploadSub: "JPG, PNG ഫയലുകൾ ലഭ്യം",
    tagWeather: "സവിശേഷത 3",
    titleWeather: "കാലാവസ്ഥാ ഉപദേശകൻ",
    subWeather: "കാലാവസ്ഥയ്ക്കനുസരിച്ച് കൃഷി തീരുമാനങ്ങൾ എടുക്കൂ.",
    tagFertilizer: "സവിശേഷത 4",
    titleFertilizer: "വള ശുപാർശ",
    subFertilizer: "ശരിയായ വളത്തിന്റെ അളവ് അറിയൂ.",
    tagMandi: "സവിശേഷത 5",
    titleMandi: "വിപണി വിലകൾ",
    subMandi: "തത്സമയ വിപണി വിലകളും AI ഉപദേശവും.",
    tagSchemes: "സവിശേഷത 6",
    titleSchemes: "സർക്കാർ പദ്ധതികൾ",
    subSchemes: "നിങ്ങളുടെ ഭൂമിക്കനുയോജ്യമായ പദ്ധതികൾ കണ്ടെത്തൂ.",
    titleEmergency: "അടിയന്തര സഹായം (SOS)",
    subEmergency: "കീടബാധയോ വെള്ളപ്പൊക്കമോ ഉണ്ടായാൽ അടിയന്തര സഹായം.",
    tagImpact: "യഥാർത്ഥ ഫലങ്ങൾ",
    titleImpact: "ആയിരക്കണക്കിന് കർഷകരുടെ വിശ്വാസം",
    footerDesc: "ഇന്ത്യൻ കൃഷിക്കായി രൂപകൽപ്പന ചെയ്ത AI പ്ലാറ്റ്ഫോം.",
    kisanTitle: "കിസാൻ മിത്ര AI",
    kisanGreet: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI കിസാൻ മിത്രയാണ്. ഇന്ന് എന്താണ് സഹായം വേണ്ടത്?"
  },
  or: {
    navVoice: "ସ୍ୱର ସହାୟକ",
    navCropDoctor: "AI ଫସଲ ଡାକ୍ତର",
    navWeather: "ପାଣିପାଗ ପରାମର୍ଶ",
    navFertilizer: "ଖତ କାଲକୁଲେଟର",
    navMandi: "ମଣ୍ଡି ଦର",
    navSchemes: "ସରକାରୀ ଯୋଜନା",
    navSOS: "🚨 ଜରୁରୀ ସହାୟତା",
    heroTitle: "କୃତ୍ରିମ ବୁଦ୍ଧିମତ୍ତା ଦ୍ୱାରା କୃଷକଙ୍କ ସଶକ୍ତିକରଣ",
    heroDesc: "ଆପଣଙ୍କର ସମ୍ପୂର୍ଣ୍ଣ ସ୍ମାର୍ଟ କୃଷି ସାଥୀ। ମାତୃଭାଷାରେ କଥା ହୁଅନ୍ତୁ ଏବଂ ଫସଲ ରୋଗ ଚିହ୍ନଟ କରନ୍ତୁ।",
    heroCTA: "ସ୍ମାର୍ଟ କୃଷି ଆରମ୍ଭ କରନ୍ତୁ",
    heroSecondaryCTA: "ରୋଗ ପରୀକ୍ଷା କରନ୍ତୁ",
    featVoice: "୧୦୦% ସ୍ୱର ଚାଳିତ",
    featLang: "୧୩ ମାତୃଭାଷା",
    featOffline: "ଅଫଲାଇନ୍ ସୁବିଧା",
    previewTitle: "କିଷାନ ମିତ୍ର AI",
    previewSub: "ନମସ୍କାର କୃଷକ ଭାଇ! ଆଜି ଆପଣଙ୍କର କିପରି ସାହାଯ୍ୟ କରିବି?",
    prompt1: "ବିଲାତି ପତ୍ର ଦାଗ",
    prompt2: "କାଲି ବର୍ଷା ହେବ କି?",
    prompt3: "ଗହମ ମଣ୍ଡି ଦର",
    prompt4: "ଧାନ ପାଇଁ ଉତ୍ତମ ଖତ",
    tagVoice: "ବୈଶିଷ୍ଟ୍ୟ ୧",
    titleVoice: "ସ୍ମାର୍ଟ ସ୍ୱର ସହାୟକ",
    subVoice: "ମାଇକ୍ ବଟନ୍ ଦବାନ୍ତୁ ଏବଂ ଓଡ଼ିଆ ଭାଷାରେ କୁହନ୍ତୁ।",
    micTapPrompt: "ମାଇକ୍ ଦବାନ୍ତୁ ଏବଂ କୁହନ୍ତୁ",
    micHintText: 'ଉଦାହରଣ: "କାଲି ବର୍ଷା ହେବ କି?"',
    inputPlaceholder: "ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଓଡ଼ିଆରେ ଲେଖନ୍ତୁ...",
    btnAsk: "ପଚାରନ୍ତୁ",
    btnListen: "ସ୍ୱରରେ ଶୁଣନ୍ତୁ",
    tagDoctor: "ବୈଶିଷ୍ଟ୍ୟ ୨",
    titleDoctor: "AI ଫସଲ ଡାକ୍ତର",
    subDoctor: "ପତ୍ରର ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ ଏବଂ ତୁରନ୍ତ ଚିକିତ୍ସା ପାଆନ୍ତୁ।",
    uploadTitle: "ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ",
    uploadSub: "JPG, PNG ଫାଇଲ୍ ସମର୍ଥିତ",
    tagWeather: "ବୈଶିଷ୍ଟ୍ୟ ୩",
    titleWeather: "ପାଣିପାଗ ପରାମର୍ଶଦାତା",
    subWeather: "ପାଣିପାଗ ଅନୁସାରେ କୃଷି ନିଷ୍ପତ୍ତି ନିଅନ୍ତୁ।",
    tagFertilizer: "ବୈଶିଷ୍ଟ୍ୟ ୪",
    titleFertilizer: "ଖତ ସୁପାରିଶ",
    subFertilizer: "ସଠିକ୍ ଖତର ପରିମାଣ ଜାଣନ୍ତୁ।",
    tagMandi: "ବୈଶିଷ୍ଟ୍ୟ ୫",
    titleMandi: "ମଣ୍ଡି ଦର ଡ୍ୟାସବୋର୍ଡ",
    subMandi: "ଦୈନନ୍ଦିନ ବଜାର ଦର ଏବଂ AI ପରାମର୍ଶ।",
    tagSchemes: "ବୈଶିଷ୍ଟ୍ୟ ୬",
    titleSchemes: "ସରକାରୀ ଯୋଜନା",
    subSchemes: "ଜମି ଅନୁସାରେ ଯୋଜନା ଖୋଜନ୍ତୁ।",
    titleEmergency: "ଜରୁରୀ ସହାୟତା (SOS)",
    subEmergency: "ପୋକ ଆକ୍ରମଣ ସମୟରେ ତୁରନ୍ତ ସହାୟତା।",
    tagImpact: "ପ୍ରକୃତ ଫଳାଫଳ",
    titleImpact: "ହଜାର ହଜାର କୃଷକଙ୍କ ବିଶ୍ୱାସ",
    footerDesc: "ଭାରତୀୟ କୃଷି ପାଇଁ ନିର୍ମିତ AI ମଞ୍ଚ।",
    kisanTitle: "କିଷାନ ମିତ୍ର AI",
    kisanGreet: "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର AI କିଷାନ ମିତ୍ର। ଆଜି କ’ଣ ସାହାଯ୍ୟ ଦରକାର?"
  },
  as: {
    navVoice: "ভইচ সহায়ক",
    navCropDoctor: "AI শস্য ডাক্তাৰ",
    navWeather: "বতৰৰ পৰামৰ্শ",
    navFertilizer: "সাৰ কেলকুলেটৰ",
    navMandi: "বজাৰ দৰ",
    navSchemes: "চৰকাৰী আঁচনি",
    navSOS: "🚨 জৰুৰী সাহায্য",
    heroTitle: "কৃত্রিম বুদ্ধিমত্তাৰ দ্বাৰা কৃষকসকলৰ সবলীকৰণ",
    heroDesc: "আপোনাৰ স্মাৰ্ট কৃষি সংগী। নিজৰ মাতৃভাষাত কথা কওক আৰু শস্যৰ বেমাৰ চিনাক্ত কৰক।",
    heroCTA: "স্মাৰ্ট কৃষি আৰম্ভ কৰক",
    heroSecondaryCTA: "ৰোগ পৰীক্ষা কৰক",
    featVoice: "১০০% ভইচ চালিত",
    featLang: "১৩টা মাতৃভাষা",
    featOffline: "অফলাইন সুবিধা",
    previewTitle: "কিসান মিত্র AI",
    previewSub: "নমস্কাৰ কৃষক ভাই! আজি আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?",
    prompt1: "বিলাহী পাতৰ দাগ",
    prompt2: "কাইলৈ বৰষুণ হ’ব নেকি?",
    prompt3: "ঘেঁহুৰ বজাৰ দৰ",
    prompt4: "ধানৰ বাবে শ্ৰেষ্ঠ সাৰ",
    tagVoice: "বৈশিষ্ট্য ১",
    titleVoice: "স্মাৰ্ট ভইচ সহায়ক",
    subVoice: "মাইক বুটামত ক্লিক কৰক আৰু অসমীয়াত কথা কওক।",
    micTapPrompt: "মাইক টিপি কথা কওক",
    micHintText: 'উদাহৰণ: "কাইলৈ বৰষুণ হ’ব নেকি?"',
    inputPlaceholder: "আপোনাৰ প্ৰশ্ন অসমীয়াত লিখক...",
    btnAsk: "সোধক",
    btnListen: "শব্দত শুনক",
    tagDoctor: "বৈশিষ্ট্য ২",
    titleDoctor: "AI শস্য ডাক্তাৰ",
    subDoctor: "পাতৰ ফটো আপলোড কৰক আৰু লগে লগে প্ৰতিকাৰ পাওক।",
    uploadTitle: "ফটো আপলোড কৰক",
    uploadSub: "JPG, PNG ফাইল সমৰ্থিত",
    tagWeather: "বৈশিষ্ট্য ৩",
    titleWeather: "বতৰ পৰামৰ্শদাতা",
    subWeather: "বতৰৰ পূৰ্বাভাস মতে খেতিৰ সিদ্ধান্ত লওক।",
    tagFertilizer: "বৈশিষ্ট্য ৪",
    titleFertilizer: "সাৰ ব্যৱহাৰৰ পৰামৰ্শ",
    subFertilizer: "সঠিক সাৰৰ পৰিমাণ জানক।",
    tagMandi: "বৈশিষ্ট্য ৫",
    titleMandi: "বজাৰ দৰ ডেশ্বব’ৰ্ড",
    subMandi: "দৈনিক বজাৰ দৰ আৰু AI পৰামৰ্শ।",
    tagSchemes: "বৈশিষ্ট্য ৬",
    titleSchemes: "চৰকাৰী আঁচনি",
    subSchemes: "আপোনাৰ মাটিৰ মাপ মতে আঁচনি বিচাৰক।",
    titleEmergency: "জৰুৰী সাহায্য (SOS)",
    subEmergency: "পোকৰ আক্ৰমণ বা বানপানীৰ সময়ত সহায়।",
    tagImpact: "প୍ରকৃত ফলাফল",
    titleImpact: "হেজাৰ হেজাৰ অসমীয়া কৃষকৰ বিশ্বাস",
    footerDesc: "ভাৰতীয় কৃষিৰ বাবে তৈয়াৰ কৰা AI মঞ্চ।",
    kisanTitle: "কিসান মিত্র AI",
    kisanGreet: "নমস্কাৰ! মই আপোনাৰ AI কিসાન মিত্র। আজি কি সহায় লাগে?"
  },
  ur: {
    navVoice: "صوتی اسسٹنٹ",
    navCropDoctor: "AI فصل ڈاکٹر",
    navWeather: "موسم کی ایڈوائزری",
    navFertilizer: "کھاد کیلکولیٹر",
    navMandi: "منڈی کی قیمت",
    navSchemes: "سرمایہ کاری اسکیمیں",
    navSOS: "🚨 ہنگامی امداد",
    heroTitle: "مصنوعی ذہانت کے ذریعے کسانوں کو بااختیار بنانا",
    heroDesc: "آپ کا ہمہ گیر اسمارٹ زرعی ساتھی۔ اپنی مادری زبان میں بات کریں اور فصل کی بیماریاں معلوم کریں۔",
    heroCTA: "اسمارٹ زراعت شروع کریں",
    heroSecondaryCTA: "بیماری چیک کریں",
    featVoice: "100٪ صوتی فعال",
    featLang: "13 مادری زبانیں",
    featOffline: "آف لائن سپورٹ",
    previewTitle: "کسان متر AI",
    previewSub: "السلام علیکم کسان بھائی! آج میں آپ کی کیا مدد کر سکتا ہوں؟",
    prompt1: "ٹماٹر کے پتوں پر دھبے",
    prompt2: "کیا کل بارش ہوگی؟",
    prompt3: "گندم کا منڈی بھاؤ",
    prompt4: "دھان کے لیے بہترین کھاد",
    tagVoice: "خصوصیت 1",
    titleVoice: "اسمارٹ صوتی اسسٹنٹ",
    subVoice: "مائیک کا بٹن دبائیں اور اپنی اردو زبان میں بولیں۔",
    micTapPrompt: "مائیک دبائیں اور بولیں",
    micHintText: 'مثال: "کیا کل بارش ہوگی؟"',
    inputPlaceholder: "اپنا سوال اردو میں لکھیں...",
    btnAsk: "پوچھیں",
    btnListen: "آواز میں سنیں",
    tagDoctor: "خصوصیت 2",
    titleDoctor: "AI فصل ڈاکٹر",
    subDoctor: "پتے کی تصویر اپ لوڈ کریں اور فوری علاج حاصل کریں۔",
    uploadTitle: "پتے کی تصویر اپ لوڈ کریں",
    uploadSub: "JPG, PNG فائلیں مدعوم ہیں",
    tagWeather: "خصوصیت 3",
    titleWeather: "موسم اور آبپاشی کا مشیر",
    subWeather: "موسم کی پیش گوئی کے مطابق زراعت کے فیصلے کریں۔",
    tagFertilizer: "خصوصیت 4",
    titleFertilizer: "کھاد کی تجویز",
    subFertilizer: "کھاد کی درست مقدار معلوم کریں۔",
    tagMandi: "خصوصیت 5",
    titleMandi: "منڈی ریٹ ڈیش بورڈ",
    subMandi: "روزانہ کے منڈی ریٹ اور AI فروخت کا مشورہ۔",
    tagSchemes: "خصوصیت 6",
    titleSchemes: "سرمایہ کاری اسکیمیں",
    subSchemes: "اپنی زمین کے مطابق اسکیمیں تلاش کریں۔",
    titleEmergency: "ہنگامی امداد (SOS)",
    subEmergency: "کیڑوں کے حملے یا سیلاب کے وقت فوری مدد۔",
    tagImpact: "حقیقی نتائج",
    titleImpact: "ہزاروں کسانوں کا اعتماد",
    footerDesc: "ہندوستانی زراعت کے لیے تیار کردہ AI پلیٹ فارم۔",
    kisanTitle: "کسان متر AI",
    kisanGreet: "السلام علیکم! میں آپ کا AI کسان متر ہوں۔ آج میں کیا مدد کر سکتا ہوں؟"
  }
};

/* ==========================================================================
   NATIVE MULTILINGUAL AI ASSISTANT RESPONSE ENGINE
   ========================================================================== */
const nativeResponses = {
  disease: {
    en: {
      label: "Crop Disease Diagnosis",
      speech: "Leaf spot fungal infection detected in your crop. Spray Mancozeb 75% WP at 2 grams per litre of water immediately.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">Detected: Leaf Spot Fungal Infection</h4><p>Your crop symptoms indicate early fungal leaf blight due to high moisture.</p><ul class="solution-steps"><li><strong>Immediate Spray:</strong> Spray Mancozeb 75% WP @ 2g/litre of water immediately.</li><li><strong>Organic Remedy:</strong> Spray Neem Oil (10,000 PPM) 5ml per litre in evening hours.</li><li><strong>Precaution:</strong> Remove infected lower yellow leaves to stop spore spreading.</li></ul>`
    },
    hi: {
      label: "फसल रोग निदान",
      speech: "आपकी फसल में पत्तियों के धब्बे (फफूंद रोग) के लक्षण हैं। मैंकोजेब 75% WP दो ग्राम प्रति लीटर पानी में मिलाकर तुरंत छिड़काव करें।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">पहचाना गया: लीफ स्पॉट फफूंद रोग (Leaf Spot)</h4><p>अत्यधिक नमी के कारण फसल में अगेती झुलसा के लक्षण हैं।</p><ul class="solution-steps"><li><strong>तुरंत छिड़काव:</strong> 2 ग्राम/लीटर मैंकोजेब 75% WP का छिड़काव करें।</li><li><strong>जैविक उपाय:</strong> शाम को नीम का तेल (10,000 PPM) 5 मि.ली./लीटर छिड़कें।</li><li><strong>सावधानी:</strong> संक्रमित पीले पत्तों को तोड़कर दूर नष्ट करें।</li></ul>`
    },
    pa: {
      label: "ਫ਼ਸਲ ਰੋਗ ਨਿਦਾਨ",
      speech: "ਤੁਹਾਡੀ ਫ਼ਸਲ ਵਿੱਚ ਪੱਤਿਆਂ ਦੇ ਧੱਬੇ ਦੀ ਫੰਗਲ ਇਨਫੈਕਸ਼ਨ ਹੈ। ਮੈਨਕੋਜ਼ੇਬ 75% WP 2 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਮਿਲਾ ਕੇ ਤੁਰੰਤ ਛਿੜਕਾਅ ਕਰੋ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ਸ਼ਨਾਖਤ: ਪੱਤਿਆਂ ਦੇ ਧੱਬੇ ਦੀ ਫੰਗਲ ਬਿਮਾਰੀ</h4><p>ਜ਼ਿਆਦਾ ਨਮੀ ਕਾਰਨ ਫ਼ਸਲ 'ਤੇ ਫੰਗਸ ਦਾ ਹਮਲਾ ਹੋਇਆ ਹੈ।</p><ul class="solution-steps"><li><strong>ਤੁਰੰਤ ਛਿੜਕਾਅ:</strong> 2 ਗ੍ਰਾਮ/ਲੀਟਰ ਮੈਨਕੋਜ਼ੇਬ 75% WP ਦਾ ਛਿੜਕਾਅ ਕਰੋ।</li><li><strong>ਜੈਵਿਕ ਹੱਲ:</strong> ਸ਼ਾਮ ਨੂੰ ਨਿੰਮ ਦਾ ਤੇਲ 5ml/ਲੀਟਰ ਛਿੜਕੋ।</li><li><strong>ਸਾਵਧਾਨੀ:</strong> ਸੰਕ੍ਰਮਿਤ ਪੀਲੇ ਪੱਤਿਆਂ ਨੂੰ ਤੋੜ ਕੇ ਨਸ਼ਟ ਕਰੋ।</li></ul>`
    },
    mr: {
      label: "पीक रोग निदान",
      speech: "तुमच्या पिकावर पानावरील ठिपके (बुरशीजन्य रोग) आढळले आहेत. मँकोझेब ७५% डब्ल्यूपी २ ग्रॅम प्रति लिटर पाण्यात मिसळून तात्काळ फवारणी करा.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">निदान: पानांवरील ठिपके बुरशीजन्य रोग</h4><p>जास्त दमट हवामानामुळे पिकावर बुरशीचा प्रादुर्भाव झाला आहे.</p><ul class="solution-steps"><li><strong>तात्काळ फवारणी:</strong> मँकोझेब ७५% डब्ल्यूपी २ ग्रॅम/लिटर पाण्यात मिसळून फवारा.</li><li><strong>जैविक उपाय:</strong> संध्याकाळी कडुलिंब तेल ५ मि.ली./लिटर फवारा.</li><li><strong>काळजी:</strong> बाधित पिवळी पाने तोडून नष्ट करा.</li></ul>`
    },
    gu: {
      label: "પાક રોગ નિદાન",
      speech: "તમારા પાકમાં પાંદડાના ટપકાં (ફૂગનો રોગ) જોવા મળ્યો છે. મેન્કોઝેબ 75% WP પ્રતિ લીટર પાણીમાં 2 ગ્રામ ભેળવીને તાત્કાલિક છંટકાવ કરો.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">નિદાન: પાંદડાના ટપકાંનો ફૂગ રોગ</h4><p>વધુ ભેજને કારણે પાકમાં ફૂગનો ઉપદ્રવ થયો છે.</p><ul class="solution-steps"><li><strong>તાત્કાલિક છંટકાવ:</strong> મેન્કોઝેબ 75% WP 2 ગ્રામ/લીટર પાણીમાં છાંટો.</li><li><strong>જૈવિક ઉપાય:</strong> સાંજે લીમડાનું તેલ 5ml/લીટર વાપરો.</li><li><strong>સાવચેતી:</strong> રોગગ્રસ્ત પીળા પાંદડાં તોડીને નાશ કરો.</li></ul>`
    },
    kn: {
      label: "ಬೆಳೆ ರೋಗ ಪತ್ತೆ",
      speech: "ನಿಮ್ಮ ಬೆಳೆಯಲ್ಲಿ ಎಲೆ ಚುಕ್ಕೆ ಶಿಲೀಂಧ್ರ ರೋಗ ಕಂಡುಬಂದಿದೆ. ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP ಅನ್ನು 2 ಗ್ರಾಂ ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ ಬೆರೆಸಿ ತಕ್ಷಣ ಸಿಂಪಡಿಸಿ.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ಪತ್ತೆಯಾಗಿದೆ: ಎಲೆ ಚುಕ್ಕೆ ಶಿಲೀಂಧ್ರ ರೋಗ</h4><p>ಹೆಚ್ಚಿನ ತೇವಾಂಶದಿಂದಾಗಿ ಬೆಳೆಗೆ ಶಿಲೀಂಧ್ರ ಬಾಧೆ ಉಂಟಾಗಿದೆ.</p><ul class="solution-steps"><li><strong>ತಕ್ಷಣದ ಔಷಧ:</strong> 2 ಗ್ರಾಂ/ಲೀಟರ್ ಮ್ಯಾಂಕೋಜೆಬ್ 75% ಸಿಂಪಡಿಸಿ.</li><li><strong>ಸಾವಯವ ಪರಿಹಾರ:</strong> ಸಂಜೆ 5 ಮಿಲಿ ಬೇಪಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ.</li><li><strong>ಮುನ್ನೆಚ್ಚರಿಕೆ:</strong> ಸೋಂಕಿತ ಹಳದಿ ಎಲೆಗಳನ್ನು ನಾಶಪಡಿಸಿ.</li></ul>`
    },
    ta: {
      label: "பயிர் நோய் கண்டறிதல்",
      speech: "உங்கள் பயிரில் இலைப்புள்ளி பூஞ்சை நோய் கண்டறியப்பட்டுள்ளது. மேன்கோசெப் 75% WP 2 கிராம்/லிட்டர் தண்ணீரில் கலந்து உடனே தெளிக்கவும்.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">கண்டறியப்பட்டது: இலைப்புள்ளி பூஞ்சை நோய்</h4><p>அதிக ஈரப்பதம் காரணமாக பயிரில் பூஞ்சை நோய் ஏற்பட்டுள்ளது.</p><ul class="solution-steps"><li><strong>உடனடி தெளிப்பு:</strong> மேன்கோசெப் 75% WP 2 கிராம்/லிட்டர் தெளிக்கவும்.</li><li><strong>இயற்கை மருந்து:</strong> வேப்ப எண்ணெய் 5 மி.லி/லிட்டர் தெளிக்கவும்.</li><li><strong>முன்னெச்சரிக்கை:</strong> பாதிக்கப்பட்ட மஞ்சள் இலைகளை அகற்றவும்.</li></ul>`
    },
    te: {
      label: "పంట తెగులు నిర్ధారణ",
      speech: "మీ పంటలో ఆకు మచ్చల శిలీంధ్ర తెగులు గుర్తించబడింది. లీటరు నీటికి 2 గ్రాముల మ్యాంకోజెబ్ 75% WP వెంటనే పిచికారీ చేయండి.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">గుర్తించబడింది: ఆకు మచ్చల ఫంగల్ తెగులు</h4><p>అధిక తేమ వల్ల ఆకు మచ్చ తెగులు ఆవహించింది.</p><ul class="solution-steps"><li><strong>తక్షణ పిచికారీ:</strong> లీటరు నీటికి 2 గ్రాముల మ్యాంకోజెబ్ చల్లండి.</li><li><strong>సేంద్రీయ లెక్కింపు:</strong> సాయంత్రం వేప నూనె 5ml/L పిచికారీ చేయండి.</li><li><strong>జాగ్రత్త:</strong> తెగులు సోకిన ఆకులను ఏరి వేయండి.</li></ul>`
    },
    bn: {
      label: "শস্য রোগ শনাক্তকরণ",
      speech: "আপনার ফসলে পাতার দাগ ছত্রাকজনিত রোগ শনাক্ত হয়েছে। ম্যানকোজেব ৭৫% ডাব্লিউপি প্রতি লিটার জলে ২ গ্রাম মিশিয়ে অবিলম্বে স্প্রে করুন।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">শনাক্ত করা হয়েছে: পাতার দাগ ছত্রাক রোগ</h4><p>অতিরিক্ত আর্দ্রতার কারণে ফসলে ছত্রাকের সংক্রমণ ঘটেছে।</p><ul class="solution-steps"><li><strong>অবিলম্বে স্প্রে:</strong> প্রতি লিটার জলে ২ গ্রাম ম্যানকোজেব ৭৫% স্প্রে করুন।</li><li><strong>জৈব প্রতিকার:</strong> বিকেলে নিম তেল ৫ মি.লি./লিটার প্রয়োগ করুন।</li><li><strong>সতর্কতা:</strong> সংক্রমিত হলুদ পাতা তুলে নষ্ট করুন।</li></ul>`
    },
    ml: {
      label: "വിള രോഗ നിർണയം",
      speech: "നിങ്ങളുടെ വിളയിൽ ഇലപ്പുള്ളി ഫംഗസ് രോഗം കണ്ടത്തിയിരിക്കുന്നു. മാങ്കോസെബ് 75% WP ലിറ്ററിന് 2 ഗ്രാം വീതം ചേർത്ത് ഉടനടി തളിക്കുക.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">കണ്ടെത്തിയിരിക്കുന്നു: ഇലപ്പുള്ളി ഫംഗസ് രോഗം</h4><p>അമിത ഈർപ്പം കാരണം ഫംഗസ് ബാധ ഉണ്ടായിരിക്കുന്നു.</p><ul class="solution-steps"><li><strong>ഉടനടി തളിക്കാൻ:</strong> മാങ്കോസെബ് 75% WP ലിറ്ററിന് 2 ഗ്രാം തളിക്കുക.</li><li><strong>ജൈവ രീതി:</strong> വൈകുന്നേരം വേപ്പെണ്ണ 5ml/L തളിക്കുക.</li><li><strong>ജാഗ്രത:</strong> രോഗബാധിതമായ മഞ്ഞ ഇലകൾ നശിപ്പിക്കുക.</li></ul>`
    },
    or: {
      label: "ଫସଲ ରୋଗ ଚିହ୍ନଟ",
      speech: "ଆପଣଙ୍କ ଫସଲରେ ପତ୍ର ଦାଗ ଫଙ୍ଗସ ରୋଗ ଚିହ୍ନଟ ହୋଇଛି। ମ୍ୟାଙ୍କୋଜେବ ୭୫% WP ଲିଟର ପ୍ରତି ୨ ଗ୍ରାମ ମିଶାଇ ତୁରନ୍ତ ସ୍ପ୍ରେ କରନ୍ତୁ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ଚିହ୍ନଟ: ପତ୍ର ଦାଗ ଫଙ୍ଗାଲ୍ ରୋଗ</h4><p>ଅଧିକ ଆର୍ଦ୍ରତା ହେତୁ ଫସଲରେ ଫଙ୍ଗସ୍ ସଂକ୍ରମଣ ହୋଇଛି।</p><ul class="solution-steps"><li><strong>ତୁରନ୍ତ ସ୍ପ୍ରେ:</strong> ଲିଟର ପ୍ରତି ୨ ଗ୍ରାମ ମ୍ୟାଙ୍କୋଜେବ ସ୍ପ୍ରେ କରନ୍ତୁ।</li><li><strong>ଜୈବିକ ଉପାୟ:</strong> ସନ୍ଧ୍ୟାରେ ନିମ୍ବ ତେଲ ୫ml/L ବ୍ୟବହାର କରନ୍ତୁ।</li><li><strong>ସାବଧାନତା:</strong> ସଂକ୍ରମିତ ହଳଦିଆ ପତ୍ର ନଷ୍ଟ କରନ୍ତୁ।</li></ul>`
    },
    as: {
      label: "শস্য ৰোগ চিনাক্তকৰণ",
      speech: "আপোনাৰ শস্যত পাতৰ দাগ ফাংগেল ৰোগ ধৰা পৰিছে। মেনকোজেব ৭৫% WP প্রতি লিটাৰ পানীত ২ গ্ৰাম মিহলাই লগে লগে স্প্ৰে কৰক।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">চিনাক্ত হ'ল: পাতৰ দাগ ফাংগেল ৰোগ</h4><p>অধিক আৰ্দ্ৰতাৰ বাবে শস্যত ভেঁকুৰৰ সংক্ৰমণ হৈছে।</p><ul class="solution-steps"><li><strong>লগে লগে স্প্ৰে কৰক:</strong> ২ গ্ৰাম/লিটাৰ মেনকোজেব ৭৫% WP স্প্ৰে কৰক।</li><li><strong>জৈৱিক উপায়:</strong> গধূলি নিম তেল ৫ml/লিটাৰ স্প্ৰে কৰক।</li><li><strong>সজাগতা:</strong> ৰোগাক্ৰান্ত হালধীয়া পাত আঁতৰাই পেলাওক।</li></ul>`
    },
    ur: {
      label: "فصل کی بیماری کی تشخیص",
      speech: "آپ کی فصل میں پتوں کے دھبے کی فنگل بیماری تشخیص ہوئی ہے۔ مینکوزیب 75٪ ڈبلیو پی 2 گرام فی لیٹر پانی میں ملا کر فوری اسپرے کریں۔",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">تشخیص: پتوں کے دھبے کی فنگل بیماری</h4><p>زیادہ نمی کی وجہ سے فنگل انفلیکشن کے اثرات ہیں۔</p><ul class="solution-steps"><li><strong>فوری اسپرے:</strong> مینکوزیب 75٪ ڈبلیو پی 2 گرام فی لیٹر پانی میں اسپرے کریں۔</li><li><strong>نامیاتی علاج:</strong> شام کو نیم کا تیل 5 ملی لیٹر فی لیٹر اسپرے کریں۔</li><li><strong>احتیاط:</strong> متاثرہ زرد پتوں کو توڑ کر تلف کریں۔</li></ul>`
    }
  },
  weather: {
    en: {
      label: "Weather Forecast Alert",
      speech: "Weather Advisory: Light rain (15% chance) expected tomorrow with temperatures around 28°C. Safe to irrigate crops today morning.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">Weather Advisory: Partly Cloudy (15% Rain Chance)</h4><p>Tomorrow will remain partly cloudy with light wind speeds (12 km/h).</p><ul class="solution-steps"><li><strong>Irrigation:</strong> ✅ Safe to irrigate crops today morning.</li><li><strong>Spraying:</strong> ❌ Avoid heavy pesticide spraying due to moderate wind drift.</li><li><strong>Harvesting:</strong> Harvested grains should be covered with tarpaulin sheets.</li></ul>`
    },
    hi: {
      label: "मौसम पूर्वानुमान चेतावनी",
      speech: "आपके क्षेत्र में कल 15 प्रतिशत बारिश की संभावना है। तापमान 28 डिग्री सेल्सियस रहेगा। आज सुबह सिंचाई करना सुरक्षित है।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">मौसम सलाह: आंशिक बादल (15% बारिश की संभावना)</h4><p>कल हल्की हवाओं (12 किमी/घंटा) के साथ मौसम सुहावना रहेगा।</p><ul class="solution-steps"><li><strong>सिंचाई:</strong> ✅ आज सुबह फसलों की सिंचाई करना सुरक्षित है।</li><li><strong>छिड़काव:</strong> ❌ तेज़ हवा के कारण कीटनाशक छिड़काव से बचें।</li><li><strong>कटाई:</strong> कटी फसल को त्रिपाल से ढककर सुरक्षित रखें।</li></ul>`
    },
    pa: {
      label: "ਮੌਸਮ ਪੂਰਵ-ਅਨੁਮਾਨ ਸਲਾਹ",
      speech: "ਤੁਹਾਡੇ ਇਲਾਕੇ ਵਿੱਚ ਕੱਲ੍ਹ 15 ਪ੍ਰਤੀਸ਼ਤ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਅੱਜ ਸਵੇਰੇ ਸਿੰਚਾਈ ਕਰਨਾ ਸੁਰੱਖਿਅਤ ਹੈ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ਮੌਸਮ ਸਲਾਹ: ਹਲਕੇ ਬੱਦਲ (15% ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ)</h4><p>ਕੱਲ੍ਹ ਹਲਕੀਆਂ ਹਵਾਵਾਂ ਨਾਲ ਮੌਸਮ ਸਾਫ਼ ਰਹੇਗਾ।</p><ul class="solution-steps"><li><strong>ਸਿੰਚਾਈ:</strong> ✅ ਅੱਜ ਸਵੇਰੇ ਫ਼ਸਲ ਦੀ ਸਿੰਚਾਈ ਕਰਨਾ ਸੁਰੱਖਿਅਤ ਹੈ।</li><li><strong>ਛਿੜਕਾਅ:</strong> ❌ ਤੇਜ਼ ਹਵਾ ਕਾਰਨ ਦਵਾਈ ਛਿੜਕਣ ਤੋਂ ਬਚੋ।</li><li><strong>ਵਾਢੀ:</strong> ਵੱਢੀ ਫ਼ਸਲ ਨੂੰ ਤਰਪਾਲ ਨਾਲ ਢੱਕ ਕੇ ਰੱਖੋ।</li></ul>`
    },
    mr: {
      label: "हवामान अंदाज सूचना",
      speech: "तुमच्या भागात उद्या १५ टक्के पावसाची शक्यता आहे. आज सकाळी पिकांना पाणी देणे सुरक्षित आहे.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">हवामान सल्ला: अंशतः ढगाळ (१५% पावसाची शक्यता)</h4><p>उद्या मंद वाऱ्यासह हवामान छान राहील.</p><ul class="solution-steps"><li><strong>सिंचन:</strong> ✅ आज सकाळी पिकांना पाणी देणे सुरक्षित आहे.</li><li><strong>फवारणी:</strong> ❌ वाऱ्यामुळे औषध फवारणी टाळावी.</li><li><strong>कापणी:</strong> काढलेले धान्य ताडपत्रीने झाकून ठेवा.</li></ul>`
    },
    gu: {
      label: "હવામાન આગાહી સલાહ",
      speech: "તમારા વિસ્તારમાં કાલે 15 ટકા વરસાદની શક્યતા છે. આજે સવારે પિયત આપવું સુરક્ષિત છે.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">હવામાન સલાહ: આંશિક વાદળછાયું (15% વરસાદની શક્યતા)</h4><p>કાલે હળવા પવન સાથે હવામાન અનુકૂળ રહેશે.</p><ul class="solution-steps"><li><strong>પિયત:</strong> ✅ આજે સવારે પાકને પિયત આપવું સુરક્ષિત છે.</li><li><strong>છંટકાવ:</strong> ❌ પવનને કારણે દવા છંટકાવ ટાળો.</li><li><strong>લણણી:</strong> કાપેલા પાકને તાળપત્રીથી ઢાંકીને રાખો.</li></ul>`
    },
    kn: {
      label: "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
      speech: "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ನಾಳೆ 15 ಪ್ರತಿಶತ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ. ಇಂದು ಬೆಳಿಗ್ಗೆ ನೀರಾವರಿ ಮಾಡುವುದು ಸುರಕ್ಷಿತ.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ಹವಾಮಾನ ಸಲಹೆ: ಭಾಗಶಃ ಮೋಡ (15% ಮಳೆ ಸಾಧ್ಯತೆ)</h4><p>ನಾಳೆ ಹಗುರ ಗಾಳಿಯೊಂದಿಗೆ ಹವಾಮಾನ ಹಿತಕರವಾಗಿರುತ್ತದೆ.</p><ul class="solution-steps"><li><strong>ನೀರಾವರಿ:</strong> ✅ ಇಂದು ಬೆಳಿಗ್ಗೆ ಬೆಳೆಗೆ ನೀರು ಹಾಯಿಸುವುದು ಸುರಕ್ಷಿತ.</li><li><strong>ಸಿಂಪಡಣೆ:</strong> ❌ ಗಾಳಿಯ ಕಾರಣ ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ ಬೇಡ.</li><li><strong>ಕೊಯ್ಲು:</strong> ಕಟಾವು ಮಾಡಿದ ಧಾನ್ಯವನ್ನು ತಾರ್ಪಾಲಿನಿಂದ ಮುಚ್ಚಿ.</li></ul>`
    },
    ta: {
      label: "வானிலை எச்சரிக்கை",
      speech: "உங்கள் பகுதியில் நாளை 15 சதவீதம் மழை பெய்ய வாய்ப்புள்ளது. இன்று காலை பாசனம் செய்வது பாதுகாப்பானது.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">வானிலை ஆலோசனை: மேகமூட்டம் (15% மழை வாய்ப்பு)</h4><p>நாளை மிதமான காற்றுடன் வானிலை நன்றாக இருக்கும்.</p><ul class="solution-steps"><li><strong>பாசனம்:</strong> ✅ இன்று காலை பயிர்களுக்கு பாசனம் செய்யலாம்.</li><li><strong>மருந்து தெளிப்பு:</strong> ❌ காற்று காரணமாக பூச்சிக்கொல்லி தெளிப்பதை தவிர்க்கவும்.</li><li><strong>அறுவடை:</strong> அறுவடை செய்த தானியங்களை தார்பாயால் மூடவும்.</li></ul>`
    },
    te: {
      label: "వాతావరణ హెచ్చరిక",
      speech: "మీ ప్రాంతంలో రేపు 15 శాతం వర్షం పడే అవకాశం ఉంది. ఈరోజు ఉదయం నీటిపారుదల చేయడం సురక్షితం.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">వాతావరణ సలహా: పాక్షికంగా మబ్బులు (15% వర్షం సూచన)</h4><p>రేపు చల్లని గాలులతో వాతావరణం బాగుంటుంది.</p><ul class="solution-steps"><li><strong>నీటిపారుదల:</strong> ✅ ఈరోజు ఉదయం పంటకు నీరు పెట్టవచ్చు.</li><li><strong>పిచికారీ:</strong> ❌ ఈదురుగాలుల వల్ల మందుల పిచికారీ వద్దు.</li><li><strong>కోతలు:</strong> కోసిన ధాన్యాన్ని తార్పాలిన్‌తో కప్పి ఉంచండి.</li></ul>`
    },
    bn: {
      label: "আবহাওয়া পূর্বাভাস সতর্কতা",
      speech: "আপনার এলাকায় আগামীকাল ১৫ শতাংশ বৃষ্টির সম্ভাবনা রয়েছে। আজ সকালে সেচ দেওয়া নিরাপদ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">আবহাওয়া পরামর্শ: আংশিক মেঘলা (১৫% বৃষ্টির সম্ভাবনা)</h4><p>আগামীকাল হালকা বাতাস থাকবে।</p><ul class="solution-steps"><li><strong>সেচ:</strong> ✅ আজ সকালে ফসলে সেচ দেওয়া নিরাপদ।</li><li><strong>স্প্রে:</strong> ❌ বাতাসের কারণে কীটনাশক প্রয়োগ এড়িয়ে চলুন।</li><li><strong>কাটাই:</strong> কাটা শস্য ত্রিপল দিয়ে ঢেকে রাখুন।</li></ul>`
    },
    ml: {
      label: "കാലാവസ്ഥ മുന്നറിയിപ്പ്",
      speech: "നിങ്ങളുടെ പ്രദേശത്ത് നാളെ 15 ശതമാനം മഴയ്ക്ക് സാധ്യതയുണ്ട്. ഇന്ന് രാവിലെ നനയ്ക്കുന്നത് സുരക്ഷിതമാണ്.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">കാലാവസ്ഥ ഉപദേശം: മേഘാവൃതമായ അന്തരീക്ഷം (15% മഴ സാധ്യത)</h4><p>നാളെ മിതമായ കാറ്റ് ഉണ്ടാകും.</p><ul class="solution-steps"><li><strong>നനയ്ക്കൽ:</strong> ✅ ഇന്ന് രാവിലെ നനയ്ക്കുന്നത് സുരക്ഷിതമാണ്.</li><li><strong>തളിക്കൽ:</strong> ❌ ശക്തമായ കാറ്റുള്ളതിനാൽ മരുന്ന് തളിക്കരുത്.</li><li><strong>കൊയ്ത്ത്:</strong> കൊയ്ത ധാന്യങ്ങൾ ടാർപോളിൻ ഉപയോഗിച്ച് മൂടുക.</li></ul>`
    },
    or: {
      label: "ପାଣିପାଗ ପୂର୍ବାନୁମାନ ସୂଚନା",
      speech: "ଆପଣଙ୍କ ଅଞ୍ଚଳରେ କାଲି ୧୫ ପ୍ରତିଶତ ବର୍ଷା ସମ୍ଭାବନା ଅଛି। ଆଜି ସକାଳେ ଜଳସେଚନ କରିବା ସୁରକ୍ଷିତ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ପାଣିପାଗ ପରାମର୍ଶ: ଆଂଶିକ ମେଘୁଆ (୧୫% ବର୍ଷା ସମ୍ଭାବନା)</h4><p>କାଲି ହାଲୁକା ପବନ ସହ ପାଣିପାଗ ସୁଖଦ ରହିବ।</p><ul class="solution-steps"><li><strong>ଜଳସେଚନ:</strong> ✅ ଆଜି ସକାଳେ ଜଳସେଚନ କରିବା ସୁରକ୍ଷିତ।</li><li><strong>ସ୍ପ୍ରେ:</strong> ❌ ପବନ ଯୋଗୁଁ ଔଷଧ ସ୍ପ୍ରେ କରନ୍ତୁ ନାହିଁ।</li><li><strong>ଅମଳ:</strong> ଅମଳ ଶସ୍ୟକୁ ତ୍ରିପାଲ୍ ଘୋଡ଼ାଇ ରଖନ୍ତୁ।</li></ul>`
    },
    as: {
      label: "বতৰৰ পূৰ্বাভাস সতৰ্কতা",
      speech: "আপোনাৰ অঞ্চলত কাইলৈ ১৫ শতাংশ বৰষুণৰ সম্ভাৱনা আছে। আজি পুৱা পানী দিয়াটো সুৰক্ষিত।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">বতৰৰ পৰামৰ্শ: আংশিক ডাৱৰীয়া (১৫% বৰষুণৰ সম্ভাৱনা)</h4><p>কাইলৈ মৃদু বতাহৰ সৈতে বতৰ সুন্দৰ হ’ব।</p><ul class="solution-steps"><li><strong>পানী যোগান:</strong> ✅ আজি পুৱা খেতিত পানী দিয়াটো সুৰক্ষিত।</li><li><strong>স্প্ৰে:</strong> ❌ বতাহৰ বাবে বিষাক্ত দৰৱ স্প্ৰে নকৰিব।</li><li><strong>দাৱন:</strong> দোৱা ধান ত্ৰিপালৰে ঢাকি ৰাখক।</li></ul>`
    },
    ur: {
      label: "موسم کی پیش گوئی کی الرٹ",
      speech: "آپ کے علاقے میں کل 15 فیصد بارش کا امکان ہے۔ آج صبح آبپاشی کرنا محفوظ ہے۔",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">موسمی مشورہ: جزوی طور پر ابر آلود (15٪ بارش کا امکان)</h4><p>کل ہلکی ہوا کے ساتھ موسم خوشگوار رہے گا۔</p><ul class="solution-steps"><li><strong>آبپاشی:</strong> ✅ آج صبح فصلوں کو پانی دینا محفوظ ہے۔</li><li><strong>اسپرے:</strong> ❌ تیز ہوا کی وجہ سے کیڑے مار دوا کا اسپرے نہ کریں۔</li><li><strong>کٹائی:</strong> کٹی ہوئی فصل کو ترپال سے ڈھانپ کر رکھیں۔</li></ul>`
    }
  },
  market: {
    en: {
      label: "Mandi Market Intelligence",
      speech: "The current price of tomatoes is ₹30 per kilogram and wheat is ₹2,450 per quintal. Market prices are up 4.2%. Great time to sell.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">Tomato Price: ₹30/kg | Wheat Rate: ₹2,450/Qtl (🟢 SELL NOW)</h4><p>Current mandi rates are up by +4.2% over last week due to tight regional supply.</p><ul class="solution-steps"><li><strong>Azadpur Mandi:</strong> ₹2,450 / Qtl (Trend: Rising)</li><li><strong>Vashi Mandi:</strong> ₹2,480 / Qtl</li><li><strong>Recommendation:</strong> Sell 60% of inventory now to lock in high profits.</li></ul>`
    },
    hi: {
      label: "मंडी भाव जानकारी",
      speech: "आज टमाटर का भाव ₹30 प्रति किलोग्राम और गेहूं का मंडी भाव ₹2,450 प्रति क्विंटल है। बाजार में तेजी है, बेचने का अच्छा समय है।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">टमाटर भाव: ₹30/किग्रा | गेहूं मंडी भाव: ₹2,450/क्विंटल (🟢 बिक्री करें)</h4><p>कम आपूर्ति के कारण मंडी में भाव पिछले सप्ताह से +4.2% तेज हैं।</p><ul class="solution-steps"><li><strong>आजादपुर मंडी:</strong> ₹2,450 / क्विंटल (बढ़त जारी)</li><li><strong>वाशी मंडी:</strong> ₹2,480 / क्विंटल</li><li><strong>AI सलाह:</strong> 60% उपज अभी बेचकर मुनाफा पक्का करें।</li></ul>`
    },
    pa: {
      label: "ਮੰਡੀ ਭਾਅ ਜਾਣਕਾਰੀ",
      speech: "ਅੱਜ ਟਮਾਟਰ ਦਾ ਭਾਅ ₹30 ਪ੍ਰਤੀ ਕਿਲੋਗ੍ਰਾਮ ਅਤੇ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ₹2,450 ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਹੈ। ਬਜ਼ਾਰ ਵਿੱਚ ਤੇਜ਼ੀ ਹੈ, ਵੇਚਣ ਦਾ ਚੰਗਾ ਸਮਾਂ ਹੈ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ਟਮਾਟਰ ਭਾਅ: ₹30/ਕਿਲੋ | ਕਣਕ ਮੰਡੀ ਭਾਅ: ₹2,450/ਕੁਇੰਟਲ (🟢 ਹੁਣੇ ਵੇਚੋ)</h4><p>ਮੰਡੀ ਵਿੱਚ ਘੱਟ ਆਮਦ ਕਾਰਨ ਭਾਅ ਵਿੱਚ +4.2% ਦਾ ਵਾਧਾ ਹੋਇਆ ਹੈ।</p><ul class="solution-steps"><li><strong>ਖੰਨਾ ਮੰਡੀ:</strong> ₹2,450 / ਕੁਇੰਟਲ (ਤੇਜ਼ੀ)</li><li><strong>ਜਲੰਧਰ ਮੰਡੀ:</strong> ₹2,480 / ਕੁਇੰਟਲ</li><li><strong>AI ਸਲਾਹ:</strong> 60% ਫ਼ਸਲ ਹੁਣੇ ਵੇਚ ਕੇ ਵਧੀਆ ਮੁਨਾਫ਼ਾ ਕਮਾਓ।</li></ul>`
    },
    mr: {
      label: "बाजार भाव माहिती",
      speech: "आज टोमॅटोचा भाव ₹३० प्रति किलोग्रॅम आणि गव्हाचा बाजार भाव ₹२,४५० प्रति क्विंटल आहे. बाजारात तेजी आहे, विक्रीसाठी उत्तम वेळ आहे.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">टोमॅटो भाव: ₹३०/किग्रा | गहू बाजार भाव: ₹२,४५०/क्विंटल (🟢 आता विक्री करा)</h4><p>बाजारात आवक कमी असल्यामुळे भावात +४.२% वाढ झाली आहे.</p><ul class="solution-steps"><li><strong>लासलगाव मोंढा:</strong> ₹२,४५० / क्विंटल (तेजी)</li><li><strong>वाशी मार्केट:</strong> ₹२,४૮० / क्विंटल</li><li><strong>AI सल्ला:</strong> ६०% माल आता विकून चांगला नफा मिळवा.</li></ul>`
    },
    gu: {
      label: "મંડી ભાવ માહિતી",
      speech: "આજે ટામેટાંનો ભાવ ₹30 પ્રતિ કિલોગ્રામ અને ઘઉંનો મંડી ભાવ ₹2,450 પ્રતિ ક્વિન્ટલ છે. બજારમાં તેજી છે, વેચવાનો ઉત્તમ સમય છે.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ટામેટાં ભાવ: ₹30/કિલો | ઘઉં મંડી ભાવ: ₹2,450/ક્વિન્ટલ (🟢 અત્યારે વેચો)</h4><p>મંડીમાં ઓછી આવકને કારણે ભાવમાં +4.2% નો વધારો થયો છે.</p><ul class="solution-steps"><li><strong>રાજકોટ મંડી:</strong> ₹2,450 / ક્વિન્ટલ (તેજી)</li><li><strong>અમદાવાદ મંડી:</strong> ₹2,480 / ક્વિન્ટલ</li><li><strong>AI સલાહ:</strong> 60% માલ અત્યારે વેચીને નફો મેળવો.</li></ul>`
    },
    kn: {
      label: "ಮಾರುಕಟ್ಟೆ ದರ ಮಾಹಿತಿ",
      speech: "ಇಂದು ಟೊಮೆಟೊ ಮಾರುಕಟ್ಟೆ ದರ ಕೆಜಿಗೆ ₹30 ಮತ್ತು ಗೋಧಿ ದರ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹2,450 ಇದೆ. ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಏರಿಕೆ ಕಂಡುಬಂದಿದೆ.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ಟೊಮೆಟೊ ದರ: ₹30/ಕೆಜಿ | ಗೋಧಿ ಮಾರುಕಟ್ಟೆ ದರ: ₹2,450/ಕ್ವಿಂಟಾಲ್ (🟢 ಮಾರಾಟ ಮಾಡಿ)</h4><p>ಮಾರುಕಟ್ಟೆಗೆ ಪೂರೈಕೆ ಕಡಿಮೆಯಿರುವುದರಿಂದ ಬೆಲೆಯಲ್ಲಿ +4.2% ಏರಿಕೆಯಾಗಿದೆ.</p><ul class="solution-steps"><li><strong>ಯಶವಂತಪುರ ಮಾರುಕಟ್ಟೆ:</strong> ₹2,450 / ಕ್ವಿಂಟಾಲ್ (ಏರಿಕೆ)</li><li><strong>ಕೋಲಾರ ಮಾರುಕಟ್ಟೆ:</strong> ₹2,480 / ಕ್ವಿಂಟಾಲ್</li><li><strong>AI ಸಲಹೆ:</strong> ಶೇ 60 ರಷ್ಟು ಬೆಳೆಯನ್ನು ಈಗಲೇ ಮಾರಿ ಲಾಭ ಪಡೆಯಿರಿ.</li></ul>`
    },
    ta: {
      label: "சந்தை விலை நிலவரம்",
      speech: "இன்று தக்காளி விலை கிலோவுக்கு ₹30 மற்றும் கோதுமை சந்தை விலை குவிண்டாலுக்கு ₹2,450 ஆக உள்ளது. விற்பனை செய்ய நல்ல நேரம்.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">தக்காளி விலை: ₹30/கிலோ | கோதுமை சந்தை விலை: ₹2,450/குவிண்டால் (🟢 விற்கலாம்)</h4><p>வரத்து குறைவு காரணமாக சந்தையில் விலை +4.2% உயர்ந்துள்ளது.</p><ul class="solution-steps"><li><strong>கோயம்பேடு சந்தை:</strong> ₹2,450 / குவிண்டால் (உயர்வு)</li><li><strong>ஒட்டன்சத்திரம் சந்தை:</strong> ₹2,480 / குவிண்டால்</li><li><strong>AI ஆலோசனை:</strong> 60% விளைச்சலை இப்போது விற்று லாபம் பெறவும்.</li></ul>`
    },
    te: {
      label: "మార్కెట్ ధరల సమాచారం",
      speech: "ఈరోజు టమోటా ధర కేజీ ₹30 మరియు గోధుమల మార్కెట్ ధర క్వింటాలుకు ₹2,450 ఉంది. మార్కెట్‌లో ధరలు పెరిగాయి, అమ్మకానికి మంచి సమయం.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">టమోటా ధర: ₹30/కేజీ | గోధుమల ధర: ₹2,450/క్వింటాలు (🟢 ఇప్పుడు అమ్మండి)</h4><p>సరుకు రాక తగ్గడంతో మార్కెట్‌లో ధరలు +4.2% పెరిగాయి.</p><ul class="solution-steps"><li><strong>బోవెన్‌పల్లి మార్కెట్:</strong> ₹2,450 / క్వింటాలు (తేజీ)</li><li><strong>గుంటూరు మార్కెట్:</strong> ₹2,480 / క్వింటాలు</li><li><strong>AI సలహా:</strong> 60% పంటను ఇప్పుడు అమ్మి లాభాలు పొందండి.</li></ul>`
    },
    bn: {
      label: "বাজার দর তথ্য",
      speech: "আজ টমেটোর দাম কেজি প্রতি ₹৩০ এবং গমের বাজার দর কুইন্টাল প্রতি ₹২,৪৫০। বাজারে তেজ রয়েছে, বিক্রির ভাল সময়।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">টমেটোর দাম: ₹৩০/কেজি | গমের বাজার দর: ₹২,৪৫০/কুইন্টাল (🟢 বিক্রি করুন)</h4><p>যোগান কম থাকায় বাজারে দাম +৪.২% বেড়েছে।</p><ul class="solution-steps"><li><strong>শিয়ালদহ বাজার:</strong> ₹২,৪৫০ / কুইন্টাল</li><li><strong>বর্ধমান বাজার:</strong> ₹২,৪৮০ / কুইন্টাল</li><li><strong>AI পরামর্শ:</strong> ৬০% শস্য এখনই বিক্রি করে মুনাফা নিশ্চিত করুন।</li></ul>`
    },
    ml: {
      label: "വിപണി വില വിവരങ്ങൾ",
      speech: "ഇന്ന് തക്കാളി വില കിലോയ്ക്ക് ₹30 ഉം ഗോതമ്പ് വിപണി വില ക്വിന്റലിന് ₹2,450 ഉം ആണ്. വിപണിയിൽ വില വർദ്ധനവുണ്ട്.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">തക്കാളി വില: ₹30/കിലോ | ഗോതമ്പ് വില: ₹2,450/ക്വിന്റൽ (🟢 ഇപ്പോൾ വിൽക്കൂ)</h4><p>വിപണിയിൽ വരവ് കുറഞ്ഞതിനാൽ വിലയിൽ +4.2% വർദ്ധനവുണ്ട്.</p><ul class="solution-steps"><li><strong>കൊച്ചി വിപണി:</strong> ₹2,450 / ക്വിന്റൽ</li><li><strong>കോഴിക്കോട് വിപണി:</strong> ₹2,480 / ക്വിന്റൽ</li><li><strong>AI ഉപദേശം:</strong> 60% ഉൽപ്പന്നങ്ങൾ ഇപ്പോൾ വിറ്റ് ലാഭം നേടൂ.</li></ul>`
    },
    or: {
      label: "ମଣ୍ଡି ଦର ସୂଚନା",
      speech: "ଆଜି ଟମାଟୋ ଦର କିଲୋ ପ୍ରତି ₹୩୦ ଏବଂ ଗହମ ମଣ୍ଡି ଦର କ୍ୱିଣ୍ଟାଲ ପ୍ରତି ₹୨,୪୫୦ ଅଛି। ବଜାରରେ ତେଜି ଅଛି, ବିକ୍ରି କରିବାର ଭଲ ସମୟ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ଟମାଟୋ ଦର: ₹୩୦/କିଲୋ | ଗହମ ମଣ୍ଡି ଦର: ₹୨,୪୫୦/କ୍ୱିଣ୍ଟାଲ (🟢 ବିକ୍ରି କରନ୍ତୁ)</h4><p>ଯୋଗାଣ କମ୍ ହେତୁ ବଜାର ଦର +୪.୨% ବୃଦ୍ଧି ପାଇଛି।</p><ul class="solution-steps"><li><strong>କଟକ ମଣ୍ଡି:</strong> ₹୨,୪୫୦ / କ୍ୱିଣ୍ଟାଲ</li><li><strong>ସମ୍ବଲପୁର ମଣ୍ଡି:</strong> ₹୨,୪୮ୋ / କ୍ୱିଣ୍ଟାଲ</li><li><strong>AI ପରାମର୍ଶ:</strong> ୬୦% ଫସଲ ଏବେ ବିକ୍ରି କରି ଲାଭ ପାଆନ୍ତୁ।</li></ul>`
    },
    as: {
      label: "বজাৰ দৰ তথ্য",
      speech: "আজি বিলাহীৰ দাম কেজি প্রতি ₹৩০ আৰু ঘেঁহুৰ বজাৰ দৰ কুয়িন্টল প্রতি ₹২,৪৫০। বজাৰত দাম বৃদ্ধি পাইছে, বিক্ৰী কৰাৰ ভাল সময়।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">বিলাহীৰ দাম: ₹৩০/কেজি | ঘেঁহুৰ বজাৰ দৰ: ₹২,৪৫০/কুয়িন্টল (🟢 বিক্ৰী কৰক)</h4><p>বজাৰত যোগান কম হোৱাৰ বাবে দাম +৪.২% বৃদ্ধি পাইছে।</p><ul class="solution-steps"><li><strong>গুৱাহাটী বজাৰ:</strong> ₹২,৪৫০ / কুয়িন্টল</li><li><strong>যোৰহাট বজাৰ:</strong> ₹২,৪৮০ / কুয়িন্টল</li><li><strong>AI পৰামৰ্শ:</strong> ৬০% শস্য এতিয়াই বিক্ৰী কৰি লাভ লওক।</li></ul>`
    },
    ur: {
      label: "منڈی کی قیمت کی معلومات",
      speech: "آج ٹماٹر کی قیمت ₹30 فی کلوگرام اور گندم کا منڈی ریٹ ₹2,450 فی کوئنٹل ہے۔ بازار میں تیزی ہے، فروخت کرنے کا بہترین وقت ہے۔",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ٹماٹر کی قیمت: ₹30/کلو | گندم منڈی ریٹ: ₹2,450/کوئنٹل (🟢 ابھی فروخت کریں)</h4><p>سپلائی میں کمی کی وجہ سے منڈی کے ریٹ میں +4.2٪ کا اضافہ ہوا ہے۔</p><ul class="solution-steps"><li><strong>آزاد پور منڈی:</strong> ₹2,450 / کوئنٹل</li><li><strong>واشی منڈی:</strong> ₹2,480 / کوئنٹل</li><li><strong>AI مشورہ:</strong> 60٪ فصل ابھی فروخت کر کے منافع حاصل کریں۔</li></ul>`
    }
  },
  fertilizer: {
    en: {
      label: "Fertilizer Dosage Recommendation",
      speech: "For 1 acre of paddy crop, apply 45 kg Urea and 50 kg DAP in the first phase during morning hours.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">Recommended Dosage for 1 Acre Paddy</h4><p>Balanced N-P-K nutrient formula calculated for high yield:</p><ul class="solution-steps"><li><strong>Urea (Nitrogen 46%):</strong> 45 kg / Acre</li><li><strong>DAP (Di-Ammonium Phosphate):</strong> 50 kg / Acre</li><li><strong>Neem Cake Organic:</strong> 100 kg / Acre for soil microbe health.</li></ul>`
    },
    hi: {
      label: "उर्वरक सिफारिश",
      speech: "एक एकड़ धान की फसल के लिए 45 किलो यूरिया और 50 किलो डीएपी पहली किस्त में प्रयोग करें।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 एकड़ धान के लिए अनुशंसित मात्रा</h4><p>उच्च पैदावार के लिए संतुलित N-P-K पोषक तत्व:</p><ul class="solution-steps"><li><strong>यूरिया (नाइट्रोजन 46%):</strong> 45 किग्रा / एकड़</li><li><strong>डीएपी (DAP):</strong> 50 किग्रा / एकड़</li><li><strong>नीम खली जैविक:</strong> 100 किग्रा / एकड़ मिट्टी सुधार हेतु।</li></ul>`
    },
    pa: {
      label: "ਖਾਦ ਸਿਫਾਰਸ਼",
      speech: "ਇੱਕ ਏਕੜ ਝੋਨੇ ਦੀ ਫ਼ਸਲ ਲਈ 45 ਕਿਲੋ ਯੂਰੀਆ ਅਤੇ 50 ਕਿਲੋ ਡੀ.ਏ.ਪੀ. ਪਹਿਲੀ ਕਿਸ਼ਤ ਵਿੱਚ ਪਾਓ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 ਏਕੜ ਝੋਨੇ ਲਈ ਖਾਦ ਦੀ ਖੁਰਾਕ</h4><p>ਵੱਧ ਝਾੜ ਲਈ ਸੰਤੁਲਿਤ N-P-K ਪੋਸ਼ਕ ਤੱਤ:</p><ul class="solution-steps"><li><strong>ਯੂਰੀਆ (ਨਾਈਟ੍ਰੋਜਨ 46%):</strong> 45 ਕਿਲੋ / ਏਕੜ</li><li><strong>ਡੀ.ਏ.ਪੀ (DAP):</strong> 50 ਕਿਲੋ / ਏਕੜ</li><li><strong>ਨਿੰਮ ਖਲ ਜੈਵਿਕ:</strong> 100 ਕਿਲੋ / ਏਕੜ ਜਮੀਨ ਸੁਧਾਰ ਲਈ।</li></ul>`
    },
    mr: {
      label: "खत शिफारस",
      speech: "एक एकर भात पिकासाठी पहिल्या टप्प्यात ४५ किलो युरिया आणि ५० किलो डीएपी वापरा.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">१ एकर भातासाठी खत मात्रा</h4><p>उत्कृष्ट उत्पन्नासाठी संतुलित N-P-K पोषक तत्त्वे:</p><ul class="solution-steps"><li><strong>युरिया (नायट्रोजन ४६%):</strong> ४५ किग्रॅ / एकर</li><li><strong>डीएपी (DAP):</strong> ५० किग्रॅ / एकर</li><li><strong>लिंबोळी पेंड:</strong> १०० किग्रॅ / एकर माती सुधारण्यासाठी.</li></ul>`
    },
    gu: {
      label: "ખાતર ભલામણ",
      speech: "એક એકર ડાંગરના પાક માટે પ્રથમ તબક્કામાં 45 કિલો યુરિયા અને 50 કિલો ડીએપી આપો.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 એકર ડાંગર માટે ખાતરનો ડોઝ</h4><p>વધુ ઉત્પાદન માટે સંતુલિત N-P-K પોષક તત્વો:</p><ul class="solution-steps"><li><strong>યુરિયા (નાઇટ્રોજન 46%):</strong> 45 કિલો / એકર</li><li><strong>ડીએપી (DAP):</strong> 50 કિલો / એકર</li><li><strong>લીંબોળી ખોળ:</strong> 100 કિલો / એકર જમીન સુધારણા માટે.</li></ul>`
    },
    kn: {
      label: "ಗೊಬ್ಬರ ಶಿಫಾರಸು",
      speech: "ಒಂದು ಎಕರೆ ಭತ್ತದ ಬೆಳೆಗೆ ಮೊದಲ ಹಂತದಲ್ಲಿ 45 ಕೆಜಿ ಯೂರಿಯಾ ಮತ್ತು 50 ಕೆಜಿ ಡಿಎಪಿ ಬಳಸಿ.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 ಎಕರೆ ಭತ್ತಕ್ಕೆ ರಸಗೊಬ್ಬರ ಪ್ರಮಾಣ</h4><p>ಹೆಚ್ಚಿನ ಇಳುವರಿಗೆ ಸಮತೋಲಿತ N-P-K ಪೋಷಕಾಂಶಗಳು:</p><ul class="solution-steps"><li><strong>ಯೂರಿಯಾ (ನೈಟ್ರೋಜನ್ 46%):</strong> 45 ಕೆಜಿ / ಎಕರೆ</li><li><strong>ಡಿಎಪಿ (DAP):</strong> 50 ಕೆಜಿ / ಎಕರೆ</li><li><strong>ಬೇವು ಹಿಂಡಿ:</strong> 100 ಕೆಜಿ / ಎಕರೆ ಮಣ್ಣಿನ ಗುಣಮಟ್ಟಕ್ಕೆ.</li></ul>`
    },
    ta: {
      label: "உர பரிந்துரை",
      speech: "ஒரு ஏக்கர் நெல் பயிருக்கு முதல் கட்டமாக 45 கிலோ யூரியா மற்றும் 50 கிலோ DAP இடவும்.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 ஏக்கர் நெல்லுக்கான உர அளவு</h4><p>அதிக மகசூலுக்கு சீரான N-P-K ஊட்டச்சத்துகள்:</p><ul class="solution-steps"><li><strong>யூரியா (நைட்ரஜன் 46%):</strong> 45 கிலோ / ஏக்கர்</li><li><strong>DAP (பாஸ்பரஸ்):</strong> 50 கிலோ / ஏக்கர்</li><li><strong>வேப்பம் புண்ணாக்கு:</strong> 100 கிலோ / ஏக்கர் மண் மேம்பாட்டிற்கு.</li></ul>`
    },
    te: {
      label: "ఎరువుల సిఫార్సు",
      speech: "ఒక ఎకరం వరి పంటకు మొదటి విడతగా 45 కిలోల యూరియా మరియు 50 కిలోల DAP వాడండి.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 ఎకరం వరికి ఎరువుల మోతాదు</h4><p>అధిక దిగుబడికి సమతుల్య N-P-K పోషకాలు:</p><ul class="solution-steps"><li><strong>యూరియా (నైట్రోజన్ 46%):</strong> 45 కిలోలు / ఎకరం</li><li><strong>DAP (ఫాస్పరస్):</strong> 50 కిలోలు / ఎకరం</li><li><strong>వేప పిండి:</strong> 100 కిలోలు / ఎకరం నేల సారం కోసం.</li></ul>`
    },
    bn: {
      label: "সার সুপারিশ",
      speech: "এক একর ধান ফসলের জন্য প্রথম ধাপে ৪৫ কেজি ইউরিয়া এবং ৫০ কেজি ডিএপি প্রয়োগ করুন।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">১ একর ধানের জন্য সারের মাত্রা</h4><p>উচ্চ ফলনের জন্য সুষম N-P-K পুষ্টি উপাদান:</p><ul class="solution-steps"><li><strong>ইউরিয়া (নাইট্রোজেন ৪৬%):</strong> ৪৫ কেজি / একর</li><li><strong>ডিএপি (DAP):</strong> ৫০ কেজি / একর</li><li><strong>নিম খৈল জৈব:</strong> ১০০ কেজি / একর মাটি স্বাস্থ্যের জন্য।</li></ul>`
    },
    ml: {
      label: "വള ശുപാർശ",
      speech: "ഒരു ഏക്കർ നെൽകൃഷിക്ക് ആദ്യ ഘട്ടത്തിൽ 45 കിലോ യുറിയയും 50 കിലോ DAP യും ഉപയോഗിക്കുക.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 ഏക്കർ നെല്ലിനുള്ള വളത്തിന്റെ അളവ്</h4><p>ഉയർന്ന വിളവിന് സമീകൃത N-P-K പോഷകങ്ങൾ:</p><ul class="solution-steps"><li><strong>യൂറിയ (നൈട്രജൻ 46%):</strong> 45 കിലോ / ഏക്കർ</li><li><strong>DAP:</strong> 50 കിലോ / ഏക്കർ</li><li><strong>വേപ്പിൻ പിണ്ണാക്ക്:</strong> 100 കിലോ / ഏക്കർ മണ്ണ് മെച്ചപ്പെടുത്താൻ.</li></ul>`
    },
    or: {
      label: "ଖତ ସୁପାରିଶ",
      speech: "ଏକ ଏକର ଧାନ ଫସଲ ପାଇଁ ପ୍ରଥମ ପର୍ଯ୍ୟାୟରେ ୪୫ କିଲୋ ୟୁରିଆ ଏବଂ ୫୦ କିଲୋ DAP ପ୍ରୟୋଗ କରନ୍ତୁ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">୧ ଏକର ଧାନ ପାଇଁ ଖତ ପରିମାଣ</h4><p>ଅଧିକ ଅମଳ ପାଇଁ ସନ୍ତୁଳିତ N-P-K ପୋଷକ ତତ୍ତ୍ୱ:</p><ul class="solution-steps"><li><strong>ୟୁରିଆ (ନାଇଟ୍ରୋଜେନ୍ ୪୬%):</strong> ୪୫ କିଲୋ / ଏକର</li><li><strong>DAP:</strong> ୫୦ କିଲୋ / ଏକର</li><li><strong>ନିମ୍ବ ପିଡ଼ିଆ:</strong> ୧୦୦ କିଲୋ / ଏକର ଜମି ସୁଧାର ପାଇଁ।</li></ul>`
    },
    as: {
      label: "সাৰ ব্যৱহাৰৰ পৰামৰ্শ",
      speech: "এক একৰ ধান খেতিৰ বাবে প্ৰথম পৰ্যায়ত ৪৫ কেজি ইউৰিয়া আৰু ৫০ কেজি DAP ব্যৱহাৰ কৰক।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">১ একৰ ধানৰ বাবে সাৰৰ পৰিমাণ</h4><p>অধিক উৎপাদনৰ বাবে সুষম N-P-K পুষ্টি উপাদান:</p><ul class="solution-steps"><li><strong>ইউৰিয়া (নাইট্ৰ’জেন ৪৬%):</strong> ৪৫ কেজি / একৰ</li><li><strong>DAP:</strong> ৫০ কেজি / একৰ</li><li><strong>নিম খলি জৈৱিক:</strong> ১০০ কেজি / একৰ মাটি উন্নত কৰিবলৈ।</li></ul>`
    },
    ur: {
      label: "کھاد کی تجویز",
      speech: "ایک ایکڑ دھان کی فصل کے لیے پہلے مرحلے میں 45 کلو یوریا اور 50 کلو ڈی اے پی استعمال کریں۔",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 ایکڑ دھان کے لیے کھاد की خوراک</h4><p>زیادہ پیداوار کے لیے متوازن N-P-K غذائی اجزاء:</p><ul class="solution-steps"><li><strong>یوریا (نائٹروجن 46٪):</strong> 45 کلو / ایکڑ</li><li><strong>ڈی اے پی (DAP):</strong> 50 کلو / ایکڑ</li><li><strong>نیم کی کھلی:</strong> 100 کلو / ایکڑ مٹی کی بہتری کے لیے۔</li></ul>`
    }
  },
  irrigation: {
    en: {
      label: "Smart Farming Guidance",
      speech: "FarmIQ Smart Farming Assistant is ready to help. Maintain proper soil moisture and check leaf undersides every 3 days for pests.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">General Agricultural Advisory</h4><p>FarmIQ recommends maintaining proper soil aeration and regular crop monitoring.</p><ul class="solution-steps"><li>Check leaf undersides every 3 days for early pest eggs.</li><li>Use drip irrigation to save 40% water and prevent root rot.</li></ul>`
    },
    hi: {
      label: "स्मार्ट कृषि सलाह",
      speech: "स्मार्ट फार्मआईक्यू सहायक आपकी सेवा में है। मिट्टी में उचित नमी बनाए रखें और कीट सुरक्षा के लिए नियमित निरीक्षण करें।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">सामान्य कृषि सलाह</h4><p>फसल की अच्छी बढ़त के लिए उचित जल निकासी और दैनिक निगरानी रखें।</p><ul class="solution-steps"><li>हर 3 दिन में पत्तों के नीचे कीट के अंडों की जांच करें।</li><li>ड्रिप सिंचाई से 40% पानी बचाएं और जड़ सड़न से बचें।</li></ul>`
    },
    pa: {
      label: "ਸਮਾਰਟ ਖੇਤੀ ਸਲਾਹ",
      speech: "ਸਮਾਰਟ ਫਾਰਮ ਆਈ.ਕਿਊ. ਸਹਾਇਕ ਤੁਹਾਡੀ ਮਦਦ ਲਈ ਤਿਆਰ ਹੈ। ਜ਼ਮੀਨ ਵਿੱਚ ਸਹੀ ਨਮੀ ਬਣਾ ਕੇ ਰੱਖੋ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ਆਮ ਖੇਤੀਬਾੜੀ ਸਲਾਹ</h4><p>ਫ਼ਸਲ ਦੀ ਚੰਗੀ ਵਾਧੇ ਲਈ ਨਿਯਮਿਤ ਨਿਰੀਖਣ ਕਰੋ।</p><ul class="solution-steps"><li>ਹਰ 3 ਦਿਨਾਂ ਬਾਅਦ ਪੱਤਿਆਂ ਦੇ ਹੇਠਾਂ ਕੀੜਿਆਂ ਦੀ ਜਾਂਚ ਕਰੋ।</li><li>ਡ੍ਰਿਪ ਸਿੰਚਾਈ ਨਾਲ 40% ਪਾਣੀ ਬਚਾਓ।</li></ul>`
    },
    mr: {
      label: "स्मार्ट शेती सल्ला",
      speech: "स्मार्ट फार्मआयक्यू सहाय्यक तुमच्या सेवेसाठी तयार आहे. जमिनीत योग्य ओलावा ठेवा आणि नियमित पाहणी करा.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">सामान्य शेती सल्ला</h4><p>पिकांच्या चांगल्या वाढीसाठी योग्य पाण्याचा निचरा व निरीक्षण आवश्यक आहे.</p><ul class="solution-steps"><li>दर ३ दिवसांनी पानांच्या खाली किडींची पाहणी करा.</li><li>ठिबक सिंचनाने ४०% पाण्याची बचत करा.</li></ul>`
    },
    gu: {
      label: "સ્માર્ટ ખેતી સલાહ",
      speech: "સ્માર્ટ ફાર્મઆઇક્યુ સહાયક તમારી સેવામાં હાજર છે. જમીનમાં પૂરતો ભેજ જાળવી રાખો અને પાકની નિયમિત તપાસ કરો.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">સામાન્ય કૃષિ સલાહ</h4><p>પાકના સારા વિકાસ માટે યોગ્ય નીતાર અને દેખરેખ જરૂરી છે.</p><ul class="solution-steps"><li>દર 3 દિવસે પાંદડાની નીચે જીવાત તપાસો.</li><li>ટપક સિંચાઈથી 40% પાણી બચાવો.</li></ul>`
    },
    kn: {
      label: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಲಹೆ",
      speech: "ಸ್ಮಾರ್ಟ್ ಫಾರ್ಮ್‌ಐಕ್ಯೂ ಸಹಾಯಕ ನಿಮ್ಮ ಸೇವೆಗೆ ಸಿದ್ಧವಾಗಿದೆ. ಮಣ್ಣಿನಲ್ಲಿ ಸೂಕ್ತ ತೇವಾಂಶ ಕಾಯ್ದುಕೊಳ್ಳಿ.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ಸಾಮಾನ್ಯ ಕೃಷಿ ಸಲಹೆಗಳು</h4><p>ಉತ್ತಮ ಬೆಳೆ ಬೆಳವಣಿಗೆಗೆ ದೈನಂದಿನ ಕೃಷಿ ಪರಿಶೀಲನೆ ಅಗತ್ಯ.</p><ul class="solution-steps"><li>ಪ್ರತಿ 3 ದಿನಕ್ಕೊಮ್ಮೆ ಎಲೆಗಳ ಕೆಳಭಾಗ ಕೀಟಗಳಿಗಾಗಿ ಪರೀಕ್ಷಿಸಿ.</li><li>ಹನಿ ನೀರಾವರಿಯಿಂದ 40% ನೀರು ಉಳಿಸಿ.</li></ul>`
    },
    ta: {
      label: "ஸ்மார்ட் விவசாய ஆலோசனை",
      speech: "ஸ்மார்ட் பார்ம்IQ உதவியாளர் உங்களுக்கு உதவ தயார். மண்ணில் சரியான ஈரப்பதத்தை பராமரிக்கவும்.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">பொதுவான விவசாய ஆலோசனை</h4><p>பயிர் வளர்ச்சிக்கு தினசரி கண்காணிப்பு அவசியம்.</p><ul class="solution-steps"><li>3 நாட்களுக்கு ஒருமுறை இலைகளின் அடியை சோதிக்கவும்.</li><li>சொட்டு நீர் பாசனம் மூலம் 40% தண்ணீரை சேமிக்கவும்.</li></ul>`
    },
    te: {
      label: "స్మార్ట్ వ్యవసాయ సలహా",
      speech: "స్మార్ట్ ఫార్మ్-IQ సహాయకుడు మీకు సేవ చేయడానికి సిద్ధంగా ఉన్నాడు. నేలలో సరైన తేమను కాపాడుకోండి.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">సాధారణ వ్యవసాయ సలహాలు</h4><p>పంట ఆరోగ్యకరమైన పెరుగుదలకు రోజూ గమనించండి.</p><ul class="solution-steps"><li>ప్రతి 3 రోజులకు ఆకుల అడుగు భాగాన్ని పరిశీలించండి.</li><li>బిందు సేద్యంతో 40% నీటిని ఆదా చేయండి.</li></ul>`
    },
    bn: {
      label: "স্মার্ট কৃষি পরামর্শ",
      speech: "স্মার্ট ফার্মআইকিউ সহকারী আপনার সেবায় প্রস্তুত। মাটিতে সঠিক আর্দ্রতা বজায় রাখুন।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">সাধারণ কৃষি পরামর্শ</h4><p>ফসলের ভাল বৃদ্ধির জন্য নিয়মিত পর্যবেক্ষণ করুন।</p><ul class="solution-steps"><li>প্রতি ৩ দিন অন্তর পাতার নিচে পোকা পরীক্ষা করুন।</li><li>ড্রিপ সেচ দিয়ে ৪০% জল সাশ্রয় করুন।</li></ul>`
    },
    ml: {
      label: "സ്മാർട്ട് കാർഷിക ഉപദേശം",
      speech: "സ്മാർട്ട് ഫാംഐക്യു സഹായി നിങ്ങൾക്ക് സേവനം നൽകാൻ തയ്യാറാണ്. മണ്ണിൽ ആവശ്യത്തിന് ഈർപ്പം നിലനിർത്തുക.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">പൊതുവായ കാർഷിക ഉപദേശങ്ങൾ</h4><p>വിളകളുടെ നല്ല വളർച്ചയ്ക്ക് ദിനംപ്രതി നിരീക്ഷിക്കുക.</p><ul class="solution-steps"><li>3 ദിവസത്തിലൊരിക്കൽ ഇലകളുടെ അടിവശം പരിശോധിക്കുക.</li><li>തുള്ളി നനയിലൂടെ 40% വെള്ളം ലാഭിക്കുക.</li></ul>`
    },
    or: {
      label: "ସ୍ମାର୍ଟ କୃଷି ପରାମର୍ଶ",
      speech: "ସ୍ମାର୍ଟ ଫାର୍ମଆଇକ୍ୟୁ ସହାୟକ ଆପଣଙ୍କ ସେବାରେ ପ୍ରସ୍ତୁତ। ମାଟିରେ ସଠିକ୍ ଆର୍ଦ୍ରତା ବଜାୟ ରଖନ୍ତୁ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ସାଧାରଣ କୃଷି ପରାମର୍ଶ</h4><p>ଫସଲର ଭଲ ବୃଦ୍ଧି ପାଇଁ ନିୟମିତ ନିରୀକ୍ଷଣ କରନ୍ତୁ।</p><ul class="solution-steps"><li>ପ୍ରତି ୩ ଦିନରେ ପତ୍ର ତଳ ପୋକ ଯାଞ୍ଚ କରନ୍ତୁ।</li><li>ବୁନ୍ଦା ଜଳସେଚନ ଦ୍ୱାରା ୪୦% ଜଳ ବଞ୍ଚାନ୍ତୁ।</li></ul>`
    },
    as: {
      label: "স্মাৰ্ট কৃষি পৰামৰ্শ",
      speech: "স্মাৰ্ট ফাৰ্মআইকিউ সহায়ক আপোনাৰ সেৱাত প্ৰস্তুত। মাটিত সঠিক আৰ্দ্ৰতা বজায় ৰাখক।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">সাধাৰণ কৃষি পৰামৰ্শ</h4><p>শস্যৰ ভাল বৃদ্ধিৰ বাবে নিয়মিত নিৰীক্ষণ কৰক।</p><ul class="solution-steps"><li>প্ৰতি ৩ দিনৰ মূৰে মূৰে পাতৰ তলত পোক পৰীক্ষা কৰক।</li><li>টোপাল পানী যোগানৰ দ্বাৰা ৪০% পানী ৰাহি কৰক।</li></ul>`
    },
    ur: {
      label: "اسمارٹ زرعی مشورہ",
      speech: "اسمارٹ فارم آئی کیو اسسٹنٹ آپ کی خدمت کے لیے تیار ہے۔ مٹی میں مناسب نمی برقرار رکھیں۔",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">عام زرعی مشورہ</h4><p>فصل کی اچھی نشوونما کے لیے روزانہ نگرانی کریں۔</p><ul class="solution-steps"><li>ہر 3 دن بعد پتوں کے نیچے کیڑوں کی جانچ کریں۔</li><li>ڈریپ آبپاشی سے 40٪ پانی بچائیں۔</li></ul>`
    }
  }
};

function validateAndGetNativeResponse(category, langCode, queryText) {
  const lang = languageConfig[langCode] ? langCode : 'en';
  const categoryData = nativeResponses[category] || nativeResponses['irrigation'];
  let native = categoryData[lang];
  if (!native) {
    native = categoryData['en'];
  }
  return native;
}

/* Language Switcher Engine */
function changeLanguage(langCode) {
  currentLanguage = langCode;
  const config = languageConfig[langCode] || languageConfig['en'];
  const langData = translations[langCode] || translations['en'];

  // Sync select dropdowns
  const desktopSelect = document.getElementById('languageSelect');
  const mobileSelect = document.getElementById('mobileLanguageSelect');
  if (desktopSelect) desktopSelect.value = langCode;
  if (mobileSelect) mobileSelect.value = langCode;

  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (langData && langData[key]) {
      elem.innerText = langData[key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
    const key = elem.getAttribute('data-i18n-placeholder');
    if (langData && langData[key]) {
      elem.placeholder = langData[key];
    }
  });

  // Update mic hint text
  const micHint = document.getElementById('micHint');
  if (micHint && langData && langData.micHintText) {
    micHint.innerText = langData.micHintText;
  }

  // Sync speech recognition language
  if (recognition) {
    recognition.lang = config.speechLanguage;
  }

  // Update Kisan Mitra Chatbot greeting to selected language
  const botGreetElem = document.querySelector('.chat-msg.bot');
  if (botGreetElem && langData && langData.kisanGreet) {
    botGreetElem.innerText = langData.kisanGreet;
  }
}

function getLocaleForLang(langCode) {
  return languageConfig[langCode]?.speechLanguage || 'en-US';
}

/* Mobile Menu Toggle */
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

/* ==========================================================================
   FEATURE 1: SMART VOICE ASSISTANT LOGIC
   ========================================================================== */

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = getLocaleForLang(currentLanguage);

    recognition.onstart = function() {
      isListening = true;
      const micBtn = document.getElementById('micBtn');
      const micStatus = document.getElementById('micStatus');
      if (micBtn) micBtn.classList.add('listening');
      const langData = translations[currentLanguage] || translations['en'];
      if (micStatus) micStatus.innerText = langData.micTapPrompt || 'Listening... Speak Now';
    };

    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById('voiceTextInput').value = transcript;
      processVoiceQuery(transcript);
    };

    recognition.onerror = function(event) {
      console.warn("Speech recognition error:", event.error);
      stopListeningState();
    };

    recognition.onend = function() {
      stopListeningState();
    };
  }
}

function stopListeningState() {
  isListening = false;
  const micBtn = document.getElementById('micBtn');
  const micStatus = document.getElementById('micStatus');
  if (micBtn) micBtn.classList.remove('listening');
  if (micStatus) micStatus.innerText = translations[currentLanguage]?.micTapPrompt || 'Tap Microphone & Speak';
}

function toggleVoiceRecognition() {
  if (!recognition) {
    initSpeechRecognition();
  }
  if (!recognition) {
    alert("Speech Recognition API is not supported in this browser. Please use Chrome/Edge or click sample buttons!");
    return;
  }

  if (isListening) {
    recognition.stop();
  } else {
    recognition.lang = getLocaleForLang(currentLanguage);
    try {
      recognition.start();
    } catch (e) {
      console.error(e);
    }
  }
}

function triggerPresetVoice(queryText) {
  document.getElementById('voiceTextInput').value = queryText;
  processVoiceQuery(queryText);
  // Scroll smoothly to result card
  const resultCard = document.getElementById('voiceResultCard');
  if (resultCard) resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function processTextQuery() {
  const input = document.getElementById('voiceTextInput').value.trim();
  if (input) {
    processVoiceQuery(input);
  }
}

// Intent Classification Engine for Natural Language
function processVoiceQuery(queryText) {
  const text = queryText.toLowerCase();
  let category = 'irrigation';
  let categoryIcon = 'fa-droplet';

  // Intent Keywords across English + Native Scripts
  if (
    text.includes('daag') || text.includes('rog') || text.includes('spot') || text.includes('leaf') || 
    text.includes('patto') || text.includes('disease') || text.includes('keeda') || text.includes('insect') ||
    text.includes('रोग') || text.includes('ਧੱਬੇ') || text.includes('ਰੋਗ') || text.includes('ठिपके') || 
    text.includes('ટપકાં') || text.includes('રોગ') || text.includes('ರೋಗ') || text.includes('பூஞ்சை') || 
    text.includes('తెగులు') || text.includes('রোগ') || text.includes('രോഗം') || text.includes('રોગ')
  ) {
    category = 'disease';
    categoryIcon = 'fa-stethoscope';
  }
  else if (
    text.includes('barish') || text.includes('mausam') || text.includes('rain') || text.includes('weather') || 
    text.includes('kal') || text.includes('garmi') || text.includes('मौसम') || text.includes('ਮੀਂਹ') || 
    text.includes('ਮੌਸਮ') || text.includes('हवामान') || text.includes('વરસાદ') || text.includes('હવામાન') || 
    text.includes('ಮಳೆ') || text.includes('மழை') || text.includes('వర్షం') || text.includes('বৃষ্টি') || 
    text.includes('മഴ') || text.includes('বৰষুণ') || text.includes('بارش')
  ) {
    category = 'weather';
    categoryIcon = 'fa-cloud-sun-rain';
  }
  else if (
    text.includes('rate') || text.includes('dam') || text.includes('daam') || text.includes('mandi') || 
    text.includes('price') || text.includes('gehu') || text.includes('bhav') || text.includes('tamatar') ||
    text.includes('भाव') || text.includes('ਭਾਅ') || text.includes('ભાવ') || text.includes('દર') || 
    text.includes('விலை') || text.includes('ధర') || text.includes('দর') || text.includes('വില') || 
    text.includes('ਟਮਾਟਰ') || text.includes('टोमॅटो') || text.includes('ટામેટાં') || text.includes('ٹماٹر')
  ) {
    category = 'market';
    categoryIcon = 'fa-chart-line';
  }
  else if (
    text.includes('khad') || text.includes('fertilizer') || text.includes('urea') || text.includes('dap') || 
    text.includes('dhan') || text.includes('खाद') || text.includes('ਖਾਦ') || text.includes('खत') || 
    text.includes('ખાતર') || text.includes('ಗೊಬ್ಬರ') || text.includes('உரம்') || text.includes('ఎరువులు') || 
    text.includes('সার') || text.includes('വളം') || text.includes('ଖତ') || text.includes('کھاد')
  ) {
    category = 'fertilizer';
    categoryIcon = 'fa-flask';
  }

  // Fetch Response Matching Active App Language (currentLanguage)
  const nativeResp = validateAndGetNativeResponse(category, currentLanguage, queryText);

  // Render Result Card in Native Script
  const resultCard = document.getElementById('voiceResultCard');
  document.getElementById('resCategoryTag').innerHTML = `<i class="fa-solid ${categoryIcon}"></i> <span>${nativeResp.label}</span>`;
  document.getElementById('resUserQuery').innerText = `"${queryText}"`;
  document.getElementById('resSolutionBody').innerHTML = nativeResp.html;

  resultCard.style.display = 'block';
  currentSpeechResponse = nativeResp.speech;

  // Speak aloud automatically in the selected language using language-specific TTS
  speakText(nativeResp.speech);
}

function speakCurrentResponse() {
  if (currentSpeechResponse) {
    speakText(currentSpeechResponse);
  }
}

function getBestVoiceForLocale(locale) {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const targetLang = locale.toLowerCase().split('-')[0];
  
  // 1. Try exact locale match with Google/Natural/Premium high clarity voice
  let voice = voices.find(v => v.lang.toLowerCase().replace('_', '-') === locale.toLowerCase() && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Premium')));
  
  // 2. Try exact locale match any voice
  if (!voice) {
    voice = voices.find(v => v.lang.toLowerCase().replace('_', '-') === locale.toLowerCase());
  }

  // 3. Try language prefix match (e.g. 'hi')
  if (!voice) {
    voice = voices.find(v => v.lang.toLowerCase().startsWith(targetLang) && (v.name.includes('Google') || v.name.includes('Natural')));
  }

  if (!voice) {
    voice = voices.find(v => v.lang.toLowerCase().startsWith(targetLang));
  }

  return voice || null;
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  
  // Cancel previous queued speech for instant clean playback
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const locale = getLocaleForLang(currentLanguage);
  utterance.lang = locale;

  // Crystal clear speech audio parameters
  utterance.rate = 0.95;  // Moderate natural pace for rural comprehension
  utterance.pitch = 1.0;  // Clean, distortion-free natural pitch
  utterance.volume = 1.0; // Maximum output volume

  const bestVoice = getBestVoiceForLocale(locale);
  if (bestVoice) {
    utterance.voice = bestVoice;
  }

  window.speechSynthesis.speak(utterance);
}

// Pre-load voices on browser load for instant speech readiness
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

/* ==========================================================================
   FEATURE 2: AI CROP DOCTOR LOGIC
   ========================================================================== */

const cropPresetData = {
  tomato_blight: {
    name: "Tomato Early Blight",
    scientific: "Alternaria solani",
    severity: "HIGH SEVERITY",
    severityClass: "severity-high",
    accuracy: "96%",
    remedies: [
      "Spray Copper Oxychloride 50% WP (3g per litre water) immediately.",
      "Remove severely infected lower leaves and burn them away from field.",
      "Avoid overhead sprinkler irrigation to keep leaf canopy dry."
    ],
    speech: "Tamatar me ageti jhulsa rog paya gaya hai. Kripya Copper Oxychloride teen gram prati litre pani me milakar chhidkaav karein."
  },
  rice_blast: {
    name: "Rice Leaf Blast",
    scientific: "Magnaporthe oryzae",
    severity: "MEDIUM SEVERITY",
    severityClass: "severity-medium",
    accuracy: "94%",
    remedies: [
      "Spray Tricyclazole 75% WP (0.6g per litre of water).",
      "Avoid excessive application of Nitrogen fertilizer.",
      "Maintain standing water level of 2-3 cm in paddy field."
    ],
    speech: "Dhan me jhonka rog ke lakshan hain. Tricyclazole shunya samshodhith 6 gram prati litre chhidkaav karein."
  },
  wheat_rust: {
    name: "Wheat Yellow Rust",
    scientific: "Puccinia striiformis",
    severity: "HIGH SEVERITY",
    severityClass: "severity-high",
    accuracy: "98%",
    remedies: [
      "Spray Propiconazole 25% EC (1ml per litre of water).",
      "Inspect neighboring fields for yellow powdery stripe spots.",
      "Ensure proper drainage to reduce micro-climate humidity."
    ],
    speech: "Gehu me peela ratua rog hai. Propiconazole ek millilitre prati litre pani me milakar turant chhidkaav karein."
  },
  cotton_bollworm: {
    name: "Cotton American Bollworm",
    scientific: "Helicoverpa armigera",
    severity: "MEDIUM SEVERITY",
    severityClass: "severity-medium",
    accuracy: "91%",
    remedies: [
      "Install Pheromone traps @ 5 traps per acre for pest monitoring.",
      "Spray Emamectin Benzoate 5% SG (0.5g per litre water).",
      "Release Trichogramma egg parasitoids @ 50,000/acre."
    ],
    speech: "Kapas me gulabi sundi ka prabhav hai. Pheromone trap lagayein aur Emamectin Benzoate ka chhidkaav karein."
  }
};

let lastDoctorSpeech = '';

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    runCropScanAnimation(e.target.result, cropPresetData.tomato_blight);
  };
  reader.readAsDataURL(file);
}

function analyzePresetSample(sampleKey) {
  const data = cropPresetData[sampleKey];
  const sampleImages = {
    tomato_blight: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=600&q=80',
    rice_blast: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
    wheat_rust: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    cotton_bollworm: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80'
  };

  runCropScanAnimation(sampleImages[sampleKey], data);
}

function runCropScanAnimation(imgSrc, diagnosisData) {
  const scannerDisplay = document.getElementById('scannerDisplay');
  const previewImg = document.getElementById('scannerPreviewImg');
  const report = document.getElementById('diagnosisReport');

  previewImg.src = imgSrc;
  scannerDisplay.style.display = 'block';
  report.style.display = 'none';

  // Simulate AI Neural Scan Delay (1.8 seconds)
  setTimeout(() => {
    scannerDisplay.style.display = 'none';
    
    // Populate Report Data
    document.getElementById('diagDiseaseName').innerText = diagnosisData.name;
    document.getElementById('diagScientific').innerText = diagnosisData.scientific;
    
    const severityBadge = document.getElementById('diagSeverity');
    severityBadge.innerText = diagnosisData.severity;
    severityBadge.className = `severity-badge ${diagnosisData.severityClass}`;

    document.getElementById('diagAccuracyPct').innerText = diagnosisData.accuracy;
    document.getElementById('diagProgressBar').style.width = diagnosisData.accuracy;

    const list = document.getElementById('diagRemediesList');
    list.innerHTML = diagnosisData.remedies.map(r => `<li>${r}</li>`).join('');

    report.style.display = 'block';
    lastDoctorSpeech = diagnosisData.speech;

    // Automatically speak diagnosis
    speakText(diagnosisData.speech);
  }, 1800);
}

function speakDoctorReport() {
  if (lastDoctorSpeech) {
    speakText(lastDoctorSpeech);
  }
}

/* ==========================================================================
   FEATURE 3: SMART WEATHER ADVISOR LOGIC
   ========================================================================== */

const locationWeatherData = {
  punjab: {
    temp: "31°C", condition: "Sunny & Warm", humidity: "52%", rain: "5%", wind: "10 km/h", uv: "High (7)",
    advIrrigation: { pos: true, title: "Irrigate Wheat Crop Today", sub: "Clear skies and low rain chance. Ideal for evening irrigation." },
    advPesticide: { pos: true, title: "Safe for Pesticide Spraying", sub: "Wind speed is calm (10 km/h). High spray retention." },
    forecast: [
      { day: "Thu", icon: "☀️", temp: "31°C" }, { day: "Fri", icon: "🌤️", temp: "32°C" },
      { day: "Sat", icon: "⛅", temp: "30°C" }, { day: "Sun", icon: "🌧️", temp: "27°C" }, { day: "Mon", icon: "☀️", temp: "29°C" }
    ]
  },
  up: {
    temp: "29°C", condition: "Partly Cloudy", humidity: "68%", rain: "15%", wind: "14 km/h", uv: "Moderate (5)",
    advIrrigation: { pos: true, title: "Light Drip Irrigation Recommended", sub: "Soil humidity is moderate. Irrigate in early morning." },
    advPesticide: { pos: false, title: "Avoid Spraying Spray Today", sub: "Wind speed 14 km/h may cause chemical spray drift." },
    forecast: [
      { day: "Thu", icon: "⛅", temp: "29°C" }, { day: "Fri", icon: "🌧️", temp: "26°C" },
      { day: "Sat", icon: "🌧️", temp: "25°C" }, { day: "Sun", icon: "🌤️", temp: "28°C" }, { day: "Mon", icon: "☀️", temp: "30°C" }
    ]
  },
  karnataka: {
    temp: "27°C", condition: "Light Monsoon Shower", humidity: "82%", rain: "75%", wind: "18 km/h", uv: "Low (3)",
    advIrrigation: { pos: false, title: "Do Not Irrigate Today", sub: "75% rain probability expected. Ensure field drainage." },
    advPesticide: { pos: false, title: "Do Not Spray Pesticides", sub: "Rain showers will wash off chemical sprays." },
    forecast: [
      { day: "Thu", icon: "🌧️", temp: "27°C" }, { day: "Fri", icon: "⛈️", temp: "25°C" },
      { day: "Sat", icon: "🌧️", temp: "26°C" }, { day: "Sun", icon: "⛅", temp: "28°C" }, { day: "Mon", icon: "🌤️", temp: "29°C" }
    ]
  },
  tn: {
    temp: "33°C", condition: "Hot & Dry", humidity: "45%", rain: "0%", wind: "8 km/h", uv: "Very High (9)",
    advIrrigation: { pos: true, title: "Urgent Irrigation Needed", sub: "High evaporation rate. Irrigate deeply early morning." },
    advPesticide: { pos: true, title: "Good Day for Spraying", sub: "Low humidity and wind. Best time before 10 AM." },
    forecast: [
      { day: "Thu", icon: "☀️", temp: "33°C" }, { day: "Fri", icon: "☀️", temp: "34°C" },
      { day: "Sat", icon: "🌤️", temp: "33°C" }, { day: "Sun", icon: "🌤️", temp: "32°C" }, { day: "Mon", icon: "☀️", temp: "34°C" }
    ]
  },
  ap: {
    temp: "30°C", condition: "Humid & Breezy", humidity: "70%", rain: "30%", wind: "16 km/h", uv: "Moderate (6)",
    advIrrigation: { pos: true, title: "Moderate Irrigation", sub: "Monitor soil moisture levels closely." },
    advPesticide: { pos: false, title: "Spray Caution Advised", sub: "Gusty wind speed at 16 km/h." },
    forecast: [
      { day: "Thu", icon: "⛅", temp: "30°C" }, { day: "Fri", icon: "⛅", temp: "31°C" },
      { day: "Sat", icon: "🌧️", temp: "28°C" }, { day: "Sun", icon: "🌤️", temp: "30°C" }, { day: "Mon", icon: "☀️", temp: "32°C" }
    ]
  },
  mh: {
    temp: "28°C", condition: "Pleasant Clouds", humidity: "62%", rain: "20%", wind: "11 km/h", uv: "Moderate (5)",
    advIrrigation: { pos: true, title: "Normal Irrigation Schedule", sub: "Favorable conditions for sugarcane and cotton." },
    advPesticide: { pos: true, title: "Safe Spraying Window", sub: "Wind speed is calm." },
    forecast: [
      { day: "Thu", icon: "🌤️", temp: "28°C" }, { day: "Fri", icon: "⛅", temp: "29°C" },
      { day: "Sat", icon: "☀️", temp: "30°C" }, { day: "Sun", icon: "🌧️", temp: "27°C" }, { day: "Mon", icon: "🌤️", temp: "29°C" }
    ]
  }
};

function updateWeatherDisplay(locKey) {
  const data = locationWeatherData[locKey] || locationWeatherData.punjab;

  document.getElementById('wTemp').innerText = data.temp;
  document.getElementById('wCondition').innerText = data.condition;
  document.getElementById('wHumidityVal').innerText = data.humidity;
  document.getElementById('wRainVal').innerText = data.rain;
  document.getElementById('wWindVal').innerText = data.wind;
  document.getElementById('wUVVal').innerText = data.uv;

  // Advisory Cards
  const advIrr = document.getElementById('advIrrigation');
  advIrr.className = `advisory-badge-card ${data.advIrrigation.pos ? 'positive' : 'negative'}`;
  advIrr.querySelector('strong').innerText = data.advIrrigation.title;
  advIrr.querySelector('p').innerText = data.advIrrigation.sub;

  const advPest = document.getElementById('advPesticide');
  advPest.className = `advisory-badge-card ${data.advPesticide.pos ? 'positive' : 'negative'}`;
  advPest.querySelector('strong').innerText = data.advPesticide.title;
  advPest.querySelector('p').innerText = data.advPesticide.sub;

  // 5-Day Forecast Grid
  const forecastGrid = document.getElementById('forecastGrid');
  forecastGrid.innerHTML = data.forecast.map(item => `
    <div class="forecast-day-card">
      <div class="day-name">${item.day}</div>
      <div class="day-icon">${item.icon}</div>
      <div class="day-temp">${item.temp}</div>
    </div>
  `).join('');
}

/* ==========================================================================
   FEATURE 4: FERTILIZER CALCULATOR LOGIC
   ========================================================================== */

function calculateFertilizer(event) {
  event.preventDefault();

  const crop = document.getElementById('fertCrop').value;
  const soil = document.getElementById('fertSoil').value;
  const stage = document.getElementById('fertStage').value;
  const area = parseFloat(document.getElementById('fertArea').value) || 1.0;

  // Calculation Logic per Acre
  let ureaPerAcre = 45;
  let dapPerAcre = 50;
  let mopPerAcre = 25;
  let organicPerAcre = 100;
  let timingText = "Apply Urea in 2 split doses in early morning when soil has moisture.";

  if (crop === 'wheat') {
    ureaPerAcre = 50; dapPerAcre = 60; mopPerAcre = 20;
    timingText = "Apply 50% Urea at sowing time and remaining 50% at first irrigation (21 days).";
  } else if (crop === 'tomato') {
    ureaPerAcre = 40; dapPerAcre = 65; mopPerAcre = 35;
    timingText = "Apply Potash during flowering stage to enhance fruit firm size and color.";
  } else if (crop === 'cotton') {
    ureaPerAcre = 60; dapPerAcre = 40; mopPerAcre = 30;
    timingText = "Top dress Urea at square formation and boll development stage.";
  } else if (crop === 'sugarcane') {
    ureaPerAcre = 90; dapPerAcre = 75; mopPerAcre = 45;
    timingText = "Apply in 3 split doses: at planting, 60 days, and 90 days after planting.";
  }

  // Soil modifier
  if (soil === 'sandy') {
    ureaPerAcre += 10; // sandy soils leach nitrogen faster
    organicPerAcre += 50;
  }

  // Total dosage multiplied by acreage
  const totalUrea = Math.round(ureaPerAcre * area);
  const totalDAP = Math.round(dapPerAcre * area);
  const totalMOP = Math.round(mopPerAcre * area);
  const totalOrganic = Math.round(organicPerAcre * area);

  // Update UI Card
  document.getElementById('fertRecTitle').innerText = `Fertilizer Plan for ${area} Acre ${crop.toUpperCase()}`;
  document.getElementById('fertRecSub').innerText = `Soil: ${soil.toUpperCase()} | Stage: ${stage.toUpperCase()}`;

  document.getElementById('doseUreaVal').innerText = `${totalUrea} kg total`;
  document.getElementById('doseDAPVal').innerText = `${totalDAP} kg total`;
  document.getElementById('doseMOPVal').innerText = `${totalMOP} kg total`;
  document.getElementById('doseOrganicVal').innerText = `${totalOrganic} kg Vermicompost/Neem Cake`;

  document.getElementById('fertTimingText').innerText = timingText;
}

/* ==========================================================================
   FEATURE 5: SMART MANDI DASHBOARD LOGIC (HTML5 CANVAS CHART)
   ========================================================================== */

const mandiCropData = {
  wheat: {
    title: "Wheat Mandi Price Trend (₹ / Quintal)",
    signal: "🟢 SELL NOW",
    signalClass: "signal-sell",
    reason: "Prices hit peak ₹2,450/qtl due to festival buffer stocking. Next week supply arrival expected to lower prices.",
    prices: [2320, 2350, 2380, 2400, 2420, 2435, 2450],
    days: ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Today"],
    tables: [
      { mandi: "Azadpur Mandi", district: "Delhi NCR", price: "₹2,450", change: "+₹35 (+1.4%)", up: true, status: "Active" },
      { mandi: "Khanna Mandi", district: "Ludhiana, PB", price: "₹2,420", change: "+₹20 (+0.8%)", up: true, status: "Active" },
      { mandi: "Karnal Mandi", district: "Karnal, HR", price: "₹2,435", change: "+₹15 (+0.6%)", up: true, status: "Active" },
      { mandi: "Hapur Mandi", district: "Hapur, UP", price: "₹2,410", change: "-₹10 (-0.4%)", up: false, status: "Moderate" }
    ]
  },
  paddy: {
    title: "Paddy / Rice Mandi Price Trend (₹ / Quintal)",
    signal: "🟡 HOLD CROP",
    signalClass: "signal-hold",
    reason: "Government procurement centers opening next Monday. Rates expected to rise by ₹120/qtl.",
    prices: [2150, 2160, 2180, 2175, 2190, 2200, 2210],
    days: ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Today"],
    tables: [
      { mandi: "APMC Raichur", district: "Raichur, KA", price: "₹2,210", change: "+₹25 (+1.1%)", up: true, status: "Active" },
      { mandi: "Guntur Mandi", district: "Guntur, AP", price: "₹2,195", change: "+₹10 (+0.4%)", up: true, status: "Active" },
      { mandi: "Burdwan Mandi", district: "Burdwan, WB", price: "₹2,180", change: "+₹15 (+0.7%)", up: true, status: "Active" }
    ]
  },
  tomato: {
    title: "Tomato Mandi Price Trend (₹ / Quintal)",
    signal: "🔴 WAIT FOR RECOVERY",
    signalClass: "signal-wait",
    reason: "Heavy local arrivals caused temporary glut. Prices expected to rebound in 4-5 days.",
    prices: [3200, 2800, 2400, 2100, 1900, 1850, 1800],
    days: ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Today"],
    tables: [
      { mandi: "Kolar Mandi", district: "Kolar, KA", price: "₹1,800", change: "-₹150 (-7.6%)", up: false, status: "Heavy Supply" },
      { mandi: "Nashik APMC", district: "Nashik, MH", price: "₹1,850", change: "-₹100 (-5.1%)", up: false, status: "Heavy Supply" },
      { mandi: "Madanapalle", district: "Chittoor, AP", price: "₹1,920", change: "-₹80 (-4.0%)", up: false, status: "Moderate" }
    ]
  },
  cotton: {
    title: "Cotton Mandi Price Trend (₹ / Quintal)",
    signal: "🟢 SELL NOW",
    signalClass: "signal-sell",
    reason: "Global export demand spike boosted long-staple cotton prices to ₹7,250/qtl.",
    prices: [6800, 6900, 7050, 7100, 7150, 7200, 7250],
    days: ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Today"],
    tables: [
      { mandi: "Rajkot APMC", district: "Rajkot, GJ", price: "₹7,250", change: "+₹120 (+1.7%)", up: true, status: "High Demand" },
      { mandi: "Warangal Mandi", district: "Warangal, TS", price: "₹7,180", change: "+₹90 (+1.2%)", up: true, status: "High Demand" }
    ]
  },
  onion: {
    title: "Onion Mandi Price Trend (₹ / Quintal)",
    signal: "🟡 HOLD CROP",
    signalClass: "signal-hold",
    reason: "Storage quality onion holding firm. Export subsidy announced.",
    prices: [1800, 1850, 1900, 1950, 1980, 2020, 2050],
    days: ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Today"],
    tables: [
      { mandi: "Lasalgaon APMC", district: "Nashik, MH", price: "₹2,050", change: "+₹40 (+2.0%)", up: true, status: "Bullish" },
      { mandi: "Neemuch Mandi", district: "Neemuch, MP", price: "₹2,010", change: "+₹30 (+1.5%)", up: true, status: "Bullish" }
    ]
  }
};

function switchMandiCrop(cropKey, btnElement) {
  document.querySelectorAll('.crop-tab-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  renderMandiDashboard(cropKey);
}

function renderMandiDashboard(cropKey) {
  const data = mandiCropData[cropKey] || mandiCropData.wheat;

  document.getElementById('mandiChartTitle').innerText = data.title;
  
  const signalPill = document.getElementById('mandiSignalPill');
  signalPill.innerText = data.signal;
  signalPill.className = `signal-pill ${data.signalClass}`;

  document.getElementById('mandiSignalReason').innerText = data.reason;

  // Render Table
  const tableBody = document.getElementById('mandiTableBody');
  tableBody.innerHTML = data.tables.map(row => `
    <tr>
      <td><strong>${row.mandi}</strong></td>
      <td>${row.district}</td>
      <td><strong>${row.price}</strong></td>
      <td class="${row.up ? 'price-up' : 'price-down'}">${row.change}</td>
      <td><span class="category-tag" style="font-size:0.75rem;">${row.status}</span></td>
    </tr>
  `).join('');

  // Render Pure Canvas Chart
  drawCanvasChart(data.days, data.prices);
}

function drawCanvasChart(labels, values) {
  const canvas = document.getElementById('mandiChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Set resolution
  const width = canvas.parentElement.clientWidth || 600;
  const height = 280;
  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);

  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const minVal = Math.min(...values) * 0.95;
  const maxVal = Math.max(...values) * 1.05;

  // Draw Background Grid Lines
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  // Plot Points
  const points = values.map((val, index) => {
    const x = padding + (chartWidth / (values.length - 1)) * index;
    const y = height - padding - ((val - minVal) / (maxVal - minVal)) * chartHeight;
    return { x, y, val, label: labels[index] };
  });

  // Draw Gradient Fill under line
  const fillGradient = ctx.createLinearGradient(0, padding, 0, height - padding);
  fillGradient.addColorStop(0, "rgba(34, 197, 94, 0.35)");
  fillGradient.addColorStop(1, "rgba(34, 197, 94, 0.0)");

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, height - padding);
  ctx.lineTo(points[0].x, height - padding);
  ctx.closePath();
  ctx.fillStyle = fillGradient;
  ctx.fill();

  // Draw Smooth Line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw Nodes & Labels
  points.forEach(p => {
    // Node Circle
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#22c55e";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    // X-Axis Day Label
    ctx.fillStyle = "#a7f3d0";
    ctx.font = "12px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(p.label, p.x, height - 12);

    // Y Value Tooltip Text above node
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px Outfit, sans-serif";
    ctx.fillText(`₹${p.val}`, p.x, p.y - 12);
  });
}

/* ==========================================================================
   FEATURE 6: GOVERNMENT SCHEME FINDER LOGIC
   ========================================================================== */

const governmentSchemes = [
  {
    id: "pmkisan",
    name: "PM-KISAN Samman Nidhi Yojana",
    state: "all", size: "small", type: "cash",
    benefit: "₹6,000 / Year Direct Cash",
    desc: "Income support of ₹6,000 per year in three equal installments directly transferred into bank account.",
    eligibility: [
      "Small & Marginal Farmer families with combined landholding up to 2 hectares.",
      "Aadhaar linked bank account is mandatory.",
      "Institutional landholders and high-income taxpayers excluded."
    ]
  },
  {
    id: "pmfby",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    state: "all", size: "all", type: "insurance",
    benefit: "Comprehensive Crop Insurance up to 90% Risk Cover",
    desc: "Financial protection against non-preventable natural risks like flood, drought, pest attack, and hailstorm.",
    eligibility: [
      "All farmers including sharecroppers and tenant farmers growing notified crops.",
      "Kharif premium 2%, Rabi premium 1.5% only."
    ]
  },
  {
    id: "pmksy",
    name: "PM Krishi Sinchayee Yojana (Micro-Irrigation)",
    state: "all", size: "small", type: "equipment",
    benefit: "80% Subsidy on Drip & Sprinkler Sets",
    desc: "Enhances water use efficiency 'Per Drop More Crop' with subsidized drip installation.",
    eligibility: [
      "Farmers owning cultivable land with assured water source.",
      "Special 80% subsidy for SC/ST and small farmers."
    ]
  },
  {
    id: "smam",
    name: "Sub-Mission on Agricultural Mechanization (SMAM)",
    state: "all", size: "medium", type: "equipment",
    benefit: "40% - 50% Subsidy on Tractors & Implements",
    desc: "Subsidized farm machinery purchasing and Custom Hiring Center setup grants.",
    eligibility: [
      "Registered farmer groups, FPOs, and individual farmers."
    ]
  },
  {
    id: "soilhealth",
    name: "National Soil Health Card Scheme",
    state: "all", size: "all", type: "cash",
    benefit: "Free Soil Testing & Micronutrient Voucher",
    desc: "Provides 12-parameter soil health cards to optimize fertilizer usage and boost soil organic carbon.",
    eligibility: [
      "Open to all farmers free of cost every 2 years."
    ]
  }
];

function filterSchemes() {
  const stateVal = document.getElementById('schemeStateFilter').value;
  const sizeVal = document.getElementById('schemeSizeFilter').value;
  const typeVal = document.getElementById('schemeTypeFilter').value;

  const filtered = governmentSchemes.filter(s => {
    const matchState = (stateVal === 'all' || s.state === 'all' || s.state === stateVal);
    const matchSize = (sizeVal === 'all' || s.size === 'all' || s.size === sizeVal);
    const matchType = (typeVal === 'all' || s.type === typeVal);
    return matchState && matchSize && matchType;
  });

  renderSchemes(filtered);
}

function renderSchemes(schemesList) {
  const grid = document.getElementById('schemesGrid');
  if (schemesList.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-muted); text-align:center; grid-column: 1/-1;">No matching schemes found for selected filters.</p>`;
    return;
  }

  grid.innerHTML = schemesList.map(s => `
    <div class="glass-card scheme-card">
      <div>
        <div class="scheme-header">
          <span class="scheme-tag">${s.type.toUpperCase()}</span>
          <span style="font-size:0.8rem; color:var(--primary-light);">Pan-India Govt</span>
        </div>
        <h3 class="scheme-title">${s.name}</h3>
        <div class="scheme-benefit">${s.benefit}</div>
        <p class="scheme-desc">${s.desc}</p>
      </div>
      <button class="btn-apply-scheme" onclick="openSchemeModal('${s.id}')">
        <i class="fa-solid fa-file-signature"></i> View Eligibility & Apply
      </button>
    </div>
  `).join('');
}

function openSchemeModal(schemeId) {
  const scheme = governmentSchemes.find(s => s.id === schemeId);
  if (!scheme) return;

  const modalBody = document.getElementById('schemeModalBody');
  modalBody.innerHTML = `
    <h2 style="color:var(--primary-glow); margin-bottom:12px;">${scheme.name}</h2>
    <div style="background:rgba(245, 158, 11, 0.15); border:1px solid #f59e0b; padding:12px; border-radius:8px; color:#fde047; font-weight:700; margin-bottom:16px;">
      Benefit: ${scheme.benefit}
    </div>
    <p style="color:var(--text-muted); margin-bottom:16px;">${scheme.desc}</p>
    
    <h4 style="color:var(--text-bright); margin-bottom:8px;">Eligibility Checklist:</h4>
    <ul style="padding-left:20px; color:var(--text-main); margin-bottom:24px;">
      ${scheme.eligibility.map(item => `<li style="margin-bottom:6px;">${item}</li>`).join('')}
    </ul>

    <div style="display:flex; gap:12px;">
      <a href="https://pmkisan.gov.in/" target="_blank" class="btn-primary" style="flex:1; justify-content:center;">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Official Govt Portal
      </a>
      <button class="btn-secondary" onclick="closeSchemeModal()">Close</button>
    </div>
  `;

  document.getElementById('schemeModal').style.display = 'flex';
}

function closeSchemeModal() {
  document.getElementById('schemeModal').style.display = 'none';
}

/* ==========================================================================
   FEATURE 7: EMERGENCY SOS ASSISTANCE LOGIC
   ========================================================================== */

const emergencyProtocols = {
  pest: {
    title: "🚨 Emergency Locust / Swarm Pest Attack Protocol",
    steps: [
      "1. Make loud metal noises or play beat sounds in fields to prevent locust swarms from landing.",
      "2. Contact District Agriculture Officer (DAO) immediately for chemical drone spraying.",
      "3. Recommended Emergency Spray: Chlorpyrifos 20% EC @ 2.5 ml/litre of water during dusk hours."
    ],
    speech: "Aapatkalin tiddee dal hamla samachar! Khet me shor machayein aur Chlorpyrifos ka chhidkaav karein."
  },
  disease: {
    title: "🚨 Rapid Crop Blight Outbreak Emergency Protocol",
    steps: [
      "1. Quarantine infected patch by cutting leaves 10 meters around the epicenter.",
      "2. Apply broad-spectrum fungicide Copper Hydroxide @ 2.5g/litre of water immediately.",
      "3. Stop field-to-field irrigation water movement to prevent spore dispersal."
    ],
    speech: "Aapatkalin fasal mahamari chetavni! Sangramith patton ko alag karein aur Copper Hydroxide spray karein."
  },
  flood: {
    title: "🚨 Flash Flood & Waterlogging Rescue Protocol",
    steps: [
      "1. Cut open field peripheral drainage trenches to drain standing water within 24 hours.",
      "2. Apply Foliar spray of 1% Urea + 1% NPK (19:19:19) to boost root resuscitation after water recedes.",
      "3. Apply Trichoderma bio-fungicide to prevent root rot."
    ],
    speech: "Jal-brav aapatkalin protocol! Khet se pani bahar nikalein aur Urea foliar spray karein."
  },
  drought: {
    title: "🚨 Severe Drought & Crop Wilting Protocol",
    steps: [
      "1. Apply Straw/Crop residue Mulching on soil beds to preserve sub-soil moisture.",
      "2. Spray Potassium Nitrate (13-0-45) @ 10g/litre to induce crop drought resistance.",
      "3. Switch to Alternate Furrow Irrigation method to halve water usage."
    ],
    speech: "Sookha prabandhan protocol! Mulching lagayein aur Potassium Nitrate ka spray karein."
  }
};

function triggerEmergencySOS(type) {
  const protocol = emergencyProtocols[type] || emergencyProtocols.pest;

  const modalBody = document.getElementById('schemeModalBody');
  modalBody.innerHTML = `
    <h2 style="color:#ef4444; margin-bottom:12px;">${protocol.title}</h2>
    <div style="background:rgba(239, 68, 68, 0.2); border:1px solid #ef4444; padding:16px; border-radius:8px; margin-bottom:20px;">
      <h4 style="color:white; margin-bottom:10px;">Immediate Action Steps:</h4>
      <ol style="padding-left:20px; color:#fca5a5; font-size:1rem; line-height:1.6;">
        ${protocol.steps.map(s => `<li style="margin-bottom:8px;">${s}</li>`).join('')}
      </ol>
    </div>

    <div style="text-align:center; margin-bottom:16px;">
      <a href="tel:18001801551" class="btn-emergency-nav" style="display:inline-flex; padding:14px 28px; font-size:1.1rem; justify-content:center;">
        <i class="fa-solid fa-phone"></i> Call Kisan Call Center (1800-180-1551)
      </a>
    </div>

    <button class="btn-secondary" onclick="closeSchemeModal()" style="width:100%;">Dismiss Emergency Alert</button>
  `;

  document.getElementById('schemeModal').style.display = 'flex';
  speakText(protocol.speech);
}

/* ==========================================================================
   FEATURE 8: KISAN MITRA AI (FLOATING CHATBOT) LOGIC
   ========================================================================== */

function toggleKisanChat() {
  const chatBox = document.getElementById('kisanChatBox');
  chatBox.classList.toggle('open');
}

function sendKisanMsg() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  const chatBody = document.getElementById('chatBody');

  // User Message
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-msg user';
  userDiv.innerText = msg;
  chatBody.appendChild(userDiv);

  input.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  // Bot Typing Simulation with Native Language Engine
  setTimeout(() => {
    const lower = msg.toLowerCase();
    let botCategory = 'irrigation';

    if (lower.includes('rain') || lower.includes('weather') || lower.includes('barish') || lower.includes('mausam') || lower.includes('ਮੌਸਮ') || lower.includes('हवामान') || lower.includes('હવામાન') || lower.includes('மழை') || lower.includes('ಮಳೆ') || lower.includes('వర్షం')) {
      botCategory = 'weather';
    } else if (lower.includes('mandi') || lower.includes('rate') || lower.includes('price') || lower.includes('bhav') || lower.includes('भाव') || lower.includes('ਭਾਅ') || lower.includes('ભાવ') || lower.includes('விலை') || lower.includes('ದರ') || lower.includes('ధర')) {
      botCategory = 'market';
    } else if (lower.includes('rog') || lower.includes('disease') || lower.includes('leaf') || lower.includes('daag') || lower.includes('રોગ') || lower.includes('ਰੋਗ') || lower.includes('ठिपके')) {
      botCategory = 'disease';
    } else if (lower.includes('khad') || lower.includes('fertilizer') || lower.includes('urea') || lower.includes('dap') || lower.includes('ਖਾਦ') || lower.includes('ખાદ') || lower.includes('உரம்')) {
      botCategory = 'fertilizer';
    }

    const nativeResp = validateAndGetNativeResponse(botCategory, currentLanguage, msg);
    const botReply = nativeResp.speech;

    const botDiv = document.createElement('div');
    botDiv.className = 'chat-msg bot';
    botDiv.innerText = botReply;
    chatBody.appendChild(botDiv);

    chatBody.scrollTop = chatBody.scrollHeight;
    speakText(botReply);
  }, 800);
}

/* ==========================================================================
   FEATURE 10: IMPACT METRICS COUNTER ANIMATION
   ========================================================================== */

function animateImpactCounters() {
  const counters = [
    { id: 'counter1', target: 40, suffix: '%' },
    { id: 'counter2', target: 65, suffix: '%' },
    { id: 'counter3', target: 35, suffix: '%' },
    { id: 'counter4', target: 98, suffix: '%' }
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(c => {
          const elem = document.getElementById(c.id);
          if (!elem || elem.dataset.animated) return;
          elem.dataset.animated = "true";

          let count = 0;
          const duration = 1500;
          const stepTime = Math.abs(Math.floor(duration / c.target));

          const timer = setInterval(() => {
            count += 1;
            elem.innerText = count + c.suffix;
            if (count >= c.target) {
              clearInterval(timer);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const impactSection = document.getElementById('impact');
  if (impactSection) observer.observe(impactSection);
}

/* ==========================================================================
   INITIALIZATION ON DOM LOADED
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Weather with default Punjab
  updateWeatherDisplay('punjab');

  // Initialize Mandi Chart with Wheat
  renderMandiDashboard('wheat');

  // Initialize Scheme Filter
  filterSchemes();

  // Initialize Counter Animations
  animateImpactCounters();

  // Resize Listener for Canvas Chart responsiveness
  window.addEventListener('resize', () => {
    const activeTab = document.querySelector('.crop-tab-btn.active');
    if (activeTab) {
      const cropText = activeTab.innerText.toLowerCase();
      if (cropText.includes('wheat')) renderMandiDashboard('wheat');
      else if (cropText.includes('rice')) renderMandiDashboard('paddy');
      else if (cropText.includes('tomato')) renderMandiDashboard('tomato');
      else if (cropText.includes('cotton')) renderMandiDashboard('cotton');
      else if (cropText.includes('onion')) renderMandiDashboard('onion');
    }
  });
});
