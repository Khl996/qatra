const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

const generateUniqueCode = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
};

exports.register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log('Email is already in use');
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const uniqueCode = generateUniqueCode();

        const newUser = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            uniqueCode,
        });

        console.log('User registered successfully');
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign(
            { id: user.id, role: user.role, permissions: user.permissions },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

exports.getUserPurchaseHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const purchaseHistory = []; // Replace with actual logic to retrieve purchase history

        res.status(200).json({ message: 'Purchase history retrieved successfully', history: purchaseHistory });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving purchase history', error: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'phone', 'uniqueCode', 'role', 'permissions']
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, phone, password } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.phone = phone || user.phone;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        await user.save();

        res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};
