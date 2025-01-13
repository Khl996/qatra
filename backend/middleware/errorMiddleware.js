// ملف errorMiddleware.js: التعامل مع الأخطاء بشكل موحد
// المسار: backend/middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
    console.error('Error occurred:', err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong',
    });
};

module.exports = errorHandler;
