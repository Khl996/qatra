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

// تسجيل دخول المتجر
router.post('/merchant/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Store login attempt:', { email });

        // التحقق من وجود المتجر
        const store = await Store.findOne({ 
            where: { 
                email,
                status: 'approved' // التحقق من أن المتجر مفعل
            } 
        });

        if (!store) {
            return res.status(401).json({ 
                message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' 
            });
        }

        // التحقق من كلمة المرور
        const isValidPassword = await bcrypt.compare(password, store.password);
        if (!isValidPassword) {
            return res.status(401).json({ 
                message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' 
            });
        }

        // إنشاء توكن
        const token = jwt.sign(
            { 
                id: store.id,
                role: 'merchant',
                email: store.email
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        console.log('Store login successful:', email);

        // إرجاع البيانات
        res.json({
            token,
            user: {
                id: store.id,
                name: store.name,
                email: store.email,
                category: store.category,
                status: store.status
            },
            role: 'merchant'
        });

    } catch (error) {
        console.error('Store login error:', error);
        res.status(500).json({ 
            message: 'حدث خطأ في عملية تسجيل الدخول' 
        });
    }
});

// مسارات التحقق
router.post('/verify-otp', authController.verifyOtp);
router.post('/forgot-password', authController.forgotPassword);

// مسارات مصادقة المسؤول - نستخدم نفس المسار الذي يستخدمه الفرونت إند
router.post('/admin/login', async (req, res) => {
    console.log('Received admin login request:', req.body); // إضافة لوق للتتبع
    return adminController.adminLogin(req, res);
});
router.post('/admin/register', adminController.createSuperAdmin);

// إضافة مسار جديد لجلب المتاجر
router.get('/stores', async (req, res) => {
    try {
        const stores = await Store.findAll({
            attributes: ['id', 'name', 'category', 'logo', 'description', 'status'],
            where: {
                status: 'approved' // جلب المتاجر المعتمدة فقط
            }
        });
        res.json(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
        res.status(500).json({ message: 'حدث خطأ في جلب المتاجر' });
    }
});

// إضافة مسار للمتاجر المميزة
router.get('/stores/featured', async (req, res) => {
    try {
        console.log('Fetching featured stores...'); // إضافة لوق للتتبع
        const stores = await Store.findAll({
            attributes: ['id', 'name', 'category', 'logo', 'description', 'status'],
            where: {
                status: 'approved'
            },
            limit: 5
        });
        console.log('Found stores:', stores.length); // إضافة لوق للتتبع
        res.json(stores);
    } catch (error) {
        console.error('Error fetching featured stores:', error);
        res.status(500).json({ message: 'حدث خطأ في جلب المتاجر المميزة' });
    }
});

// إضافة مسار للمتاجر القريبة
router.get('/stores/nearby', async (req, res) => {
    try {
        const stores = await Store.findAll({
            attributes: ['id', 'name', 'category', 'logo', 'description', 'status'],
            where: {
                status: 'approved'
            }
            // يمكن إضافة منطق لحساب المسافة هنا
        });
        res.json(stores);
    } catch (error) {
        console.error('Error fetching nearby stores:', error);
        res.status(500).json({ message: 'حدث خطأ في جلب المتاجر القريبة' });
    }
});

// مسار اختبار
router.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

module.exports = router;
