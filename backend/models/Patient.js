const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    address: { type: String },
    medicalHistory: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
