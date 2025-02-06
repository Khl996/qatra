// ملف userController.js: إدارة عمليات المستخدمين
// المسار: backend/controllers/userController.js

const User = require('../models/User');
const Store = require('../models/Store');
const Point = require('../models/Point'); // إضافة استيراد Point
const Purchase = require('../models/Purchase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateUniqueCode, formatPhoneNumber } = require('../utils/helpers');
const AppError = require('../utils/errors');
const { sendResponse } = require('../utils/responses');
const logger = require('../config/logger');

const userController = {
    register: async (req, res, next) => {
        try {
            // Validate request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new AppError('Validation error', 400);
            }

            const { name, email, phone, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const uniqueCode = await generateUniqueCode();
            
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
                { expiresIn: '1h' }
            );

            logger.info(`New user registered: ${user.email}`);
            return sendResponse(res, 201, { user, token }, 'User registered successfully');
        } catch (error) {
            logger.error(`Registration error: ${error.message}`);
            next(error);
        }
    },

    getProfile: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateProfile: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id);
            await user.update(req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUserPoints: async (req, res) => {
        try {
            const points = await Point.findAll({
                where: { userId: req.user.id },
                include: [{ model: Store, as: 'store' }]
            });
            res.json(points);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { phone, password } = req.body;
            const user = await User.findOne({ 
                where: { phone: formatPhoneNumber(phone) } 
            });

            if (!user) {
                return res.status(404).json({ message: 'المستخدم غير موجود' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'كلمة المرور غير صحيحة' });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({ token, user: { id: user.id, name: user.name } });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { phone } = req.body;
            const user = await User.findOne({ 
                where: { phone: formatPhoneNumber(phone) } 
            });

            if (!user) {
                return res.status(404).json({ message: 'المستخدم غير موجود' });
            }

            // هنا يمكن إضافة منطق إرسال رمز التحقق عبر SMS
            const verificationCode = Math.floor(100000 + Math.random() * 900000);
            
            // تخزين الرمز مؤقتاً (يمكن استخدام Redis هنا)
            // await setVerificationCode(phone, verificationCode);

            res.json({ message: 'تم إرسال رمز التحقق' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUserPurchases: async (req, res) => {
        try {
            const purchases = await Purchase.findAll({
                where: { userId: req.user.id },
                include: [{ model: Store, as: 'store' }]
            });
            res.json(purchases);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = userController;
