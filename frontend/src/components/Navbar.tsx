import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Treatments", path: "/treatments" },
  { label: "Appointment", path: "/appointment" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Kalpvan Ayurvedashram"
            className="h-14 w-auto max-w-[140px] object-contain drop-shadow"
          />
          <div className="hidden sm:block">
            <span className="font-display text-lg font-bold text-foreground leading-tight block">
              Kalpvan
            </span>
            <span className="text-xs text-muted-foreground leading-tight block -mt-0.5">
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
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAdmin && (
            <Link to="/admin">
              <Button variant="outline" className="rounded-full px-4 text-sm">Admin Panel</Button>
            </Link>
          )}
          <Link to="/appointment">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
              Book Appointment
            </Button>
          </Link>
          {user ? (
            <Button variant="ghost" className="rounded-full" onClick={() => { logout(); navigate("/"); }}>
              <LogOut size={16} className="mr-1" /> Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="ghost" className="rounded-full">
                <LogIn size={16} className="mr-1" /> Login
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
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link to="/admin" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full mt-1 rounded-full">Admin Panel</Button>
                </Link>
              )}
              <Link to="/appointment" onClick={() => setMobileOpen(false)}>
                <Button className="w-full mt-1 bg-primary text-primary-foreground rounded-full">
                  Book Appointment
                </Button>
              </Link>
              {user ? (
                <Button variant="ghost" className="w-full mt-1 rounded-full" onClick={() => { logout(); setMobileOpen(false); navigate("/"); }}>
                  <LogOut size={16} className="mr-1" /> Logout
                </Button>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full mt-1 rounded-full">
                    <LogIn size={16} className="mr-1" /> Login
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
