// ملف adminRoutes.js: تعريف مسارات الإدارة
// المسار: backend/routes/adminRoutes.js

const express = require('express');
const {
    approveStore,
    rejectStore,
    viewReports,
    viewUsers,
    updateUser,
    deleteUser,
    viewStores,
    createSuperAdmin,
    createSubAdmin,
    adminLogin
} = require('../controllers/adminController');
const { verifyToken, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// مسار الموافقة على متجر
router.post('/approve-store/:storeId', verifyToken, adminOnly, approveStore);

// مسار رفض متجر
router.post('/reject-store/:storeId', verifyToken, adminOnly, rejectStore);

// مسار عرض التقارير
router.get('/reports', verifyToken, adminOnly, viewReports);

// مسار عرض المستخدمين
router.get('/users', verifyToken, adminOnly, viewUsers);

// مسار عرض المتاجر
router.get('/stores', verifyToken, adminOnly, viewStores);

// مسار تحديث بيانات المستخدم
router.put('/users/:id', verifyToken, adminOnly, updateUser);

// مسار حذف مستخدم
router.delete('/users/:id', verifyToken, adminOnly, deleteUser);

// مسار إنشاء المسؤول الرئيسي
router.post('/create-super-admin', createSuperAdmin);

// مسار إنشاء مسؤول فرعي
router.post('/create-sub-admin', verifyToken, adminOnly, createSubAdmin);

// مسار تسجيل الدخول للإدارة
router.post('/login', adminLogin);

module.exports = router;
