const express = require('express');
const cors = require('cors');
const debugMiddleware = require('./middleware/debugMiddleware');
const sequelize = require('./config/database');  // تغيير طريقة الاستيراد
const logger = require('./config/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(debugMiddleware); // إضافة middleware التتبع

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/stores', require('./routes/storeRoutes'));
app.use('/points', require('./routes/pointRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// Test route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Connect to database and start server
sequelize.authenticate()
    .then(() => {
        app.listen(PORT, '0.0.0.0', () => {
            logger.info(`Server running on port ${PORT}`);
            logger.info(`Local access: http://localhost:${PORT}`);
            logger.info(`Network access: http://172.20.10.4:${PORT}`);
        });
    })
    .catch(err => {
        logger.error('Unable to connect to the database:', err);
    });

module.exports = app;
