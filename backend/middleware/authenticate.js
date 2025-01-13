// backend/middleware/authenticate.js

/**
 * Middleware للمصادقة باستخدام JWT.
 */

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'الرجاء تقديم رمز مصادقة صالح' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // تخزين بيانات المستخدم في الطلب
        console.log('Token verified successfully');
        next();
    } catch (error) {
        console.log('Invalid or expired token');
        res.status(401).json({ message: 'رمز المصادقة غير صالح أو منتهي الصلاحية' });
    }
};

module.exports = authenticate;
