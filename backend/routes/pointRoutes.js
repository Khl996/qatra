// ملف pointRoutes.js: تعريف مسارات النقاط
// المسار: backend/routes/pointRoutes.js

const express = require('express');
const router = express.Router();
const pointController = require('../controllers/pointController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, pointController.getUserPoints);
router.post('/add', authMiddleware, pointController.addPoints);

module.exports = router;
