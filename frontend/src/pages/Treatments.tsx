import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, Droplets, ShieldCheck, Activity, Zap, Leaf } from "lucide-react";
import { Input } from "@/components/ui/input";
import { treatments as defaultTreatments } from "@/data/treatments";
import { useTreatments } from "@/hooks/useTreatments";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const SkeletonCard = () => (
  <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border animate-pulse">
    <div className="aspect-[4/3] bg-muted"></div>
    <div className="p-6">
      <div className="h-5 w-20 bg-muted rounded-full mb-3"></div>
      <div className="h-6 w-3/4 bg-muted rounded mb-2"></div>
      <div className="h-4 w-full bg-muted rounded mb-1"></div>
      <div className="h-4 w-5/6 bg-muted rounded mb-4"></div>
      <div className="h-4 w-24 bg-muted rounded"></div>
    </div>
  </div>
);

const Treatments = () => {
  const { treatments, loading, error } = useTreatments();
  const allTreatments = treatments.length > 0 ? treatments : defaultTreatments;
  
  const [searchQuery, setSearchQuery] = useState("");
  // Initialize category from URL parameter if present
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("category") || "All";
    }
    return "All";
  });

  const CATEGORY_ORDER = [
    "SKIN & ADVANCED FACIAL TREATMENTS",
    "HAIR & SCALP TREATMENTS",
    "PANCHKARMA (MAIN DETOX THERAPIES)",
    "OTHER PANCHKARMA & SUPPORTIVE THERAPIES",
    "WEIGHT LOSS & BODY DETOX",
    "WELLNESS, WOMEN & IMMUNITY CARE"
  ];

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allTreatments.map(t => t.category)));
    return ["All", ...CATEGORY_ORDER.filter(c => cats.includes(c)), ...cats.filter(c => !CATEGORY_ORDER.includes(c))];
  }, [allTreatments]);

  // Group treatments by category when "All" is selected and there's no search query
  const groupedTreatments = useMemo(() => {
    if (selectedCategory !== "All" || searchQuery) return null;
    
    return categories.filter(c => c !== "All").map(cat => ({
      categoryName: cat,
      items: allTreatments.filter(t => t.category === cat)
    })).filter(group => group.items.length > 0);
  }, [categories, allTreatments, selectedCategory, searchQuery]);

  const filteredTreatments = useMemo(() => {
    if (groupedTreatments) return [];
    
    return allTreatments.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === "All" || t.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [allTreatments, searchQuery, selectedCategory, groupedTreatments]);

  return (
    <div className="pt-20">
      <section className="section-padding section-alt min-h-[80vh]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">Our Treatments</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Ayurvedic Healing Therapies
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse our complete range of authentic Ayurvedic treatments tailored to your wellness needs.
            </p>
            
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-4xl mx-auto">
              {selectedCategory === "All" && (
                <div className="relative w-full md:max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input 
                    placeholder="Search treatments..." 
                    className="pl-10 bg-background border-border rounded-full shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}
              <div className="flex w-full md:w-auto bg-background border border-border p-1 rounded-full shadow-sm overflow-x-auto hide-scrollbar">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setSearchQuery(""); }}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {error && <div className="text-center text-destructive p-4 bg-destructive/10 rounded-xl mb-8">Failed to load treatments. Please try again.</div>}
          
          {loading && treatments.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <>
              {groupedTreatments ? (
                // Grouped View (All Categories)
                <div className="space-y-16">
                  {groupedTreatments.map((group, groupIndex) => (
                    <motion.div 
                      key={group.categoryName}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      variants={fadeUp}
                    >
                      <div className="mb-6 border-b border-border pb-3 flex items-center justify-between">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{group.categoryName}</h2>
                        <span className="text-muted-foreground text-sm font-medium bg-muted px-3 py-1 rounded-full">{group.items.length} Therapies</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {group.items.map((t, i) => (
                          <motion.div 
                            key={t.treatmentId || t._id} 
                            variants={fadeUp} 
                            custom={i}
                          >
                            <Link to={`/treatments/${t.treatmentId}`} className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/50 h-full flex flex-col">
                              <div className="aspect-[4/3] overflow-hidden relative">
                                <img src={t.image} alt={t.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                              </div>
                              <div className="p-6 flex-1 flex flex-col">
                                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full self-start">{t.category}</span>
                                <h3 className="font-display text-xl font-semibold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors">{t.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-grow">{t.shortDescription}</p>
                                <span className="inline-block mt-4 text-primary text-sm font-medium group-hover:underline">Know More →</span>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // Filtered/List View
                filteredTreatments.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground bg-card rounded-2xl border border-border max-w-xl mx-auto">
                    <p className="text-lg">No treatments found matching your filters.</p>
                    <button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} className="text-primary mt-3 font-medium hover:underline">Clear filters</button>
                  </div>
                ) : (
                  <div>
                    {selectedCategory !== "All" && !searchQuery && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card p-8 rounded-2xl shadow-sm border border-border mb-10 text-left"
                      >
                        <h2 className="font-display text-3xl font-bold text-foreground mb-4">About {selectedCategory}</h2>
                        <div className="text-muted-foreground md:text-lg leading-relaxed">
                          {
                            selectedCategory === "PANCHKARMA (MAIN DETOX THERAPIES)" ? (
                              <div className="space-y-8 mt-2">
                                <div className="text-foreground text-lg border-l-4 border-primary pl-4 py-1 italic">
                                  "Panchakarma literally translates to 'Five Actions' in Sanskrit. It is Ayurveda's ultimate purification protocol designed to cleanse deep-seated toxins and restore the exact balance of your doshas."
                                </div>
                                
                                <div>
                                  <h3 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <Leaf className="text-primary w-5 h-5" /> The Three Stages of Detoxification
                                  </h3>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                                      <h4 className="font-semibold text-primary mb-2">1. Purvakarma</h4>
                                      <p className="text-sm">Preparatory stage using internal and external oleation (Snehana) and sweating (Swedana) to dislodge toxins.</p>
                                    </div>
                                    <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                                      <h4 className="font-semibold text-primary mb-2">2. Pradhankarma</h4>
                                      <p className="text-sm">The 5 main therapies to eliminate the toxins (Vaman, Virechan, Basti, Nasya, and Raktamokshan).</p>
                                    </div>
                                    <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                                      <h4 className="font-semibold text-primary mb-2">3. Paschatkarma</h4>
                                      <p className="text-sm">Post-therapy restorative diet and lifestyle regimen to rebuild strength and massive digestive capacity.</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-2">
                                  <h3 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">
                                    Key Clinical Benefits
                                  </h3>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                      <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                      <div>
                                        <h4 className="font-medium text-foreground">Eliminates Root Disease</h4>
                                        <p className="text-sm mt-1">Expels deep-seated metabolic toxins (Ama) from tissues rather than just suppressing symptoms.</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <Droplets className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                      <div>
                                        <h4 className="font-medium text-foreground">Reverses Cellular Aging</h4>
                                        <p className="text-sm mt-1">Clears micro-channels, bringing vital nutrients to aging cells and giving a glowing complexion.</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <Activity className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                      <div>
                                        <h4 className="font-medium text-foreground">Resets Digestion (Agni)</h4>
                                        <p className="text-sm mt-1">Radically restores gut flora, eliminating acidity, IBS, and chronic constipation.</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                      <div>
                                        <h4 className="font-medium text-foreground">Balances Hormones Naturally</h4>
                                        <p className="text-sm mt-1">Normalizes the endocrine system, immensely benefiting PCOS and thyroid dysfunction.</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <Zap className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                      <div>
                                        <h4 className="font-medium text-foreground">Enhances Mental Clarity</h4>
                                        <p className="text-sm mt-1">Clears chaotic neural pathways, instantly decreasing anxiety, stress, and insomnia.</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                      <div>
                                        <h4 className="font-medium text-foreground">Boosts Immunity (Ojas)</h4>
                                        <p className="text-sm mt-1">Increases your natural defenses against viral or biological agents.</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) :
                            selectedCategory === "SKIN & ADVANCED FACIAL TREATMENTS" ? <p>These treatments focus on skin rejuvenation, anti-aging, acne control, and glow enhancement. They help in removing dead skin, reducing pigmentation, tightening pores, and improving overall skin texture using advanced dermatological techniques.</p> :
                            selectedCategory === "HAIR & SCALP TREATMENTS" ? <p>These treatments are designed for hair fall control, hair regrowth, dandruff treatment, and scalp nourishment. They improve blood circulation, activate hair follicles, and strengthen roots naturally and scientifically.</p> :
                            selectedCategory === "OTHER PANCHKARMA & SUPPORTIVE THERAPIES" ? <p>These therapies support Panchkarma by providing relaxation, pain relief, stress reduction, and rejuvenation. They improve circulation, detox through sweating, strengthen joints, and calm the nervous system.</p> :
                            selectedCategory === "WEIGHT LOSS & BODY DETOX" ? <p>These treatments help in weight management, inch loss, and body shaping. They remove toxins, improve digestion, and enhance metabolism for sustainable results.</p> :
                            selectedCategory === "WELLNESS, WOMEN & IMMUNITY CARE" ? <p>This category focuses on holistic health, hormonal balance, fertility support, child immunity, and mental wellness. It promotes long-term health, disease prevention, and overall well-being.</p> :
                            <p>Explore our comprehensive sequence of {selectedCategory} healing treatments.</p>
                          }
                        </div>
                      </motion.div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {filteredTreatments.map((t, i) => (
                        <motion.div 
                          layout
                          key={t.treatmentId || t._id} 
                          initial={{ opacity: 0, scale: 0.9 }} 
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link to={`/treatments/${t.treatmentId}`} className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/50 h-full flex flex-col">
                            <div className="aspect-[4/3] overflow-hidden relative">
                              <img src={t.image} alt={t.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                              <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full self-start">{t.category}</span>
                              <h3 className="font-display text-xl font-semibold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors">{t.title}</h3>
                              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-grow">{t.shortDescription}</p>
                              <span className="inline-block mt-4 text-primary text-sm font-medium group-hover:underline">Know More →</span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Treatments;
