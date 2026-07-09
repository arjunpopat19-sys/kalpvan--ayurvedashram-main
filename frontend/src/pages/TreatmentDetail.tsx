import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, CheckCircle, ArrowLeft, PlayCircle, ArrowRight, Sparkles, Leaf, Activity, ShieldCheck, Droplets, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTreatments } from "@/hooks/useTreatments";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/data/translations";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4 } }),
};

const CATEGORY_META: Record<string, { icon: React.ElementType; gradient: string; light: string; tagline: string }> = {
  "SKIN & ADVANCED FACIAL TREATMENTS":       { icon: Sparkles,    gradient: "from-rose-500 to-pink-500",      light: "from-rose-500/10 to-pink-500/5",      tagline: "Glow. Rejuvenate. Radiate."     },
  "HAIR & SCALP TREATMENTS":                 { icon: Zap,         gradient: "from-violet-500 to-purple-500",  light: "from-violet-500/10 to-purple-500/5",  tagline: "Regrow. Strengthen. Nourish."   },
  "PANCHKARMA (MAIN DETOX THERAPIES)":       { icon: Droplets,    gradient: "from-emerald-500 to-teal-500",   light: "from-emerald-500/10 to-teal-500/5",   tagline: "Cleanse. Balance. Restore."     },
  "OTHER PANCHKARMA & SUPPORTIVE THERAPIES": { icon: Leaf,        gradient: "from-green-500 to-lime-600",     light: "from-green-500/10 to-lime-500/5",     tagline: "Relax. Heal. Rejuvenate."       },
  "WEIGHT LOSS & BODY DETOX":                { icon: Activity,    gradient: "from-amber-500 to-orange-500",   light: "from-amber-500/10 to-orange-500/5",   tagline: "Detox. Slim. Energise."         },
  "WELLNESS, WOMEN & IMMUNITY CARE":         { icon: ShieldCheck, gradient: "from-sky-500 to-blue-500",       light: "from-sky-500/10 to-blue-500/5",       tagline: "Balance. Protect. Flourish."    },
};

const getVideoEmbedUrl = (url: string) => {
  if (!url) return "";
  const trimmedUrl = url.trim();
  
  let id = "";
  if (trimmedUrl.includes("youtu.be/"))           id = trimmedUrl.split("youtu.be/")[1]?.split("?")[0];
  else if (trimmedUrl.includes("watch?v="))       id = trimmedUrl.split("watch?v=")[1]?.split("&")[0];
  else if (trimmedUrl.includes("shorts/"))        id = trimmedUrl.split("shorts/")[1]?.split("?")[0];
  else if (trimmedUrl.includes("embed/"))         id = trimmedUrl.split("embed/")[1]?.split("?")[0];
  
  if (id) return `https://www.youtube.com/embed/${id}`;

  if (trimmedUrl.includes("instagram.com/")) {
    const match = trimmedUrl.match(/instagram\.com\/(reel|p)\/([^\/?#]+)/);
    if (match) {
      return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
    }
  }

  return trimmedUrl;
};

const TreatmentDetail = () => {
  const { id } = useParams();
  const { treatments: allTreatments } = useTreatments();
  const { language } = useLanguage();

  const treatment = allTreatments.find((t) => t.treatmentId === id);

  // If main category, find sub-treatments
  const subTreatments = treatment?.isMainCategory
    ? allTreatments
        .filter((t) => t.category === treatment.category && !t.isMainCategory)
        .sort((a, b) => {
          const seqA = a.sequence || 999;
          const seqB = b.sequence || 999;
          if (seqA !== seqB) return seqA - seqB;
          return (a.title || "").localeCompare(b.title || "");
        })
    : [];

  const meta = treatment ? (CATEGORY_META[treatment.category] ?? {
    icon: Leaf, gradient: "from-primary to-primary/80", light: "from-primary/10 to-primary/5", tagline: "",
  }) : null;

  if (!treatment) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">{getTranslation(language, 'treatmentNotFound')}</h1>
          <Link to="/treatments" className="text-primary underline">{getTranslation(language, 'viewAllTreatments')}</Link>
        </div>
      </div>
    );
  }

  const Icon = meta!.icon;
  const title = (language === 'hi' && treatment.titleHi) ? treatment.titleHi : treatment.title;
  const description = (language === 'hi' && treatment.descriptionHi) ? treatment.descriptionHi : treatment.description;
  const whoCanBenefit = (language === 'hi' && treatment.whoCanBenefitHi && treatment.whoCanBenefitHi.length > 0) ? treatment.whoCanBenefitHi : treatment.whoCanBenefit;

  return (
    <div className="pt-20">

      {/* ── BANNER ── */}
      <div className="relative h-[45vh] md:h-[55vh]">
        <img src={treatment.image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
          <Link to="/treatments" className="inline-flex items-center gap-2 text-primary mb-4 text-sm hover:underline font-medium">
            <ArrowLeft size={16} /> {getTranslation(language, 'viewAllTreatments')}
          </Link>
          <div className="mb-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r ${meta!.gradient} text-white shadow-md`}>
              <Icon size={12} /> {treatment.category}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">{title}</h1>
          {meta!.tagline && (
            <p className={`mt-2 text-sm font-semibold bg-gradient-to-r ${meta!.gradient} bg-clip-text text-transparent`}>
              {meta!.tagline}
            </p>
          )}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {treatment.duration && (
              <span className="flex items-center gap-1 text-muted-foreground text-sm"><Clock size={14} /> {treatment.duration}</span>
            )}
            {subTreatments.length > 0 && (
              <span className="text-muted-foreground text-sm">· {subTreatments.length} therapies</span>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">{description}</p>

          {/* Who Can Benefit */}
          {whoCanBenefit && whoCanBenefit.length > 0 && (
            <div className={`mb-12 bg-gradient-to-br ${meta!.light} rounded-3xl p-8 md:p-10 border border-primary/10 relative overflow-hidden`}>
              <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${meta!.gradient} rounded-full blur-[80px] opacity-20`} />
              
              <div className="relative z-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  {getTranslation(language, 'whoCanBenefit')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-6">
                  {whoCanBenefit.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${meta!.gradient} mt-1.5 flex-shrink-0 shadow-sm`} />
                      <span className="text-foreground font-medium text-sm leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Benefits */}
          {((language === 'hi' && treatment.benefitsHi && treatment.benefitsHi.length > 0) ? treatment.benefitsHi : treatment.benefits)?.length > 0 && (
            <>
              <h2 className="font-display text-2xl font-bold text-foreground mb-5">{getTranslation(language, 'keyBenefits')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {((language === 'hi' && treatment.benefitsHi && treatment.benefitsHi.length > 0) ? treatment.benefitsHi : treatment.benefits).map((b) => (
                  <div key={b} className={`flex items-center gap-3 bg-gradient-to-br ${meta!.light} rounded-xl p-4 border border-primary/10 hover:shadow-md transition-shadow`}>
                    <CheckCircle className={`flex-shrink-0 text-primary`} size={20} />
                    <span className="text-foreground text-sm font-semibold">{b}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Process */}
          {((language === 'hi' && treatment.processHi && treatment.processHi.length > 0) ? treatment.processHi : treatment.process)?.length > 0 && (
            <>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">{getTranslation(language, 'treatmentProcess')}</h2>
              <div className="space-y-5 mb-12">
                {((language === 'hi' && treatment.processHi && treatment.processHi.length > 0) ? treatment.processHi : treatment.process).map((step, i) => (
                  <div key={i} className="flex gap-5 bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${meta!.gradient} text-white flex items-center justify-center flex-shrink-0 text-sm font-bold shadow`}>
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1">{step.name || `Step ${i + 1}`}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Video (Moved before Why Choose Us) */}
          {treatment.videoUrl && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <PlayCircle className="text-primary" size={26} />
                <h2 className="font-display text-2xl font-bold text-foreground">{getTranslation(language, 'videoPreview')}</h2>
              </div>
              
              {(() => {
                const url = treatment.videoUrl.trim();
                let containerClass = "w-full";
                let style: React.CSSProperties = { aspectRatio: "16/9" }; // Default horizontal
                
                if (url.includes("instagram.com/reel/") || url.includes("shorts/")) {
                  containerClass = "w-full max-w-sm mx-auto";
                  style = { aspectRatio: "9/16" };
                } else if (url.includes("instagram.com/p/")) {
                  containerClass = "w-full max-w-md mx-auto";
                  style = { aspectRatio: "4/5" };
                }

                return (
                  <div className={`${containerClass} rounded-2xl overflow-hidden shadow-lg border border-border bg-black/5 flex items-center justify-center`} style={style}>
                    <iframe src={getVideoEmbedUrl(treatment.videoUrl)} title={treatment.title} className="w-full h-full" allowFullScreen />
                  </div>
                );
              })()}
            </div>
          )}

          {/* Why Choose Us */}
          {((language === 'hi' && treatment.whyChooseUsHi && treatment.whyChooseUsHi.length > 0) ? treatment.whyChooseUsHi : treatment.whyChooseUs)?.length > 0 && (
            <div className="mb-16 pt-6 max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl font-bold text-foreground">{getTranslation(language, 'whyChooseUs')}</h2>
                <div className={`w-16 h-1.5 bg-gradient-to-r ${meta!.gradient} mx-auto mt-4 rounded-full`} />
              </div>
              <div className="space-y-4">
                {((language === 'hi' && treatment.whyChooseUsHi && treatment.whyChooseUsHi.length > 0) ? treatment.whyChooseUsHi : treatment.whyChooseUs).map((reason) => (
                  <div key={reason} className="flex items-center gap-5 bg-card rounded-2xl p-5 md:p-6 border border-border/60 shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-300">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${meta!.light} flex items-center justify-center flex-shrink-0 text-primary border border-primary/20`}>
                      <ShieldCheck size={24} />
                    </div>
                    <span className="text-foreground font-semibold text-lg">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {treatment.gallery && treatment.gallery.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${meta!.gradient} flex items-center justify-center shadow-sm`}>
                  <Icon size={16} className="text-white" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">{getTranslation(language, 'galleryLabel')}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {treatment.gallery.flatMap(url => url.split(',')).map(s => s.trim()).filter(Boolean).map((url, i) => (
                  <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-border/50 group">
                    <img 
                      src={url} 
                      alt={`Gallery image ${i + 1}`} 
                      loading="lazy" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CTA ── */}
          <div className={`mt-20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden bg-gradient-to-br ${meta!.gradient} shadow-xl`}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{getTranslation(language, 'readyForTreatment')}</h2>
              <p className="text-white/90 text-lg mb-8">
                {getTranslation(language, 'bookDesc')}
              </p>
              <Link to="/appointment">
                <Button className="bg-white text-foreground hover:bg-white/90 rounded-full px-10 py-6 text-lg font-bold shadow-lg hover:scale-105 transition-transform duration-300">
                  {getTranslation(language, 'bookConsultation')}
                </Button>
              </Link>
            </div>
          </div>

          {/* ── SUB-TREATMENTS (only for main category pages) ── */}
          {treatment.isMainCategory && subTreatments.length > 0 && (
            <div className="mt-20">
              <div className="text-center mb-8">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r ${meta!.gradient} text-white shadow-sm mb-4`}>
                  <Icon size={12} /> {getTranslation(language, 'individualTherapies')}
                </span>
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                  {getTranslation(language, 'allTherapies', title)}
                </h2>
                <p className="text-muted-foreground">{getTranslation(language, 'clickTherapy')}</p>
              </div>

              <div className={`p-6 rounded-3xl bg-gradient-to-br ${meta!.light} border border-border/40`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {subTreatments.map((st, i) => {
                    const stTitle = (language === 'hi' && st.titleHi) ? st.titleHi : st.title;
                    const stShortDesc = (language === 'hi' && st.shortDescriptionHi) ? st.shortDescriptionHi : st.shortDescription;
                    return (
                      <motion.div key={st.treatmentId} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Link
                          to={`/treatments/${st.treatmentId}`}
                          className="group block bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                        >
                          <div className="aspect-video overflow-hidden relative">
                            <img src={st.image} alt={stTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className={`absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-gradient-to-br ${meta!.gradient} flex items-center justify-center shadow`}>
                              <Icon size={14} className="text-white" />
                            </div>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{stTitle}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 flex-grow">{stShortDesc}</p>
                            {st.duration && <span className="text-xs text-muted-foreground mt-2 flex items-center gap-1"><Clock size={11} />{st.duration}</span>}
                            <span className="inline-flex items-center gap-1 mt-3 pt-3 border-t border-border/50 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                              {getTranslation(language, 'knowMore')} <ArrowRight size={13} />
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default TreatmentDetail;
