// ملف database.js: إعداد الاتصال بقاعدة البيانات
// المسار: backend/config/database.js

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// تحميل متغيرات البيئة من .env
dotenv.config();

// التحقق من المتغيرات البيئية
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
    console.log('Loaded environment variables:', {
        DB_NAME: process.env.DB_NAME || 'MISSING',
        DB_USER: process.env.DB_USER || 'MISSING',
        DB_PASSWORD: process.env.DB_PASSWORD ? 'LOADED' : 'MISSING',
        DB_HOST: process.env.DB_HOST || 'MISSING',
    });
    throw new Error('Missing database environment variables. Please check your .env file.');
}

// إنشاء اتصال قاعدة البيانات باستخدام المتغيرات البيئية
const sequelize = new Sequelize(
    process.env.DB_NAME, // اسم قاعدة البيانات
    process.env.DB_USER, // اسم المستخدم
    process.env.DB_PASSWORD, // كلمة المرور
    {
        host: process.env.DB_HOST, // عنوان المضيف
        dialect: 'postgres', // نوع قاعدة البيانات
        logging: false, // تعطيل تسجيل الاستعلامات
    }
);

// التحقق من الاتصال
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error.message);
    });

// تصدير الاتصال
module.exports = { sequelize };
