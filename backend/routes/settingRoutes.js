const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getSetting, uploadDoctorImage } = require('../controllers/settingController');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, 'doctor-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images only! (jpeg, jpg, png, webp)');
        }
    }
});

router.get('/:key', getSetting);
router.post('/upload-doctor-image', upload.single('image'), uploadDoctorImage);

module.exports = router;
