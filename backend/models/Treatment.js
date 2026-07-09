const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
    name: { type: String, required: false },
    description: { type: String, required: false },
    image: { type: String, required: false }
});

const treatmentSchema = new mongoose.Schema({
    treatmentId: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    benefits: [{ type: String }],
    process: [stepSchema],
    duration: { type: String, default: "" },
    image: { type: String, default: "" },
    gallery: [{ type: String }],
    videoUrl: { type: String },
    category: { type: String, required: true },
    isMainCategory: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    whoCanBenefit: [{ type: String }],
    whyChooseUs: [{ type: String }],
    sequence: { type: Number, default: 0 },
    
    // Hindi Localization Fields (Optional)
    titleHi: { type: String, default: "" },
    shortDescriptionHi: { type: String, default: "" },
    descriptionHi: { type: String, default: "" },
    benefitsHi: [{ type: String }],
    processHi: [stepSchema],
    whoCanBenefitHi: [{ type: String }],
    whyChooseUsHi: [{ type: String }]
}, { timestamps: true });

// Index for fast category lookups
treatmentSchema.index({ category: 1, isMainCategory: 1 });

module.exports = mongoose.model('Treatment', treatmentSchema);
