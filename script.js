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
    featLang: "13 Native Languages",
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
    inputPlaceholder: "Type your query in your native language or English...",
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
    featLang: "13 भारतीय भाषाएं",
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
    inputPlaceholder: "अपनी भाषा या हिंदी में सवाल लिखें...",
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
    featLang: "13 ಮಾತೃಭಾಷೆಗಳು",
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
    inputPlaceholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕನ್ನಡದಲ್ಲಿ ಬರೆಯಿರಿ...",
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
    featLang: "13 தாய்மொழிகள்",
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
    inputPlaceholder: "உங்கள் கேள்வியை தமிழில் தட்டச்சு செய்க...",
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
    featLang: "13 మాతృభాషలు",
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
    inputPlaceholder: "మీ ప్రశ్నను తెలుగులో టైప్ చేయండి...",
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
    tagImpact: "প্ৰকৃত ফলাফল",
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

/* Language Switcher Engine */
function changeLanguage(langCode) {
  currentLanguage = langCode;
  const langData = translations[langCode] || translations['en'];

  // Sync desktop and mobile select dropdowns
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
    case 'mr': return 'mr-IN';
    case 'bn': return 'bn-IN';
    case 'gu': return 'gu-IN';
    case 'pa': return 'pa-IN';
    case 'ml': return 'ml-IN';
    case 'or': return 'or-IN';
    case 'as': return 'as-IN';
    case 'ur': return 'ur-IN';
    default: return 'en-US';
  }
}ತವಾದ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ.",
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

/* Native Multilingual AI Assistant Response Engine */
const nativeResponses = {
  disease: {
    en: {
      label: "Crop Disease Diagnosis",
      speech: "Leaf spot fungal infection detected in your crop. Spray Mancozeb 75% WP at 2 grams per litre of water immediately.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">Detected: Leaf Spot Fungal Infection</h4>
             <p>Your crop symptoms indicate early fungal leaf blight due to high moisture.</p>
             <ul class="solution-steps">
               <li><strong>Immediate Spray:</strong> Spray Mancozeb 75% WP @ 2g/litre of water immediately.</li>
               <li><strong>Organic Remedy:</strong> Spray Neem Oil (10,000 PPM) 5ml per litre in evening hours.</li>
               <li><strong>Precaution:</strong> Remove infected lower yellow leaves to stop spore spreading.</li>
             </ul>`
    },
    hi: {
      label: "फसल रोग निदान",
      speech: "आपकी फसल में पत्तियों के धब्बे (फफूंद रोग) के लक्षण हैं। मैंकोजेब 75% WP दो ग्राम प्रति लीटर पानी में मिलाकर तुरंत छिड़काव करें।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">पहचाना गया: लीफ स्पॉट फफूंद रोग (Leaf Spot)</h4>
             <p>अत्यधिक नमी के कारण फसल में अगेती झुलसा के लक्षण हैं।</p>
             <ul class="solution-steps">
               <li><strong>तुरंत छिड़काव:</strong> 2 ग्राम/लीटर मैंकोजेब 75% WP का छिड़काव करें।</li>
               <li><strong>जैविक उपाय:</strong> शाम को नीम का तेल (10,000 PPM) 5 मि.ली./लीटर छिड़कें।</li>
               <li><strong>सावधानी:</strong> संक्रमित पीले पत्तों को तोड़कर दूर नष्ट करें।</li>
             </ul>`
    },
    kn: {
      label: "ಬೆಳೆ ರೋಗ ಪತ್ತೆ",
      speech: "ನಿಮ್ಮ ಬೆಳೆಯಲ್ಲಿ ಎಲೆ ಚುಕ್ಕೆ ಶಿಲೀಂಧ್ರ ರೋಗ ಕಂಡುಬಂದಿದೆ. ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP ಅನ್ನು 2 ಗ್ರಾಂ ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ ಬೆರೆಸಿ ತಕ್ಷಣ ಸಿಂಪಡಿಸಿ.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ಪತ್ತೆಯಾಗಿದೆ: ಎಲೆ ಚುಕ್ಕೆ ಶಿಲೀಂಧ್ರ ರೋಗ</h4>
             <p>ಹೆಚ್ಚಿನ ತೇವಾಂಶದಿಂದಾಗಿ ಬೆಳೆಗೆ ಶಿಲೀಂಧ್ರ ಬಾಧೆ ಉಂಟಾಗಿದೆ.</p>
             <ul class="solution-steps">
               <li><strong>ತಕ್ಷಣದ ಔಷಧ:</strong> 2 ಗ್ರಾಂ/ಲೀಟರ್ ಮ್ಯಾಂಕೋಜೆಬ್ 75% ಸಿಂಪಡಿಸಿ.</li>
               <li><strong>ಸಾವಯವ ಪರಿಹಾರ:</strong> ಸಂಜೆ 5 ಮಿಲಿ ಬೇಪಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ.</li>
             </ul>`
    },
    ta: {
      label: "பயிர் நோய் கண்டறிதல்",
      speech: "உங்கள் பயிரில் இலைப்புள்ளி பூஞ்சை நோய் கண்டறியப்பட்டுள்ளது. மேன்கோசெப் 75% WP 2 கிராம்/லிட்டர் தண்ணீரில் கலந்து உடனே தெளிக்கவும்.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">கண்டறியப்பட்டது: இலைப்புள்ளி பூஞ்சை நோய்</h4>
             <p>அதிக ஈரப்பதம் காரணமாக பயிரில் பூஞ்சை நோய் ஏற்பட்டுள்ளது.</p>
             <ul class="solution-steps">
               <li><strong>உடனடி தெளிப்பு:</strong> மேன்கோசெப் 75% WP 2 கிராம்/லிட்டர் தெளிக்கவும்.</li>
               <li><strong>இயற்கை மருந்து:</strong> வேப்ப எண்ணெய் 5 மி.லி/லிட்டர் தெளிக்கவும்.</li>
             </ul>`
    },
    te: {
      label: "పంట తెగులు నిర్ధారణ",
      speech: "మీ పంటలో ఆకు మచ్చల శిలీంధ్ర తెగులు గుర్తించబడింది. లీటరు నీటికి 2 గ్రాముల మ్యాంకోజెబ్ 75% WP వెంటనే పిచికారీ చేయండి.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">గుర్తించబడింది: ఆకు మచ్చల ఫంగల్ తెగులు</h4>
             <p>అధిక తేమ వల్ల ఆకు మచ్చ తెగులు ఆవహించింది.</p>
             <ul class="solution-steps">
               <li><strong>తక్షణ పిచికారీ:</strong> లీటరు నీటికి 2 గ్రాముల మ్యాంకోజెబ్ చల్లండి.</li>
               <li><strong>సేంద్రీయ లెక్కింపు:</strong> సాయంత్రం వేప నూనె 5ml/L పిచికారీ చేయండి.</li>
             </ul>`
    },
    mr: {
      label: "पीक रोग निदान",
      speech: "तुमच्या पिकावर पानावरील ठिपके (बुरशीजन्य रोग) आढळले आहेत. मँकोझेब ७५% डब्ल्यूपी २ ग्रॅम प्रति लिटर पाण्यात मिसळून तात्काळ फवारणी करा.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">निदान: पानांवरील ठिपके बुरशीजन्य रोग</h4>
             <p>जास्त दमट हवामानामुळे पिकावर बुरशीचा प्रादुर्भाव झाला आहे.</p>
             <ul class="solution-steps">
               <li><strong>तात्काळ फवारणी:</strong> मँकोझेब ७५% डब्ल्यूपी २ ग्रॅम/लिटर पाण्यात मिसळून फवारा.</li>
               <li><strong>जैविक उपाय:</strong> संध्याकाळी कडुलिंब तेल ५ मि.ली./लिटर फवारा.</li>
             </ul>`
    },
    bn: {
      label: "শস্য রোগ শনাক্তকরণ",
      speech: "আপনার ফসলে পাতার দাগ ছত্রাকজনিত রোগ শনাক্ত হয়েছে। ম্যানকোজেব ৭৫% ডাব্লিউপি প্রতি লিটার জলে ২ গ্রাম মিশিয়ে অবিলম্বে স্প্রে করুন।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">শনাক্ত করা হয়েছে: পাতার দাগ ছত্রাক রোগ</h4>
             <p>অতিরিক্ত আর্দ্রতার কারণে ফসলে ছত্রাকের সংক্রমণ ঘটেছে।</p>
             <ul class="solution-steps">
               <li><strong>অবিলম্বে স্প্রে:</strong> প্রতি লিটার জলে ২ গ্রাম ম্যানকোজেব ৭৫% স্প্রে করুন।</li>
               <li><strong>জৈব প্রতিকার:</strong> বিকেলে নিম তেল ৫ মি.লি./লিটার প্রয়োগ করুন।</li>
             </ul>`
    },
    gu: {
      label: "પાક રોગ નિદાન",
      speech: "તમારા પાકમાં પાંદડાના ટપકા (ફૂગનો રોગ) જોવા મળ્યો છે. મેન્કોઝેબ 75% WP પ્રતિ લીટર પાણીમાં 2 ગ્રામ ભેળવીને તાત્કાલિક છંટકાવ કરો.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">નિદાન: પાંદડાના ટપકાંનો ફૂગ રોગ</h4>
             <p>વધુ ભેજને કારણે પાકમાં ફૂગનો ઉપદ્રવ થયો છે.</p>
             <ul class="solution-steps">
               <li><strong>તાત્કાલિક છંટકાવ:</strong> મેન્કોઝેબ 75% WP 2 ગ્રામ/લીટર પાણીમાં છાંટો.</li>
               <li><strong>જૈવિક ઉપાય:</strong> સાંજે લીમડાનું તેલ 5ml/લીટર વાપરો.</li>
             </ul>`
    },
    pa: {
      label: "ਫ਼ਸਲ ਰੋਗ ਨਿਦਾਨ",
      speech: "ਤੁਹਾਡੀ ਫ਼ਸਲ ਵਿੱਚ ਪੱਤਿਆਂ ਦੇ ਧੱਬੇ (ਫੰਗਲ ਰੋਗ) ਪਾਏ ਗਏ ਹਨ। ਮੈਨਕੋਜ਼ੇਬ 75% WP 2 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਮਿਲਾ ਕੇ ਤੁਰੰਤ ਛਿੜਕਾਅ ਕਰੋ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ਸ਼ਨਾਖਤ: ਪੱਤਿਆਂ ਦੇ ਧੱਬੇ ਦੀ ਫੰਗਲ ਇਨਫੈਕਸ਼ਨ</h4>
             <p>ਜ਼ਿਆਦਾ ਨਮੀ ਕਾਰਨ ਫ਼ਸਲ 'ਤੇ ਫੰਗਸ ਦਾ ਹਮਲਾ ਹੋਇਆ ਹੈ।</p>
             <ul class="solution-steps">
               <li><strong>ਤੁਰੰਤ ਛਿੜਕਾਅ:</strong> 2 ਗ੍ਰਾਮ/ਲੀਟਰ ਮੈਨਕੋਜ਼ੇਬ 75% WP ਦਾ ਛਿੜਕਾਅ ਕਰੋ।</li>
               <li><strong>ਜੈਵਿਕ ਹੱਲ:</strong> ਸ਼ਾਮ ਨੂੰ ਨਿੰਮ ਦਾ ਤੇਲ 5ml/ਲੀਟਰ ਛਿੜਕੋ।</li>
             </ul>`
    },
    ml: {
      label: "വിള രോഗ നിർണയം",
      speech: "നിങ്ങളുടെ വിളയിൽ ഇലപ്പുള്ളി ഫംഗസ് രോഗം കണ്ടത്തിയിരിക്കുന്നു. മാങ്കോസെബ് 75% WP ലിറ്ററിന് 2 ഗ്രാം വീതം ചേർത്ത് ഉടനടി തളിക്കുക.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">കണ്ടെത്തിയിരിക്കുന്നു: ഇലപ്പുള്ളി ഫംഗസ് രോഗം</h4>
             <p>അമിത ഈർപ്പം കാരണം ഫംഗസ് ബാധ ഉണ്ടായിരിക്കുന്നു.</p>
             <ul class="solution-steps">
               <li><strong>ഉടനടി തളിക്കാൻ:</strong> മാങ്കോസെബ് 75% WP ലിറ്ററിന് 2 ഗ്രാം തളിക്കുക.</li>
               <li><strong>ജൈവ രീതി:</strong> വൈകുന്നേരം വേപ്പെണ്ണ 5ml/L തളിക്കുക.</li>
             </ul>`
    },
    or: {
      label: "ଫସଲ ରୋଗ ଚିହ୍ନଟ",
      speech: "ଆପଣଙ୍କ ଫସଲରେ ପତ୍ର ଦାଗ ଫଙ୍ଗସ ରୋଗ ଚିହ୍ନଟ ହୋଇଛି। ମ୍ୟାଙ୍କୋଜେବ ୭୫% WP ଲିଟର ପ୍ରତି ୨ ଗ୍ରାମ ମିଶାଇ ତୁରନ୍ତ ସ୍ପ୍ରେ କରନ୍ତୁ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ଚିହ୍ନଟ: ପତ୍ର ଦାଗ ଫଙ୍ଗାଲ୍ ରୋଗ</h4>
             <p>ଅଧିକ ଆର୍ଦ୍ରତା ହେତୁ ଫସଲରେ ଫଙ୍ଗସ୍ ସଂକ୍ରମଣ ହୋଇଛି।</p>
             <ul class="solution-steps">
               <li><strong>ତୁରନ୍ତ ସ୍ପ୍ରେ:</strong> ଲିଟର ପ୍ରତି ୨ ଗ୍ରାମ ମ୍ୟାଙ୍କୋଜେବ ସ୍ପ୍ରେ କରନ୍ତୁ।</li>
               <li><strong>ଜୈବିକ ଉପାୟ:</strong> ସନ୍ଧ୍ୟାରେ ନିମ୍ବ ତେଲ ୫ml/L ବ୍ୟବହାର କରନ୍ତୁ।</li>
             </ul>`
    },
    as: {
      label: "শস্য ৰোগ চিনাক্তকৰণ",
      speech: "আপোনাৰ শস্যত পাতৰ দাগ ফাংগেল ৰোগ ধৰা পৰিছে। মেনকোজেব ৭৫% WP প্রতি লিটাৰ পানীত ২ গ্ৰাম মিহলাই লগে লগে স্প্ৰে কৰক।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">চিনাক্ত হ'ল: পাতৰ দাগ ফাংগেল ৰোগ</h4>
             <p>অধিক আৰ্দ্ৰতাৰ বাবে শস্যত ভেঁকুৰৰ সংক্ৰমণ হৈছে।</p>
             <ul class="solution-steps">
               <li><strong>লগে লগে স্প্ৰে কৰক:</strong> ২ গ্ৰাম/লিটাৰ মেনকোজেব ৭৫% WP স্প্ৰে কৰক।</li>
               <li><strong>জৈৱিক উপায়:</strong> গধূলি নিম তেল ৫ml/লিটাৰ স্প্ৰে কৰক।</li>
             </ul>`
    },
    ur: {
      label: "فصل کی بیماری کی تشخیص",
      speech: "آپ کی فصل میں پتوں کے دھبے کی فنگل بیماری تشخیص ہوئی ہے۔ مینکوزیب 75٪ ڈبلیو پی 2 گرام فی لیٹر پانی میں ملا کر فوری اسپرے کریں۔",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">تشخیص: پتوں کے دھبے کی فنگل بیماری</h4>
             <p>زیادہ نمی کی وجہ سے فصل میں فنگس کا حملہ ہوا ہے۔</p>
             <ul class="solution-steps">
               <li><strong>فوری اسپرے:</strong> مینکوزیب 75٪ ڈبلیو پی 2 گرام فی لیٹر پانی اسپرے کریں۔</li>
               <li><strong>نامیاتی علاج:</strong> شام کو نیم کا تیل 5 ملی لیٹر فی لیٹر اسپرے کریں۔</li>
             </ul>`
    }
  },
  weather: {
    en: {
      label: "Weather Forecast Alert",
      speech: "Tomorrow expect 15% rain probability with mild cloud cover. Safe to irrigate crops today morning.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">Weather Advisory: Partly Cloudy (15% Rain Chance)</h4>
             <p>Tomorrow will remain partly cloudy with light wind speeds (12 km/h).</p>
             <ul class="solution-steps">
               <li><strong>Irrigation:</strong> ✅ Safe to irrigate crops today morning.</li>
               <li><strong>Spraying:</strong> ❌ Avoid heavy pesticide spraying due to moderate wind drift.</li>
             </ul>`
    },
    hi: {
      label: "मौसम सलाह चेतावनी",
      speech: "कल आपके क्षेत्र में 15 प्रतिशत बारिश की संभावना है। आसमान में हल्के बादल रहेंगे। आज सुबह सिंचाई करना सुरक्षित है।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">मौसम सलाह: आंशिक बादल (15% बारिश संभावना)</h4>
             <p>कल हल्की हवा (12 किमी/घंटा) के साथ मौसम सुहावना रहेगा।</p>
             <ul class="solution-steps">
               <li><strong>सिंचाई:</strong> ✅ आज सुबह सिंचाई करना सुरक्षित है।</li>
               <li><strong>छिड़काव:</strong> ❌ तेज हवा के कारण कीटनाशक का छिड़काव न करें।</li>
             </ul>`
    },
    kn: {
      label: "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
      speech: "ನಾಳೆ ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ 15% ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ. ಇಂದು ಬೆಳಿಗ್ಗೆ ಬೆಳೆಗೆ ನೀರು ಹಾಯಿಸುವುದು ಸುರಕ್ಷಿತ.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ: ಭಾಗಶಃ ಮೋಡ (15% ಮಳೆ ಸಾಧ್ಯತೆ)</h4>
             <ul class="solution-steps">
               <li><strong>ನೀರಾವರಿ:</strong> ✅ ಇಂದು ಬೆಳಿಗ್ಗೆ ನೀರು ಉಣಿಸುವುದು ಸೂಕ್ತ.</li>
             </ul>`
    },
    ta: {
      label: "வானிலை அறிக்கை",
      speech: "நாளை 15% மழை பெய்ய வாய்ப்புள்ளது. இன்று காலை பயிர்களுக்கு நீர் பாய்ச்சுவது பாதுகாப்பானது.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">வானிலை அறிக்கை: 15% மழை வாய்ப்பு</h4>
             <ul class="solution-steps">
               <li><strong>பாசனம்:</strong> ✅ இன்று காலை நீர் பாய்ச்சலாம்.</li>
             </ul>`
    },
    te: {
      label: "వాతావరణ హెచ్చరిక",
      speech: "రేపు మీ ప్రాంతంలో 15% వర్షం పడే అవకాశం ఉంది. ఈరోజు ఉదయం నీటిపారుదల చేయడం సురక్షితం.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">వాతావరణ నివేదిక: 15% వర్ష సూచన</h4>
             <ul class="solution-steps">
               <li><strong>నీటిపారుదల:</strong> ✅ ఈరోజు ఉదయం నీరు అందించడం మంచిది.</li>
             </ul>`
    },
    mr: {
      label: "हवामान इशारा",
      speech: "उद्या १५ टक्के पावसाची शक्यता आहे. आज सकाळी पिकाला पाणी देणे सुरक्षित आहे.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">हवामान अंदाज: १५% पावसाची शक्यता</h4>
             <ul class="solution-steps">
               <li><strong>सिंचन:</strong> ✅ आज सकाळी पिकाला पाणी देणे योग्य.</li>
             </ul>`
    },
    bn: {
      label: "আবহাওয়া সতর্কতা",
      speech: "আগামীকাল ১৫% বৃষ্টির সম্ভাবনা রয়েছে। আজ সকালে ফসলে সেচ দেওয়া নিরাপদ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">আবহাওয়া পরামর্শ: ১৫% বৃষ্টির সম্ভাবনা</h4>
             <ul class="solution-steps">
               <li><strong>সেচ:</strong> ✅ আজ সকালে সেচ দেওয়া নিরাপদ।</li>
             </ul>`
    },
    gu: {
      label: "હવામાન સલાહ",
      speech: "આવતીકાલે 15% વરસાદની શક્યતા છે. આજે સવારે પાકમાં પિયત આપવું સુરક્ષિત છે.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">હવામાન આગાહી: 15% વરસાદની શક્યતા</h4>
             <ul class="solution-steps">
               <li><strong>પિયત:</strong> ✅ આજે સવારે પિયત આપી શકાય.</li>
             </ul>`
    },
    pa: {
      label: "ਮੌਸਮ ਚੇਤਾਵਨੀ",
      speech: "ਕੱਲ੍ਹ 15% ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਅੱਜ ਸਵੇਰੇ ਫ਼ਸਲ ਨੂੰ ਪਾਣੀ ਦੇਣਾ ਸੁਰੱਖਿਅਤ ਹੈ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ਮੌਸਮ ਚੇਤਾਵਨੀ: 15% ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ</h4>
             <ul class="solution-steps">
               <li><strong>ਸਿੰਚਾਈ:</strong> ✅ ਅੱਜ ਸਵੇਰੇ ਪਾਣੀ ਲਗਾਉਣਾ ਠੀਕ ਹੈ।</li>
             </ul>`
    },
    ml: {
      label: "കാലാവസ്ഥാ മുന്നറിയിപ്പ്",
      speech: "നാളെ 15% മഴയ്ക്ക് സാധ്യതയുണ്ട്. ഇന്ന് രാവിലെ നനയ്ക്കുന്നത് സുരക്ഷിതമാണ്.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">കാലാവസ്ഥ പ്രവചനം: 15% മഴ സാധ്യത</h4>
             <ul class="solution-steps">
               <li><strong>നനയ്ക്കൽ:</strong> ✅ ഇന്ന് രാവിലെ നനയ്ക്കാം.</li>
             </ul>`
    },
    or: {
      label: "ପାଣିପାଗ ପରାମର୍ଶ",
      speech: "ଆସନ୍ତାକାଲି ୧୫% ବର୍ଷା ସମ୍ଭାବନା ଅଛି। ଆଜି ସକାଳେ ଫସଲରେ ଜଳସେଚନ କରିବା ସୁରକ୍ଷିତ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ପାଣିପାଗ ସୂଚନା: ୧୫% ବର୍ଷା ସମ୍ଭାବନା</h4>
             <ul class="solution-steps">
               <li><strong>ଜଳସେଚନ:</strong> ✅ ଆଜି ସକାଳେ ପାଣି ଦେବା ସୁରକ୍ଷିତ।</li>
             </ul>`
    },
    as: {
      label: "বতৰৰ পৰামৰ্শ",
      speech: "কাইলৈ ১৫% বৰষুণৰ সম্ভাৱনা আছে। আজি পুৱা শস্যত পানী দিয়া সুৰক্ষিত।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">বতৰৰ পূৰ্বাভাস: ১৫% বৰষুণৰ সম্ভাৱনা</h4>
             <ul class="solution-steps">
               <li><strong>জলসিঞ্চন:</strong> ✅ আজি পুৱা পানী দিয়ক।</li>
             </ul>`
    },
    ur: {
      label: "موسم کی پیش گوئی",
      speech: "کل 15 فیصد بارش کا امکان ہے۔ آج صبح فصل کو پانی دینا محفوظ ہے۔",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">موسم کی پیش گوئی: 15٪ بارش کا امکان</h4>
             <ul class="solution-steps">
               <li><strong>آبپاشی:</strong> ✅ آج صبح پانی دینا مناسب ہے۔</li>
             </ul>`
    }
  },
  market: {
    en: {
      label: "Mandi Market Intelligence",
      speech: "Today wheat mandi price is 2,450 rupees per quintal. Market is bullish, good time to sell.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">Wheat Rate: ₹2,450 / Quintal (🟢 SELL NOW)</h4>
             <p>Current mandi rates are up by +4.2% over last week due to tight supply.</p>
             <ul class="solution-steps">
               <li><strong>Azadpur Mandi:</strong> ₹2,450 / Qtl</li>
               <li><strong>Vashi Mandi:</strong> ₹2,480 / Qtl</li>
             </ul>`
    },
    hi: {
      label: "मंडी बाजार सूचना",
      speech: "आज गेहूं का मंडी भाव 2,450 रुपये प्रति क्विंटल है। बाजार में तेजी है, बेचने का अच्छा समय है।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">गेहूं भाव: ₹2,450 / क्विंटल (🟢 बेचने का समय)</h4>
             <p>पिछले सप्ताह की तुलना में भाव में 4.2% की बढ़त दर्ज की गई है।</p>
             <ul class="solution-steps">
               <li><strong>आजादपुर मंडी:</strong> ₹2,450 / क्विंटल</li>
               <li><strong>वाशी मंडी:</strong> ₹2,480 / क्विंटल</li>
             </ul>`
    },
    kn: {
      label: "ಮಾರುಕಟ್ಟೆ ಧಾರಣೆ",
      speech: "ಇಂದು ಗೋಧಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಕ್ವಿಂಟಾಲ್‌ಗೆ 2,450 ರೂಪಾಯಿ ಆಗಿದೆ. ಮಾರಾಟ ಮಾಡಲು ಇದು ಉತ್ತಮ ಸಮಯ.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ಗೋಧಿ ಬೆಲೆ: ₹2,450 / ಕ್ವಿಂಟಾಲ್ (🟢 ಮಾರಾಟ ಮಾಡಿ)</h4>`
    },
    ta: {
      label: "சந்தை விலை நிலவரம்",
      speech: "இன்று கோதுமை சந்தை விலை குவிண்டாலுக்கு ₹2,450 ஆக உள்ளது. விற்பனை செய்ய நல்ல நேரம்.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">கோதுமை விலை: ₹2,450 / குவிண்டால் (🟢 விற்கலாம்)</h4>`
    },
    te: {
      label: "మార్కెట్ ధర సమాచారం",
      speech: "ఈరోజు గోధుమల మార్కెట్ ధర క్వింటాలుకు ₹2,450 ఉంది. అమ్మకానికి ఇది మంచి సమయం.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">గోధుమల ధర: ₹2,450 / క్వింటాల్ (🟢 అమ్మేయండి)</h4>`
    },
    mr: {
      label: "बाजार भाव माहिती",
      speech: "आज गव्हाचा बाजार भाव २,४५० रुपये प्रति क्विंटल आहे. विक्रीसाठी ही योग्य वेळ आहे.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">गहू भाव: ₹२,४५० / क्विंटल (🟢 विक्री करा)</h4>`
    },
    bn: {
      label: "বাজার দর তথ্য",
      speech: "আজ গমের বাজার দর প্রতি কুইন্টাল ২,৪৫০ টাকা। এখন বিক্রি করার ভালো সময়।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">গম দর: ₹২,৪৫০ / কুইন্টাল (🟢 বিক্রি করুন)</h4>`
    },
    gu: {
      label: "બજાર ભાવ માહિતી",
      speech: "આજે ઘઉંનો મંડી ભાવ ₹2,450 પ્રતિ ક્વિન્ટલ છે. વેચવાનો સારો સમય છે.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ઘઉંનો ભાવ: ₹2,450 / ક્વિન્ટલ (🟢 વેચો)</h4>`
    },
    pa: {
      label: "ਮੰਡੀ ਭਾਅ ਜਾਣਕਾਰੀ",
      speech: "ਅੱਜ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ 2,450 ਰੁਪਏ ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਹੈ। ਵੇਚਣ ਦਾ ਵਧੀਆ ਸਮਾਂ ਹੈ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ਕਣਕ ਦਾ ਭਾਅ: ₹2,450 / ਕੁਇੰਟਲ (🟢 ਵੇਚੋ)</h4>`
    },
    ml: {
      label: "വിപണി വില വിവരം",
      speech: "ഇന്ന് ഗോതമ്പിന്റെ വിപണി വില ക്വിന്റലിന് ₹2,450 ആണ്. വിൽക്കാൻ നല്ല സമയമാണ്.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ഗോതമ്പ് വില: ₹2,450 / ക്വിന്റൽ (🟢 വിൽക്കാം)</h4>`
    },
    or: {
      label: "ମଣ୍ଡି ଦର ସୂଚନା",
      speech: "ଆଜି ଗହମର ମଣ୍ଡି ଦର କ୍ୱିଣ୍ଟାଲ ପ୍ରତି ୨,୪୫୦ ଟଙ୍କା। ବିକ୍ରି କରିବାର ସଠିକ୍ ସମୟ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ଗହମ ଦର: ₹୨,୪୫୦ / କ୍ୱିଣ୍ଟାଲ (🟢 ବିକ୍ରି କରନ୍ତୁ)</h4>`
    },
    as: {
      label: "বজাৰ দৰৰ তথ্য",
      speech: "আজি ঘেঁহুৰ বজাৰ দৰ প্ৰতি কুইণ্টলত ২,৪৫০ টকা। বিক্ৰী কৰাৰ উত্তম সময়।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ঘেঁহুৰ দৰ: ₹২,৪৫০ / কুইণ্টল (🟢 বিক্ৰী কৰক)</h4>`
    },
    ur: {
      label: "منڈی کی قیمت",
      speech: "آج گندم کی منڈی قیمت 2,450 روپے فی کوئنٹل ہے۔ بیچنے کا اچھا وقت ہے۔",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">گندم کا بھاؤ: ₹2,450 / کوئنٹل (🟢 فروخت کریں)</h4>`
    }
  },
  fertilizer: {
    en: {
      label: "Fertilizer Dosage Recommendation",
      speech: "For 1 acre paddy crop, apply 45 kg Urea and 50 kg DAP in the first growth phase.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">Recommended Dosage for 1 Acre Paddy</h4>
             <ul class="solution-steps">
               <li><strong>Urea (Nitrogen 46%):</strong> 45 kg / Acre</li>
               <li><strong>DAP (Di-Ammonium Phosphate):</strong> 50 kg / Acre</li>
             </ul>`
    },
    hi: {
      label: "उर्वरक मात्रा सिफारिश",
      speech: "धान की फसल के लिए प्रथम चरण में 45 किलो यूरिया और 50 किलो डीएपी प्रति एकड़ प्रयोग करें।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 एकड़ धान के लिए अनुशंसित मात्रा</h4>
             <ul class="solution-steps">
               <li><strong>यूरिया (नाइट्रोजन 46%):</strong> 45 किग्रा / एकड़</li>
               <li><strong>DAP (फास्फोरस):</strong> 50 किग्रा / एकड़</li>
             </ul>`
    },
    kn: {
      label: "ಗೊಬ್ಬರದ ಪ್ರಮಾಣ ಸಲಹೆ",
      speech: "ಒಂದು ಎಕರೆ ಭತ್ತಕ್ಕೆ 45 ಕೆಜಿ ಯೂರಿಯಾ ಮತ್ತು 50 ಕೆಜಿ ಡಿಎಪಿ ಗೊಬ್ಬರ ಬಳಸಿ.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 ಎಕರೆ ಭತ್ತಕ್ಕೆ ಗೊಬ್ಬರದ ಪ್ರಮಾಣ</h4>`
    },
    ta: {
      label: "உர அளவு பரிந்துரை",
      speech: "1 ஏக்கர் நெற்பயிருக்கு 45 கிலோ யூரியா மற்றும் 50 கிலோ DAP பயன்படுத்தவும்.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 ஏக்கர் நெல்லுக்கான உர அளவு</h4>`
    },
    te: {
      label: "ఎరువుల మోతాదు సిఫార్సు",
      speech: "ఒక ఎకరం వరి పంటకు 45 కిలోల యూరియా మరియు 50 కిలోల DAP వాడండి.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 ఎకరం వరికి ఎరువుల మోతాదు</h4>`
    },
    mr: {
      label: "खत मात्रा शिफारस",
      speech: "एक एकर भात पिकासाठी ४५ किलो युरिया आणि ५० किलो डीएपी वापरा.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">१ एकर भातासाठी खत मात्रा</h4>`
    },
    bn: {
      label: "সার ব্যবহারের পরিমাণ",
      speech: "১ একর ধান ফসলের জন্য ৪৫ কেজি ইউরিয়া এবং ৫০ কেজি ডিএপি ব্যবহার করুন।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">১ একর ধানের জন্য সারের মাত্রা</h4>`
    },
    gu: {
      label: "ખાતર માત્રા ભલામણ",
      speech: "1 એકર ડાંગરના પાક માટે 45 કિલો યુરિયા અને 50 કિલો DAP વાપરો.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 એકર ડાંગર માટે ખાતરનો ડોઝ</h4>`
    },
    pa: {
      label: "ਖਾਦ ਦੀ ਮਾਤਰਾ ਦੀ ਸਿਫਾਰਸ਼",
      speech: "1 ਏਕੜ ਝੋਨੇ ਲਈ 45 ਕਿੱਲੋ ਯੂਰੀਆ ਅਤੇ 50 ਕਿੱਲੋ ਡੀਏਪੀ ਪਾਓ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 ਏਕੜ ਝੋਨੇ ਲਈ ਖਾਦ</h4>`
    },
    ml: {
      label: "വളപ്രയോഗ ശുപാർശ",
      speech: "1 ഏക്കർ നെല്ലിന് 45 കിലോഗ്രാം യൂറിയയും 50 കിലോഗ്രാം DAP യും ഉപയോഗിക്കുക.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 ഏക്കർ നെല്ലിനുള്ള വളത്തിന്റെ അളവ്</h4>`
    },
    or: {
      label: "ଖତ ପରିମାଣ ପରାମର୍ଶ",
      speech: "୧ ଏକର ଧାନ ଫସଲ ପାଇଁ ୪୫ କିଲୋ ୟୁରିଆ ଏବଂ ୫୦ କିଲୋ DAP ବ୍ୟବହାର କରନ୍ତୁ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">୧ ଏକର ଧାନ ପାଇଁ ଖତ ପରିମାଣ</h4>`
    },
    as: {
      label: "সাৰ ব্যৱহাৰৰ পৰামৰ্শ",
      speech: "১ একৰ ধান শস্যৰ বাবে ৪৫ কেজি ইউৰিয়া আৰু ৫০ কেজি DAP ব্যৱহাৰ কৰক।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">১ একৰ ধানৰ বাবে সাৰৰ পৰিমাণ</h4>`
    },
    ur: {
      label: "کھاد کی تجویز",
      speech: "1 ایکڑ دھان کے لیے 45 کلو یوریا اور 50 کلو ڈی اے پی استعمال کریں۔",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">1 ایکڑ دھان کے لیے کھاد کا تناسب</h4>`
    }
  },
  general: {
    en: {
      label: "Smart Farming Guidance",
      speech: "FarmIQ AI assistant is ready to help. You can ask about crop diseases, weather, fertilizers, or mandi prices in your language.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">General Agricultural Advisory</h4>
             <p>FarmIQ recommends maintaining proper soil aeration and regular crop leaf monitoring.</p>`
    },
    hi: {
      label: "स्मार्ट कृषि मार्गदर्शन",
      speech: "फार्म-आईक्यू AI सहायक आपकी सहायता के लिए तैयार है। आप अपनी भाषा में फसल बीमारी, मौसम, खाद या मंडी भाव पूछ सकते हैं।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">सामान्य कृषि सलाह</h4>
             <p>फार्म-आईक्यू आपकी मिट्टी में नमी बनाए रखने और नियमित फसल निगरानी की सलाह देता है।</p>`
    },
    kn: {
      label: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ",
      speech: "ಫಾರ್ಮ್‌-ಐಕ್ಯೂ AI ಸಹಾಯಕ ಸಿದ್ಧವಾಗಿದೆ. ಬೆಳೆ ರೋಗ, ಹವಾಮಾನ ಅಥವಾ ಮಾರುಕಟ್ಟೆ ದರದ ಬಗ್ಗೆ ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲೇ ಕೇಳಿ.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ಸಾಮಾನ್ಯ ಕೃಷಿ ಸಲಹೆ</h4>`
    },
    ta: {
      label: "ஸ்மார்ட் விவசாய வழிகாட்டுதல்",
      speech: "FarmIQ AI உதவியாளர் தயார். உங்கள் மொழியிலேயே நோய், வானிலை, உரம் அல்லது சந்தை விலை பற்றி கேட்கலாம்.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">பொது விவசாய ஆலோசனை</h4>`
    },
    te: {
      label: "స్మార్ట్ వ్యవసాయ మార్గదర్శకం",
      speech: "FarmIQ AI అసిస్టెంట్ సిద్ధంగా ఉంది. మీ భాషలోనే పంట తెగుళ్లు, వాతావరణం లేదా మార్కెట్ ధరలు అడగవచ్చు.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">సాధారణ వ్యవసాయ సలహా</h4>`
    },
    mr: {
      label: "स्मार्ट शेती मार्गदर्शन",
      speech: "फार्म-आयक्यू AI सहाय्यक तयार आहे. तुमच्या भाषेत पिकाचे रोग, हवामान किंवा बाजारभाव विचारा.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">सामान्य शेती सल्ला</h4>`
    },
    bn: {
      label: "স্মার্ট কৃষি নির্দেশিকা",
      speech: "FarmIQ AI সহকারী প্রস্তুত। আপনার ভাষায় শস্যের রোগ, আবহাওয়া বা বাজার দর সম্পর্কে জিজ্ঞাসা করুন।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">সাধারণ কৃষি পরামর্শ</h4>`
    },
    gu: {
      label: "સ્માર્ટ ખેતી માર્ગદર્શન",
      speech: "FarmIQ AI સહાયક તૈયાર છે. તમારી માતૃભાષામાં પાકના રોગ, હવામાન કે બજાર ભાવ પૂછો.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">સામાન્ય કૃષિ સલાહ</h4>`
    },
    pa: {
      label: "ਸਮਾਰਟ ਖੇਤੀ ਮਾਰਗਦਰਸ਼ਨ",
      speech: "FarmIQ AI ਸਹਾਇਕ ਤਿਆਰ ਹੈ। ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਫ਼ਸਲ ਦੇ ਰੋਗ, ਮੌਸਮ ਜਾਂ ਮੰਡੀ ਭਾਅ ਪੁੱਛੋ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ਆਮ ਖੇਤੀ ਸਲਾਹ</h4>`
    },
    ml: {
      label: "സ്മാർട്ട് കാർഷിക മാർഗ്ഗനിർദ്ദേശം",
      speech: "FarmIQ AI അസിസ്റ്റന്റ് സജ്ജമാണ്. നിങ്ങളുടെ മാതൃഭാഷയിൽ രോഗം, കാലാവസ്ഥ, വിപണി വില എന്നിവ ചോദിക്കാം.",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">പൊതു കാർഷിക ഉപദേശം</h4>`
    },
    or: {
      label: "ସ୍ମାର୍ଟ କୃଷି ମାର୍ଗଦର୍ଶନ",
      speech: "FarmIQ AI ସହାୟକ ପ୍ରସ୍ତୁତ। ଆପଣଙ୍କ ମାତୃଭାଷାରେ ରୋଗ, ପାଣିପାଗ କିମ୍ବା ମଣ୍ଡି ଦର ପଚାରନ୍ତୁ।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">ସାଧାରଣ କୃଷି ପରାମର୍ଶ</h4>`
    },
    as: {
      label: "স্মাৰ্ট কৃষি নিৰ্দেশনা",
      speech: "FarmIQ AI সহায়ক সাজু হৈছে। আপোনাৰ নিজৰ ভাষাত ৰোগ, বতৰ বা বজাৰ দৰ সোধক।",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">সাধাৰণ কৃষি পৰামৰ্শ</h4>`
    },
    ur: {
      label: "اسمارٹ زرعی رہنمائی",
      speech: "فارم آئی کیو AI اسسٹنٹ آپ کی مدد کے لیے تیار ہے۔ اپنی زبان میں بیماری، موسم یا منڈی کی قیمت پوچھیں۔",
      html: `<h4 style="color:var(--primary-glow); margin-bottom:8px;">عام زرعی ایڈوائزری</h4>`
    }
  }
};

// Intent Classification Engine for Multilingual Natural Language
function processVoiceQuery(queryText) {
  const text = queryText.toLowerCase();
  let category = 'general';
  let categoryIcon = 'fa-lightbulb';

  // Disease Intent Keywords across scripts & transliterated text
  if (
    text.includes('daag') || text.includes('rog') || text.includes('spot') || text.includes('leaf') || 
    text.includes('patto') || text.includes('disease') || text.includes('keeda') || text.includes('insect') ||
    text.includes('धब्बे') || text.includes('रोग') || text.includes('রোগ') || text.includes('ರೋಗ') ||
    text.includes('நோய்') || text.includes('રોગ') || text.includes('ਰੋਗ') || text.includes('രോഗം') ||
    text.includes('ରୋଗ') || text.includes('بیماری')
  ) {
    category = 'disease';
    categoryIcon = 'fa-stethoscope';
  }
  // Weather Intent Keywords
  else if (
    text.includes('barish') || text.includes('mausam') || text.includes('rain') || text.includes('weather') || 
    text.includes('kal') || text.includes('garmi') || text.includes('बारिश') || text.includes('मौसम') ||
    text.includes('மழை') || text.includes('వర్షం') || text.includes('ಮಳೆ') || text.includes('বৃষ্টি') ||
    text.includes('વરસાદ') || text.includes('ਮੀਂਹ') || text.includes('മഴ') || text.includes('ବର୍ଷା') ||
    text.includes('বৰষুণ') || text.includes('بارش')
  ) {
    category = 'weather';
    categoryIcon = 'fa-cloud-sun-rain';
  }
  // Market Mandi Intent Keywords
  else if (
    text.includes('rate') || text.includes('dam') || text.includes('daam') || text.includes('mandi') || 
    text.includes('price') || text.includes('gehu') || text.includes('bhav') || text.includes('भाव') || 
    text.includes('मंडी') || text.includes('விலை') || text.includes('ధర') || text.includes('ಬೆಲೆ') ||
    text.includes('দর') || text.includes('ભાવ') || text.includes('ਭਾਅ') || text.includes('വില') ||
    text.includes('ଦର') || text.includes('قیمت')
  ) {
    category = 'market';
    categoryIcon = 'fa-chart-line';
  }
  // Fertilizer Intent Keywords
  else if (
    text.includes('khad') || text.includes('fertilizer') || text.includes('urea') || text.includes('dap') || 
    text.includes('dhan') || text.includes('खाद') || text.includes('यूरिया') || text.includes('உரம்') || 
    text.includes('ఎరువులు') || text.includes('ಗೊಬ್ಬರ') || text.includes('সার') || text.includes('ખાતર') ||
    text.includes('ਖਾਦ') || text.includes('വളം') || text.includes('ଖତ') || text.includes('ساৰ') || text.includes('کھاد')
  ) {
    category = 'fertilizer';
    categoryIcon = 'fa-flask';
  }
  else {
    category = 'general';
    categoryIcon = 'fa-droplet';
  }

  const langRes = (nativeResponses[category] && nativeResponses[category][currentLanguage]) 
    ? nativeResponses[category][currentLanguage] 
    : (nativeResponses[category]['en'] || nativeResponses[category]['hi']);
  
  const categoryLabel = langRes.label;
  const speechText = langRes.speech;
  const solutionHTML = langRes.html;

  // Render Result Card
  const resultCard = document.getElementById('voiceResultCard');
  document.getElementById('resCategoryTag').innerHTML = `<i class="fa-solid ${categoryIcon}"></i> <span>${categoryLabel}</span>`;
  document.getElementById('resUserQuery').innerText = `"${queryText}"`;
  document.getElementById('resSolutionBody').innerHTML = solutionHTML;

  resultCard.style.display = 'block';
  currentSpeechResponse = speechText;

  // Speak aloud automatically in active native language
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
    const lower = msg.toLowerCase();
    let category = 'general';

    if (
      lower.includes('hi') || lower.includes('hello') || lower.includes('namaste') || 
      lower.includes('नमस्ते') || lower.includes('നമസ്കാരം') || lower.includes('வணக்கம்') ||
      lower.includes('నమస్తే') || lower.includes('ನಮಸ್ಕಾರ') || lower.includes('নমস্কার') ||
      lower.includes('નમસ્તે') || lower.includes('ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ') || lower.includes('سلام')
    ) {
      category = 'greeting';
    } else if (
      lower.includes('rain') || lower.includes('weather') || lower.includes('barish') ||
      lower.includes('बारिश') || lower.includes('मौसम') || lower.includes('മഴ') ||
      lower.includes('மழை') || lower.includes('వర్షం') || lower.includes('ಮಳೆ') ||
      lower.includes('বৃষ্টি') || lower.includes('વરસાદ') || lower.includes('ਮੀਂਹ')
    ) {
      category = 'weather';
    } else if (
      lower.includes('mandi') || lower.includes('rate') || lower.includes('price') ||
      lower.includes('मंडी') || lower.includes('भाव') || lower.includes('விலை') ||
      lower.includes('ధర') || lower.includes('ಬೆಲೆ') || lower.includes('দর') ||
      lower.includes('ભાવ') || lower.includes('ਭਾਅ') || lower.includes('வില')
    ) {
      category = 'market';
    }

    const botReplies = {
      greeting: {
        en: "Namaste Kisan Bhai! How is your farm doing today? Ask me about weather, crop diseases, or mandi rates!",
        hi: "नमस्ते किसान भाई! आज आपकी खेती कैसी चल रही है? मुझसे मौसम, फसल रोग या मंडी भाव के बारे में पूछें!",
        kn: "ನಮಸ್ಕಾರ ರೈತ ಬಂಧುವೇ! ನಿಮ್ಮ ಬೆಳೆ ಹೇಗಿದೆ? ಹವಾಮಾನ ಅಥವಾ ಮಾರುಕಟ್ಟೆ ದರದ ಬಗ್ಗೆ ಕೇಳಿ!",
        ta: "வணக்கம் விவசாயி! உங்கள் பயிர் எப்படி உள்ளது? வானிலை அல்லது சந்தை விலை பற்றி கேட்கலாம்!",
        te: "నమస్తే రైతు సోదరా! మీ పంట ఎలా ఉంది? వాతావరణం లేదా మార్కెట్ ధరల గురించి అడగండి!",
        mr: "नमस्कार शेतकरी मित्र! आज तुमचे पीक कसे आहे? हवामान किंवा बाजारभावाबद्दल विचारा!",
        bn: "নমস্কার কৃষক ভাই! আজ আপনার শস্য কেমন আছে? আবহাওয়া বা বাজার দর সম্পর্কে জিজ্ঞাসা করুন!",
        gu: "નમસ્તે ખેડૂત મિત્ર! આજે તમારો પાક કેવો છે? હવામાન કે મંડી ભાવ વિશે પૂછો!",
        pa: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ! ਤੁਹਾਡੀ ਫ਼ਸਲ ਕਿਵੇਂ ਹੈ? ਮੌਸਮ ਜਾਂ ਮੰਡੀ ਭਾਅ ਬਾਰੇ ਪੁੱਛੋ!",
        ml: "നമസ്കാരം കർഷക മിത്രമേ! നിങ്ങളുടെ കൃഷി എങ്ങനെയുണ്ട്? വിപണി വിലയെക്കുറിച്ച് ചോദിക്കൂ!",
        or: "ନମସ୍କାର କୃଷକ ଭାଇ! ଆଜି ଆପଣଙ୍କ ଫସଲ କିପରି ଅଛି? ପାଣିପାଗ କିମ୍ବା ମଣ୍ଡି ଦର ପଚାରନ୍ତୁ!",
        as: "নমস্কাৰ কৃষক ভাই! আজি আপোনাৰ খেতি কেনে আছে? বতৰ বা বজাৰ দৰ সোধক!",
        ur: "السلام علیکم کسان بھائی! آج آپ کی کھیتی کیسی ہے؟ موسم یا منڈی کے ریٹ کے بارے میں پوچھیں!"
      },
      weather: {
        en: "Check our Weather Advisor section for live 5-day rain predictions for your state!",
        hi: "अपने राज्य के लिए 5 दिनों का मौसम और बारिश का पूर्वानुमान ऊपर मौसम सलाह सेक्शन में देखें!",
        kn: "ನಿಮ್ಮ ರಾಜ್ಯದ 5 ದಿನಗಳ ಹವಾಮಾನ ವರದಿಗಾಗಿ ನಮ್ಮ ಹವಾಮಾನ ವಿಭಾಗವನ್ನು ನೋಡಿ!",
        ta: "உங்கள் மாநிலத்திற்கான 5 நாள் வானிலை அறிக்கையை மேலே உள்ள வானிலை பிரிவில் பார்க்கவும்!",
        te: "మీ రాష్ట్రం కోసం 5 రోజుల వర్ష సూచనను వాతావరణ విభాగంలో చూడండి!",
        mr: "तुमच्या राज्यासाठी ५ दिवसांचा हवामान अंदाज वर हवामान विभागात पहा!",
        bn: "আপনার রাজ্যের জন্য ৫ দিনের আবহাওয়ার পূর্বাভাস উপরের আবহাওয়া বিভাগে দেখুন!",
        gu: "તમારા રાજ્ય માટે 5 દિવસની હવામાન આગાહી ઉપર હવામાન વિભાગમાં જુઓ!",
        pa: "ਆਪਣੇ ਸੂਬੇ ਲਈ 5 ਦਿਨਾਂ ਦਾ ਮੌਸਮ ਦਾ ਹਾਲ ਉੱਪਰ ਮੌਸਮ ਸੈਕਸ਼ਨ ਵਿੱਚ ਦੇਖੋ!",
        ml: "നിങ്ങളുടെ സംസ്ഥാനത്തിനായുള്ള 5 ദിവസത്തെ കാലാവസ്ഥാ പ്രവചനം മുകളിൽ കാണുക!",
        or: "ଆପଣଙ୍କ ରାଜ୍ୟ ପାଇଁ ୫ ଦିନର ପାଣିପାଗ ପୂର୍ବାନୁମାନ ଉପରେ ଦେଖନ୍ତୁ!",
        as: "আপোনাৰ ৰাজ্যৰ বাবে ৫ দিনৰ বতৰৰ পূৰ্বাভাস ওপৰত চাওক!",
        ur: "اپنے صوبے کے لیے 5 دن کی موسم کی پیش گوئی اوپر دیکھئے!"
      },
      market: {
        en: "Wheat prices are currently high at ₹2,450/qtl. Check the Smart Mandi Dashboard above!",
        hi: "गेहूं के भाव वर्तमान में ₹2,450/क्विंटल पर मजबूत हैं। ऊपर स्मार्ट मंडी डैशबोर्ड देखें!",
        kn: "ಗೋಧಿ ಬೆಲೆ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹2,450 ತಲುಪಿದೆ. ಉನ್ನತ ಮಾರುಕಟ್ಟೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ನೋಡಿ!",
        ta: "கோதுமை விலை தற்போது குவிண்டாலுக்கு ₹2,450 ஆக உள்ளது. சந்தை பலகையைப் பார்க்கவும்!",
        te: "గోధుమల ధర ప్రస్తుతం క్వింటాలుకు ₹2,450గా ఉంది. స్మార్ట్ మార్కెట్ బోర్డు చూడండి!",
        mr: "गव्हाचे भाव सध्या ₹२,४५०/क्विंटलवर आहेत. वर स्मार्ट बाजार डॅशबोर्ड पहा!",
        bn: "গমের দাম বর্তমানে কুইন্টাল প্রতি ₹২,৪৫০। উপরে স্মার্ট বাজার ড্যাশবোর্ড দেখুন!",
        gu: "ઘઉંનો ભાવ હાલમાં ₹2,450/ક્વિન્ટલ છે. ઉપર મંડી ડેશબોર્ડ જુઓ!",
        pa: "ਕਣਕ ਦਾ ਭਾਅ ਇਸ ਵੇਲੇ ₹2,450/ਕੁਇੰਟਲ ਹੈ। ਉੱਪਰ ਮੰਡੀ ਡੈਸ਼ਬੋਰਡ ਦੇਖੋ!",
        ml: "ഗോതമ്പ് വില നിലവിൽ ക്വിന്റലിന് ₹2,450 ആണ്. മുകളിൽ ഡാഷ്‌ബോർഡ് കാണുക!",
        or: "ଗହମ ଦର ବର୍ତ୍ତମାନ କ୍ୱିଣ୍ଟାଲ ପ୍ରତି ₹୨,୪୫୦। ଉପରେ ମଣ୍ଡି ଡ୍ୟାସବୋର୍ଡ ଦେଖନ୍ତୁ!",
        as: "ঘেঁহুৰ দৰ বৰ্তমান কুইণ্টলত ₹২,৪৫০। ওপৰত বজাৰ ডেশ্বব’ৰ্ড চাওক!",
        ur: "گندم کی قیمت اس وقت ₹2,450 فی کوئنٹل ہے۔ اوپر منڈی ڈیش بورڈ دیکھیں!"
      },
      general: {
        en: "I have noted your query. For crop disease diagnosis, try our AI Crop Doctor scanner above!",
        hi: "मैंने आपकी बात नोट कर ली है। फसल रोग की जांच के लिए ऊपर AI फसल डॉक्टर स्कैनर का उपयोग करें!",
        kn: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಗಮನಿಸಲಾಗಿದೆ. ಬೆಳೆ ರೋಗ ಪತ್ತೆಗೆ ಮೇಲಿನ AI ಬೆಳೆ ವೈದ್ಯ ಸ್ಕ್ಯಾನರ್ ಬಳಸಿ!",
        ta: "உங்கள் கேள்வியைப் பதிவு செய்துள்ளேன். நோய் கண்டறிய AI பயிர் மருத்துவரைப் பயன்படுத்தவும்!",
        te: "మీ ప్రశ్నను నమోదు చేశాను. పంట తెగులు కోసం పైన ఉన్న AI పంట డాక్టర్ వాడండి!",
        mr: "मी तुमचा प्रश्न नोंदवला आहे. पीक रोगाच्या तपासणीसाठी वर AI पीक डॉक्टर वापरा!",
        bn: "আমি আপনার প্রশ্ন নোট করেছি। শস্য রোগের জন্য AI শস্য ডাক্তার স্ক্যানার ব্যবহার করুন!",
        gu: "મેં તમારો પ્રશ્ન નોંધ્યો છે. પાક રોગ માટે ઉપર AI પાક ડોક્ટર વાપરો!",
        pa: "ਮੈਂ ਤੁਹਾਡਾ ਸਵਾਲ ਨੋਟ ਕਰ ਲਿਆ ਹੈ। ਫ਼ਸਲ ਦੇ ਰੋਗ ਲਈ ਉੱਪਰ AI ਫ਼ਸਲ ਡਾਕਟਰ ਵਰਤੋਂ!",
        ml: "നിങ്ങളുടെ ചോദ്യം കുറിച്ചെടുത്തു. വിള രോഗ നിർണയത്തിനായി AI ഡോക്ടർ ഉപയോഗിക്കൂ!",
        or: "ମୁଁ ଆପଣଙ୍କ ପ୍ରଶ୍ନ ନୋଟ୍ କରିଛି। ରୋଗ ଚିହ୍ନଟ ପାଇଁ AI ଫସଲ ଡାକ୍ତର ବ୍ୟବହାର କରନ୍ତୁ!",
        as: "মই আপোনাৰ প্ৰশ্ন টুকি লৈছোঁ। শস্য ৰোগৰ বাবে AI শস্য ডাক্তাৰ ব্যৱহাৰ কৰক!",
        ur: "میں نے آپ کا سوال نوٹ کر لیا ہے۔ فصل کی بیماری کے لیے AI فصل ڈاکٹر استعمال کریں!"
      }
    };

    const replyMap = botReplies[category] || botReplies['general'];
    const botReply = replyMap[currentLanguage] || replyMap['en'];

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
