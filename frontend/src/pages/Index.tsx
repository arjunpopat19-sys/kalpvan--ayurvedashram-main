import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Heart, UserCheck, Sparkles, Star, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { treatments as defaultTreatments } from "@/data/treatments";
import { useTreatments } from "@/hooks/useTreatments";
import { Review } from "@/data/dummyData";
import { API_BASE_URL } from "@/lib/api";
import doctorImg from "@/assets/doctor.jpg";
import heroImg from "@/assets/hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
    </div>
    <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
        <p className="text-primary font-medium tracking-widest text-sm uppercase mb-3">
          Mind&nbsp; |&nbsp; Body&nbsp; |&nbsp; Soul
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
          Natural Healing for <span className="text-primary">Mind, Body & Soul</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-lg">
          Experience the ancient wisdom of Ayurveda at Kalpvan Ayurvedashram. Personalized treatments by Dr. Vandana Thakkar for holistic wellness.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/appointment">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base">
              Book Appointment
            </Button>
          </Link>
          <Link to="/treatments">
            <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-primary text-primary hover:bg-primary/5">
              Explore Treatments
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

const TreatmentsSection = () => {
  const { treatments: apiTreatments, loading } = useTreatments();
  const allTreatments = apiTreatments.length > 0 ? apiTreatments : defaultTreatments;
  
  // Filter for treatments marked as Main Category
  const mainTreatments = allTreatments.filter(t => t.isMainCategory);
  const displayTreatments = mainTreatments.length > 0 ? mainTreatments : allTreatments.slice(0, 6);

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
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">Our Signature Therapies</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Main Ayurvedic Treatments
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience our most effective and popular authentic Ayurvedic therapies designed for deep healing and rejuvenation.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-primary mt-10">Loading Treatments...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTreatments.map((t, i) => (
              <motion.div
                key={t.treatmentId || t._id}
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
                      alt={t.title}
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
                      {t.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
                      {t.shortDescription}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between mt-auto">
                      <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                        View Details →
                      </span>
                      <span className="text-muted-foreground text-[10px] uppercase tracking-tighter font-semibold">Ayurvedic Therapy</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const AboutDoctorSection = () => (
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
        <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">Meet Our Doctor</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Dr. Vandana Thakkar
        </h2>
        <p className="text-muted-foreground mb-3">
          <strong>B.A.M.S, M.E.T.C</strong> — Expert in Panchakarma, Cosmetology, Trichology, Weight Loss, Suvarnaprashan, and Wellness therapies.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Dr. Vandana Thakkar is a renowned Ayurvedic practitioner specializing in chronic disease management, Panchakarma detoxification, and holistic wellness. Her approach combines traditional Ayurvedic wisdom with modern diagnostic techniques to deliver personalized care.
        </p>
        <Link to="/appointment">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
            Book Appointment
          </Button>
        </Link>
      </motion.div>
    </div>
  </section>
);

const whyUs = [
  { icon: Leaf, title: "Natural Healing", desc: "100% natural herbs and therapies with zero side effects" },
  { icon: UserCheck, title: "Expert Doctor", desc: "15+ years of Ayurvedic practice and specialization" },
  { icon: Heart, title: "Personalized Care", desc: "Treatments tailored to your unique body constitution" },
  { icon: Sparkles, title: "Holistic Treatment", desc: "Complete mind, body, and soul wellness approach" },
];

const WhyChooseSection = () => (
  <section className="section-padding section-alt">
    <div className="max-w-7xl mx-auto text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
        <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">Why Choose Us</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
          The Kalpvan Difference
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {whyUs.map((item, i) => (
          <motion.div
            key={item.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <item.icon className="text-primary" size={28} />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const fallbackTestimonials: Review[] = [
  { id: "r1", patientName: "Rajesh Patel", treatment: "Panchakarma Therapy", rating: 5, text: "Panchakarma therapy at Kalpvan changed my life. My chronic back pain is completely gone after just 14 days of treatment." },
  { id: "r2", patientName: "Priya Sharma", treatment: "Herbal Medicine", rating: 5, text: "Dr. Vandana's personalized approach is amazing. The herbal medicines she prescribed helped me overcome my digestive issues naturally." },
  { id: "r3", patientName: "Amit Joshi", treatment: "Yoga & Meditation", rating: 5, text: "The yoga and meditation program gave me mental clarity I never thought possible. Highly recommend Kalpvan to everyone." },
];

const TestimonialsSection = () => {
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
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">What Our Patients Say</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.length === 0 ? (
            <p className="text-muted-foreground text-center col-span-3">Reviews will appear here soon.</p>
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

const QuickAppointmentSection = () => (
  <section className="section-padding bg-primary">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Start Your Healing Journey?
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
          Book your consultation today and take the first step towards natural wellness with Kalpvan Ayurvedashram.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/appointment">
            <Button size="lg" className="bg-background text-primary hover:bg-background/90 rounded-full px-8">
              <Clock className="mr-2" size={18} />
              Book Appointment
            </Button>
          </Link>
          <a
            href="https://wa.me/919824370788"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="rounded-full px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Phone className="mr-2" size={18} />
              WhatsApp Us
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

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
