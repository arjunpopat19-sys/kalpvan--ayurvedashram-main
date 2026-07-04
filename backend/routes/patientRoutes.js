const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create patient
router.post('/', async (req, res) => {
    const patient = new Patient(req.body);
    try {
        const newPatient = await patient.save();
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update patient
router.put('/:id', async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete patient
router.delete('/:id', async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
