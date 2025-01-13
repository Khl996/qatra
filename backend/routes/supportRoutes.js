// ملف supportRoutes.js: تعريف مسارات الدعم الفني
// المسار: backend/routes/supportRoutes.js

const express = require('express');
const { sendSupportRequest } = require('../controllers/supportController');

const router = express.Router();

// مسار إرسال طلب دعم
router.post('/request', sendSupportRequest);

module.exports = router;
