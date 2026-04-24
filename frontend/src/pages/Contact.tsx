import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">Get in Touch</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Have questions? Reach out to us and we'll respond promptly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Phone", value: "+91 98243 70788", href: "tel:+919824370788" },
                { icon: Mail, label: "Email", value: "kalpvan_panchkarma@yahoo.com", href: "mailto:kalpvan_panchkarma@yahoo.com" },
                { icon: MapPin, label: "Address", value: "119, Akshardham Complex, Opp. Sai Mandir, Zadeshwar Road, Bharuch - 392011" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card rounded-2xl p-6 shadow-sm border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-primary" size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-foreground font-medium hover:text-primary transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-foreground font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="lg:col-span-2 bg-card rounded-2xl p-8 shadow-sm border border-border space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Name *</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email *</label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="rounded-xl" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="What is this about?" className="rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Message *</label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message..." rows={5} className="rounded-xl" />
              </div>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
                <Send className="mr-2" size={16} /> Send Message
              </Button>
            </motion.form>
          </div>

          {/* Map */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Kalpvan Ayurvedashram Location"
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
};

export default Contact;
