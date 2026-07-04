import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

import { getTranslation } from "@/data/translations";

const navLinks = [
  { label: "Home", path: "/", tKey: "navHome" },
  { label: "About", path: "/about", tKey: "navAbout" },
  { label: "Treatments", path: "/treatments", tKey: "navTreatments" },
  { label: "Appointment", path: "/appointment", tKey: "navAppointment" },
  { label: "Contact", path: "/contact", tKey: "navContact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const { language, toggleLanguage } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16 md:h-20">
        <Link to="/" className="group flex items-center gap-3 bg-foreground/5 hover:bg-foreground/10 dark:bg-foreground/10 dark:hover:bg-foreground/20 px-2 py-1.5 rounded-full transition-all duration-300 border border-foreground/10 backdrop-blur-sm">
          <img
            src={logo}
            alt="Kalpvan Ayurvedashram"
            className="h-10 w-auto max-w-[100px] object-contain ml-1 transition-transform group-hover:rotate-[-2deg] group-hover:scale-105"
          />
          <div className="hidden sm:block pr-4 border-l border-foreground/20 pl-3">
            <span className="font-display text-base font-bold text-foreground leading-tight block tracking-wide">
              Kalpvan
            </span>
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground leading-tight block mt-0.5">
              Ayurvedashram
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {getTranslation(language, link.tKey as any)}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button 
            variant="outline" 
            className="rounded-full px-3 text-sm font-semibold border-primary/20 hover:bg-primary/10 text-primary transition-all duration-300"
            onClick={toggleLanguage}
            title={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
          >
            {language === 'en' ? 'A / अ' : 'अ / A'}
          </Button>
          {isAdmin && (
            <Link to="/admin">
              <Button variant="outline" className="rounded-full px-4 text-sm">{getTranslation(language, 'navAdmin')}</Button>
            </Link>
          )}
          <Link to="/appointment">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
              {getTranslation(language, 'bookAppointment')}
            </Button>
          </Link>
          {user ? (
            <Button variant="ghost" className="rounded-full" onClick={() => { logout(); navigate("/"); }}>
              <LogOut size={16} className="mr-1" /> {getTranslation(language, 'navLogout')}
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="ghost" className="rounded-full">
                <LogIn size={16} className="mr-1" /> {getTranslation(language, 'navLogin')}
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {getTranslation(language, link.tKey as any)}
                </Link>
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-2 mb-2 rounded-full font-semibold border-primary/20 text-primary"
                onClick={() => { toggleLanguage(); setMobileOpen(false); }}
              >
                {language === 'en' ? 'Switch to Hindi (अ)' : 'Switch to English (A)'}
              </Button>
              {isAdmin && (
                <Link to="/admin" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full mt-1 rounded-full">{getTranslation(language, 'navAdmin')}</Button>
                </Link>
              )}
              <Link to="/appointment" onClick={() => setMobileOpen(false)}>
                <Button className="w-full mt-1 bg-primary text-primary-foreground rounded-full">
                  {getTranslation(language, 'bookAppointment')}
                </Button>
              </Link>
              {user ? (
                <Button variant="ghost" className="w-full mt-1 rounded-full" onClick={() => { logout(); setMobileOpen(false); navigate("/"); }}>
                  <LogOut size={16} className="mr-1" /> {getTranslation(language, 'navLogout')}
                </Button>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full mt-1 rounded-full">
                    <LogIn size={16} className="mr-1" /> {getTranslation(language, 'navLogin')}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
