const express = require('express');
const router = express.Router();
const {
    getTreatments,
    getMainCategories,
    getSubTreatmentsByCategory,
    getTreatmentById,
    createTreatment,
    updateTreatment,
    deleteTreatment
} = require('../controllers/treatmentController');

// GET all treatments | POST create new
router.route('/')
    .get(getTreatments)
    .post(createTreatment);

// GET only main category treatments (for homepage)
router.get('/main-categories', getMainCategories);

// GET sub-treatments by category name
router.get('/category/:category', getSubTreatmentsByCategory);

// GET single treatment by treatmentId (custom string ID)
router.get('/by-treatment-id/:id', getTreatmentById);

// PUT update | DELETE remove by MongoDB _id
router.route('/:id')
    .put(updateTreatment)
    .delete(deleteTreatment);

module.exports = router;
