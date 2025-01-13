const Store = require('../models/Store');
const Offer = require('../models/Offer');
const User = require('../models/User');
const Point = require('../models/Point');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { validationResult } = require('express-validator');

// وظيفة إنشاء متجر جديد
const createStore = async (req, res) => {
    const { name, address, owner, phone, email, category, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStore = await Store.create({ name, address, owner, phone, email, category, password: hashedPassword });
        console.log('Store created successfully');
        res.status(201).json({ message: 'Store created successfully', store: newStore });
    } catch (error) {
        console.error('Error creating store:', error);
        res.status(500).json({ message: 'Error creating store', error: error.message });
    }
};

// وظيفة الحصول على العروض الخاصة بمتجر معين
const getStoreOffers = async (req, res) => {
    const { storeId } = req.params;

    try {
        const store = await Store.findByPk(storeId, {
            include: [{ model: Offer, as: 'offers' }],
        });

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        res.status(200).json({ message: 'Store offers retrieved successfully', offers: store.offers });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving store offers', error: error.message });
    }
};

// وظيفة تسجيل الدخول للمتجر
const storeLogin = async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const store = await Store.findOne({ where: { email } });

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        if (store.status !== 'approved') {
            return res.status(403).json({ message: 'Store is not approved yet.' });
        }

        const isPasswordValid = await bcrypt.compare(password, store.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: store.id, role: 'store' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// وظيفة إضافة النقاط للمستخدم
const addPoints = async (req, res) => {
    const { identifier, billAmount, storeId } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { phone: identifier },
                    { email: identifier },
                    { uniqueCode: identifier }
                ]
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const pointsToAdd = billAmount * 10;

        const newPoint = await Point.create({
            userId: user.id,
            storeId,
            points: pointsToAdd,
        });

        res.status(201).json({ message: 'Points added successfully', points: newPoint });
    } catch (error) {
        res.status(500).json({ message: 'Error adding points', error: error.message });
    }
};

// وظيفة تحديث بيانات المتجر
const updateStore = async (req, res) => {
    const { storeId } = req.params;
    const { name, description, phone, email, category } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const store = await Store.findByPk(storeId);

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        store.name = name || store.name;
        store.description = description || store.description;
        store.phone = phone || store.phone;
        store.email = email || store.email;
        store.category = category || store.category;

        await store.save();

        res.status(200).json({ message: 'Store updated successfully', store });
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            return res.status(400).json({ message: 'Validation error', error: error.errors });
        }
        res.status(500).json({ message: 'Error updating store', error: error.message });
    }
};

// طباعة الوظائف المصدرة للتأكد
console.log('Exported functions:', {
    createStore,
    getStoreOffers,
    storeLogin,
    addPoints,
    updateStore,
});

// تصدير الوظائف
module.exports = {
    createStore,
    getStoreOffers,
    storeLogin,
    addPoints,
    updateStore,
};
