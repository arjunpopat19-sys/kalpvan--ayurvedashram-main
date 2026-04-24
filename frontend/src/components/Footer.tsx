import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="max-w-7xl mx-auto section-padding">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Kalpvan Ayurvedashram" className="h-14 w-auto max-w-[140px] object-contain brightness-200" />
            <div>
              <span className="font-display text-lg font-bold block leading-tight">Kalpvan</span>
              <span className="text-xs opacity-70 block">Ayurvedashram</span>
            </div>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Boon for Healthy Living. Restoring health through ancient Ayurvedic wisdom — Mind, Body & Soul.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2 text-sm opacity-70">
            <Link to="/" className="block hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/about" className="block hover:opacity-100 transition-opacity">About</Link>
            <Link to="/treatments" className="block hover:opacity-100 transition-opacity">Treatments</Link>
            <Link to="/appointment" className="block hover:opacity-100 transition-opacity">Appointment</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Treatments</h4>
          <div className="space-y-2 text-sm opacity-70">
            <p>Panchakarma</p>
            <p>Cosmetology</p>
            <p>Trichology</p>
            <p>Weight Loss</p>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
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
        © {new Date().getFullYear()} Kalpvan Ayurvedashram. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
