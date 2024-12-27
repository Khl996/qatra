const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Store = require('../models/Store');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// تسجيل متجر جديد
router.post('/register', async (req, res) => {
    try {
        const { name, ownerName, email, phone, password, description, category, status } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const store = await Store.create({
            name,
            ownerName,
            email,
            phone,
            password: hashedPassword,
            description,
            category,
            status: status || 'pending',
        });
        res.status(201).json({ message: 'Store registered successfully', store });
    } catch (error) {
        console.error('Error registering store:', error);
        res.status(500).json({ error: 'Error registering store', details: error.message });
    }
});

// تسجيل الدخول
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const store = await Store.findOne({ where: { email } });

        if (!store || !(await bcrypt.compare(password, store.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: store.id, name: store.name, role: 'store' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in', details: error.message });
    }
});

// عرض جميع المتاجر
router.get('/', authenticateToken, authorizeRole('superadmin'), async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.status(200).json(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
        res.status(500).json({ error: 'Error fetching stores', details: error.message });
    }
});

// تحديث بيانات المتجر
router.put('/:id', authenticateToken, authorizeRole('store'), async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findByPk(id);

        if (!store) {
            return res.status(404).json({ error: 'Store not found' });
        }

        const updatedStore = await store.update(req.body);
        res.status(200).json({ message: 'Store updated successfully', store: updatedStore });
    } catch (error) {
        res.status(400).json({ error: 'Error updating store', details: error.message });
    }
});

// حذف متجر
router.delete('/:id', authenticateToken, authorizeRole('superadmin'), async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findByPk(id);

        if (!store) {
            return res.status(404).json({ error: 'Store not found' });
        }

        await store.destroy();
        res.status(200).json({ message: 'Store deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting store', details: error.message });
    }
});

module.exports = router;
