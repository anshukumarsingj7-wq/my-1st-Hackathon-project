/* ==========================================================================
   FARMIQ - AI Powered Smart Farming Assistant
   Core Application Engine (Pure ES6+ JavaScript)
   ========================================================================== */

// Global State Management
let currentLanguage = 'en';
let recognition = null;
let isListening = false;
let currentSpeechResponse = '';
let currentMandiChart = null;

/* ==========================================================================
   MULTILINGUAL TRANSLATION DICTIONARY (EN, HI, KN, TA, TE)
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
  }
};

/* Language Switcher Engine */
function changeLanguage(langCode) {
  currentLanguage = langCode;
  const langData = translations[langCode] || translations['en'];

  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (langData[key]) {
      elem.innerText = langData[key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
    const key = elem.getAttribute('data-i18n-placeholder');
    if (langData[key]) {
      elem.placeholder = langData[key];
    }
  });

  // Update voice synthesis pitch/locale
  if (recognition) {
    recognition.lang = getLocaleForLang(langCode);
  }
}

function getLocaleForLang(langCode) {
  switch (langCode) {
    case 'hi': return 'hi-IN';
    case 'kn': return 'kn-IN';
    case 'ta': return 'ta-IN';
    case 'te': return 'te-IN';
    default: return 'en-US';
  }
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
      micBtn.classList.add('listening');
      micStatus.innerText = (currentLanguage === 'hi') ? 'सुन रहा हूँ... बोलिए' : 'Listening... Speak Now';
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
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
  let category = 'general';
  let categoryLabel = 'General Query';
  let categoryIcon = 'fa-lightbulb';
  let solutionHTML = '';
  let speechText = '';

  // Disease Intent Keywords
  if (text.includes('daag') || text.includes('rog') || text.includes('spot') || text.includes('leaf') || text.includes('patto') || text.includes('disease') || text.includes('keeda') || text.includes('insect')) {
    category = 'disease';
    categoryLabel = 'Crop Disease Diagnosis';
    categoryIcon = 'fa-stethoscope';
    speechText = "Aapki fasal me patton ke daag fafundh (fungal blight) ke lakshan hain. Mancozeb 75% WP do gram prati litre pani me milakar chhidkaav karein.";
    solutionHTML = `
      <h4 style="color:var(--primary-glow); margin-bottom:8px;">Detected: Leaf Spot Fungal Infection (लीफ स्पॉट फफूंद)</h4>
      <p>Your crop symptoms indicate early fungal leaf blight due to high moisture.</p>
      <ul class="solution-steps">
        <li><strong>Immediate Spray:</strong> Spray Mancozeb 75% WP @ 2g/litre of water immediately.</li>
        <li><strong>Organic Remedy:</strong> Spray Neem Oil (10,000 PPM) 5ml per litre in evening hours.</li>
        <li><strong>Precaution:</strong> Remove infected lower yellow leaves to stop spore spreading.</li>
      </ul>
    `;
  }
  // Weather Intent Keywords
  else if (text.includes('barish') || text.includes('mausam') || text.includes('rain') || text.includes('weather') || text.includes('kal') || text.includes('garmi')) {
    category = 'weather';
    categoryLabel = 'Weather Forecast Alert';
    categoryIcon = 'fa-cloud-sun-rain';
    speechText = "Aapke kshetra me kal 15 pratishat barish ki sambhavna hai. Aakash me halke badal rahenge. Aaj sinchai karna surakshit hai.";
    solutionHTML = `
      <h4 style="color:var(--primary-glow); margin-bottom:8px;">Weather Advisory: Partly Cloudy (15% Rain Chance)</h4>
      <p>Tomorrow will remain partly cloudy with light wind speeds (12 km/h).</p>
      <ul class="solution-steps">
        <li><strong>Irrigation:</strong> ✅ Safe to irrigate crops today morning.</li>
        <li><strong>Spraying:</strong> ❌ Avoid heavy pesticide spraying due to moderate wind drift.</li>
        <li><strong>Harvesting:</strong> Harvested grains should be covered with tarpaulin sheets.</li>
      </ul>
    `;
  }
  // Market Mandi Intent Keywords
  else if (text.includes('rate') || text.includes('dam') || text.includes('daam') || text.includes('mandi') || text.includes('price') || text.includes('gehu') || text.includes('bhav')) {
    category = 'market';
    categoryLabel = 'Mandi Market Intelligence';
    categoryIcon = 'fa-chart-line';
    speechText = "Aaj gehu ka mandi bhav do hazar char sau pachas rupaye prati quintal hai. Bazaar me tezi hai, bechne ka achha samay hai.";
    solutionHTML = `
      <h4 style="color:var(--primary-glow); margin-bottom:8px;">Wheat Rate: ₹2,450 / Quintal (🟢 SELL NOW)</h4>
      <p>Current mandi rates are up by +4.2% over last week due to tight regional supply.</p>
      <ul class="solution-steps">
        <li><strong>Azadpur Mandi:</strong> ₹2,450 / Qtl (Trend: Rising)</li>
        <li><strong>Vashi Mandi:</strong> ₹2,480 / Qtl</li>
        <li><strong>Recommendation:</strong> Sell 60% of inventory now to lock in high profits.</li>
      </ul>
    `;
  }
  // Fertilizer Intent Keywords
  else if (text.includes('khad') || text.includes('fertilizer') || text.includes('urea') || text.includes('dap') || text.includes('dhan')) {
    category = 'fertilizer';
    categoryLabel = 'Fertilizer Dosage Recommendation';
    categoryIcon = 'fa-flask';
    speechText = "Dhan ki fasal ke liye pratham charan me 45 kilo urea aur 50 kilo DAP prati ekad ki matra mein prayog karein.";
    solutionHTML = `
      <h4 style="color:var(--primary-glow); margin-bottom:8px;">Recommended Dosage for 1 Acre Paddy</h4>
      <p>Balanced N-P-K nutrient formula calculated for high yield:</p>
      <ul class="solution-steps">
        <li><strong>Urea (Nitrogen 46%):</strong> 45 kg / Acre</li>
        <li><strong>DAP (Di-Ammonium Phosphate):</strong> 50 kg / Acre</li>
        <li><strong>Neem Cake Organic:</strong> 100 kg / Acre for soil microbe health.</li>
      </ul>
    `;
  }
  // Default Irrigation/General Response
  else {
    category = 'irrigation';
    categoryLabel = 'Smart Farming Guidance';
    categoryIcon = 'fa-droplet';
    speechText = "Smart FarmIQ assistant aapki sahayata ke liye tayar hai. Kripya apna prashn fasal, mausam ya mandi bhav ke bare me poochein.";
    solutionHTML = `
      <h4 style="color:var(--primary-glow); margin-bottom:8px;">General Agricultural Advisory</h4>
      <p>For your query "${queryText}", FarmIQ recommends maintaining proper soil aeration and regular crop monitoring.</p>
      <ul class="solution-steps">
        <li>Check leaf undersides every 3 days for early pest eggs.</li>
        <li>Use drip irrigation to save 40% water and prevent root rot.</li>
      </ul>
    `;
  }

  // Render Result Card
  const resultCard = document.getElementById('voiceResultCard');
  document.getElementById('resCategoryTag').innerHTML = `<i class="fa-solid ${categoryIcon}"></i> <span>${categoryLabel}</span>`;
  document.getElementById('resUserQuery').innerText = `"${queryText}"`;
  document.getElementById('resSolutionBody').innerHTML = solutionHTML;

  resultCard.style.display = 'block';
  currentSpeechResponse = speechText;

  // Speak aloud automatically
  speakText(speechText);
}

function speakCurrentResponse() {
  if (currentSpeechResponse) {
    speakText(currentSpeechResponse);
  }
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  
  // Cancel previous speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = getLocaleForLang(currentLanguage);
  utterance.rate = 0.95; // Slightly slower for clarity
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
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

  // Bot Typing Simulation
  setTimeout(() => {
    let botReply = "I have noted your concern. For leaf diseases, try our AI Crop Doctor scanner above! Is there anything else about weather or mandi rates?";
    const lower = msg.toLowerCase();
    
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('namaste')) {
      botReply = "Namaste Kisan Bhai! How is your farm doing today?";
    } else if (lower.includes('rain') || lower.includes('weather') || lower.includes('barish')) {
      botReply = "Check our Weather Advisor section for live 5-day rain predictions for your state!";
    } else if (lower.includes('mandi') || lower.includes('rate') || lower.includes('price')) {
      botReply = "Wheat prices are currently high at ₹2,450/qtl. Check the Smart Mandi Dashboard above!";
    }

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
