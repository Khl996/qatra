// ملف userRoutes.js: تعريف مسارات المستخدمين
// المسار: backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateUser } = require('../middleware/validationMiddleware');

// المسارات العامة (بدون مصادقة)
router.post('/register', validateUser, userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);

// المسارات المحمية بالمصادقة
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.get('/points', authMiddleware, userController.getUserPoints);
router.get('/purchases', authMiddleware, userController.getUserPurchases);

module.exports = router;
