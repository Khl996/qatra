require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDatabase, sequelize } = require('./config/database'); // تأكد من استدعاء sequelize أيضًا
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reportRoutes = require('./routes/reportRoutes');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Database connection and synchronization
const initializeDatabase = async () => {
    try {
        await connectToDatabase(); // تأكد من الاتصال بقاعدة البيانات
        console.log('Synchronizing models...');
        await sequelize.sync({ force: true }); // إعادة إنشاء الجداول
        console.log('✅ All models were synchronized successfully.');
    } catch (error) {
        console.error('❌ Error synchronizing models:', error);
    }
};

initializeDatabase();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/admins', adminRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to Qatra Backend API');
});

// إضافة المسار الخاص بالتقارير
app.use('/api/reports', reportRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
