// ملف authMiddleware.js: التحقق من التوثيق باستخدام JWT
// المسار: backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Store = require('../models/Store');
const Admin = require('../models/Admin');
const logger = require('../config/logger');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        logger.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

const adminMiddleware = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
};

const storeAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.type !== 'store') {
            return res.status(403).json({ message: 'Store access required' });
        }

        const store = await Store.findByPk(decoded.id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        req.store = store;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const adminAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'التوكن غير موجود' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const admin = await Admin.findByPk(decoded.id);
            
            if (!admin) {
                return res.status(401).json({ message: 'حساب المسؤول غير صالح' });
            }

            req.admin = admin;
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    message: 'انتهت صلاحية الجلسة، الرجاء إعادة تسجيل الدخول',
                    code: 'TOKEN_EXPIRED'
                });
            }
            throw err;
        }
    } catch (error) {
        logger.error('Admin auth middleware error:', error);
        res.status(401).json({ message: 'خطأ في المصادقة' });
    }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'غير مصرح للوصول' });
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

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'غير مصرح' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findByPk(decoded.id);

        if (!admin || admin.status !== 'active') {
            return res.status(401).json({ message: 'غير مصرح' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: 'غير مصرح' });
    }
};

module.exports = {
    authMiddleware,
    adminMiddleware,
    isAdmin,
    checkPermissions,
    validateIdentifier,
    storeAuthMiddleware,
    adminAuthMiddleware,
    adminAuth
};
