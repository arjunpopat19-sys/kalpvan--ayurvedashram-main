const express = require('express');
const router = express.Router();
const {
    createAppointment,
    getAppointments,
    updateAppointmentStatus
} = require('../controllers/appointmentController');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

router.post('/', createAppointment);
router.get('/', protect, requireAdmin, getAppointments);
router.patch('/:id/status', protect, requireAdmin, updateAppointmentStatus);

module.exports = router;
