// ملف pointRoutes.js: تعريف مسارات النقاط
// المسار: backend/routes/pointRoutes.js

const express = require('express');
const router = express.Router();
const pointController = require('../controllers/pointController');
const { authMiddleware, storeAuthMiddleware } = require('../middleware/authMiddleware');

// المسارات المحمية للمستخدمين
router.get('/', authMiddleware, pointController.getUserPoints);
router.get('/history', authMiddleware, pointController.getPointsHistory);

// المسارات المحمية للمتاجر
router.post('/add', storeAuthMiddleware, pointController.addPoints);

module.exports = router;
