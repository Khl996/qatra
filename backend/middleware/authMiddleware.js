// ملف authMiddleware.js: التحقق من التوثيق باستخدام JWT
// المسار: backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'غير مصرح' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'توكن غير صالح' });
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

const storeAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'غير مصرح' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.type !== 'store') {
            return res.status(403).json({ message: 'غير مصرح للمتاجر فقط' });
        }

        req.store = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'توكن غير صالح' });
    }
};

module.exports = {
    authMiddleware,
    isAdmin,
    checkPermissions,
    validateIdentifier,
    storeAuthMiddleware
};
