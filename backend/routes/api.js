// backend/routes/api.js

/**
 * نقاط النهاية للواجهة الخلفية: تسجيل المستخدمين، تسجيل الدخول، جلب البيانات.
 */

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Store = require('../models/Store');
const Points = require('../models/Point');
const Offer = require('../models/Offer');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// تسجيل المستخدم الجديد
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, phone, password: hashedPassword });
        res.status(201).json({ message: 'تم التسجيل بنجاح', user });
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ أثناء التسجيل', error: error.message });
    }
});

// تسجيل الدخول
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'تم تسجيل الدخول بنجاح', token });
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الدخول', error: error.message });
    }
});

// جلب قائمة المتاجر
router.get('/stores', async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ أثناء جلب المتاجر', error: error.message });
    }
});

// جلب تفاصيل المتجر (النقاط والعروض)
router.get('/store/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findByPk(id, {
            include: [
                { model: Points, attributes: ['points', 'description', 'createdAt'] },
                { model: Offer, attributes: ['title', 'description', 'discount', 'startDate', 'endDate'] },
            ],
        });

        if (!store) {
            return res.status(404).json({ message: 'المتجر غير موجود' });
        }

        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ أثناء جلب تفاصيل المتجر', error: error.message });
    }
});

module.exports = router;
