// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');
const Store = require('../models/Store');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/database');

// مسارات المصادقة للويب
// router.post('/merchant/login', authController.merchantLogin);
// router.post('/merchant/register', authController.merchantRegister);
// router.post('/admin/login', authController.adminLogin);

// مسارات المصادقة للجوال
// router.post('/mobile/login', authController.mobileLogin);
// router.post('/mobile/register', authController.mobileRegister);
// router.post('/mobile/verify-otp', authController.verifyOTP);
// router.post('/mobile/resend-otp', authController.resendOTP);

// Store registration route
router.post('/store/register', async (req, res) => {
    console.log('Received store registration request:', req.body);
    
    try {
        const { name, email, phone, password, category, description } = req.body;

        // Check if store exists
        const existingStore = await Store.findOne({
            where: {
                [sequelize.Op.or]: [
                    { email },
                    { phone }
                ]
            }
        });

        if (existingStore) {
            return res.status(400).json({
                message: 'البريد الإلكتروني أو رقم الهاتف مسجل مسبقاً'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create store
        const store = await Store.create({
            name,
            email,
            phone,
            password: hashedPassword,
            category,
            description,
            status: 'pending'
        });

        console.log('Store created successfully:', store.id);

        res.status(201).json({
            message: 'تم تسجيل المتجر بنجاح',
            store: {
                id: store.id,
                name: store.name,
                email: store.email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'حدث خطأ أثناء التسجيل'
        });
    }
});

module.exports = router;
