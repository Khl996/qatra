const bcrypt = require('bcryptjs'); // تأكد من استخدام bcryptjs
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const Store = require('../models/Store');
const logger = require('../config/logger');
const { Op } = require('sequelize');  // إضافة هذا السطر

const generateUniqueCode = () => {
    // توليد رقم عشوائي من 8 أرقام
    return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const authController = {
    mobileLogin: async (req, res) => {
        try {
            const { identifier, password } = req.body;
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { email: identifier },
                        { phone: identifier },
                        { uniqueCode: identifier }
                    ]
                }
            });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'بيانات الدخول غير صحيحة' });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    uniqueCode: user.uniqueCode
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    mobileRegister: async (req, res) => {
        try {
            const { name, email, phone, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const uniqueCode = Math.random().toString(36).substring(2, 10).toUpperCase();

            const user = await User.create({
                name,
                email,
                phone,
                password: hashedPassword,
                uniqueCode
            });

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.status(201).json({
                message: 'تم التسجيل بنجاح',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    uniqueCode: user.uniqueCode
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    storeLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const store = await Store.findOne({ where: { email } });

            if (!store || !(await bcrypt.compare(password, store.password))) {
                return res.status(401).json({ message: 'بيانات الدخول غير صحيحة' });
            }

            const token = jwt.sign(
                { id: store.id, type: 'store' },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.json({
                token,
                store: {
                    id: store.id,
                    name: store.name,
                    email: store.email
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    storeRegister: async (req, res) => {
        try {
            const { name, email, phone, password, category, description } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const store = await Store.create({
                name,
                email,
                phone,
                password: hashedPassword,
                category,
                description,
                status: 'pending'
            });

            res.status(201).json({
                message: 'تم تسجيل المتجر بنجاح، بانتظار موافقة الإدارة',
                store: {
                    id: store.id,
                    name: store.name,
                    email: store.email
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    verifyOTP: async (req, res) => {
        // سيتم إضافة منطق التحقق من OTP لاحقاً
        res.status(200).json({ message: 'تم التحقق بنجاح' });
    },

    register: async (req, res) => {
        try {
            const { name, email, phone, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const user = await User.create({
                name,
                email,
                phone,
                password: hashedPassword,
                uniqueCode: Math.floor(10000000 + Math.random() * 90000000).toString()
            });

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    uniqueCode: user.uniqueCode
                },
                token
            });
        } catch (error) {
            logger.error('Registration error:', error);
            res.status(500).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { identifier, password } = req.body;

            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { email: identifier },
                        { phone: identifier },
                        { uniqueCode: identifier }
                    ]
                }
            });

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    uniqueCode: user.uniqueCode
                },
                token
            });
        } catch (error) {
            logger.error('Login error:', error);
            res.status(500).json({ message: error.message });
        }
    },

    verifyOtp: async (req, res) => {
        try {
            const { phone, otp } = req.body;
            // تنفيذ منطق التحقق من OTP هنا
            res.json({ message: 'OTP verified successfully' });
        } catch (error) {
            logger.error('OTP verification error:', error);
            res.status(500).json({ message: error.message });
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            // تنفيذ منطق إعادة تعيين كلمة المرور هنا
            res.json({ message: 'Password reset instructions sent' });
        } catch (error) {
            logger.error('Forgot password error:', error);
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = authController;
