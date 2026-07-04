const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    pricePerUnit: { type: Number, default: 0 },
    stockQuantity: { type: Number, default: 0 },
    category: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
