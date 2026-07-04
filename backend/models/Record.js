const mongoose = require('mongoose');

const medicineEntrySchema = new mongoose.Schema({
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
    medicineName: { type: String, required: true },
    days: { type: String, default: '' },
    quantity: { type: Number, default: 1 }
});

const recordSchema = new mongoose.Schema({
    date: { type: Date, required: true, default: Date.now },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    patientName: { type: String }, // cached for easy querying
    
    weight: { type: String, default: '' },
    disease: { type: String, default: '' },
    
    treatmentSuggested: { type: String, default: '' },
    treatmentStarted: { type: String, default: '' },
    treatmentCharge: { type: String, default: '' },
    treatmentPaymentReceived: { type: String, default: '' },
    treatmentPaymentMode: { type: String, enum: ['CASH', 'GPAY', 'CASH-A', 'PENDING', 'FREE', ''], default: '' },
    
    medicines: [medicineEntrySchema],
    medicineDays: { type: String, default: '' },
    medicineCharge: { type: String, default: '' },
    medicinePaymentReceived: { type: String, default: '' },
    medicinePaymentMode: { type: String, enum: ['CASH', 'GPAY', 'CASH-A', 'PENDING', 'FREE', ''], default: '' },
    
    remark: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);
