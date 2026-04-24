const express = require('express');
const router = express.Router();
const { getReviews, createReview, deleteReview } = require('../controllers/reviewController');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

router.get('/', getReviews);
router.post('/', protect, requireAdmin, createReview);
router.delete('/:id', protect, requireAdmin, deleteReview);

module.exports = router;
