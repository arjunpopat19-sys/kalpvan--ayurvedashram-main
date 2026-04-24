const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: [true, 'Patient name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        default: '',
        validate: {
            validator: (value) => !value || /.+@.+\..+/.test(value),
            message: 'Please provide a valid email address'
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^[0-9+\-\s]{7,15}$/, 'Please provide a valid phone number']
    },
    treatment: {
        type: String,
        required: [true, 'Treatment is required'],
        trim: true
    },
    date: {
        type: String,
        required: [true, 'Preferred date is required']
    },
    time: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        trim: true,
        maxlength: [500, 'Message cannot exceed 500 characters']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

appointmentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
