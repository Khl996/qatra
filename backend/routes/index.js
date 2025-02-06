const express = require('express');
const router = express.Router();
const { authMiddleware, storeAuthMiddleware } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const storeController = require('../controllers/storeController');
const pointController = require('../controllers/pointController');
const offerController = require('../controllers/offerController');
const notificationController = require('../controllers/notificationController');

// Health Check Route
router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// المسارات العامة
router.get('/stores/top', storeController.getAllStores);
router.get('/stores/nearby', storeController.getNearbyStores);
router.get('/offers/latest', offerController.getAllOffers);

// مسارات المستخدمين
router.use('/auth', require('./authRoutes'));
router.use('/users', require('./userRoutes'));

// مسارات المتاجر
router.get('/stores/:id', storeController.getStoreById);
router.use('/stores', storeAuthMiddleware, require('./storeRoutes'));

// مسارات النقاط (تحتاج مصادقة)
router.get('/points', authMiddleware, pointController.getUserPoints);
router.get('/points/history', authMiddleware, pointController.getPointsHistory);
router.post('/points/add', storeAuthMiddleware, pointController.addPoints);

// مسارات العروض
router.get('/offers', offerController.getAllOffers);
router.get('/offers/:id', offerController.getOfferById);
router.post('/offers', storeAuthMiddleware, offerController.createOffer);
router.put('/offers/:id', storeAuthMiddleware, offerController.updateOffer);
router.delete('/offers/:id', storeAuthMiddleware, offerController.deleteOffer);

// مسارات الإشعارات (تحتاج مصادقة)
router.get('/notifications', authMiddleware, notificationController.getUserNotifications);
router.put('/notifications/:id/read', authMiddleware, notificationController.markAsRead);

// التعامل مع المسارات غير الموجودة
router.use('*', (req, res) => {
    res.status(404).json({ 
        message: 'المسار غير موجود',
        path: req.originalUrl
    });
});

// معالجة الأخطاء
router.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'حدث خطأ في النظام',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

module.exports = router;
