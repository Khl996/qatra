const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// تسجيل مستخدم جديد
router.post('/register', async (req, res) => {
    const { username, email, phone, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, phone, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user', details: error.message });
    }
});

// تسجيل الدخول
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to log in', details: error.message });
    }
});

// عرض جميع المستخدمين
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users', details: error.message });
    }
});

// تحديث معلومات المستخدم
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, phone, password } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            user.username = username || user.username;
            user.email = email || user.email;
            user.phone = phone || user.phone;
            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }
            await user.save();
            res.status(200).json({ message: 'User updated successfully', user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user', details: error.message });
    }
});

// حذف المستخدم
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user', details: error.message });
    }
});

module.exports = router;
