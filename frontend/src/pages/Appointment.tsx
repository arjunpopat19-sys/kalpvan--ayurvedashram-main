import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, FileText, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { treatments } from "@/data/treatments";
import { API_BASE_URL } from "@/lib/api";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/data/translations";

const defaultForm = { patientName: "", phone: "", email: "", date: "", time: "", message: "", treatment: "" };

const Appointment = () => {
  const { language } = useLanguage();
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.patientName || !form.phone || !form.date || !form.treatment) {
      toast.error(getTranslation(language, 'reqFields'));
      return;
    }

    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) {
      toast.error(getTranslation(language, 'validPhone'));
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: form.patientName,
          phone: form.phone,
          email: form.email,
          date: form.date,
          time: form.time,
          message: form.message,
          treatment: form.treatment,
        })
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message ?? "Unable to submit appointment");
      }

      toast.success(getTranslation(language, 'appointmentSuccess'));
      setForm(defaultForm);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">{getTranslation(language, 'bookNow')}</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              {getTranslation(language, 'scheduleTitle')}
            </h1>
            <p className="text-muted-foreground">
              {getTranslation(language, 'scheduleDesc')}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-8 shadow-sm border border-border space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                  <User size={14} /> {getTranslation(language, 'fullName')}
                </label>
                <Input
                  value={form.patientName}
                  onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                  placeholder={getTranslation(language, 'fullNamePlaceholder')}
                  className="rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                  <Phone size={14} /> {getTranslation(language, 'phoneLabel')} *
                </label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  className="rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                  <Mail size={14} /> {getTranslation(language, 'emailLabel')}
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={getTranslation(language, 'emailPlaceholder')}
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                  <Leaf size={14} /> {getTranslation(language, 'prefTreatment')}
                </label>
                <Select value={form.treatment} onValueChange={(value) => setForm({ ...form, treatment: value })}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder={getTranslation(language, 'selectTreatment')} />
                  </SelectTrigger>
                  <SelectContent>
                    {treatments.map((t) => (
                      <SelectItem key={t.id} value={t.title}>
                        {t.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                  <Calendar size={14} /> {getTranslation(language, 'prefDate')}
                </label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                  <Clock size={14} /> {getTranslation(language, 'prefTime')}
                </label>
                <Input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                <FileText size={14} /> {getTranslation(language, 'messageLabel')}
              </label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={getTranslation(language, 'describeConcern')}
                className="rounded-xl"
                rows={4}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base py-6"
              disabled={submitting}
            >
              {submitting ? getTranslation(language, 'submittingBtn') : getTranslation(language, 'submitBtn')}
            </Button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Appointment;
