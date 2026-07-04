const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Treatment = require('./models/Treatment');

// Load env vars
dotenv.config();

const translateToDummyHindi = (text) => {
  if (!text) return "";
  return `(हिंदी) ${text}`;
};

const seedHindiData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');

    const treatments = await Treatment.find({});
    console.log(`Found ${treatments.length} treatments.`);

    for (let t of treatments) {
      console.log(`Updating ${t.title}...`);
      
      t.titleHi = translateToDummyHindi(t.title);
      t.shortDescriptionHi = translateToDummyHindi(t.shortDescription);
      t.descriptionHi = translateToDummyHindi(t.description);
      
      if (t.benefits && t.benefits.length > 0) {
        t.benefitsHi = t.benefits.map(translateToDummyHindi);
      }
      
      if (t.whoCanBenefit && t.whoCanBenefit.length > 0) {
        t.whoCanBenefitHi = t.whoCanBenefit.map(translateToDummyHindi);
      }
      
      if (t.whyChooseUs && t.whyChooseUs.length > 0) {
        t.whyChooseUsHi = t.whyChooseUs.map(translateToDummyHindi);
      }

      if (t.process && t.process.length > 0) {
        t.processHi = t.process.map(step => ({
          name: translateToDummyHindi(step.name),
          description: translateToDummyHindi(step.description),
          image: step.image
        }));
      }

      await t.save();
    }

    console.log('Successfully seeded dummy Hindi data!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedHindiData();
