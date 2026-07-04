import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/data/translations";

const Footer = () => {
  const { language } = useLanguage();
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-white/40 blur-[12px] rounded-full scale-[1.5]"></div>
                <img src={logo} alt="Kalpvan Ayurvedashram" className="relative z-10 h-14 w-auto max-w-[140px] object-contain drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]" />
              </div>
              <div>
                <span className="font-display text-lg font-bold block leading-tight">Kalpvan</span>
                <span className="text-xs opacity-70 block">Ayurvedashram</span>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              {getTranslation(language, 'footerSlogan')}
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">{getTranslation(language, 'quickLinks')}</h4>
            <div className="space-y-2 text-sm opacity-70">
              <Link to="/" className="block hover:opacity-100 transition-opacity">{getTranslation(language, 'navHome')}</Link>
              <Link to="/about" className="block hover:opacity-100 transition-opacity">{getTranslation(language, 'navAbout')}</Link>
              <Link to="/treatments" className="block hover:opacity-100 transition-opacity">{getTranslation(language, 'navTreatments')}</Link>
              <Link to="/appointment" className="block hover:opacity-100 transition-opacity">{getTranslation(language, 'navAppointment')}</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">{getTranslation(language, 'navTreatments')}</h4>
            <div className="space-y-2 text-sm opacity-70">
              <p>{getTranslation(language, 'catPanchkarma')}</p>
              <p>Cosmetology</p>
              <p>Trichology</p>
              <p>{getTranslation(language, 'catWeight')}</p>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">{getTranslation(language, 'contact')}</h4>
            <div className="space-y-3 text-sm opacity-70">
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>+91 98243 70788</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>kalpvan_panchkarma@yahoo.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5" />
                <span>119, Akshardham Complex, Opp. Sai Mandir, Zadeshwar Road, Bharuch - 392011</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-xs opacity-50">
          © {new Date().getFullYear()} Kalpvan Ayurvedashram. {getTranslation(language, 'rightsReserved')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
