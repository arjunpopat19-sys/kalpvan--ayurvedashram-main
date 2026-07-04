export interface TreatmentProcessStep {
  name: string;
  description: string;
  image?: string;
}

export interface Treatment {
  _id?: string;
  treatmentId: string;
  title: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  process: TreatmentProcessStep[];
  duration: string;
  image: string;
  videoUrl?: string;
  category: string;
  gallery?: string[];
  isMainCategory?: boolean;
  whoCanBenefit?: string[];
  whyChooseUs?: string[];
  
  // Hindi Localization Fields (Optional)
  titleHi?: string;
  shortDescriptionHi?: string;
  descriptionHi?: string;
  benefitsHi?: string[];
  processHi?: TreatmentProcessStep[];
  whoCanBenefitHi?: string[];
  whyChooseUsHi?: string[];
}

export const treatments: Treatment[] = [

  // ── 1. SKIN & ADVANCED FACIAL TREATMENTS (main) ───────────────────────────
  {
    treatmentId: "cat-skin",
    title: "Skin & Advanced Facial Treatments",
    category: "SKIN & ADVANCED FACIAL TREATMENTS",
    isMainCategory: true,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=xqqQ8lxTg8M",
    duration: "Variable",
    shortDescription: "Customized Treatment • Ayurvedic Care • Safe for All Skin Types",
    description: "Restore your skin's natural beauty with safe and effective Ayurvedic facial therapies. Our customized treatments help reduce acne, pigmentation, dullness, fine lines, and uneven skin tone while improving overall skin health—without harsh chemicals.",
    benefits: ["Deep Skin Rejuvenation", "Acne & Pigmentation Control", "Natural Glow Enhancement", "Anti-Ageing Support", "Improved Skin Texture", "Pore Tightening & Hydration"],
    whoCanBenefit: ["Acne & Pimples", "Pigmentation & Dark Spots", "Dull Skin", "Fine Lines & Wrinkles", "Uneven Skin Tone", "Open Pores", "Sun Damage", "Dry or Oily Skin"],
    whyChooseUs: ["Experienced Ayurvedic Specialists", "Personalized Treatment Plans", "Safe & Hygienic Environment", "Premium Herbal Products", "Modern Diagnostic Approach", "Holistic Skin Care with Long-Term Results"],
    process: [
      { name: "Comprehensive Skin Assessment", description: "We carefully assess your skin condition, lifestyle, and concerns to identify the most suitable treatment approach." },
      { name: "Personalized Ayurvedic Protocol", description: "A customized combination of Ayurvedic therapies and herbal formulations is selected to meet your skin's specific needs." },
      { name: "Expert Treatment", description: "Your therapy is carried out in a clean, comfortable environment using safe, high-quality Ayurvedic products and modern techniques where appropriate." },
      { name: "Recovery & Skin Maintenance", description: "We provide personalized aftercare instructions and skincare recommendations to help you achieve healthy, glowing, long-lasting results." }
    ]
  },
  {
    treatmentId: "microdermabrasion",
    title: "Microdermabrasion",
    category: "SKIN & ADVANCED FACIAL TREATMENTS",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=XvH5a7s-n6k",
    duration: "45 min",
    shortDescription: "Non-invasive skin resurfacing to remove dead skin cells and stimulate collagen production.",
    description: "Microdermabrasion is a non-invasive skin resurfacing treatment that gently exfoliates the outermost layer of dead skin cells, stimulating collagen production and revealing fresher, younger-looking skin. It effectively reduces fine lines, sun damage, age spots, and mild acne scarring.",
    benefits: ["Removes dead skin cells", "Stimulates collagen", "Reduces fine lines", "Evens skin tone", "Minimizes pores", "Brightens complexion"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Cleansing", description: "Deep cleansing of the face to remove makeup and surface impurities." },
      { name: "Exfoliation", description: "Crystal or diamond-tip microdermabrasion to resurface the skin." },
      { name: "Hydration", description: "Application of calming serums and moisturizers to soothe and nourish." }
    ]
  },
  {
    treatmentId: "chemical-peel",
    title: "Chemical Peel",
    category: "SKIN & ADVANCED FACIAL TREATMENTS",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=vV77S3G_5iQ",
    duration: "30–60 min",
    shortDescription: "Clinical skin rejuvenation using specialized acids to resurface and renew skin.",
    description: "Chemical peels use specially formulated acids to remove damaged outer layers of skin, triggering the growth of new, healthier skin cells. They effectively treat hyperpigmentation, acne scars, uneven skin texture, and signs of aging with remarkable precision.",
    benefits: ["Reduces hyperpigmentation", "Smooths skin texture", "Clears acne scars", "Anti-aging effects", "Even skin tone", "Boosts radiance"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Skin Prep", description: "Cleansing and prepping the skin with a pH balancer." },
      { name: "Peel Application", description: "Careful application of the appropriate peel concentration for your skin type." },
      { name: "Neutralization", description: "Neutralizing the peel and applying soothing post-care treatments." }
    ]
  },
  {
    treatmentId: "ozone-face",
    title: "Ozone Therapy (Face)",
    category: "SKIN & ADVANCED FACIAL TREATMENTS",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=xqqQ8lxTg8M",
    duration: "30 min",
    shortDescription: "Detoxifying skin and enhancing facial oxygenation with medical-grade ozone.",
    description: "Facial Ozone Therapy uses medical-grade ozone to kill bacteria, viruses, and fungi on the skin's surface, while simultaneously boosting oxygen levels in skin cells. It deeply detoxifies, accelerates healing, and gives the complexion a healthy, oxygenated glow.",
    benefits: ["Deep detoxification", "Kills acne bacteria", "Boosts skin oxygenation", "Accelerates healing", "Reduces redness", "Natural antibacterial"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Cleansing", description: "Removal of all surface impurities." },
      { name: "Ozone Application", description: "Controlled medical ozone directed over the facial skin." },
      { name: "Moisturization", description: "Sealing in benefits with a hydrating finish." }
    ]
  },
  {
    treatmentId: "ultrasonic",
    title: "Ultrasonic Treatment",
    category: "SKIN & ADVANCED FACIAL TREATMENTS",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=Z73qpr-LikQ",
    duration: "45 min",
    shortDescription: "High-frequency sound waves for deep cleansing, skin firming, and rejuvenation.",
    description: "Ultrasonic Treatment uses high-frequency sound waves that penetrate deep into the skin, promoting cellular renewal, increasing product absorption, and stimulating collagen production. It deeply cleanses pores, firms sagging skin, and dramatically improves overall skin health.",
    benefits: ["Deep pore cleansing", "Firms sagging skin", "Boosts product absorption", "Stimulates collagen", "Non-invasive facelift effect", "Reduces fine lines"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Skin Cleansing", description: "Thorough cleansing to prepare the skin surface." },
      { name: "Ultrasonic Wave Application", description: "Device passes ultrasonic waves to deep-cleanse and lift the skin." },
      { name: "Serum Infusion", description: "High-frequency waves drive active serums deep into the dermal layers." }
    ]
  },
  {
    treatmentId: "jet-peel",
    title: "Jet Peel",
    category: "SKIN & ADVANCED FACIAL TREATMENTS",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=fp9JxUHXi8Y",
    duration: "45 min",
    shortDescription: "High-pressure saline and oxygen jet for exfoliation, hydration, and skin rejuvenation.",
    description: "Jet Peel uses a supersonic jet of saline solution and oxygen to exfoliate dead skin, deeply hydrate, and infuse active ingredients into the skin without any needles or discomfort. It immediately brightens the complexion, plumps fine lines, and gives an instant red-carpet glow.",
    benefits: ["Instant brightening", "Deep hydration", "Pain-free exfoliation", "No downtime", "Plumps fine lines", "Infuses active ingredients"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Saline Jet Exfoliation", description: "High-pressure saline removes dead skin and unclogs pores." },
      { name: "Oxygen Infusion", description: "Pure oxygen is delivered simultaneously to revitalize cells." },
      { name: "Active Serum Delivery", description: "Customized serums are jetted directly into the skin." }
    ]
  },
  {
    treatmentId: "light-therapy",
    title: "Light Therapy",
    category: "SKIN & ADVANCED FACIAL TREATMENTS",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=QBz-luVlyYg",
    duration: "20–30 min",
    shortDescription: "LED light treatments targeting specific skin concerns like acne, aging, and redness.",
    description: "LED Light Therapy uses specific wavelengths of light to penetrate the skin at varying depths, targeting concerns like acne (blue light), aging and collagen loss (red light), and skin healing (near-infrared). It is completely non-invasive, painless, and requires zero downtime.",
    benefits: ["Clears acne bacteria", "Boosts collagen production", "Reduces inflammation", "Speeds up skin healing", "Minimizes redness", "Non-invasive & painless"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Skin Assessment", description: "Choosing the right LED wavelength based on your primary skin concern." },
      { name: "LED Session", description: "Exposure to targeted LED light for 20-30 minutes." },
      { name: "Post-Treatment Care", description: "Application of a calming moisturizer and SPF." }
    ]
  },

  // ── 2. HAIR & SCALP TREATMENTS (main) ─────────────────────────────────────
  {
    treatmentId: "cat-hair",
    title: "Hair & Scalp Treatments",
    category: "HAIR & SCALP TREATMENTS",
    isMainCategory: true,
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=mHn1mB6t9nI",
    duration: "Variable",
    shortDescription: "Hair fall control, hair regrowth, and scalp nourishment using scientific and Ayurvedic methods.",
    description: "These treatments are scientifically designed for hair fall control, hair regrowth, dandruff treatment, and scalp nourishment. They improve blood circulation to the scalp, activate dormant hair follicles, and strengthen roots both naturally and clinically.",
    benefits: ["Stops hair fall", "Stimulates regrowth", "Nourishes scalp", "Activates follicles", "Reduces dandruff", "Strengthens hair roots"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Scalp Analysis", description: "Detailed trichological assessment of the scalp and hair condition." },
      { name: "Targeted Therapy", description: "Application of the most suitable scientific or Ayurvedic treatment." },
      { name: "Home Care Guidance", description: "Personalized advice on diet, supplements, and home hair care." }
    ]
  },
  {
    treatmentId: "prp",
    title: "PRP Therapy",
    category: "HAIR & SCALP TREATMENTS",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=mHn1mB6t9nI",
    duration: "60 min",
    shortDescription: "Platelet-Rich Plasma therapy to naturally stimulate dormant hair follicles.",
    description: "PRP (Platelet-Rich Plasma) Therapy involves drawing a small amount of your blood, processing it to concentrate the growth factors, and injecting it into the scalp. These growth factors powerfully stimulate dormant hair follicles, promote new hair growth, and increase hair thickness naturally.",
    benefits: ["100% natural (own blood)", "Stimulates new growth", "Increases hair density", "Reduces shedding", "Minimal downtime", "Safe and effective"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Blood Draw", description: "A small amount of blood is drawn and placed in a centrifuge." },
      { name: "PRP Preparation", description: "Centrifugation concentrates the platelets and growth factors." },
      { name: "Scalp Injection", description: "PRP is precisely injected into the affected scalp areas." }
    ]
  },
  {
    treatmentId: "mesotherapy",
    title: "Mesotherapy",
    category: "HAIR & SCALP TREATMENTS",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=7WpYvEBeRSc",
    duration: "45 min",
    shortDescription: "Micro-injection of vitamins and nutrients directly into the scalp for nourishment.",
    description: "Mesotherapy for hair involves injecting a customized cocktail of vitamins, minerals, amino acids, and DHT blockers directly into the scalp's mesoderm layer. This dramatically improves scalp blood flow, nourishes follicles, reduces DHT-related hair loss, and stimulates active regrowth.",
    benefits: ["Direct scalp nourishment", "Reduces DHT hair loss", "Improves circulation", "Stimulates follicles", "Reduces shedding significantly", "Clinically proven"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Scalp Prep", description: "Cleansing the scalp and applying topical numbing if required." },
      { name: "Cocktail Preparation", description: "Customizing the vitamin and nutrient blend for your hair loss type." },
      { name: "Micro-injections", description: "Precise micro-injections across the affected scalp zones." }
    ]
  },
  {
    treatmentId: "lllt",
    title: "LLLT (Low-Level Laser Therapy)",
    category: "HAIR & SCALP TREATMENTS",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=vV77S3G_5iQ",
    duration: "20–30 min",
    shortDescription: "Low-level laser light to boost cellular metabolism and stimulate hair regrowth.",
    description: "LLLT (Low-Level Laser Therapy) uses specific wavelengths of low-intensity laser light to penetrate the scalp and stimulate hair follicle cells. This energizes cellular metabolism, increases blood flow, and extends the anagen (growth) phase of the hair cycle, leading to denser, thicker hair.",
    benefits: ["Painless and non-invasive", "Boosts cellular metabolism", "Extends hair growth phase", "Increases hair density", "No side effects", "FDA-cleared technology"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Scalp Prep", description: "Hair is parted and scalp cleaned for maximum laser penetration." },
      { name: "Laser Application", description: "Low-level laser device applied across the scalp for 20-30 minutes." },
      { name: "Post-Session Care", description: "Instructions on maintenance for optimal results." }
    ]
  },
  {
    treatmentId: "ozone-hair",
    title: "Ozone Hair Therapy",
    category: "HAIR & SCALP TREATMENTS",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1527799822394-46e730304675?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=XvH5a7s-n6k",
    duration: "30 min",
    shortDescription: "Scalp detoxification and infection control using medical-grade ozone.",
    description: "Ozone Hair Therapy delivers medical-grade ozone to the scalp to eliminate fungal infections, dandruff, and scalp inflammation. It also dramatically increases oxygen levels in hair follicles, promoting healthier, stronger growth while eliminating conditions like seborrheic dermatitis.",
    benefits: ["Eliminates scalp infections", "Reduces severe dandruff", "Oxygenates follicles", "Anti-inflammatory", "Detoxifies scalp", "Promotes healthier growth"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Scalp Analysis", description: "Checking for scalp infections, dandruff type, and inflammation." },
      { name: "Ozone Application", description: "Medical ozone delivered to the scalp via a specialized cap or direct application." },
      { name: "Follow-up", description: "Scalp massage with nourishing oils to seal in the benefits." }
    ]
  },
  {
    treatmentId: "air-hair",
    title: "Advanced Hair Regrowth (AIR)",
    category: "HAIR & SCALP TREATMENTS",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=mHn1mB6t9nI",
    duration: "90 min",
    shortDescription: "Comprehensive multi-modality treatment combining best techniques for maximum regrowth.",
    description: "Advanced Hair Regrowth (AIR) is our signature protocol that combines multiple powerful modalities — including PRP, mesotherapy, LLLT, and Ayurvedic scalp therapies — in a single comprehensive session. It is designed for cases of significant hair thinning or baldness where a single modality is insufficient.",
    benefits: ["Maximum follicle activation", "Combines multiple modalities", "Treats severe hair loss", "Increases hair density dramatically", "Holistic and scientific approach", "Long-lasting results"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Comprehensive Assessment", description: "Full trichological analysis to map hair loss zones and severity." },
      { name: "Multi-modal Therapy", description: "Sequential application of LLLT, scalp prep, and PRP/Mesotherapy injections." },
      { name: "Ayurvedic Finishing", description: "Herbal oil application to soothe and nourish post-procedure." }
    ]
  },

  // ── 3. PANCHKARMA (MAIN DETOX THERAPIES) (main) ───────────────────────────
  {
    treatmentId: "cat-panchkarma",
    title: "Panchkarma (Main Detox Therapies)",
    category: "PANCHKARMA (MAIN DETOX THERAPIES)",
    isMainCategory: true,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=XvH5a7s-n6k",
    duration: "7–14 days",
    shortDescription: "Ayurveda's five core detoxification therapies to cleanse, balance, and rejuvenate.",
    description: "Panchakarma literally means 'Five Actions' in Sanskrit. It is Ayurveda's ultimate purification protocol consisting of five primary procedures — Vaman, Virechan, Basti, Nasya, and Raktamokshan — designed to cleanse deep-seated toxins (Ama), restore dosha balance, and treat chronic diseases from their root cause.",
    benefits: ["Eliminates deep-seated toxins", "Balances all three doshas", "Treats root cause of disease", "Reverses cellular aging", "Resets digestion (Agni)", "Boosts immunity (Ojas)"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Purvakarma (Preparation)", description: "Preparatory stage using internal and external oleation (Snehana) and sweating (Swedana) to loosen toxins." },
      { name: "Pradhankarma (Main Therapies)", description: "The 5 main Panchakarma procedures administered as per the patient's constitution and condition." },
      { name: "Paschatkarma (Restoration)", description: "Post-therapy diet, lifestyle guidance, and Rasayana (rejuvenation) to rebuild strength." }
    ]
  },
  {
    treatmentId: "vaman",
    title: "Vaman (Therapeutic Vomiting)",
    category: "PANCHKARMA (MAIN DETOX THERAPIES)",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=vV77S3G_5iQ",
    duration: "1 day",
    shortDescription: "Medically guided therapeutic emesis to expel Kapha toxins from the body.",
    description: "Vaman is the primary Panchakarma procedure to eliminate accumulated Kapha dosha. After preparatory oleation and fomentation, specific emetic herbs are given to painlessly induce vomiting. It powerfully flushes out mucus, toxins, and stagnation from the stomach, lungs, and chest — providing remarkable relief in asthma, chronic cough, psoriasis, and sluggish metabolism.",
    benefits: ["Expels Kapha toxins", "Clears respiratory system", "Treats chronic asthma", "Improves digestion (Agni)", "Clears skin conditions", "Reduces obesity"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Kapha Excitation", description: "A Kapha-aggravating diet is prescribed a day prior to consolidate toxins." },
      { name: "Herb Administration", description: "Consumption of medicated decoctions early morning on an empty stomach." },
      { name: "Emesis Phase", description: "Carefully monitored emesis supervised until Pitta (bile) appears, signaling complete clearance." },
      { name: "Samsarjana Krama", description: "A strict step-by-step diet protocol starting with liquid rice gruel to restore digestive strength." }
    ]
  },
  {
    treatmentId: "virechan",
    title: "Virechan (Purgation Therapy)",
    category: "PANCHKARMA (MAIN DETOX THERAPIES)",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=F_fO_QhS7_U",
    duration: "1 day",
    shortDescription: "Controlled purgation therapy to eliminate excess Pitta and liver toxins.",
    description: "Virechan is a medicated purgation therapy specifically targeting the lower gastrointestinal tract, liver, and gallbladder to eliminate aggravated Pitta dosha. Using natural laxative herbs, it safely flushes heat, acidity, and toxic bile via the bowels. This effectively clears inflammatory conditions, skin diseases, hormonal imbalances, and chronic acidity.",
    benefits: ["Flushes Pitta from liver", "Purifies blood", "Clears acne and skin rashes", "Relieves hyperacidity", "Balances hormones", "Detoxifies gallbladder"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Preparation", description: "Several days of internal oleation followed by a Pitta-soothing diet." },
      { name: "Purgative Administration", description: "Specific herbal purgatives given in the morning." },
      { name: "Clearance Phase", description: "Mild, painless bowel movements to flush toxins, closely monitored by the physician." },
      { name: "Restoration Diet", description: "Rebuilding gut flora and digestive fire using traditional broths and light foods." }
    ]
  },
  {
    treatmentId: "basti",
    title: "Basti (Medicated Enema)",
    category: "PANCHKARMA (MAIN DETOX THERAPIES)",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=fp9JxUHXi8Y",
    duration: "1–7 days",
    shortDescription: "The mother of all treatments — medicated enema for Vata balance and deep healing.",
    description: "Basti is heralded as 'Ardha Chikitsa' (half of all treatments) due to its profound healing capacity. It involves the introduction of herbal decoctions (Kashaya Basti) or warm oils (Anuvasana Basti) into the rectum. Since the colon is the primary seat of Vata dosha, Basti directly heals neurological conditions, joint pain, osteoporosis, and severe digestive disorders.",
    benefits: ["Balances Vata dosha", "Lubricates colon", "Cures chronic constipation", "Heals neurological disorders", "Strengthens immunity (Ojas)", "Addresses joint pain"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Local Abhyanga", description: "Massage of the abdomen and lower back prior to the procedure." },
      { name: "Enema Administration", description: "Gentle rectal introduction of warm herbal formulations." },
      { name: "Retention", description: "Resting while the colon absorbs the micro-nutrients and active alkaloids." },
      { name: "Evacuation", description: "Expulsion of the injected liquid carrying the deep-seated toxins." }
    ]
  },
  {
    treatmentId: "nasya",
    title: "Nasya (Nasal Therapy)",
    category: "PANCHKARMA (MAIN DETOX THERAPIES)",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=fp9JxUHXi8Y",
    duration: "20–30 min",
    shortDescription: "Medicated oils via nostrils to cleanse the head, neck, and brain pathways.",
    description: "In Ayurveda, the nose is the gateway to the brain. Nasya involves instilling specialized herbal oils, juices, or powders into the nostrils. This therapy aggressively removes accumulated Kapha toxins from the head and neck region. It is highly effective for chronic sinusitis, migraines, hormonal imbalances, premature graying, and neuro-muscular conditions of the face.",
    benefits: ["Clears sinuses", "Treats chronic migraines", "Improves memory & vision", "Prevents premature graying", "Relieves facial paralysis", "Clears brain pathways"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Facial Massage", description: "Vigorous facial and head massage to loosen localized toxins." },
      { name: "Fomentation", description: "Applying mild steam to the face and neck using a herbal towel." },
      { name: "Nasal Instillation", description: "Dropping precise amounts of medicated oil into each nostril." },
      { name: "Expulsion", description: "Patient gently spits out the mucus that drains into the throat." }
    ]
  },
  {
    treatmentId: "raktamokshan",
    title: "Raktamokshan (Blood Purification)",
    category: "PANCHKARMA (MAIN DETOX THERAPIES)",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=mHn1mB6t9nI",
    duration: "45–60 min",
    shortDescription: "Specialized blood purification therapy including leech therapy and other methods.",
    description: "Raktamokshana is Ayurveda's primary blood purification procedure. It encompasses methods like Jalaukavacharana (leech therapy), Siravedha (venesection), and Shringa (cupping). These techniques extract toxic blood from specific areas, injecting healing bioactive compounds and removing inflammatory metabolites — highly effective for skin diseases, varicose veins, and gout.",
    benefits: ["Purifies blood", "Treats skin diseases", "Relieves varicose veins", "Reduces gout", "Clears eczema", "Anti-inflammatory effects"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Method Selection", description: "Choosing the appropriate Raktamokshana method based on the condition." },
      { name: "Site Preparation", description: "Cleaning and preparing the affected area for the procedure." },
      { name: "Procedure", description: "Application of leeches, cupping, or other modality as indicated." },
      { name: "Post-care", description: "Herbal dressings and dietary guidelines after the procedure." }
    ]
  },

  // ── 4. OTHER PANCHKARMA & SUPPORTIVE THERAPIES (main) ─────────────────────
  {
    treatmentId: "cat-supportive",
    title: "Other Panchkarma & Supportive Therapies",
    category: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES",
    isMainCategory: true,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=XvH5a7s-n6k",
    duration: "Variable",
    shortDescription: "Relaxation, pain relief, and stress reduction supportive Ayurvedic therapies.",
    description: "These therapies support Panchkarma by providing relaxation, pain relief, stress reduction, and rejuvenation. They improve circulation, detoxify through sweating, strengthen joints, calm the nervous system, and prepare the body for deeper healing.",
    benefits: ["Deep relaxation", "Pain relief", "Improved circulation", "Joint strengthening", "Nervous system calm", "Stress reduction"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Consultation", description: "Assessment of body constitution and specific therapeutic goals." },
      { name: "Therapy Session", description: "Expert administration of the chosen supportive therapy." },
      { name: "Rest & Integration", description: "Post-therapy relaxation period for maximum benefit absorption." }
    ]
  },
  {
    treatmentId: "abhyanga",
    title: "Abhyanga (Full Body Oil Massage)",
    category: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=F_fO_QhS7_U",
    duration: "60 min",
    shortDescription: "Synchronized full-body warm oil massage tailored to your dosha.",
    description: "Classical Ayurvedic Abhyanga is a synchronized full-body massage using warm medicated oils selected for your dominant dosha. Unlike standard massages, it directs toxins towards the lymphatic system for elimination while deeply nourishing the skin, muscles, and tissues. It dramatically delays aging, resolves fatigue, and pacifies chaotic Vata dosha.",
    benefits: ["Improves circulation", "Enhances sleep quality", "Soothes nervous system", "Tones muscles", "Delays aging", "Removes fatigue"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Oil Selection", description: "Determining the correct base oil (Sesame/Coconut/Mustard) based on your dosha and condition." },
      { name: "Synchronized Strokes", description: "Full-body sequential strokes following specific Marma (vital) points by two therapists." },
      { name: "Steam Session", description: "Followed by a herbal steam session to ensure deep oil penetration." }
    ]
  },
  {
    treatmentId: "swedan",
    title: "Swedan (Steam Therapy)",
    category: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=fp9JxUHXi8Y",
    duration: "30 min",
    shortDescription: "Therapeutic herbal steam to mobilize toxins and open body channels.",
    description: "Swedana involves introducing heat to the body using steam generated from specific herbal decoctions. Coming right after Abhyanga, this therapy dilates the micro-channels (Srotas) of the body. The heat melts the oleated toxins, detaching them from peripheral tissues and forcing them towards the gastrointestinal tract for elimination.",
    benefits: ["Opens body channels", "Relieves muscle stiffness", "Mobilizes toxins", "Reduces heaviness", "Improves skin luster", "Prepares for deeper therapies"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Herbal Decoction Prep", description: "Boiling specific roots and leaves customized to the patient's dosha." },
      { name: "Steam Chamber", description: "Patient rests in a wooden steam box while the head is kept cool outside." },
      { name: "Assessment", description: "Pulse monitoring to evaluate successful toxin dislodgment." }
    ]
  },
  {
    treatmentId: "shirodhara",
    title: "Shirodhara",
    category: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=vV-WGPjfgm4",
    duration: "60 min",
    shortDescription: "Continuous rhythmic stream of warm oil poured over the forehead for deep nervous calm.",
    description: "Shirodhara is a transcendentally relaxing therapy involving a steady, rhythmic stream of warm medicated oil, herbal decoctions, or buttermilk poured over the 'Ajna Chakra' (third eye center) on the forehead. This powerfully stimulates the pineal gland, calming the entire central nervous system — the ultimate Ayurvedic remedy for insomnia, anxiety, stress, and hypertension.",
    benefits: ["Cures insomnia", "Relieves stress & anxiety", "Treats depression", "Lowers blood pressure", "Calms nervous system", "Improves focus & memory"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Head Massage", description: "Initial light massage of the scalp to induce relaxation." },
      { name: "Therapy Setup", description: "Resting supine while a traditional copper vessel is aligned over the forehead." },
      { name: "Continuous Pour", description: "A steady oscillating stream of warm oil across the forehead for 45-60 minutes." }
    ]
  },
  {
    treatmentId: "udwartan",
    title: "Udwartan (Herbal Powder Massage)",
    category: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=vV77S3G_5iQ",
    duration: "45 min",
    shortDescription: "Vigorous upward-stroking massage with dry herbal powders to tone and detoxify.",
    description: "Udwartana is a unique therapeutic skin exfoliation and lymphatic drainage massage using specific dry herbal powders mixed sometimes with minimal oil. Unlike other massages, the strokes are performed briskly in an upward direction which generates therapeutic heat. This directly melts subcutaneous fat, reduces cellulite, and is heavily prescribed in obesity and Kapha disorders.",
    benefits: ["Reduces cellulite", "Breaks down fat", "Exfoliates skin", "Invigorates circulation", "Tones the body", "Aids weight loss"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Powder Heating", description: "Specific herbal powders are gently roasted to increase their efficacy." },
      { name: "Friction Massage", description: "Therapists apply brisk upward strokes to generate therapeutic heat." },
      { name: "Cleansing", description: "A hot water bath to remove the herbal paste, leaving skin exceptionally smooth." }
    ]
  },
  {
    treatmentId: "joint-basti",
    title: "Kati Basti / Janu Basti",
    category: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=mHn1mB6t9nI",
    duration: "45 min",
    shortDescription: "Localized therapeutic warm oil pooling over the lower back or knee joints.",
    description: "Kati Basti targets chronic ailments of the lumbar spine, while Janu Basti focuses on the knee joint. A boundary of black gram dough is built over the affected area, and warm deeply-penetrating herbal oils are poured into this reservoir. This forces healing herbs directly into the spinal discs, nerve roots, or joint cartilage — drastically healing sciatica, disc degeneration, and knee arthritis.",
    benefits: ["Heals slipped discs", "Relieves chronic back pain", "Lubricates spinal joints", "Eases sciatica", "Treats knee arthritis", "Reduces joint inflammation"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Dough Preparation", description: "Creating a leak-proof circular boundary using traditional black gram dough." },
      { name: "Oil Pooling", description: "Continuous pouring and replacement of hot medicated oils over 30-45 minutes." },
      { name: "Local Massage", description: "Gentle restorative massage of the area after removing the oil ring." }
    ]
  },
  {
    treatmentId: "netra-tarpan",
    title: "Netra / Akshi Tarpan",
    category: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=7WpYvEBeRSc",
    duration: "30 min",
    shortDescription: "Eye bath with medicated ghee to improve vision and reduce dryness and strain.",
    description: "Netra Tarpan (Akshi Tarpan) is an eye rejuvenation therapy where warm medicated ghee is pooled over the eyes using a dough ring. This nourishes the optic nerves, strengthens the eye muscles, and is highly effective for dry eyes, computer vision syndrome, early cataracts, and declining vision. It gives remarkable clarity and a cooling, refreshing sensation.",
    benefits: ["Improves vision clarity", "Relieves dry eyes", "Soothes eye strain", "Strengthens optic nerves", "Treats early cataracts", "Cooling & refreshing"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Dough Ring Application", description: "A leak-proof ring of dough is placed around both eyes." },
      { name: "Ghee Pooling", description: "Warm medicated ghee is poured into the ring until it covers the eyeball." },
      { name: "Eye Movement", description: "Patient gently opens and closes eyes to allow the ghee to nourish all surfaces." }
    ]
  },

  // ── 5. WEIGHT LOSS & BODY DETOX (main) ────────────────────────────────────
  {
    treatmentId: "cat-weightloss",
    title: "Weight Loss & Body Detox",
    category: "WEIGHT LOSS & BODY DETOX",
    isMainCategory: true,
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=Z73qpr-LikQ",
    duration: "Variable",
    shortDescription: "Sustainable weight management, inch loss, and body detoxification programs.",
    description: "These treatments help in sustainable weight management, inch loss, and body shaping. They work by removing deep-seated toxins (Ama), improving digestive fire (Agni), and enhancing metabolism — providing sustainable results without crash dieting or invasive procedures.",
    benefits: ["Sustainable weight loss", "Toxin elimination", "Improved metabolism", "Inch loss & body shaping", "Digestive reset", "Increased energy levels"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Assessment", description: "Body composition analysis and identification of the root cause of weight gain." },
      { name: "Detox Protocol", description: "Customized Ayurvedic detoxification and weight loss therapies." },
      { name: "Diet & Lifestyle Guidance", description: "Personalized dietary plan and lifestyle modifications for lasting results." }
    ]
  },
  {
    treatmentId: "fat-reduction",
    title: "Fat Reduction Therapies",
    category: "WEIGHT LOSS & BODY DETOX",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=fp9JxUHXi8Y",
    duration: "60 min",
    shortDescription: "Targeted fat reduction using Udwartana, heat therapy, and advanced body contouring.",
    description: "Our Fat Reduction Therapies combine Ayurvedic Udwartana (herbal powder massage), localized heat therapies, and body wraps to target stubborn fat deposits. These non-invasive techniques break down fat cells, improve lymphatic drainage, and significantly reduce inches from the waist, hips, and thighs.",
    benefits: ["Targeted inch loss", "Breaks down fat cells", "Improves lymphatic drainage", "Non-invasive", "Reduces cellulite", "Firms skin"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Body Mapping", description: "Identifying and marking the areas with stubborn fat deposits." },
      { name: "Udwartana / Heat Therapy", description: "Application of herbal powders and heat treatments to targeted zones." },
      { name: "Body Wrap", description: "Herbal body wraps to consolidate results and reduce inches." }
    ]
  },
  {
    treatmentId: "body-detox",
    title: "Body Detox Programs",
    category: "WEIGHT LOSS & BODY DETOX",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=QBz-luVlyYg",
    duration: "3–21 days",
    shortDescription: "Comprehensive Ayurvedic programs to flush metabolic waste and rejuvenate the system.",
    description: "Body Detox Programs at Kalpvan are comprehensive multi-day protocols combining Panchakarma therapies, herbal formulations, detox diets, and Yoga/Pranayama. They systematically eliminate metabolic waste (Ama), rejuvenate cellular function, and leave you feeling lighter, clearer, and with dramatically increased energy.",
    benefits: ["Eliminates metabolic waste", "Systemic rejuvenation", "Increased energy", "Improved organ function", "Mental clarity", "Glowing skin"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Pre-Detox Preparation", description: "A preparatory diet and herbal protocol a few days before the program." },
      { name: "Active Detox Phase", description: "Combination of Panchakarma therapies, specialized diet, and Yoga." },
      { name: "Rejuvenation Phase", description: "Rebuilding and nourishing the body post-detox with Rasayana formulations." }
    ]
  },
  {
    treatmentId: "metabolism-boost",
    title: "Metabolism Boost Therapies",
    category: "WEIGHT LOSS & BODY DETOX",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=vV77S3G_5iQ",
    duration: "30–45 min",
    shortDescription: "Correcting digestive fire (Agni) naturally for enhanced energy and fat conversion.",
    description: "Metabolism Boost Therapies focus on resetting the digestive fire (Agni) — the cornerstone of Ayurvedic weight management. Using specific herbal formulations, dietary modifications, and targeted therapies like Virechan and Agni-enhancing Ayurvedic medicines, we dramatically improve how your body converts food into energy rather than storing it as fat.",
    benefits: ["Resets digestive fire (Agni)", "Converts fat to energy", "Reduces bloating", "Eliminates metabolic sluggishness", "Sustainable energy boost", "Natural and safe"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Agni Assessment", description: "Evaluation of the strength and type of digestive fire." },
      { name: "Herbal Protocol", description: "Administration of Agni-kindling herbs and formulations." },
      { name: "Dietary Reset", description: "Customized diet plan to sustain an improved metabolism." }
    ]
  },

  // ── 6. WELLNESS, WOMEN & IMMUNITY CARE (main) ─────────────────────────────
  {
    treatmentId: "cat-wellness",
    title: "Wellness, Women & Immunity Care",
    category: "WELLNESS, WOMEN & IMMUNITY CARE",
    isMainCategory: true,
    image: "https://images.unsplash.com/photo-1527799822394-46e730304675?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=xqqQ8lxTg8M",
    duration: "Variable",
    shortDescription: "Holistic health, hormonal balance, fertility support, child immunity, and mental wellness.",
    description: "This category focuses on holistic health, hormonal balance, fertility support, child immunity, and mental wellness. It promotes long-term health, disease prevention, and overall well-being through time-tested Ayurvedic protocols tailored for women's health and family wellness.",
    benefits: ["Hormonal balance", "Fertility support", "Child immunity", "Stress management", "Mental wellness", "Long-term health"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Holistic Consultation", description: "In-depth assessment of health history, hormonal status, and wellness goals." },
      { name: "Personalized Protocol", description: "Designing a customized treatment plan including therapies, herbs, and lifestyle changes." },
      { name: "Ongoing Support", description: "Regular follow-ups to monitor progress and adjust the protocol." }
    ]
  },
  {
    treatmentId: "pcod",
    title: "PCOD / PCOS Treatment",
    category: "WELLNESS, WOMEN & IMMUNITY CARE",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=mHn1mB6t9nI",
    duration: "Ongoing",
    shortDescription: "Ayurvedic hormonal regulation for PCOD/PCOS management and cycle restoration.",
    description: "Ayurvedic treatment of PCOD/PCOS addresses the root cause — hormonal dysregulation stemming from Kapha and Pitta imbalances. Using specific Panchakarma procedures, herbal formulations, and dietary modifications, we restore menstrual regularity, shrink ovarian cysts naturally, regulate insulin sensitivity, and improve fertility without hormonal drugs.",
    benefits: ["Regulates menstrual cycle", "Shrinks ovarian cysts", "Improves insulin sensitivity", "Reduces facial hair", "Balances hormones naturally", "Improves fertility"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Hormonal Assessment", description: "Review of blood work, symptoms, and ultrasound findings." },
      { name: "Panchakarma Protocol", description: "Virechan and Basti tailored to clear hormonal toxins." },
      { name: "Herbal Therapy", description: "Long-term herbal formulations for hormonal regulation and cyst management." }
    ]
  },
  {
    treatmentId: "infertility",
    title: "Infertility Treatment",
    category: "WELLNESS, WOMEN & IMMUNITY CARE",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1527799822394-46e730304675?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=F_fO_QhS7_U",
    duration: "Ongoing",
    shortDescription: "Natural fertility support using Vajikarana protocols to optimize reproductive health.",
    description: "Ayurvedic Vajikarana and fertility protocols focus on producing the highest quality reproductive tissues (Shukra & Artava). Treatment begins with detoxifying the body of toxins that disrupt hormonal signals, followed by specific protocols like Uttara Basti. It provides high success rates in unexplained infertility, low AMH, and poor sperm morphology without IVF.",
    benefits: ["Improves egg/sperm quality", "Regulates ovulation", "Thickens uterine lining", "Clears hormonal blocks", "All-natural approach", "High success rates"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Detoxification", description: "Initial Panchakarma to clear channels and reset hormonal feedback loops." },
      { name: "Uttara Basti / Pichu", description: "Localized therapies to deliver medicine directly to reproductive organs." },
      { name: "Rasayana Administration", description: "Long-term herbal tonics to build reproductive tissue quality." }
    ]
  },
  {
    treatmentId: "garbhasanskar",
    title: "Garbhasanskar (Pregnancy Care)",
    category: "WELLNESS, WOMEN & IMMUNITY CARE",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=fp9JxUHXi8Y",
    duration: "Ongoing",
    shortDescription: "Ancient Ayurvedic pregnancy care for the health of mother and unborn child.",
    description: "Garbhasanskar is the ancient Ayurvedic practice of influencing the physical, mental, and spiritual development of the child in the womb. It includes safe Ayurvedic therapies for the mother, specific dietary guidelines, music therapy, positive affirmations, and herbal formulations — all proven to promote healthy fetal development and an easier delivery.",
    benefits: ["Safe for mother & baby", "Promotes fetal development", "Eases pregnancy discomfort", "Reduces stress in pregnancy", "Prepares for labor", "Traditional wisdom"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Trimester Assessment", description: "Safe therapies and guidance tailored to each trimester." },
      { name: "Ayurvedic Nutrition", description: "Customized pregnancy diet and safe herbal formulations." },
      { name: "Holistic Practices", description: "Music therapy, Yoga, and positive conditioning for mother and child." }
    ]
  },
  {
    treatmentId: "suvarnaprashan",
    title: "Suvarnaprashan (Child Immunity)",
    category: "WELLNESS, WOMEN & IMMUNITY CARE",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=QBz-luVlyYg",
    duration: "10–15 min",
    shortDescription: "Traditional gold-based Ayurvedic drops to boost child immunity and cognitive development.",
    description: "Suvarnaprashan is an ancient Ayurvedic immunization where purified gold (Swarna Bhasma) is mixed with honey, ghee, and specific herbal formulations and given to children from 0–16 years. It dramatically strengthens immunity, enhances intelligence and memory, improves digestion, and protects against seasonal illnesses — a tradition spanning thousands of years.",
    benefits: ["Boosts immunity", "Enhances intelligence & memory", "Improves digestion", "Protects against infections", "Increases concentration", "Traditional gold therapy"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Age-appropriate Dosing", description: "Precise dose calculation based on the child's age and weight." },
      { name: "Auspicious Timing", description: "Traditionally administered on Pushya Nakshatra day for maximum benefit." },
      { name: "Regular Follow-up", description: "Monthly sessions for sustained immunity and cognitive enhancement." }
    ]
  },
  {
    treatmentId: "stress-mgmt",
    title: "Stress Management",
    category: "WELLNESS, WOMEN & IMMUNITY CARE",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=vV77S3G_5iQ",
    duration: "60 min",
    shortDescription: "Lowering cortisol and restoring emotional balance through Ayurvedic and mindfulness therapies.",
    description: "Our Stress Management protocol combines Shirodhara, Abhyanga, herbal Rasayana medicines, Pranayama, and counseling to deeply calm the nervous system. It dramatically reduces cortisol levels, improves sleep quality, resolves anxiety, and restores emotional equilibrium — providing lasting relief from modern-day stress.",
    benefits: ["Reduces cortisol", "Improves sleep quality", "Relieves anxiety", "Restores emotional balance", "Clears mental fog", "Provides deep relaxation"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Mind-Body Assessment", description: "Understanding stress triggers, sleep patterns, and nervous system status." },
      { name: "Calming Therapies", description: "Shirodhara, Abhyanga, and herbal Nasya for deep nervous system calm." },
      { name: "Rasayana & Yoga", description: "Adaptogenic herbs and personalized Yoga/Pranayama practice for lasting resilience." }
    ]
  },
  {
    treatmentId: "rejuvenation",
    title: "Rejuvenation Therapy",
    category: "WELLNESS, WOMEN & IMMUNITY CARE",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=xqqQ8lxTg8M",
    duration: "45–90 min",
    shortDescription: "Anti-aging Rasayana therapies to restore vital energy and reverse physiological aging.",
    description: "Rasayana (Rejuvenation) Therapy is the pinnacle of Ayurvedic anti-aging medicine. Using potent Rasayana formulations like Chyawanprash, Brahma Rasayana, and specialized Panchakarma, it replenishes vital tissues (Dhatus), restores Ojas (vital life force), reverses cellular aging, and gives you renewed energy, clarity, and a youthful glow.",
    benefits: ["Reverses cellular aging", "Restores vital energy (Ojas)", "Improves skin youthfulness", "Enhances mental clarity", "Boosts immunity", "Increases overall vitality"],
    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],
    whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],
    process: [
      { name: "Vitality Assessment", description: "Evaluating Ojas (life force) levels and areas of depletion." },
      { name: "Rasayana Therapies", description: "Application of specific rejuvenating therapies including Abhyanga, Shirodhara, and Nasya." },
      { name: "Herbal Rasayana", description: "Customized long-term Rasayana formulation for sustained anti-aging benefits." }
    ]
  }
];
