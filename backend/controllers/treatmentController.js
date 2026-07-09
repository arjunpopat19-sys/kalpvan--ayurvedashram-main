const Treatment = require('../models/Treatment');

// Get all treatments
exports.getTreatments = async (req, res) => {
    try {
        const treatments = await Treatment.find().sort({ isMainCategory: -1, category: 1 });
        res.json(treatments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get only main category treatments (for homepage)
exports.getMainCategories = async (req, res) => {
    try {
        const mainCategories = await Treatment.find({ isMainCategory: true }).sort({ category: 1 });
        res.json(mainCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get sub-treatments by category name
exports.getSubTreatmentsByCategory = async (req, res) => {
    try {
        const categoryName = decodeURIComponent(req.params.category);
        const subTreatments = await Treatment.find({
            category: categoryName,
            isMainCategory: false
        });
        res.json(subTreatments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single treatment by treatmentId
exports.getTreatmentById = async (req, res) => {
    try {
        const treatment = await Treatment.findOne({ treatmentId: req.params.id });
        if (!treatment) {
            return res.status(404).json({ message: 'Treatment not found' });
        }
        res.json(treatment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Helper to shift sequences if there's a collision
const shiftSequencesIfNeeded = async (treatment) => {
    if (treatment.sequence && treatment.sequence > 0) {
        // Query to find overlapping items in the same scope
        const query = {
            _id: { $ne: treatment._id },
            isMainCategory: treatment.isMainCategory,
            sequence: { $gte: treatment.sequence }
        };
        
        // If it's a sub-treatment, only shift other sub-treatments in the SAME category
        if (!treatment.isMainCategory) {
            query.category = treatment.category;
        }

        // Check if there is an exact collision at the newly assigned sequence
        const collisionQuery = { ...query, sequence: treatment.sequence };
        const collision = await Treatment.findOne(collisionQuery);

        // If there's a collision, push everything down by 1
        if (collision) {
            await Treatment.updateMany(query, { $inc: { sequence: 1 } });
        }
    }
};

// Create treatment
exports.createTreatment = async (req, res) => {
    try {
        const newTreatment = new Treatment(req.body);
        const savedTreatment = await newTreatment.save();
        await shiftSequencesIfNeeded(savedTreatment);
        res.status(201).json(savedTreatment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update treatment
exports.updateTreatment = async (req, res) => {
    try {
        const updatedTreatment = await Treatment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTreatment) {
            return res.status(404).json({ message: 'Treatment not found' });
        }
        await shiftSequencesIfNeeded(updatedTreatment);
        res.json(updatedTreatment);
    } catch (error) {
        console.error("UPDATE ERROR:", error);
        res.status(400).json({ message: error.message });
    }
};

// Delete treatment
exports.deleteTreatment = async (req, res) => {
    try {
        const treatment = await Treatment.findByIdAndDelete(req.params.id);
        if (!treatment) {
            return res.status(404).json({ message: 'Treatment not found' });
        }
        res.json({ message: 'Treatment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
