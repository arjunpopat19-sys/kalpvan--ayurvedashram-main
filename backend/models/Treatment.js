const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
    name: { type: String, required: false },
    description: { type: String, required: true },
    image: { type: String, required: false }
});

const treatmentSchema = new mongoose.Schema({
    treatmentId: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    benefits: [{ type: String }],
    process: [stepSchema],
    duration: { type: String },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    videoUrl: { type: String },
    category: { type: String },
    isMainCategory: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Treatment', treatmentSchema);
