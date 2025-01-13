// ملف storeRoutes.js: تعريف مسارات المتاجر
// المسار: backend/routes/storeRoutes.js

const express = require('express');
const { createStore, getStoreOffers, storeLogin, addPoints, updateStore } = require('../controllers/storeController');
const { verifyToken, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// مسار إنشاء متجر جديد
router.post('/', createStore);

// مسار تسجيل الدخول للمتجر
router.post('/login', storeLogin);

// مسار الحصول على العروض لمتجر معين
router.get('/:storeId/offers', getStoreOffers);

// مسار إضافة النقاط للمستخدم
router.post('/add-points', verifyToken, addPoints);

// مسار تحديث بيانات المتجر
router.put('/:storeId', verifyToken, adminOnly, updateStore);

module.exports = router;
