const Review = require('../models/Review');

// @route   GET /api/reviews
// @desc    List all reviews (public)
const getReviews = async (_req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   POST /api/reviews
// @desc    Create a new review (admin)
const createReview = async (req, res) => {
    try {
        const { patientName, treatment, rating, text } = req.body;

        if (!patientName || !treatment || rating === undefined || rating === null || !text) {
            return res.status(400).json({ message: 'patientName, treatment, rating and text are required' });
        }

        const numericRating = Number(rating);
        if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const review = await Review.create({
            patientName: patientName.trim(),
            treatment: treatment.trim(),
            rating: numericRating,
            text: text.trim()
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   DELETE /api/reviews/:id
// @desc    Delete a review (admin)
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getReviews,
    createReview,
    deleteReview
};
