// ملف authMiddleware.js: التحقق من التوثيق باستخدام JWT
// المسار: backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('Token verified successfully');
        next();
    } catch (err) {
        console.log('Invalid token');
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Middleware للتحقق من صلاحيات المسؤول
const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        console.log('Access denied. Admins only.');
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

// Middleware للتحقق من الصلاحيات المحددة
const checkPermissions = (requiredPermissions) => {
    return (req, res, next) => {
        if (req.user.role === 'admin') {
            return next();
        }

        const userPermissions = req.user.permissions || [];
        const hasPermissions = requiredPermissions.every((perm) => userPermissions.includes(perm));

        if (!hasPermissions) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }

        next();
    };
};

// Middleware للتحقق من المدخلات
const validateIdentifier = (req, res, next) => {
    const { identifier } = req.body;

    if (!identifier) {
        return res.status(400).json({ message: 'Identifier is required (email, phone, or uniqueCode).' });
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier); // تحقق من الإيميل
    const isPhone = /^[0-9]{10,15}$/.test(identifier); // تحقق من رقم الجوال
    const isUniqueCode = /^[a-zA-Z0-9]{8}$/.test(identifier); // تحقق من الرقم الفريد

    if (!isEmail && !isPhone && !isUniqueCode) {
        return res.status(400).json({
            message: 'Identifier must be a valid email, phone number, or 8-character unique code.',
        });
    }

    next();
};

module.exports = {
    verifyToken,
    adminOnly,
    checkPermissions,
    validateIdentifier,
};
