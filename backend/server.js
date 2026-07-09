const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/treatments', require('./routes/treatmentRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/medicines', require('./routes/medicineRoutes'));
app.use('/api/records', require('./routes/recordRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));

// Serve uploads statically
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Default route
app.get('/', (req, res) => {
    res.json({ message: 'Kalpvan Healing Hub Backend API is running!' });
});

const PORT = process.env.PORT || 5000;

const ensureDefaultAdmin = async () => {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@kalpvan.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminName = process.env.ADMIN_NAME || 'Admin';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
        console.log('ℹ️ Default admin already present');
        return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
    });
    console.log('✅ Default admin user created');
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kalpvan')
    .then(async () => {
        console.log('✅ Connected to MongoDB');
        try {
            await ensureDefaultAdmin();
        } catch (seedError) {
            console.error('⚠️ Unable to seed default admin:', seedError.message);
        }
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB Connection Error:', error.message);
    });