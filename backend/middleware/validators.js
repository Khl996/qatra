const { body } = require('express-validator');

const validateRegistration = [
    body('name')
        .notEmpty().withMessage('الاسم مطلوب')
        .isLength({ min: 3 }).withMessage('يجب أن يكون الاسم 3 أحرف على الأقل'),
    
    body('email')
        .isEmail().withMessage('البريد الإلكتروني غير صالح')
        .normalizeEmail(),
    
    body('phone')
        .matches(/^05[0-9]{8}$/).withMessage('رقم الجوال غير صالح'),
    
    body('password')
        .isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
];

module.exports = {
    validateRegistration
};