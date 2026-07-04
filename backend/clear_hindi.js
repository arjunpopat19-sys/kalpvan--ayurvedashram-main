const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Treatment = require('./models/Treatment');

dotenv.config();

const clearHindiData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');

    const treatments = await Treatment.find({});
    console.log(`Found ${treatments.length} treatments.`);

    for (let t of treatments) {
      console.log(`Clearing Hindi data for: ${t.title}`);
      
      t.titleHi = "";
      t.shortDescriptionHi = "";
      t.descriptionHi = "";
      t.benefitsHi = [];
      t.whoCanBenefitHi = [];
      t.whyChooseUsHi = [];
      t.processHi = [];

      await t.save();
    }

    console.log('Successfully cleared dummy Hindi data!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

clearHindiData();
