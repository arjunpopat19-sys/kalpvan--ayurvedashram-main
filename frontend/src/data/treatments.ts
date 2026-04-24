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
}

export const treatments: Treatment[] = [
  // 1. SKIN & ADVANCED FACIAL TREATMENTS
  {
    treatmentId: "cat-0",
    title: "Skin & Advanced Facial Treatments",
    category: "SKIN & ADVANCED FACIAL TREATMENTS",
    isMainCategory: true,
    image: "/assets/treatments/treatment-skin.jpg",
    videoUrl: "https://www.youtube.com/watch?v=xqqQ8lxTg8M",
    duration: "Variable",
    shortDescription: "Skin rejuvenation, anti-aging, acne control, and glow enhancement treatments.",
    description: "These treatments focus on skin rejuvenation, anti-aging, acne control, and glow enhancement. They help in removing dead skin, reducing pigmentation, tightening pores, and improving overall skin texture using advanced dermatological techniques.",
    benefits: ["Rejuvenation", "Anti-aging", "Acne control", "Glow enhancement"],
    process: [{ name: "Consultation", description: "Skin type analysis." }, { name: "Treatment", description: "Clinical application." }, { name: "Care", description: "Post-treatment protocols." }]
  },
  {
    treatmentId: "microdermabrasion",
    title: "Microdermabrasion",
    category: "SKIN & ADVANCED FACIAL TREATMENTS",
    isMainCategory: false,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=XvH5a7s-n6k",
    duration: "45 min",
    shortDescription: "Non-invasive skin resurfacing to remove dead skin cells.",
    description: "Microdermabrasion is a non-invasive skin resurfacing treatment that removes dead skin cells and stimulates collagen.",
    benefits: ["Exfoliation", "Collagen boost"],
    process: [{ name: "Step 1", description: "Cleansing" }, { name: "Step 2", description: "Exfoliation" }]
  },
  { treatmentId: "chemical-peel", title: "Chemical Peel", category: "SKIN & ADVANCED FACIAL TREATMENTS", isMainCategory: false, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80", videoUrl: "https://www.youtube.com/watch?v=vV77S3G_5iQ", duration: "30 min", shortDescription: "Clinical skin rejuvenation using specialized acids.", description: "Clinical skin rejuvenation using specialized acids to improve skin tone.", benefits: ["Tone improvement", "Texture refinement"], process: [] },
  { treatmentId: "ozone-face", title: "Ozone Therapy (Face)", category: "SKIN & ADVANCED FACIAL TREATMENTS", isMainCategory: false, image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80", videoUrl: "https://www.youtube.com/watch?v=xqqQ8lxTg8M", duration: "30 min", shortDescription: "Detoxifying skin and enhancing facial oxygenation.", description: "Using medical-grade ozone to detoxify skin and enhance facial oxygenation.", benefits: ["Detoxification", "Oxygenation"], process: [] },
  { treatmentId: "ultrasonic", title: "Ultrasonic Treatment", category: "SKIN & ADVANCED FACIAL TREATMENTS", isMainCategory: false, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80", videoUrl: "https://www.youtube.com/watch?v=Z73qpr-LikQ", duration: "45 min", shortDescription: "High-frequency sound waves for cleansing and firming.", description: "Using high-frequency sound waves to penetrate deep into the skin.", benefits: ["Deep cleansing", "Firming"], process: [] },
  { treatmentId: "jet-peel", title: "Jet Peel", category: "SKIN & ADVANCED FACIAL TREATMENTS", isMainCategory: false, image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&q=80", videoUrl: "https://www.youtube.com/watch?v=fp9JxUHXi8Y", duration: "45 min", shortDescription: "High-pressure saline and oxygen treatment.", description: "High-pressure saline and oxygen treatment that exfoliates and hydrates.", benefits: ["Hydration", "Exfoliation"], process: [] },
  { treatmentId: "light-therapy", title: "Light Therapy", category: "SKIN & ADVANCED FACIAL TREATMENTS", isMainCategory: false, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80", videoUrl: "https://www.youtube.com/watch?v=QBz-luVlyYg", duration: "20 min", shortDescription: "LED treatments for targeting specific skin concerns.", description: "LED light treatments that target specific skin concerns like acne.", benefits: ["Targeted repair", "Non-invasive"], process: [] },

  // 2. HAIR & SCALP TREATMENTS
  {
    treatmentId: "cat-1",
    title: "Hair & Scalp Treatments",
    category: "HAIR & SCALP TREATMENTS",
    isMainCategory: true,
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=mHn1mB6t9nI",
    duration: "Variable",
    shortDescription: "Hair fall control, hair regrowth, and scalp nourishment.",
    description: "These treatments are designed for hair fall control, hair regrowth, dandruff treatment, and scalp nourishment. They improve blood circulation, activate hair follicles, and strengthen roots naturally and scientifically.",
    benefits: ["Regrowth", "Root strengthening", "Scalp health"],
    process: [{ name: "Analysis", description: "Scalp assessment." }, { name: "Therapy", description: "Scientific application." }]
  },
  { treatmentId: "prp", title: "PRP Therapy", category: "HAIR & SCALP TREATMENTS", isMainCategory: false, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80", videoUrl: "https://www.youtube.com/watch?v=mHn1mB6t9nI", duration: "60 min", shortDescription: "Platelet-Rich Plasma to stimulate hair follicles.", description: "Stimulating dormant hair follicles using Platelet-Rich Plasma.", benefits: ["Natural growth", "Follicle stimulation"], process: [] },
  { treatmentId: "mesotherapy", title: "Mesotherapy", category: "HAIR & SCALP TREATMENTS", isMainCategory: false, image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&q=80", videoUrl: "https://www.youtube.com/watch?v=7WpYvEBeRSc", duration: "45 min", shortDescription: "Nutrient injection for scalp nourishment.", description: "Injection of vitamins and nutrients into the scalp.", benefits: ["Nourishment", "Reduced shedding"], process: [] },
  { treatmentId: "lllt", title: "LLLT (Laser Therapy)", category: "HAIR & SCALP TREATMENTS", isMainCategory: false, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80", videoUrl: "https://www.youtube.com/watch?v=vV77S3G_5iQ", duration: "20 min", shortDescription: "Laser therapy for cellular metabolism boost.", description: "Low-Level Laser Therapy to boost cellular metabolism.", benefits: ["Metabolism boost", "Safe"], process: [] },
  { treatmentId: "ozone-hair", title: "Ozone Hair Therapy", category: "HAIR & SCALP TREATMENTS", isMainCategory: false, image: "https://images.unsplash.com/photo-1527799822394-46e730304675?auto=format&fit=crop&w=800&q=80", videoUrl: "https://www.youtube.com/watch?v=XvH5a7s-n6k", duration: "30 min", shortDescription: "Scalp detox and infection control.", description: "Clinical ozone treatment for scalp health.", benefits: ["Anti-fungal", "Detox"], process: [] },
  { treatmentId: "air-hair", title: "Advanced Hair Regrowth (AIR)", category: "HAIR & SCALP TREATMENTS", isMainCategory: false, image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&q=80", videoUrl: "https://www.youtube.com/watch?v=mHn1mB6t9nI", duration: "90 min", shortDescription: "Comprehensive multi-modality regrowth treatment.", description: "A comprehensive multi-modality treatment for regrowth.", benefits: ["Max thickness", "Comprehensive"], process: [] },

  // 3. PANCHKARMA (MAIN DETOX THERAPIES)
  {
    treatmentId: "cat-2",
    title: "Panchkarma (Main Detox)",
    category: "PANCHKARMA (MAIN DETOX THERAPIES)",
    isMainCategory: true,
    image: "/assets/treatments/treatment-panchakarma.jpg",
    videoUrl: "https://www.youtube.com/watch?v=XvH5a7s-n6k",
    duration: "7-14 days",
    shortDescription: "Core five major Ayurvedic detoxification treatments.",
    description: "These are the five core detoxification therapies of Ayurveda that cleanse the body internally. They remove toxins (Ama), balance doshas (Vata, Pitta, Kapha), and treat chronic diseases from the root.",
    benefits: ["Internal detox", "Dosha balance", "Root relief"],
    process: [{ name: "Consult", description: "Assessment." }, { name: "Cleanse", description: "Primary detox." }]
  },
  { treatmentId: "vaman", title: "Vaman (Therapeutic Vomiting)", category: "PANCHKARMA (MAIN DETOX THERAPIES)", isMainCategory: false, image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80", videoUrl: "https://www.youtube.com/watch?v=vV77S3G_5iQ", duration: "1 day", shortDescription: "Kapha toxins elimination via controlled vomiting.", description: "Controlled medicinal vomiting for Kapha toxins.", benefits: ["Respiratory relief", "Kapha removal"], process: [] },
  { treatmentId: "virechan", title: "Virechan (Purgation Therapy)", category: "PANCHKARMA (MAIN DETOX THERAPIES)", isMainCategory: false, image: "/assets/treatments/treatment-panchakarma.jpg", videoUrl: "https://www.youtube.com/watch?v=F_fO_QhS7_U", duration: "1 day", shortDescription: "Pitta toxins removal via medicated purgation.", description: "Medicated purgation for Pitta toxins.", benefits: ["Liver detox", "Blood purification"], process: [] },
  { treatmentId: "basti", title: "Basti (Medicated Enema)", category: "PANCHKARMA (MAIN DETOX THERAPIES)", isMainCategory: false, image: "/assets/treatments/treatment-panchakarma.jpg", videoUrl: "https://www.youtube.com/watch?v=fp9JxUHXi8Y", duration: "1-7 days", shortDescription: "Medicated enema for Vata balance.", description: "Enema for Vata balance and colon health.", benefits: ["Vata balance", "Neurological health"], process: [] },
  { treatmentId: "nasya", title: "Nasya (Nasal Therapy)", category: "PANCHKARMA (MAIN DETOX THERAPIES)", isMainCategory: false, image: "/assets/treatments/treatment-panchakarma.jpg", videoUrl: "https://www.youtube.com/watch?v=fp9JxUHXi8Y", duration: "20 min", shortDescription: "Head and neck detox via nostrils.", description: "Herbal oils via nostrils for head toxins.", benefits: ["Sinus relief", "Mental clarity"], process: [] },
  { treatmentId: "raktamokshan", title: "Raktamokshan (Blood Purification)", category: "PANCHKARMA (MAIN DETOX THERAPIES)", isMainCategory: false, image: "/assets/treatments/treatment-panchakarma.jpg", videoUrl: "https://www.youtube.com/watch?v=mHn1mB6t9nI", duration: "45 min", shortDescription: "Localized blood purification therapies.", description: "Blood purification including leech therapy.", benefits: ["Skin healing", "Varicose relief"], process: [] },

  // 4. OTHER PANCHKARMA & SUPPORTIVE THERAPIES
  {
    treatmentId: "cat-3",
    title: "Other Panchkarma & Supportive",
    category: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES",
    isMainCategory: true,
    image: "/assets/treatments/treatment-massage.jpg",
    videoUrl: "https://www.youtube.com/watch?v=XvH5a7s-n6k",
    duration: "Variable",
    shortDescription: "Relaxation, pain relief, and stress reduction therapies.",
    description: "These therapies support Panchkarma by providing relaxation, pain relief, stress reduction, and rejuvenation. They improve circulation, detox through sweating, strengthen joints, and calm the nervous system.",
    benefits: ["Circulation boost", "Nerve calm", "Joint strength"],
    process: []
  },
  { treatmentId: "abhyanga", title: "Abhyanga (Full Body Massage)", category: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES", isMainCategory: false, image: "/assets/treatments/treatment-massage.jpg", videoUrl: "https://www.youtube.com/watch?v=F_fO_QhS7_U", duration: "60 min", shortDescription: "Traditional warm oil massage.", description: "Traditional full-body warm oil massage.", benefits: ["Relaxation", "Drainage"], process: [] },
  { treatmentId: "swedan", title: "Swedan (Steam Therapy)", category: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES", isMainCategory: false, image: "/assets/treatments/treatment-massage.jpg", videoUrl: "https://www.youtube.com/watch?v=fp9JxUHXi8Y", duration: "30 min", shortDescription: "Herbal steam for toxin mobilization.", description: "Herbal sweat treatment following massage.", benefits: ["Pore opening", "Stiffness relief"], process: [] },
  { treatmentId: "shirodhara", title: "Shirodhara", category: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES", isMainCategory: false, image: "/assets/treatments/treatment-massage.jpg", videoUrl: "https://www.youtube.com/watch?v=vV-WGPjfgm4", duration: "60 min", shortDescription: "Rhythmic oil stream on forehead.", description: "Continuous stream on the forehead to calm mind.", benefits: ["Sleep quality", "Stress reduction"], process: [] },
  { treatmentId: "udwartan", title: "Udwartan (Powder Massage)", category: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES", isMainCategory: false, image: "/assets/treatments/treatment-massage.jpg", videoUrl: "https://www.youtube.com/watch?v=vV77S3G_5iQ", duration: "45 min", shortDescription: "Dry herbal powder massage.", description: "Upward massage for fat breakdown.", benefits: ["Cellulite reduction", "Toning"], process: [] },
  { treatmentId: "joint-basti", title: "Kati Basti / Janu Basti", category: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES", isMainCategory: false, image: "/assets/treatments/treatment-massage.jpg", videoUrl: "https://www.youtube.com/watch?v=mHn1mB6t9nI", duration: "45 min", shortDescription: "Localized therapeutic oil pooling.", description: "Oil pooling for localized joint healing.", benefits: ["Pain relief", "Lubrication"], process: [] },
  { treatmentId: "netra-tarpan", title: "Netra / Akshi Tarpan", category: "OTHER PANCHKARMA & SUPPORTIVE THERAPIES", isMainCategory: false, image: "/assets/treatments/treatment-massage.jpg", videoUrl: "https://www.youtube.com/watch?v=7WpYvEBeRSc", duration: "30 min", shortDescription: "Eye bath with medicated ghee.", description: "Eye bath to improve vision and reduce strain.", benefits: ["Vision clarity", "Cooling"], process: [] },

  // 5. WEIGHT LOSS & BODY DETOX
  {
    treatmentId: "cat-4",
    title: "Weight Loss & Body Detox",
    category: "WEIGHT LOSS & BODY DETOX",
    isMainCategory: true,
    image: "/assets/treatments/treatment-detox.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Z73qpr-LikQ",
    duration: "Variable",
    shortDescription: "Weight management, inch loss, and body shaping.",
    description: "These treatments help in weight management, inch loss, and body shaping. They remove toxins, improve digestion, and enhance metabolism for sustainable results.",
    benefits: ["Sustainable loss", "Digestive reset"],
    process: []
  },
  { treatmentId: "fat-reduction", title: "Fat Reduction Therapies", category: "WEIGHT LOSS & BODY DETOX", isMainCategory: false, image: "/assets/treatments/treatment-detox.jpg", videoUrl: "https://www.youtube.com/watch?v=fp9JxUHXi8Y", duration: "60 min", shortDescription: "Targeted fat reduction procedures.", description: "Combination of methods to target fat.", benefits: ["Inch loss"], process: [] },
  { treatmentId: "body-detox", title: "Body Detox Programs", category: "WEIGHT LOSS & BODY DETOX", isMainCategory: false, image: "/assets/treatments/treatment-detox.jpg", videoUrl: "https://www.youtube.com/watch?v=QBz-luVlyYg", duration: "Ongoing", shortDescription: "Comprehensive detox programs.", description: "Programs to eliminate metabolic waste.", benefits: ["Systemic energy"], process: [] },
  { treatmentId: "metabolism-boost", title: "Metabolism Boost", category: "WEIGHT LOSS & BODY DETOX", isMainCategory: false, image: "/assets/treatments/treatment-detox.jpg", videoUrl: "https://www.youtube.com/watch?v=vV77S3G_5iQ", duration: "30 min", shortDescription: "Correcting Agni for energy conversion.", description: "Aiming to boost metabolism naturally.", benefits: ["Agni reset"], process: [] },

  // 6. WELLNESS, WOMEN & IMMUNITY CARE
  {
    treatmentId: "cat-5",
    title: "Wellness, Women & Immunity",
    category: "WELLNESS, WOMEN & IMMUNITY CARE",
    isMainCategory: true,
    image: "/assets/treatments/treatment-yoga.jpg",
    videoUrl: "https://www.youtube.com/watch?v=xqqQ8lxTg8M",
    duration: "Variable",
    shortDescription: "Holistic health, hormonal balance, and fertility support.",
    description: "This category focuses on holistic health, hormonal balance, fertility support, child immunity, and mental wellness. It promotes long-term health, disease prevention, and overall well-being.",
    benefits: ["Hormonal balance", "Immunity"],
    process: []
  },
  { treatmentId: "pcod", title: "PCOD / PCOS Treatment", category: "WELLNESS, WOMEN & IMMUNITY CARE", isMainCategory: false, image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80", videoUrl: "https://www.youtube.com/watch?v=mHn1mB6t9nI", duration: "Ongoing", shortDescription: "Hormonal regulation for women.", description: "Herbal and Panchakarma approach for PCOD.", benefits: ["Cycle regulation"], process: [] },
  { treatmentId: "infertility", title: "Infertility Treatment", category: "WELLNESS, WOMEN & IMMUNITY CARE", isMainCategory: false, image: "/assets/treatments/treatment-yoga.jpg", videoUrl: "https://www.youtube.com/watch?v=F_fO_QhS7_U", duration: "Ongoing", shortDescription: "Natural fertility support protocols.", description: "Ayurvedic protocols to improve reproductive health.", benefits: ["Reproductive health"], process: [] },
  { treatmentId: "garbhasanskar", title: "Garbhasanskar", category: "WELLNESS, WOMEN & IMMUNITY CARE", isMainCategory: false, image: "/assets/treatments/treatment-yoga.jpg", videoUrl: "https://www.youtube.com/watch?v=fp9JxUHXi8Y", duration: "Ongoing", shortDescription: "Ancient pregnancy care wisdom.", description: "Care for a healthy pregnancy and baby.", benefits: ["Healthy pregnancy"], process: [] },
  { treatmentId: "suvarnaprashan", title: "Suvarnaprashan", category: "WELLNESS, WOMEN & IMMUNITY CARE", isMainCategory: false, image: "/assets/treatments/treatment-yoga.jpg", videoUrl: "https://www.youtube.com/watch?v=QBz-luVlyYg", duration: "10 min", shortDescription: "Immune-boosting child care.", description: "Traditional immunity drops for children.", benefits: ["Memory boost", "Immunity"], process: [] },
  { treatmentId: "stress-mgmt", title: "Stress Management", category: "WELLNESS, WOMEN & IMMUNITY CARE", isMainCategory: false, image: "/assets/treatments/treatment-yoga.jpg", videoUrl: "https://www.youtube.com/watch?v=vV77S3G_5iQ", duration: "60 min", shortDescription: "Lowering cortisol and emotional health.", description: "Herbs and therapies for emotional health.", benefits: ["Sleep improvement"], process: [] },
  { treatmentId: "rejuvenation", title: "Rejuvenation", category: "WELLNESS, WOMEN & IMMUNITY CARE", isMainCategory: false, image: "/assets/treatments/treatment-yoga.jpg", videoUrl: "https://www.youtube.com/watch?v=xqqQ8lxTg8M", duration: "45 min", shortDescription: "Anti-aging and vital energy maintenance.", description: "Rasayana treatments for energy.", benefits: ["Anti-aging"], process: [] },
];
