// ملف database.js: إعداد الاتصال بقاعدة البيانات
// المسار: backend/config/database.js

const { Sequelize } = require('sequelize');
require('dotenv').config();
const logger = require('./logger');

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
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
        define: {
            timestamps: true,
            underscored: true
        }
    }
);

module.exports = sequelize;
