// ملف pointRoutes.js: تعريف مسارات النقاط
// المسار: backend/routes/pointRoutes.js

const express = require('express');
const { addPoints, getUserPoints } = require('../controllers/pointController');

const router = express.Router();

// مسار إضافة نقاط للمستخدم
router.post('/add', addPoints);

// مسار عرض نقاط المستخدم
router.get('/user/:userId', getUserPoints);

module.exports = router;
