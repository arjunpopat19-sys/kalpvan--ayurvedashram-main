import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ArrowRight, Clock, Sparkles, Leaf, Activity,
  ShieldCheck, Droplets, Zap, X, ChevronRight, CheckCircle, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTreatments } from "@/hooks/useTreatments";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/data/translations";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

/* ─── Variants ───────────────────────────────────────────────────────────── */
const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" } }),
};

const sectionVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

/* ─── Category Config ────────────────────────────────────────────────────── */
const CATS = [
  {
    key: "SKIN & ADVANCED FACIAL TREATMENTS",
    tKey: "catSkin",
    icon: Sparkles,
    gradient: "from-rose-500 to-pink-600",
    soft: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-200 dark:border-rose-800",
    text: "text-rose-600 dark:text-rose-400",
    tagline: "Glow. Rejuvenate. Radiate.",
  },
  {
    key: "HAIR & SCALP TREATMENTS",
    tKey: "catHair",
    icon: Zap,
    gradient: "from-violet-500 to-purple-600",
    soft: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    text: "text-violet-600 dark:text-violet-400",
    tagline: "Regrow. Strengthen. Nourish.",
  },
  {
    key: "PANCHKARMA (MAIN DETOX THERAPIES)",
    tKey: "catPanchkarma",
    icon: Droplets,
    gradient: "from-emerald-500 to-teal-600",
    soft: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    text: "text-emerald-600 dark:text-emerald-400",
    tagline: "Cleanse. Balance. Restore.",
  },
  {
    key: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES",
    tKey: "catSupportive",
    icon: Leaf,
    gradient: "from-green-500 to-lime-600",
    soft: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-600 dark:text-green-400",
    tagline: "Relax. Heal. Rejuvenate.",
  },
  {
    key: "WEIGHT LOSS & BODY DETOX",
    tKey: "catWeight",
    icon: Activity,
    gradient: "from-amber-500 to-orange-600",
    soft: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-600 dark:text-amber-400",
    tagline: "Detox. Slim. Energise.",
  },
  {
    key: "WELLNESS, WOMEN & IMMUNITY CARE",
    tKey: "catWellness",
    icon: ShieldCheck,
    gradient: "from-sky-500 to-blue-600",
    soft: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-200 dark:border-sky-800",
    text: "text-sky-600 dark:text-sky-400",
    tagline: "Balance. Protect. Flourish.",
  },
];

/* ─── Treatment Card ─────────────────────────────────────────────────────── */
const TreatmentCard = ({ t, i, catConfig }: { t: any; i: number; catConfig: any }) => {
  const Icon = catConfig.icon;
  const { language } = useLanguage();
  
  const title = (language === 'hi' && t.titleHi) ? t.titleHi : t.title;
  const shortDescription = (language === 'hi' && t.shortDescriptionHi) ? t.shortDescriptionHi : t.shortDescription;

  return (
    <motion.div variants={cardVariant} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
      <Link
        to={`/treatments/${t.treatmentId}`}
        className="group block bg-card rounded-2xl overflow-hidden border border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={t.image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          {t.duration && (
            <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
              <Clock size={10} /> {t.duration}
            </span>
          )}
          <div className={`absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-gradient-to-br ${catConfig.gradient} flex items-center justify-center shadow-lg`}>
            <Icon size={16} className="text-white" />
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-display text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 flex-grow">
            {shortDescription}
          </p>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/40">
            <span className={`text-xs font-semibold ${catConfig.text}`}>{(catConfig as any).isCustom ? catConfig.key : getTranslation(language, catConfig.tKey)}</span>
            <span className="inline-flex items-center gap-1 text-primary text-xs font-bold group-hover:gap-2 transition-all">
              {getTranslation(language, 'knowMore')} <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ─── Main Page ──────────────────────────────────────────────────────────── */
const Treatments = () => {
  const [search, setSearch] = useState("");
  const { treatments: allTreatments } = useTreatments();
  const { language } = useLanguage();

  const sortedCats = useMemo(() => {
    if (!allTreatments || allTreatments.length === 0) return CATS;

    const uniqueCategoryNames = Array.from(new Set(allTreatments.map(t => t.category))).filter(Boolean);

    const dynamicCats = uniqueCategoryNames.map(catName => {
      const existing = CATS.find(c => c.key === catName);
      if (existing) return existing;

      return {
        key: catName,
        tKey: "catCustom",
        icon: Star,
        gradient: "from-slate-500 to-gray-600",
        soft: "bg-slate-50 dark:bg-slate-950/30",
        border: "border-slate-200 dark:border-slate-800",
        text: "text-slate-600 dark:text-slate-400",
        tagline: "Wellness & Care",
        isCustom: true
      };
    });

    return dynamicCats.sort((a, b) => {
      const mainA = allTreatments.find(t => t.category === a.key && t.isMainCategory);
      const mainB = allTreatments.find(t => t.category === b.key && t.isMainCategory);
      return (mainA?.sequence || 999) - (mainB?.sequence || 999);
    });
  }, [allTreatments]);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return allTreatments.filter(
      t => (t.title && t.title.toLowerCase().includes(q)) || 
           (t.shortDescription && t.shortDescription.toLowerCase().includes(q)) ||
           (t.titleHi && t.titleHi.includes(q)) ||
           (t.shortDescriptionHi && t.shortDescriptionHi.includes(q))
    );
  }, [search, allTreatments]);

  const isSearching = search.trim().length > 0;

  return (
    <div className="pt-20 min-h-screen bg-background">

      {/* ── Page Hero ── */}
      <div className="bg-gradient-to-b from-muted/60 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center">
          <p className="text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            {getTranslation(language, 'directory')}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {getTranslation(language, 'ourTherapies')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-sm md:text-base">
            {getTranslation(language, 'exploreTherapiesDesc')}
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder={getTranslation(language, 'searchPlaceholder')}
              className="w-full pl-12 pr-12 py-4 rounded-full border border-border bg-background text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/40 text-base"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* ── Category Filter / Scroll Tabs ── */}
        {!isSearching && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 pb-0 overflow-x-auto hide-scrollbar">
            <div className="flex gap-2 min-w-max pb-0">
              {sortedCats.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.key}
                    onClick={() => {
                      const el = document.getElementById(`cat-${cat.key}`);
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    className="flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-semibold transition-all duration-200 border-b-2 bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-background/60"
                  >
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={13} className="text-white" />
                    </div>
                    {(cat as any).isCustom ? cat.key : getTranslation(language, cat.tKey)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* ── Search Results ── */}
        {isSearching ? (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <p className="text-base text-muted-foreground">
                <span className="font-bold text-foreground text-lg">{searchResults.length}</span> {getTranslation(language, 'resultsFor')} "{search}"
              </p>
              <button onClick={() => setSearch("")} className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                <X size={14} /> {getTranslation(language, 'clearSearch')}
              </button>
            </div>
            {searchResults.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-3xl border border-border">
                <p className="text-muted-foreground text-lg mb-3">{getTranslation(language, 'noTreatments')}</p>
                <button onClick={() => setSearch("")} className="text-primary font-semibold hover:underline">{getTranslation(language, 'viewAll')}</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((t, i) => {
                  const cat = CATS.find(c => c.key === t.category) ?? CATS[0];
                  return <TreatmentCard key={t.treatmentId} t={t} i={i} catConfig={cat} />;
                })}
              </div>
            )}
          </div>
        ) : (
          /* ── Sequential Category View ── */
          <div className="space-y-24">
            {sortedCats.map((activeCat, index) => {
              const mainCat = allTreatments.find(t => t.category === activeCat.key && t.isMainCategory);
              const subTreatments = allTreatments
                .filter(t => t.category === activeCat.key && !t.isMainCategory)
                .sort((a, b) => {
                  const seqA = a.sequence || 999;
                  const seqB = b.sequence || 999;
                  if (seqA !== seqB) return seqA - seqB;
                  return (a.title || "").localeCompare(b.title || "");
                });

              if (!mainCat) return null;

              return (
                <motion.section 
                  key={activeCat.key}
                  id={`cat-${activeCat.key}`}
                  variants={sectionVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="scroll-mt-24"
                >
                  {/* Main Category Banner */}
                  <div className={`relative rounded-3xl overflow-hidden border shadow-sm ${activeCat.border} ${activeCat.soft} mb-10`}>
                    <div className="flex flex-col lg:flex-row gap-0">
                      
                      {/* Banner Info */}
                      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeCat.gradient} flex items-center justify-center shadow-md`}>
                            {(() => {
                              const ActiveCatIcon = activeCat.icon;
                              return <ActiveCatIcon size={26} className="text-white" />;
                            })()}
                          </div>
                          <div>
                            <p className={`text-sm font-bold uppercase tracking-[0.15em] ${activeCat.text} mb-1`}>
                              {getTranslation(language, 'catLabel')} {index + 1}
                            </p>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                              {(activeCat as any).isCustom ? activeCat.key : getTranslation(language, activeCat.tKey)}
                            </h2>
                          </div>
                        </div>
                        <p className={`text-base font-medium ${activeCat.text} mb-4`}>
                          {activeCat.tagline}
                        </p>
                        <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-2xl">
                          {(language === 'hi' && mainCat.descriptionHi) ? mainCat.descriptionHi : mainCat.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                          {(((language === 'hi' && mainCat.benefitsHi && mainCat.benefitsHi.length > 0) ? mainCat.benefitsHi : mainCat.benefits) || []).slice(0, 4).map(b => (
                            <span key={b} className={`text-sm font-medium px-4 py-1.5 rounded-full border ${activeCat.border} ${activeCat.text} bg-background/80`}>
                              {b}
                            </span>
                          ))}
                        </div>
                        
                        <Link to={`/treatments/${mainCat.treatmentId}`}>
                          <Button className={`rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300 font-semibold bg-gradient-to-r ${activeCat.gradient} text-white border-0 hover:scale-105 group/btn`}>
                            {getTranslation(language, 'knowMore')} <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>

                      {/* Banner Image */}
                      <div className="lg:w-[45%] aspect-video lg:aspect-auto relative order-1 lg:order-2">
                        <img 
                          src={mainCat.image} 
                          alt={mainCat.title} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent via-transparent to-black/10 mix-blend-multiply" />
                      </div>
                    </div>
                  </div>

                  {/* Sub-treatments Grid for this Category */}
                  <div className="px-2">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${activeCat.gradient}`} />
                      <h3 className="font-display text-2xl font-bold text-foreground">
                        {getTranslation(language, 'allTherapies', (activeCat as any).isCustom ? activeCat.key : ((language === 'hi' && mainCat.titleHi) ? mainCat.titleHi : mainCat.title))}
                      </h3>
                      <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${activeCat.soft} ${activeCat.text} ${activeCat.border} border`}>
                        {subTreatments.length}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {subTreatments.map((t, i) => (
                        <TreatmentCard key={t.treatmentId} t={t} i={i} catConfig={activeCat} />
                      ))}
                    </div>
                  </div>

                  {/* Separator if not last */}
                  {index < CATS.length - 1 && (
                    <div className="w-full flex justify-center mt-24">
                      <div className="w-24 h-1 rounded-full bg-border/50" />
                    </div>
                  )}
                </motion.section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Treatments;
