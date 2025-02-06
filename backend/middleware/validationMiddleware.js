const { body, validationResult } = require('express-validator');
const logger = require('../config/logger');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Validation error', { errors: errors.array() });
        return res.status(400).json({ 
            status: 'error',
            message: 'Validation error',
            errors: errors.array()
        });
    }
    next();
};

const validations = {
    user: [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email'),
        body('phone').matches(/^[0-9]{10}$/).withMessage('Invalid phone number'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ],
    store: [
        body('name').notEmpty().withMessage('اسم المتجر مطلوب'),
        body('email').isEmail().withMessage('البريد الإلكتروني غير صالح'),
        body('phone').notEmpty().withMessage('رقم الهاتف مطلوب'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
        body('category').notEmpty().withMessage('تصنيف المتجر مطلوب')
    ],
    offer: [/* Add offer validations */],
    point: [/* Add point validations */]
};

module.exports = { validate, validations };
