const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
        body: req.body,
        query: req.query,
        params: req.params
    });
    next();
});

// استيراد العلاقات
require('./models/relationships');

// Routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes); // تغيير المسار للتوافق مع الواجهة الأمامية

// Error handling
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ 
        message: 'خطأ في الخادم',
        error: err.message 
    });
});

module.exports = app;