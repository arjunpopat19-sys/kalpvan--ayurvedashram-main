import { motion } from "framer-motion";
import { MapPin, Award, Eye, Target, CheckCircle2, Users, HeartPulse, Leaf } from "lucide-react";
import doctorImg from "@/assets/doctor.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  en: {
    welcome: "Welcome to Kalpvan",
    heroTitle: "Discover the Art of <br/> Authentic Healing",
    stats: {
      exp: "Years Experience",
      pat: "Happy Patients",
      auth: "Authentic Ayurveda",
      ther: "Specialized Therapies"
    },
    storyTitle: "Our Story",
    storyHeading: "Rooted in Tradition, Designed for You",
    storyDesc: "Kalpvan Ayurvedashram is a premier Ayurvedic wellness center dedicated to restoring health through the ancient science of Ayurveda. We blend time-tested therapies with a compassionate approach to heal both body and mind.",
    storyPoints: [
      "Personalized treatment plans based on your unique Prakriti",
      "Authentic Panchakarma therapies using pure herbal oils",
      "Focus on treating the root cause, not just symptoms",
      "Comprehensive lifestyle and dietary guidance"
    ],
    sinceTitle: "Since 2008",
    sinceDesc: "Serving the community with ancient wisdom and modern care.",
    expertTitle: "Meet The Expert",
    expertHeading: "Our Chief Physician",
    expertDesc: "With extensive expertise in holistic healing, Dr. Thakkar specializes in Panchakarma, Cosmetology, Trichology, and Infertility treatments. Her compassionate approach ensures that every patient receives the highest standard of personalized Ayurvedic care.",
    visionTitle: "Our Vision",
    visionDesc: "To be a globally trusted center for authentic Ayurvedic healing, making traditional medicine accessible, effective, and relevant for modern health challenges.",
    missionTitle: "Our Mission",
    missionDesc: "To provide personalized, evidence-based Ayurvedic treatments that address root causes, promote preventive care, and empower individuals to lead healthier, balanced lives."
  },
  hi: {
    welcome: "कल्पवन में आपका स्वागत है",
    heroTitle: "प्रामाणिक चिकित्सा की <br/> खोज करें",
    stats: {
      exp: "वर्षों का अनुभव",
      pat: "संतुष्ट मरीज",
      auth: "प्रामाणिक आयुर्वेद",
      ther: "विशेष चिकित्सा"
    },
    storyTitle: "हमारी कहानी",
    storyHeading: "परंपराओं से जुड़ा, आपके लिए डिज़ाइन किया गया",
    storyDesc: "कल्पवन आयुर्वेदाश्रम एक प्रमुख आयुर्वेदिक कल्याण केंद्र है जो आयुर्वेद के प्राचीन विज्ञान के माध्यम से स्वास्थ्य को बहाल करने के लिए समर्पित है। हम शरीर और मन दोनों को ठीक करने के लिए करुणापूर्ण दृष्टिकोण के साथ समय-परीक्षणित उपचारों का मिश्रण करते हैं।",
    storyPoints: [
      "आपकी अनूठी प्रकृति के आधार पर व्यक्तिगत उपचार योजनाएं",
      "शुद्ध हर्बल तेलों का उपयोग करके प्रामाणिक पंचकर्म चिकित्सा",
      "केवल लक्षणों का नहीं, बल्कि मूल कारण के इलाज पर ध्यान",
      "व्यापक जीवन शैली और आहार मार्गदर्शन"
    ],
    sinceTitle: "2008 से",
    sinceDesc: "प्राचीन ज्ञान और आधुनिक देखभाल के साथ समुदाय की सेवा।",
    expertTitle: "विशेषज्ञ से मिलें",
    expertHeading: "हमारे मुख्य चिकित्सक",
    expertDesc: "समग्र चिकित्सा में व्यापक विशेषज्ञता के साथ, डॉ. ठक्कर पंचकर्म, कॉस्मेटोलॉजी, ट्राइकोलॉजी और बांझपन के उपचार में माहिर हैं। उनका करुणामय दृष्टिकोण यह सुनिश्चित करता है कि प्रत्येक रोगी को व्यक्तिगत आयुर्वेदिक देखभाल का उच्चतम मानक मिले।",
    visionTitle: "हमारी दृष्टि",
    visionDesc: "आधुनिक स्वास्थ्य चुनौतियों के लिए पारंपरिक चिकित्सा को सुलभ, प्रभावी और प्रासंगिक बनाते हुए, प्रामाणिक आयुर्वेदिक उपचार के लिए विश्व स्तर पर विश्वसनीय केंद्र बनना।",
    missionTitle: "हमारा मिशन",
    missionDesc: "मूल कारणों को दूर करने, निवारक देखभाल को बढ़ावा देने और व्यक्तियों को स्वस्थ, संतुलित जीवन जीने के लिए सशक्त बनाने वाले व्यक्तिगत, साक्ष्य-आधारित आयुर्वेदिक उपचार प्रदान करना।"
  }
};

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="pt-20 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Ayurvedic Herbs" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary-foreground/80 font-medium text-sm uppercase tracking-[0.2em] mb-4"
          >
            {t.welcome}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: t.heroTitle }}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {[
              { icon: Award, number: "15+", label: t.stats.exp },
              { icon: Users, number: "10,000+", label: t.stats.pat },
              { icon: Leaf, number: "100%", label: t.stats.auth },
              { icon: HeartPulse, number: "20+", label: t.stats.ther },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants} className="bg-card shadow-xl rounded-2xl p-6 text-center border border-border/50 backdrop-blur-sm">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">{stat.number}</h3>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl transform -rotate-3" />
            <img src={heroBg} alt="Clinic Environment" className="relative rounded-2xl shadow-2xl object-cover h-[500px] w-full" />
            <div className="absolute -bottom-8 -right-8 bg-card p-6 rounded-2xl shadow-xl border border-border max-w-[250px] hidden md:block">
              <p className="text-primary font-bold text-xl mb-1">{t.sinceTitle}</p>
              <p className="text-sm text-muted-foreground">{t.sinceDesc}</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">{t.storyTitle}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{t.storyHeading}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
              {t.storyDesc}
            </p>
            <div className="space-y-4">
              {t.storyPoints.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 shrink-0" size={20} />
                  <p className="text-foreground font-medium">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">{t.expertTitle}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{t.expertHeading}</h2>
          </div>
          <div className="bg-card rounded-3xl overflow-hidden shadow-2xl border border-border/50 flex flex-col md:flex-row">
            <div className="md:w-2/5 relative h-[400px] md:h-auto">
              <img src={doctorImg} alt="Dr. Vandana Thakkar" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
            </div>
            <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="font-display text-3xl font-bold text-foreground mb-2">Dr. Vandana Thakkar</h3>
              <p className="text-primary font-medium mb-6">B.A.M.S, M.E.T.C</p>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                {t.expertDesc}
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Panchakarma", "Cosmetology", "Suvarnaprashan", "Weight Loss", "Infertility"
                ].map((spec, i) => (
                  <span key={i} className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: t.visionTitle, desc: t.visionDesc },
            { title: t.missionTitle, desc: t.missionDesc },
          ].map((item, idx) => (
            <motion.div 
              key={item.title} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-card rounded-3xl p-10 shadow-lg border border-border group hover:border-primary/50 transition-colors"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <Target size={32} />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-8 bg-card px-6 py-3 rounded-full shadow-sm border border-border">
            <MapPin className="text-primary" size={24} />
            <p className="text-foreground font-semibold">119, Akshardham Complex, Opp. Sai Mandir, Zadeshwar Road, Bharuch - 392011</p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl border-4 border-card"
          >
            <iframe
              title="Clinic Location"
              src="https://www.google.com/maps?q=119%2C%20Akshardham%20Complex%2C%20Opp.%20Sai%20Mandir%2C%20Zadeshwar%20Road%2C%20Bharuch%20-%20392011&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
