// ملف offerRoutes.js: تعريف مسارات العروض
// المسار: backend/routes/offerRoutes.js

const express = require('express');
const { createOffer, getAllOffers, getStoreOffers } = require('../controllers/offerController');
const { verifyToken, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// مسار إنشاء عرض جديد
router.post('/', verifyToken, adminOnly, createOffer);

// مسار عرض جميع العروض
router.get('/', getAllOffers);

// مسار عرض عروض متجر محدد
router.get('/store/:storeId', getStoreOffers);

module.exports = router;
