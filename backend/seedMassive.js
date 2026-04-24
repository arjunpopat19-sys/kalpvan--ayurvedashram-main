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
  { category: "Panchkarma Treatments", title: "Snehan (Oil Therapy)", id: "snehan" },
  { category: "Panchkarma Treatments", title: "Swedan (Steam Therapy)", id: "swedan" },
  { category: "Panchkarma Treatments", title: "Vaman (Therapeutic Vomiting)", id: "vaman" },
  { category: "Panchkarma Treatments", title: "Virechan (Purgation Therapy)", id: "virechan" },
  { category: "Panchkarma Treatments", title: "Basti (Medicated Enema)", id: "basti" },
  { category: "Panchkarma Treatments", title: "Nasya (Nasal Therapy)", id: "nasya" },

  // 2. Specialized Panchkarma Procedures
  { category: "Specialized Panchkarma", title: "Shirodhara", id: "shirodhara" },
  { category: "Specialized Panchkarma", title: "Abhyanga (Body Massage)", id: "abhyanga" },
  { category: "Specialized Panchkarma", title: "Udvartan (Powder Massage)", id: "udvartan" },
  { category: "Specialized Panchkarma", title: "Pinda Sweda", id: "pinda-sweda" },
  { category: "Specialized Panchkarma", title: "Patra Pottali Sweda", id: "patra-pottali-sweda" },
  { category: "Specialized Panchkarma", title: "Kati Basti", id: "kati-basti" },
  { category: "Specialized Panchkarma", title: "Janu Basti", id: "janu-basti" },
  { category: "Specialized Panchkarma", title: "Greeva Basti", id: "greeva-basti" },
  { category: "Specialized Panchkarma", title: "Hridaya Basti", id: "hridaya-basti" },
  { category: "Specialized Panchkarma", title: "Netra Tarpan", id: "netra-tarpan" },
  { category: "Specialized Panchkarma", title: "Karnapooran", id: "karnapooran" },

  // 3. Skin & Hair Treatments
  { category: "Skin & Hair", title: "PRP Treatment", id: "prp" },
  { category: "Skin & Hair", title: "Ozone Therapy", id: "ozone-hair" },
  { category: "Skin & Hair", title: "LLLT (Laser Therapy)", id: "lllt" },
  { category: "Skin & Hair", title: "Microdermabrasion", id: "microdermabrasion" },
  { category: "Skin & Hair", title: "Hair Growth / Hair Fall Treatment", id: "hair-growth" },

  // 4. Cosmetology Treatments
  { category: "Cosmetology", title: "Medi-facial Treatment", id: "medi-facial" },
  { category: "Cosmetology", title: "Chemical Peeling", id: "chemical-peel" },
  { category: "Cosmetology", title: "Ozone Facial", id: "ozone-facial" },
  { category: "Cosmetology", title: "Anti-aging Treatment", id: "anti-aging" },
  { category: "Cosmetology", title: "Jet Peel", id: "jet-peel" },
  { category: "Cosmetology", title: "Light Therapy", id: "light-therapy" },

  // 5. Other Ayurvedic Treatments
  { category: "Other Ayurvedic", title: "Suvarnaprashan", id: "suvarnaprashan" },
  { category: "Other Ayurvedic", title: "Weight Loss Therapy", id: "weight-loss" },
  { category: "Other Ayurvedic", title: "Infertility Treatment", id: "infertility" },
  { category: "Other Ayurvedic", title: "PCOD / PCOS Treatment", id: "pcod" },
  { category: "Other Ayurvedic", title: "Wellness & Rejuvenation", id: "wellness-rejuvenation" },

  // 6. Advanced Ayurvedic Procedures
  { category: "Advanced Ayurvedic", title: "Agnikarma (Thermal cauterization)", id: "agnikarma" },
  { category: "Advanced Ayurvedic", title: "Jaloka (Leech Therapy)", id: "jaloka" },
  { category: "Advanced Ayurvedic", title: "Viddhakarma (Needle Therapy)", id: "viddhakarma" },
  { category: "Advanced Ayurvedic", title: "Pottali Massage", id: "pottali-massage" }
];

const treatmentsToSeed = therapiesData.map((t, idx) => ({
    treatmentId: t.id,
    title: t.title,
    category: t.category,
    image: getImage(idx),
    videoUrl: "",
    duration: "Depends on consultation",
    shortDescription: `Experience the holistic benefits of ${t.title}. A carefully curated natural healing process.`,
    description: `${t.title} is a renowned Ayurvedic procedure designed to restore balance, detoxify, and rejuvenate your body and mind naturally. Our expert practitioners ensure a deeply healing experience tailored to your constitution.`,
    benefits: ["Natural Healing", "Restores Balance", "Eliminates Toxins", "Improves Vitality"],
    gallery: [getImage(idx + 1), getImage(idx + 2)],
    process: [
        { name: "Consultation", description: "Assessment of your body condition and doshas.", image: getImage(idx) },
        { name: "Preparation", description: "Preparing the body for the therapy using traditional methods.", image: getImage(idx+1) },
        { name: "Main Therapy", description: `Administration of ${t.title} by our experts.`, image: getImage(idx+2) },
        { name: "Post-Therapy Care", description: "Rest and specialized dietary advice to lock in the benefits." }
    ]
}));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kalpvan')
    .then(async () => {
        console.log('✅ Connected to MongoDB for massive seeding');
        try {
            await Treatment.deleteMany();
            await Treatment.insertMany(treatmentsToSeed);
            console.log(`✅ Successfully seeded ${treatmentsToSeed.length} therapies into the database!`);
            process.exit(0);
        } catch (error) {
            console.error('⚠️ Unable to seed massive therapies:', error.message);
            process.exit(1);
        }
    })
    .catch((error) => {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    });
