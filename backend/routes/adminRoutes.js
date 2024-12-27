const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// تسجيل مسؤول جديد
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({ username, email, password: hashedPassword, role });
        res.status(201).json({ message: 'Admin registered successfully', admin });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ error: 'Error registering admin', details: error.message });
    }
});

// تسجيل الدخول
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ where: { email } });

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in', details: error.message });
    }
});

// عرض جميع المسؤولين
router.get('/', authenticateToken, authorizeRole('superadmin'), async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Error fetching admins', details: error.message });
    }
});

// تحديث بيانات مسؤول
router.put('/:id', authenticateToken, authorizeRole('superadmin'), async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findByPk(id);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const updatedAdmin = await admin.update(req.body);
        res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
    } catch (error) {
        res.status(400).json({ error: 'Error updating admin', details: error.message });
    }
});

// حذف مسؤول
router.delete('/:id', authenticateToken, authorizeRole('superadmin'), async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findByPk(id);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        await admin.destroy();
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting admin', details: error.message });
    }
});

module.exports = router;
