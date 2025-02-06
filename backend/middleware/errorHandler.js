const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
    logger.error('Error:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        body: req.body,
        query: req.query
    });

    // التحقق من نوع الخطأ وإرسال الاستجابة المناسبة
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: err.message
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            status: 'error',
            message: 'غير مصرح'
        });
    }

    // الأخطاء العامة
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'حدث خطأ في النظام'
    });
};

module.exports = errorHandler;
