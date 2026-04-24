const Appointment = require('../models/Appointment');

const normalizeText = (value = '') => value.trim();

const validatePhone = (phone) => /^[0-9+\-\s]{7,15}$/.test(phone);

// @route   POST /api/appointments
// @desc    Create a new appointment request
const createAppointment = async (req, res) => {
    try {
        const { patientName, phone, email = '', date, time = '', message = '', treatment } = req.body;

        const missingFields = [];
        if (!patientName) missingFields.push('patientName');
        if (!phone) missingFields.push('phone');
        if (!date) missingFields.push('date');
        if (!treatment) missingFields.push('treatment');

        if (missingFields.length) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        if (!validatePhone(phone)) {
            return res.status(400).json({ message: 'Please provide a valid phone number' });
        }

        const appointment = await Appointment.create({
            patientName: normalizeText(patientName),
            phone: normalizeText(phone),
            email: normalizeText(email),
            date,
            time,
            message: normalizeText(message),
            treatment: normalizeText(treatment)
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   GET /api/appointments
// @desc    Get all appointments (admin)
const getAppointments = async (_req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   PATCH /api/appointments/:id/status
// @desc    Update appointment status
const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatuses = ['pending', 'approved', 'rejected'];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    updateAppointmentStatus
};
