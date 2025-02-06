const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const { validate, validations } = require('../middleware/validationMiddleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Store } = require('../models/relationships');
const multer = require('multer');
const path = require('path');

// إعداد multer لتحميل الصور
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // مسار المجلد لحفظ الصور
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// مسارات المصادقة العامة
router.post('/register', validations.user, validate, authController.register);
router.post('/login', authController.login);
router.post('/mobile/login', authController.mobileLogin);
router.post('/mobile/register', authController.mobileRegister);

// مسارات المتاجر
router.post('/store/register', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'attachments', maxCount: 5 }]), async (req, res) => {
    try {
        const { name, email, phone, password, category, description } = req.body;

        // التحقق من وجود المتجر مسبقاً
        const existingStore = await Store.findOne({ where: { email } });
        if (existingStore) {
            return res.status(400).json({ message: 'البريد الإلكتروني مسجل مسبقاً' });
        }

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10);

        // تجهيز بيانات الملفات
        let logoPath = null;
        if (req.files && req.files['logo'] && req.files['logo'][0]) {
            logoPath = req.files['logo'][0].path;
        }

        let attachmentsPaths = [];
        if (req.files && req.files['attachments']) {
            attachmentsPaths = req.files['attachments'].map(file => file.path);
        }

        // إنشاء المتجر
        const newStore = await Store.create({
            name,
            email,
            phone,
            password: hashedPassword,
            category,
            description,
            logo: logoPath,
            attachments: attachmentsPaths,
            status: 'pending' // تعيين الحالة إلى "قيد الانتظار"
        });

        console.log('New store created:', newStore.name);

        // يمكنك هنا إرسال رسالة بريد إلكتروني لتأكيد التسجيل (اختياري)

        res.status(201).json({ message: 'تم تسجيل المتجر بنجاح. في انتظار الموافقة.' });
    } catch (error) {
        console.error('Store registration error:', error);
        res.status(500).json({ message: 'حدث خطأ أثناء تسجيل المتجر' });
    }
});
router.post('/store/login', authController.storeLogin);

// مسارات التحقق
router.post('/verify-otp', authController.verifyOtp);
router.post('/forgot-password', authController.forgotPassword);

// مسارات مصادقة المسؤول - نستخدم نفس المسار الذي يستخدمه الفرونت إند
router.post('/admin/login', async (req, res) => {
    console.log('Received admin login request:', req.body); // إضافة لوق للتتبع
    return adminController.adminLogin(req, res);
});
router.post('/admin/register', adminController.createSuperAdmin);

module.exports = router;
