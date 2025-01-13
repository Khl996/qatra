// backend/routes/auth.js

const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// مسار تسجيل المستخدم الجديد
router.post('/register', registerUser);

// مسار تسجيل الدخول
router.post('/login', loginUser);

module.exports = router;
