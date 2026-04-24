const mongoose = require('mongoose');
require('dotenv').config();
const Treatment = require('./models/Treatment');

const defaultTreatments = [
  {
    treatmentId: "panchakarma",
    title: "Panchakarma Therapy",
    shortDescription: "A five-fold purification therapy to cleanse the body of toxins and restore natural balance.",
    description: "Panchakarma is the cornerstone of Ayurvedic detoxification. This ancient five-step process eliminates deep-rooted toxins from the body, rejuvenates tissues, and restores constitutional balance. Our experienced practitioners customize each treatment to your unique body constitution (Prakriti).",
    benefits: ["Deep detoxification", "Improved digestion", "Enhanced immunity", "Stress relief", "Rejuvenated skin"],
    process: [
      { name: "Step 1", description: "Initial consultation & Prakriti assessment", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80" },
      { name: "Step 2", description: "Preparatory procedures (Purvakarma)", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=400&q=80" },
      { name: "Step 3", description: "Main cleansing therapies" },
      { name: "Step 4", description: "Post-treatment diet & lifestyle guidance" }
    ],
    duration: "7-21 days",
    image: "/src/assets/treatment-panchakarma.jpg",
    videoUrl: "https://www.youtube.com/watch?v=1xRX1MuoImw",
    category: "Detox",
  },
  {
    treatmentId: "abhyanga-massage",
    title: "Abhyanga Massage",
    shortDescription: "Traditional full-body warm oil massage to improve circulation and promote deep relaxation.",
    description: "Abhyanga is a deeply nourishing full-body massage using warm herbal oils selected for your dosha type. This therapy improves blood circulation, calms the nervous system, and promotes lymphatic drainage.",
    benefits: ["Improved circulation", "Deep relaxation", "Pain relief", "Better sleep", "Nourished skin"],
    process: [
      { name: "Step 1", description: "Dosha assessment" },
      { name: "Step 2", description: "Selection of herbal oils" },
      { name: "Step 3", description: "Synchronized warm oil massage", image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=400&q=80" },
      { name: "Step 4", description: "Steam therapy (optional)" }
    ],
    duration: "60-90 minutes",
    image: "/src/assets/treatment-massage.jpg",
    videoUrl: "https://www.youtube.com/watch?v=e_M0JkMkV6U",
    category: "Massage",
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kalpvan')
  .then(async () => {
    console.log('✅ Connected to MongoDB for seeding therapies');
    try {
      await Treatment.deleteMany();
      await Treatment.insertMany(defaultTreatments);
      console.log('✅ Seeded default therapies with sample images and videos');
      process.exit(0);
    } catch (error) {
      console.error('⚠️ Unable to seed therapies:', error.message);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  });
