// ملف purchaseRoutes.js: تعريف مسارات سجل المشتريات
// المسار: backend/routes/purchaseRoutes.js

const express = require('express');
const { getUserPurchaseHistory } = require('../controllers/authController');
const { filterPurchases } = require('../controllers/purchaseController');
const { verifyToken } = require('../middleware/authMiddleware');
const Purchase = require('../models/Purchase'); // استيراد نموذج Purchase


const router = express.Router();

// مسار عرض سجل مشتريات المستخدم
router.get('/history', verifyToken, getUserPurchaseHistory);

// مسار فلترة المشتريات بناءً على التاريخ
router.get('/filter', verifyToken, filterPurchases);

// مسار عرض جميع المشتريات
router.get('/', verifyToken, async (req, res) => {
    try {
        const purchases = await Purchase.findAll();
        res.status(200).json({ message: 'Purchases retrieved successfully', purchases });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving purchases', error: error.message });
    }
});

module.exports = router;
