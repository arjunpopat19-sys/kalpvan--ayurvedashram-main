const mongoose = require('mongoose');
require('dotenv').config();
const Treatment = require('./models/Treatment');

const fallbackImages = [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=400&q=80"
];

const getImage = (idx) => fallbackImages[idx % fallbackImages.length];

const therapiesData = [
  // 1. Panchkarma Treatments
  { 
    category: "Panchkarma Treatments", title: "Snehan (Oil Therapy)", id: "snehan", 
    benefits: ["Nourishes Dhatus (Tissues)", "Removes Vata aggravation", "Improves skin luster", "Prepares body for deep detox"],
    desc: "A preparatory therapy prior to core Panchakarma using medicated oils administered internally or externally to lubricate tissues.",
    full: "Snehan is an essential pre-purification therapy in Ayurveda. It utilizes specialized medicated oils administered either internally (Snehapana) or externally (Abhyanga) to deeply lubricate bodily channels. This process softens and liquifies deep-seated toxins (Ama) from bodily tissues, preparing them to be easily expelled during the main Panchakarma detoxification.",
    process: [
      { name: "Consultation", description: "Assessment of body constitution to select the right medicated oil (Taila/Ghrita)." },
      { name: "Internal Oleation", description: "Graduated doses of pure medicated ghee or oil consumed early morning." },
      { name: "External Oleation", description: "Full body synchronized massage (Abhyanga) utilizing warm herbal oils." }
    ]
  },
  { 
    category: "Panchkarma Treatments", title: "Swedan (Steam Therapy)", id: "swedan",
    benefits: ["Relieves muscle stiffness", "Opens sweat channels", "Melts sub-cutaneous toxins", "Reduces heaviness"],
    desc: "A therapeutic herbal sweat treatment that follows Snehan, used to dilate energetic channels and push toxins to the digestive tract.",
    full: "Swedana involves introducing heat to the body using steam generated from specific herbal decoctions. Coming right after Snehan, this therapy dilates the micro-channels (Srotas) of the body. The heat acts to melt the oleated toxins, detaching them from the peripheral tissues and forcing them to move towards the gastrointestinal tract for elimination.",
    process: [
      { name: "Herbal Decoction Prep", description: "Boiling specific roots and leaves customized to the patient's dosha." },
      { name: "Steam Box Therapy", description: "Patient rests in a wooden steam chamber while maintaining a cool head exterior." },
      { name: "Assessment", description: "Pulse monitoring to evaluate successful toxin dislodgment." }
    ]
  },
  { 
    category: "Panchkarma Treatments", title: "Vaman (Therapeutic Vomiting)", id: "vaman",
    benefits: ["Expels Kapha toxins", "Clears respiratory system", "Treats deep skin conditions", "Improves digestion/Agni"],
    desc: "A powerful Kapha-reducing therapy involving medically induced vomiting to clear toxins from the respiratory and upper gastrointestinal tracts.",
    full: "Vaman is the primary Panchakarma procedure to eliminate accumulated Kapha dosha. After preparatory oleation and fomentation, specific emetic herbs like Madanaphala are given to painlessly induce vomiting. It powerfully flushes out mucus, toxins, and stagnation from the stomach, lungs, and chest, providing unparalleled relief in asthma, chronic cough, psoriasis, and sluggish metabolism.",
    process: [
      { name: "Kapha Excitation", description: "A Kapha aggravating diet is prescribed a day prior to consolidate toxins." },
      { name: "Herb Administration", description: "Consumption of medicated decoctions early morning on an empty stomach." },
      { name: "Emesis Phase", description: "Carefully monitored emesis (vomiting) supervised until Pitta (bile) is observed, signaling successful clearance." },
      { name: "Samsarjana Krama", description: "A strict step-by-step diet protocol starting with liquid rice gruel." }
    ]
  },
  { 
    category: "Panchkarma Treatments", title: "Virechan (Purgation Therapy)", id: "virechan",
    benefits: ["Flushes Pitta from liver/gallbladder", "Purifies blood", "Clears acne and rashes", "Relieves hyperacidity"],
    desc: "A controlled purgation treatment designed to eliminate excess Pitta dosha and toxins from the liver and gallbladder.",
    full: "Virechana is a medicated purgation therapy specifically targeting the lower gastrointestinal tract, liver, and gallbladder to remove aggravated Pitta. Utilizing natural laxative herbs (like Trivrit or Senna), it securely flushes heat, acidity, and toxic bile out via the bowels. This clears inflammatory conditions, profound skin diseases, hormonal imbalances, and chronic acidity.",
    process: [
      { name: "Preparation", description: "Several days of internal oleation followed by a Pitta-soothing diet." },
      { name: "Purgative Draught", description: "Administration of specific herbal purgatives in the morning." },
      { name: "Clearance Phase", description: "Mild, painless bowel movements to flush toxins, closely tracked by the physician." },
      { name: "Restoration Diet", description: "Rebuilding gut flora and digestive fire using traditional broths." }
    ]
  },
  { 
    category: "Panchkarma Treatments", title: "Basti (Medicated Enema)", id: "basti",
    benefits: ["Balances Vata dosha", "Lubricates colon", "Cures chronic constipation", "Strengthens immunity (Ojas)"],
    desc: "Considered the mother of all treatments, Basti uses herbal oils and decoctions administered rectally to pacify Vata and nourish tissues.",
    full: "Basti is heralded as 'Ardha Chikitsa' (half of all treatments) due to its profound healing capacity. It involves the introduction of herbal decoctions (Kashaya Basti) or warm oils (Anuvasana Basti) into the rectum. Since the colon is the primary seat of Vata dosha, this therapy bypasses the upper digestive tract to directly heal neurological conditions, joint pain, osteoporosis, and severe digestive disorders.",
    process: [
      { name: "Local Abhyanga", description: "Massage of the abdomen and lower back prior to the procedure." },
      { name: "Enema Administration", description: "Gentle rectal introduction of warm herbal formulations." },
      { name: "Retention", description: "Resting while the colon absorbs the micro-nutrients and active alkaloids." },
      { name: "Evacuation", description: "Expulsion of the injected liquid carrying the deep-seated toxins." }
    ]
  },
  { 
    category: "Panchkarma Treatments", title: "Nasya (Nasal Therapy)", id: "nasya",
    benefits: ["Clears sinuses", "Treats chronic migraines", "Improves memory & vision", "Prevents hair fall"],
    desc: "Administration of medicated oils or powders through the nasal passages to cleanse and nourish the head, neck, and brain.",
    full: "In Ayurveda, the nose is considered the doorway to the brain. Nasya involves instilling specialized herbal oils, juices, or powders into the nostrils. This therapy aggressively removes accumulated Kapha toxins from the head and neck region. It is highly effective for chronic sinusitis, migraines, hormonal imbalances, premature graying of hair, and neuro-muscular conditions of the face.",
    process: [
      { name: "Facial Massage", description: "Vigorous facial and head massage to loosen localized toxins." },
      { name: "Fomentation", description: "Applying mild steam to the face and neck using a herbal towel." },
      { name: "Instillation", description: "Dropping precise amounts of Anu Taila or Shadbindu oil into each nostril." },
      { name: "Expulsion", description: "Patient gently spits out the mucus that drains into the throat." }
    ]
  },

  // 2. Specialized Panchkarma Procedures
  { 
    category: "Specialized Panchkarma", title: "Shirodhara", id: "shirodhara",
    benefits: ["Cures insomnia", "Relieves stress & anxiety", "Treats depression", "Lowers hypertension"],
    desc: "A deeply relaxing therapy where a continuous, rhythmic stream of warm herbal oil is poured over the forehead.",
    full: "Shirodhara is a transcendentally relaxing therapy that involves pouring a steady, rhythmic stream of warm medicated oil, herbal decoctions, or buttermilk over the 'Ajna Chakra' (third eye center) on the forehead. This powerfully stimulates the pineal gland, calming the central nervous system. It represents the ultimate Ayurvedic remedy for psychological stress, insomnia, PTSD, and hypertensive disorders.",
    process: [
      { name: "Head Massage", description: "Initial light massage of the scalp to induce relaxation." },
      { name: "Therapy Setup", description: "Resting supine while a traditional copper vessel is aligned over the forehead." },
      { name: "Continuous Pour", description: "A steady oscillation of warm oil across the forehead for 45-60 minutes." }
    ]
  },
  { 
    category: "Specialized Panchkarma", title: "Abhyanga (Body Massage)", id: "abhyanga",
    benefits: ["Improves circulation", "Enhances sleep quality", "Soothes nervous system", "Tones somatic muscles"],
    desc: "A synchronized full-body massage using warm herbal oils selected specifically for your dominant dosha.",
    full: "Classical Ayurvedic Abhyanga is unlike standard massages; it focuses on directing toxins towards the lymphatic system for elimination while deeply nourishing the skin and muscles. The warm oils are deeply rubbed into the physical body in specific energetic strokes corresponding to blood flow. It dramatically delays aging, resolves fatigue, and pacifies chaotic Vata dosha.",
    process: [
      { name: "Oil Selection", description: "Determination of the correct base oil (Sesame/Coconut/Mustard) based on conditions." },
      { name: "Synchronized Strokes", description: "Full-body sequential strokes following specific Marma (vital) points." },
      { name: "Sweat Induction", description: "Followed by a mild steam session to ensure oil penetration." }
    ]
  },
  { 
    category: "Specialized Panchkarma", title: "Kati Basti", id: "kati-basti",
    benefits: ["Heals slipped discs", "Treats chronic lower back pain", "Lubricates spinal joints", "Eases sciatica"],
    desc: "A localized treatment where warm medicated oil is pooled over the lower back using a dough ring.",
    full: "Kati Basti specifically targets chronic ailments of the lumbar spine. A boundary made of black gram dough is constructed over the lumbosacral area. Warm, deeply penetrating herbal oils like Mahanarayan Taila are poured into this reservoir and maintained at a constant temperature. This forces the healing herbs directly into the spinal discs and nerve roots, drastically healing sciatica and disc degeneration.",
    process: [
      { name: "Dough Prep", description: "Creating a leak-proof circular boundary using traditional gram dough." },
      { name: "Oil Pooling", description: "Continuous pouring and replacement of hot medicated oils over 30-45 minutes." },
      { name: "Local Massage", description: "Mild, restorative massage of the area after removing the oil." }
    ]
  },
  { 
    category: "Specialized Panchkarma", title: "Udvartan (Powder Massage)", id: "udvartan",
    benefits: ["Reduces cellulite and weight", "Exfoliates skin", "Breaks down subcutaneous fat", "Invigorates circulation"],
    desc: "A vigorous, upward-stroking massage using dry herbal powders to break down fat and tone the body.",
    full: "Udvartana is a unique therapeutic skin exfoliation and lymphatic drainage massage using specific dry herbal powders (like Kola or Kulattha) mixed sometimes with minimal oil. Unlike other massages, the strokes are performed briskly in an upward direction (against the hair follicles) which generates heat and friction. This directly melts subcutaneous fat, significantly reduces cellulite, and is heavily prescribed in obesity and Kapha disorders.",
    process: [
      { name: "Powder Heating", description: "Specific herbal powders are gently roasted/heated to increase efficacy." },
      { name: "Friction Massage", description: "Therapists apply brisk upward strokes to generate therapeutic heat and friction." },
      { name: "Cleansing", description: "A hot water bath to wash off the herbal paste, leaving skin exceptionally smooth." }
    ]
  },

  // 3. Skin & Hair Treatments
  { 
    category: "Skin & Hair", title: "Hair Growth / Trichology Treatment", id: "hair-growth",
    benefits: ["Stops early hair fall", "Reactivates dormant follicles", "Reduces scalp inflammation", "Prevents premature graying"],
    desc: "A comprehensive Ayurvedic approach to naturally arresting hair fall and promoting dense regrowth using targeted scalp therapies and internal medicines.",
    full: "Ayurvedic Trichology focuses on resolving hair issues at their root cause (Asthi Dhatu and Pitta imbalances) rather than just treating the surface. By utilizing specialized treatments such as Shirolepa (herbal head packs), micro-needling with herbal serums, and highly concentrated Brahmi/Bhringraj oil therapies, we reinvigorate blood supply to the follicles and stop chronic shedding naturally.",
    process: [
      { name: "Follicle Analysis", description: "Micro-assessment of the scalp to understand blockages and hair porosity." },
      { name: "Scalp Detox", description: "Application of exfoliating herbal scrubs to remove dead skin and product buildup." },
      { name: "Herbal Infusion", description: "Deep application of specialized botanical pastes (Shirolepa)." },
      { name: "Root Stimulation", description: "Mild therapies to stimulate circulation directly into the hair roots." }
    ]
  },

  // 4. Cosmetology Treatments
  { 
    category: "Cosmetology", title: "Advanced Ayurvedic Medi-facial", id: "medi-facial",
    benefits: ["Removes hyperpigmentation", "Hydrates deeper skin layers", "Cures chronic acne", "Brings immediate glowing radiance"],
    desc: "A deep clinical facial merging modern extraction techniques with pristine Ayurvedic botanical formulations.",
    full: "Our Medi-facial bridges the gap between chemical-heavy dermatologist treatments and basic spa facials. Utilizing steam, ultrasonic extractions, and potent Ayurvedic bio-extracts like Kumkumadi (Saffron) and Manjistha (Rubia cordifolia), this facial penetrates deeply into the dermal layers. It treats heavy pigmentation, severe acne, and photo-aging with zero chemical side-effects.",
    process: [
      { name: "Herbal Cleansing", description: "Removing surface impurities with unadulterated milk and rose water formulations." },
      { name: "Steam & Extraction", description: "Opening pores gently and extracting blackheads using clinical tools." },
      { name: "Bio-Serum Application", description: "Infusing specific Ayurvedic serums using dermal massage." },
      { name: "Rejuvenating Mask", description: "Application of a custom-mixed mud and herb pack to lock in moisture." }
    ]
  },

  // 5. Other Ayurvedic Treatments
  { 
    category: "Other Ayurvedic", title: "Infertility Treatment (Vajikarana)", id: "infertility",
    benefits: ["Improves egg/sperm quality", "Regulates ovulation", "Thickens uterine lining", "Clears fallopian tubal blocks"],
    desc: "A deeply holistic protocol ensuring complete cellular level nourishment of reproductive tissues to aid natural conception.",
    full: "Ayurvedic Vajikarana and prenatal protocols focus on producing the highest quality Shukra & Artava (reproductive tissues). Treatment starts with detoxifying the body of toxins that disrupt hormonal signals, followed by specific protocols like Uttara Basti (intra-uterine or intra-urethral medication). It provides incredibly high success rates in cases of unexplained infertility, low AMH, and sperm morphology issues without invasive IVF procedures.",
    process: [
      { name: "Detoxification", description: "Initial Panchakarma to clear channels and reset hormonal feedback loops." },
      { name: "Pichu / Uttara Basti", description: "Localized therapies to deliver medicine directly to reproductive organs." },
      { name: "Rasayana Administration", description: "Long-term consumption of specialized herbal jams and tonic medicines to build tissue." }
    ]
  },

  // 6. Advanced Ayurvedic Procedures
  { 
    category: "Advanced Ayurvedic", title: "Agnikarma (Thermal Cautery)", id: "agnikarma",
    benefits: ["Instant pain relief", "Heals frozen shoulder", "Cures heel spurs", "Resolves tennis elbow"],
    desc: "An ancient, highly effective micro-cauterization technique specifically used for instant relief in musculoskeletal and nerve pain.",
    full: "Agnikarma is a specialized parasurgical procedure where therapeutic heat is selectively transferred to specific painful points of the body using a specially designed metal instrument (Shalaka) made of gold, copper, or mixed metals. By applying controlled thermal energy over the inflamed tendons, ligaments, or muscles, it immediately breaks the pain-spasm cycle and significantly increases local tissue metabolism to invoke rapid healing. It is magic for cases of heel spur, tennis elbow, and frozen shoulder.",
    process: [
      { name: "Point Identification", description: "Locating the exact maximum tenderness trigger points." },
      { name: "Thermal Application", description: "Applying the heated Shalaka to create micro-dots over the skin." },
      { name: "Cooling Paste", description: "Immediate application of pure aloe vera or honey to soothe the epidermis while internal heat does the healing." }
    ]
  },
  { 
    category: "Advanced Ayurvedic", title: "Jaloka (Leech Therapy)", id: "jaloka",
    benefits: ["Purifies localized blood", "Treats deep varicose veins", "Heals non-healing ulcers", "Superior in gout relief"],
    desc: "A highly specialized blood-purification protocol utilizing medicinal leeches to extract toxic blood and inject powerful bio-chemicals.",
    full: "Jalaukavacharana (Leech therapy) is a unique and painless form of Raktamokshana. Medicinal leeches are applied to diseased bodily areas where deep toxic blood pooling has occurred. As the leech extracts the impure blood, its saliva simultaneously injects over 100 bioactive substances including Hirudin (a powerful anti-coagulant), anti-inflammatory mediators, and anesthetics into the host. This treats severe eczema, varicose ulcers, gout, and thrombotic conditions dramatically.",
    process: [
      { name: "Selection & Prep", description: "Medicinal leeches are taken from sterile environments and purified in turmeric water." },
      { name: "Application", description: "The leech is applied precisely to the affected lesion or vein." },
      { name: "Detachment & Dressing", description: "Once full, the leech naturally detaches. The area is dressed with herbal styptic powders." }
    ]
  }
];

// Group descriptions and benefits for Main Categories
const mainCategoryDetails = {
  "Panchkarma Treatments": {
    desc: "Ayurveda's ultimate purification protocol designed to cleanse deep-seated toxins and restore the exact balance of your doshas.",
    full: "Panchakarma is the core of Ayurvedic detoxification. It involves five primary procedures (Vaman, Virechan, Basti, Nasya, Raktamokshan) tailored to each individual's needs. The process includes preparatory (Purvakarma), main (Pradhankarma), and post-detox (Paschatkarma) stages to ensure total systemic renewal.",
    benefits: ["Eliminates Root Disease", "Reverses Cellular Aging", "Resets Digestion (Agni)", "Balances Hormones", "Mental Clarity", "Boosts Immunity"]
  },
  "Skin & Hair": {
    desc: "Natural rejuvenation combining modern cosmetology with ancient Ayurvedic principles to restore your natural glow and hair health.",
    full: "Our Skin & Hair therapies focus on detoxifying blood, nourishing the Dhatus (tissues), and using potent herbal extracts. We treat conditions like chronic hair fall, acne, and pigmentation by resolving internal imbalances and applying specialized topical protocols.",
    benefits: ["Natural Radiant Glow", "Stops Chronic Hair Fall", "Chemical-Free Rejuvenation", "Treats Acne Root Cause", "Promotes Thick Hair Growth"]
  },
  "Cosmetology": {
    desc: "Advanced aesthetic improvements using pristine Ayurvedic botanical formulations for anti-aging and deep complexion clearing.",
    full: "Experience non-invasive beauty enhancement. Our cosmetology treatments clear deep-seated dermal impurities, hydrate tissue layers, and utilize clinical herbs like Saffron (Kumkumadi) to reverse aging and restore vibrant facial health.",
    benefits: ["Reverses Photo-Aging", "Deep COMPLEXION Clearing", "Hydrates Dermal Layers", "Natural Face Lift effect", "Zero Chemical Side-Effects"]
  },
  "Specialized Panchkarma": {
    desc: "Targeted healing modalities using rhythmic oil pouring and localized therapies to treat focused ailments with deep efficacy.",
    full: "These procedures move beyond general detox to address specific musculoskeletal and neuro-muscular conditions. Using warm herbal oils pooled over vital points (Shirodhara, Kati Basti, Janu Basti), we provide localized relief for chronic pain and tension.",
    benefits: ["Instant Pain Relief", "Neuro-Muscular Healing", "Relieves Joint Stiffness", "Deep Nervous System Calm"]
  },
  "Other Ayurvedic": {
    desc: "Holistic treatments for systemic wellness, including weight management, reproductive health, and rejuvenation.",
    full: "Our 'Other' treatments cover vital life-stage needs—from children's immunity (Suvarnaprashan) to reproductive health and weight loss. These therapies restore balance to specialized bodily systems using tailored herbals.",
    benefits: ["Hormonal Regulation", "Natural Weight Loss", "Children's Immunity Boost", "Reproductive Wellness"]
  },
  "Advanced Ayurvedic": {
    desc: "Intensive clinical procedures like Agnikarma (thermal cautery) and Jaloka (leech therapy) for immediate relief in chronic cases.",
    full: "These advanced parasurgical procedures are deployed for rapid relief in severe or persistent conditions. Agnikarma treats localized pain instantly, while Jaloka provides unique blood purification for vascular and skin disorders.",
    benefits: ["Painless Blood Purification", "Instant Musculoskeletal Relief", "Heals Chronic Ulcers", "Rapid Healing in Severe Pain"]
  }
};

// Combine the explicit ones + generic fallback for remaining
const therapiesNames = [
  // THE MAIN CATEGORY ENTRIES (These show on homepage)
  { category: "Panchkarma Treatments", title: "Panchkarma Treatments", id: "cat-panchkarma", main: true },
  { category: "Specialized Panchkarma", title: "Specialized Panchkarma", id: "cat-specialized", main: true },
  { category: "Skin & Hair", title: "Skin & Hair Treatments", id: "cat-skin-hair", main: true },
  { category: "Cosmetology", title: "Cosmetology", id: "cat-cosmetology", main: true },
  { category: "Other Ayurvedic", title: "Other Ayurvedic Treatments", id: "cat-other", main: true },
  { category: "Advanced Ayurvedic", title: "Advanced Ayurvedic Procedures", id: "cat-advanced", main: true },

  // INDIVIDUAL PROCEDURES
  { category: "Panchkarma Treatments", title: "Snehan (Oil Therapy)", id: "snehan", main: false },
  { category: "Panchkarma Treatments", title: "Swedan (Steam Therapy)", id: "swedan", main: false },
  { category: "Panchkarma Treatments", title: "Vaman (Therapeutic Vomiting)", id: "vaman", main: false },
  { category: "Panchkarma Treatments", title: "Virechan (Purgation Therapy)", id: "virechan", main: false },
  { category: "Panchkarma Treatments", title: "Basti (Medicated Enema)", id: "basti", main: false },
  { category: "Panchkarma Treatments", title: "Nasya (Nasal Therapy)", id: "nasya", main: false },
  { category: "Specialized Panchkarma", title: "Shirodhara", id: "shirodhara", main: false },
  { category: "Specialized Panchkarma", title: "Abhyanga (Body Massage)", id: "abhyanga", main: false },
  { category: "Specialized Panchkarma", title: "Udvartan (Powder Massage)", id: "udvartan", main: false },
  { category: "Specialized Panchkarma", title: "Pinda Sweda", id: "pinda-sweda", main: false },
  { category: "Specialized Panchkarma", title: "Patra Pottali Sweda", id: "patra-pottali-sweda", main: false },
  { category: "Specialized Panchkarma", title: "Kati Basti", id: "kati-basti", main: false },
  { category: "Specialized Panchkarma", title: "Janu Basti", id: "janu-basti", main: false },
  { category: "Specialized Panchkarma", title: "Greeva Basti", id: "greeva-basti", main: false },
  { category: "Specialized Panchkarma", title: "Hridaya Basti", id: "hridaya-basti", main: false },
  { category: "Specialized Panchkarma", title: "Netra Tarpan", id: "netra-tarpan", main: false },
  { category: "Specialized Panchkarma", title: "Karnapooran", id: "karnapooran", main: false },
  { category: "Skin & Hair", title: "PRP Treatment", id: "prp", main: false },
  { category: "Skin & Hair", title: "Ozone Therapy", id: "ozone-hair", main: false },
  { category: "Skin & Hair", title: "LLLT (Laser Therapy)", id: "lllt", main: false },
  { category: "Skin & Hair", title: "Microdermabrasion", id: "microdermabrasion", main: false },
  { category: "Skin & Hair", title: "Hair Growth / Hair Fall Treatment", id: "hair-growth", main: false },
  { category: "Cosmetology", title: "Medi-facial Treatment", id: "medi-facial", main: false },
  { category: "Cosmetology", title: "Chemical Peeling", id: "chemical-peel", main: false },
  { category: "Cosmetology", title: "Ozone Facial", id: "ozone-facial", main: false },
  { category: "Cosmetology", title: "Anti-aging Treatment", id: "anti-aging", main: false },
  { category: "Cosmetology", title: "Jet Peel", id: "jet-peel", main: false },
  { category: "Cosmetology", title: "Light Therapy", id: "light-therapy", main: false },
  { category: "Other Ayurvedic", title: "Suvarnaprashan", id: "suvarnaprashan", main: false },
  { category: "Other Ayurvedic", title: "Weight Loss Therapy", id: "weight-loss", main: false },
  { category: "Other Ayurvedic", title: "Infertility Treatment", id: "infertility", main: false },
  { category: "Other Ayurvedic", title: "PCOD / PCOS Treatment", id: "pcod", main: false },
  { category: "Other Ayurvedic", title: "Wellness & Rejuvenation", id: "wellness-rejuvenation", main: false },
  { category: "Advanced Ayurvedic", title: "Agnikarma (Thermal cauterization)", id: "agnikarma", main: false },
  { category: "Advanced Ayurvedic", title: "Jaloka (Leech Therapy)", id: "jaloka", main: false },
  { category: "Advanced Ayurvedic", title: "Viddhakarma (Needle Therapy)", id: "viddhakarma", main: false },
  { category: "Advanced Ayurvedic", title: "Pottali Massage", id: "pottali-massage", main: false }
];

const generatedTreatments = therapiesNames.map((base, idx) => {
    const custom = therapiesData.find(d => d.id === base.id) || mainCategoryDetails[base.category];
    return {
        treatmentId: base.id,
        title: base.title,
        category: base.category,
        isMainCategory: base.main,
        image: getImage(idx),
        videoUrl: "",
        duration: "Depends on consultation",
        shortDescription: custom ? custom.desc : `Specialized ${base.title} therapy customized for deep healing and addressing chronic disorders from their root.`,
        description: custom ? custom.full : `Using authentic and time-tested texts of Ayurveda, ${base.title} is deployed clinically to bring transformative healing to your body, mind, and energy pathways. The therapies are tailored following strict classical protocols by expert physicians to ensure zero side effects and unparalleled systemic benefits.`,
        benefits: custom ? custom.benefits : ["Restores bodily harmony", "Addresses root cause of disease", "Eliminates stagnant toxins", "Boosts vital cellular energy"],
        gallery: [getImage(idx + 1), getImage(idx + 2)],
        process: (base.main || !custom?.process) ? [
            { name: "Consultation & Pulse Diagnosis", description: "Assessment of your Prakriti (constitution) and Vikriti (imbalances)." },
            { name: "Therapy Preparation", description: "Specialized preparatory protocols before the main healing session begins." },
            { name: "Main Procedure", description: `Clinical administration of ${base.title} by trained therapists under doctor supervision.` },
            { name: "Rehabilitative Advice", description: "Customized post-therapy diet and lifestyle modifications." }
        ] : custom.process
    };
});

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kalpvan')
    .then(async () => {
        console.log('✅ Connected to MongoDB for realistic seeding');
        try {
            await Treatment.deleteMany();
            await Treatment.insertMany(generatedTreatments);
            console.log(`✅ Successfully seeded realistic data for ${generatedTreatments.length} therapies!`);
            process.exit(0);
        } catch (error) {
            console.error('⚠️ Unable to seed realistic therapies:', error.message);
            process.exit(1);
        }
    })
    .catch((error) => {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    });
