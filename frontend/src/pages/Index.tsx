import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Heart, UserCheck, Sparkles, Star, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTreatments } from "@/hooks/useTreatments";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/data/translations";
import { Review } from "@/data/dummyData";
import { API_BASE_URL } from "@/lib/api";
import { useDoctorImage } from "@/hooks/useDoctorImage";
import heroImg from "@/assets/hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const HeroSection = () => {
  const { language } = useLanguage();
  const { doctorImg } = useDoctorImage();
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="text-primary font-medium tracking-widest text-sm uppercase mb-3 whitespace-pre-wrap">
            {getTranslation(language, 'heroSubtitle')}
          </p>
          <h1 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            dangerouslySetInnerHTML={{ __html: getTranslation(language, 'heroTitle') }}
          />
          <p className="text-muted-foreground text-lg mb-8 max-w-lg">
            {getTranslation(language, 'heroDesc')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/appointment">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base">
                {getTranslation(language, 'bookAppointment')}
              </Button>
            </Link>
            <Link to="/treatments">
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-primary text-primary hover:bg-primary/5">
                {getTranslation(language, 'exploreTreatments')}
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:flex justify-end"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] rotate-3" />
            <img
              src={doctorImg}
              alt="Dr. Vandana Thakkar"
              className="relative rounded-[2rem] w-[400px] h-[500px] object-cover shadow-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CATEGORY_ORDER = [
  "SKIN & ADVANCED FACIAL TREATMENTS",
  "HAIR & SCALP TREATMENTS",
  "PANCHKARMA (MAIN DETOX THERAPIES)",
  "OTHER PANCHKARMA & SUPPORTIVE THERAPIES",
  "WEIGHT LOSS & BODY DETOX",
  "WELLNESS, WOMEN & IMMUNITY CARE",
];

const TreatmentsSection = () => {
  const { treatments } = useTreatments();
  const { language } = useLanguage();
  
  const displayTreatments = treatments
    .filter(t => t.isMainCategory || t.isFeatured)
    .sort((a, b) => {
      const seqA = a.sequence || 999;
      const seqB = b.sequence || 999;
      if (seqA !== seqB) return seqA - seqB;
      
      // Fallback to strict category order
      const idxA = CATEGORY_ORDER.indexOf(a.category);
      const idxB = CATEGORY_ORDER.indexOf(b.category);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return 0;
    });

  return (
    <section className="section-padding section-alt">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">{getTranslation(language, 'signatureTherapies')}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {getTranslation(language, 'mainTreatments')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {getTranslation(language, 'mainTreatmentsDesc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTreatments.map((t, i) => {
            const title = (language === 'hi' && t.titleHi) ? t.titleHi : t.title;
            const shortDesc = (language === 'hi' && t.shortDescriptionHi) ? t.shortDescriptionHi : t.shortDescription;
            return (
              <motion.div
                key={t.treatmentId}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
              >
                <Link to={`/treatments/${t.treatmentId}`} className="group h-full flex flex-col bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50">
                  <div className="aspect-[4/3] overflow-hidden relative shrink-0">
                    <img
                      src={t.image}
                      alt={title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-xs font-medium bg-primary px-3 py-1 rounded-full">{t.category}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3 inline-block self-start">
                      {t.category}
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
                      {shortDesc}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between mt-auto">
                      <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                        {getTranslation(language, 'knowMore')} →
                      </span>
                      <span className="text-muted-foreground text-[10px] uppercase tracking-tighter font-semibold">{getTranslation(language, 'ayurvedicTherapy')}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const AboutDoctorSection = () => {
  const { language } = useLanguage();
  const { doctorImg } = useDoctorImage();
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          <img src={doctorImg} alt="Dr. Vandana Thakkar" loading="lazy" className="rounded-2xl w-full max-w-md mx-auto shadow-lg" />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">{getTranslation(language, 'meetDoctor')}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {getTranslation(language, 'drName')}
          </h2>
          <p 
            className="text-muted-foreground mb-3"
            dangerouslySetInnerHTML={{ __html: getTranslation(language, 'drDegrees') }}
          />
          <p className="text-muted-foreground leading-relaxed mb-6">
            {getTranslation(language, 'drBio')}
          </p>
          <Link to="/appointment">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
              {getTranslation(language, 'bookAppointment')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const WhyChooseSection = () => {
  const { language } = useLanguage();
  return (
    <section className="section-padding section-alt">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">{getTranslation(language, 'whyChooseUs')}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
            {getTranslation(language, 'kalpvanDiff')}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Leaf, title: getTranslation(language, 'why1Title'), desc: getTranslation(language, 'why1Desc') },
            { icon: UserCheck, title: getTranslation(language, 'why2Title'), desc: getTranslation(language, 'why2Desc') },
            { icon: Heart, title: getTranslation(language, 'why3Title'), desc: getTranslation(language, 'why3Desc') },
            { icon: Sparkles, title: getTranslation(language, 'why4Title'), desc: getTranslation(language, 'why4Desc') },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 1}
              className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <item.icon size={28} />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const fallbackTestimonials: Review[] = [
  { id: "r1", patientName: "Rajesh Patel", treatment: "Panchakarma Therapy", rating: 5, text: "Panchakarma therapy at Kalpvan changed my life. My chronic back pain is completely gone after just 14 days of treatment." },
  { id: "r2", patientName: "Priya Sharma", treatment: "Herbal Medicine", rating: 5, text: "Dr. Vandana's personalized approach is amazing. The herbal medicines she prescribed helped me overcome my digestive issues naturally." },
  { id: "r3", patientName: "Amit Joshi", treatment: "Yoga & Meditation", rating: 5, text: "The yoga and meditation program gave me mental clarity I never thought possible. Highly recommend Kalpvan to everyone." },
];

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>(fallbackTestimonials);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/reviews`);
        const payload = await response.json().catch(() => null);
        if (response.ok && Array.isArray(payload) && payload.length) {
          setReviews(payload.slice(0, 3));
        }
      } catch (error) {
        console.error("Unable to load testimonials", error);
      }
    };

    load();
  }, []);

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">{getTranslation(language, 'testimonialsTitle')}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{getTranslation(language, 'whatPatientsSay')}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.length === 0 ? (
            <p className="text-muted-foreground text-center col-span-3">{getTranslation(language, 'noReviews')}</p>
          ) : (
            reviews.map((t, i) => (
              <motion.div
                key={t.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
                <p className="font-display font-semibold text-foreground">{t.patientName}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.treatment}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const QuickAppointmentSection = () => {
  const { language } = useLanguage();
  return (
    <section className="section-padding bg-primary">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {getTranslation(language, 'readyToStart')}
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            {getTranslation(language, 'ctaDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/appointment">
              <Button size="lg" className="bg-background text-primary hover:bg-background/90 rounded-full px-8">
                <Clock className="mr-2" size={18} />
                {getTranslation(language, 'bookAppointment')}
              </Button>
            </Link>
            <a
              href="https://wa.me/919824370788"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="rounded-full px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Phone className="mr-2" size={18} />
                {getTranslation(language, 'whatsappUs')}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Index = () => (
  <>
    <HeroSection />
    <TreatmentsSection />
    <AboutDoctorSection />
    <WhyChooseSection />
    <TestimonialsSection />
    <QuickAppointmentSection />
  </>
);

export default Index;
