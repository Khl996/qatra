// ملف userRoutes.js: تعريف مسارات المستخدمين
// المسار: backend/routes/userRoutes.js

const express = require('express');
const { register, login, getUserProfile, updateUserProfile, getUserPurchaseHistory, deleteUser } = require('../controllers/authController');
const { verifyToken, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// مسار تسجيل مستخدم جديد
router.post('/register', (req, res, next) => {
    console.log('Register route accessed');
    next();
}, register);

// مسار تسجيل الدخول
router.post('/login', (req, res, next) => {
    console.log('Login route accessed');
    next();
}, login);

// مسار تسجيل الدخول
router.post('/api/users/login', (req, res, next) => {
    console.log('Login route accessed');
    next();
}, login);

// مسار عرض بيانات المستخدم
router.get('/profile', verifyToken, getUserProfile);

// مسار تحديث بيانات المستخدم
router.put('/update', verifyToken, updateUserProfile);

// مسار عرض سجل مشتريات المستخدم
router.get('/purchase-history', verifyToken, getUserPurchaseHistory);

// مسار حذف مستخدم (للمسؤولين فقط)
router.delete('/delete/:id', verifyToken, adminOnly, deleteUser);

module.exports = router;
