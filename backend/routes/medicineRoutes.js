const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

// Get all medicines
router.get('/', async (req, res) => {
    try {
        const medicines = await Medicine.find().sort({ name: 1 });
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create medicine
router.post('/', async (req, res) => {
    const medicine = new Medicine(req.body);
    try {
        const newMedicine = await medicine.save();
        res.status(201).json(newMedicine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update medicine
router.put('/:id', async (req, res) => {
    try {
        const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMedicine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete medicine
router.delete('/:id', async (req, res) => {
    try {
        await Medicine.findByIdAndDelete(req.params.id);
        res.json({ message: 'Medicine deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
