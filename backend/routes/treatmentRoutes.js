const express = require('express');
const router = express.Router();
const {
    getTreatments,
    getTreatmentById,
    createTreatment,
    updateTreatment,
    deleteTreatment
} = require('../controllers/treatmentController');

router.route('/')
    .get(getTreatments)
    .post(createTreatment);

router.route('/by-treatment-id/:id')
    .get(getTreatmentById);

router.route('/:id')
    .put(updateTreatment)
    .delete(deleteTreatment);

module.exports = router;
