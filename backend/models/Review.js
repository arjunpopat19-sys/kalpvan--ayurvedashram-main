const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: [true, 'Patient name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters']
    },
    treatment: {
        type: String,
        required: [true, 'Treatment is required'],
        trim: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5']
    },
    text: {
        type: String,
        required: [true, 'Review text is required'],
        trim: true,
        minlength: [10, 'Review must be at least 10 characters'],
        maxlength: [600, 'Review cannot exceed 600 characters']
    }
}, { timestamps: true });

reviewSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

module.exports = mongoose.model('Review', reviewSchema);
