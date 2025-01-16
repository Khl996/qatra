// ملف purchaseRoutes.js: تعريف مسارات سجل المشتريات
// المسار: backend/routes/purchaseRoutes.js

const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const { authMiddleware } = require('../middleware/authMiddleware');

// المسارات المحمية بالمصادقة
router.use(authMiddleware);

// إنشاء عملية شراء جديدة
router.post('/', purchaseController.createPurchase);

// الحصول على سجل المشتريات للمستخدم
router.get('/history', purchaseController.getUserPurchases);

module.exports = router;
