const jwt = require('jsonwebtoken');
const { Admin } = require('../models/relationships');

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'الرجاء تسجيل الدخول' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const admin = await Admin.findByPk(decoded.id);

        if (!admin || admin.status !== 'active') {
            throw new Error();
        }

        req.admin = admin;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ message: 'الرجاء تسجيل الدخول' });
    }
};

module.exports = adminAuth;
