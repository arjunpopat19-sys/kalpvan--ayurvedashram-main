import { motion } from "framer-motion";
import { MapPin, Award, Eye, Target } from "lucide-react";
import doctorImg from "@/assets/doctor.jpg";

const About = () => (
  <div className="pt-20">
    {/* Intro */}
    <section className="section-padding">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">About Us</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">Kalpvan Ayurvedashram</h1>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kalpvan Ayurvedashram is a premier Ayurvedic wellness center dedicated to restoring health through the ancient science of Ayurveda. Founded with a vision to bring authentic healing to modern life, we offer comprehensive treatments under the expert guidance of Dr. Vandana Thakkar.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our clinic combines traditional Panchakarma therapies, herbal medicine, yoga, and dietary guidance to address the root cause of ailments — not just symptoms. Every treatment is personalized to your unique body constitution (Prakriti).
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <img src={doctorImg} alt="Dr. Vandana Thakkar" className="rounded-2xl shadow-lg w-full max-w-md mx-auto" />
        </motion.div>
      </div>
    </section>

    {/* Doctor Details */}
    <section className="section-padding section-alt">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">Our Doctor</p>
        <h2 className="font-display text-3xl font-bold text-foreground mb-6">Dr. Vandana Thakkar</h2>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {[
            { icon: Award, label: "B.A.M.S, M.E.T.C" },
            { icon: Target, label: "Panchakarma & Cosmetology" },
            { icon: Eye, label: "Trichology & Wellness" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 bg-card rounded-full px-5 py-2 shadow-sm">
              <item.icon className="text-primary" size={18} />
              <span className="text-sm text-foreground font-medium">{item.label}</span>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Dr. Vandana Thakkar is a highly qualified Ayurvedic physician (B.A.M.S, M.E.T.C) with extensive expertise in Panchakarma, Cosmetology, Suvarnaprashan, Wellness, Trichology, Weight Loss, Pumsavanakarma, and Infertility treatments. She is known for her compassionate and thorough approach to holistic healing.
        </p>
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="section-padding">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { title: "Our Vision", desc: "To be a trusted center for authentic Ayurvedic healing, making traditional medicine accessible and effective for modern health challenges." },
          { title: "Our Mission", desc: "To provide personalized, evidence-based Ayurvedic treatments that address root causes, promote preventive care, and empower individuals to lead healthier lives." },
        ].map((item) => (
          <div key={item.title} className="bg-card rounded-2xl p-8 shadow-sm border border-border">
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Map */}
    <section className="section-padding section-alt">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MapPin className="text-primary" size={20} />
          <p className="text-foreground font-medium">119, Akshardham Complex, Opp. Sai Mandir, Zadeshwar Road, Bharuch - 392011</p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Clinic Location"
            src="https://www.google.com/maps?q=119%2C%20Akshardham%20Complex%2C%20Opp.%20Sai%20Mandir%2C%20Zadeshwar%20Road%2C%20Bharuch%20-%20392011&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  </div>
);

export default About;
