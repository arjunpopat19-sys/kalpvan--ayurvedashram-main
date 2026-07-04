const express = require('express');
const router = express.Router();
const Record = require('../models/Record');
const Medicine = require('../models/Medicine');

// Helper: adjust stock for a list of medicine entries
// direction: +1 to add back to stock, -1 to deduct from stock
const adjustStock = async (medicines, direction) => {
    if (!medicines || medicines.length === 0) return;
    for (const entry of medicines) {
        if (entry.medicine) {
            const qty = Number(entry.quantity) || 1;
            await Medicine.findByIdAndUpdate(entry.medicine, {
                $inc: { stockQuantity: direction * qty }
            });
        }
    }
};

// Get all records
router.get('/', async (req, res) => {
    try {
        const records = await Record.find()
            .populate('patient')
            .populate('medicines.medicine')
            .sort({ date: -1 });
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create record — deduct stock for each medicine dispensed
router.post('/', async (req, res) => {
    const record = new Record(req.body);
    try {
        const newRecord = await record.save();
        // Deduct from stock
        await adjustStock(newRecord.medicines, -1);
        const populatedRecord = await Record.findById(newRecord._id)
            .populate('patient')
            .populate('medicines.medicine');
        res.status(201).json(populatedRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update record — restore old stock, deduct new stock
router.put('/:id', async (req, res) => {
    try {
        const oldRecord = await Record.findById(req.params.id);
        if (!oldRecord) return res.status(404).json({ message: 'Record not found' });

        // Restore stock from old medicines
        await adjustStock(oldRecord.medicines, +1);

        // Save updated record
        const updatedRecord = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Deduct stock for new medicines
        await adjustStock(updatedRecord.medicines, -1);

        const populatedRecord = await Record.findById(updatedRecord._id)
            .populate('patient')
            .populate('medicines.medicine');
        res.json(populatedRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete record — restore stock when record is deleted
router.delete('/:id', async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });

        // Restore stock
        await adjustStock(record.medicines, +1);

        await Record.findByIdAndDelete(req.params.id);
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
