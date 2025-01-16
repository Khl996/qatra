const { body, validationResult } = require('express-validator');

exports.validateStore = [
    body('name').notEmpty().withMessage('اسم المتجر مطلوب'),
    body('email').isEmail().withMessage('البريد الإلكتروني غير صالح'),
    body('phone').notEmpty().withMessage('رقم الهاتف مطلوب'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
    body('category').notEmpty().withMessage('تصنيف المتجر مطلوب'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateUser = [
    body('name').notEmpty().withMessage('الاسم مطلوب'),
    body('email').isEmail().withMessage('البريد الإلكتروني غير صالح'),
    body('phone').notEmpty().withMessage('رقم الهاتف مطلوب'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
