// ملف syncDatabase.js: تهيئة قاعدة البيانات وإنشاء الجداول
// المسار: backend/utils/syncDatabase.js

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// طباعة المسار الحالي وملف البيئة
console.log('Current Directory:', process.cwd());
console.log('Environment Variables Path:', require('path').resolve('.env'));

const { sequelize } = require('../config/database');
const User = require('../models/User');
const Purchase = require('../models/Purchase');
const Store = require('../models/Store');
const Offer = require('../models/Offer');
const Point = require('../models/Point');
const Admin = require('../models/Admin');
const setupAssociations = require('../models/associations');

// تأكيد تحميل ملف .env
console.log('Attempting to load .env variables');
(async () => {
    try {
        // طباعة المتغيرات البيئية للتأكد من تحميلها
        console.log('Environment Variables:', {
            DB_NAME: process.env.DB_NAME,
            DB_USER: process.env.DB_USER,
            DB_PASSWORD: process.env.DB_PASSWORD ? 'LOADED' : 'MISSING',
            DB_HOST: process.env.DB_HOST,
        });

        // إعداد العلاقات
        setupAssociations();

        // مزامنة النماذج مع قاعدة البيانات
        await sequelize.sync({ force: true }); // يستخدم force لإعادة إنشاء الجداول - تأكد من أنك تريد هذا الخيار في الإنتاج
        console.log('All models were synchronized successfully.');

        // يمكن إضافة بيانات افتراضية هنا (اختياري)
        console.log('Database initialized successfully.');
    } catch (error) {
        console.error('Error during database synchronization:', error);
    } finally {
        await sequelize.close();
        console.log('Database connection closed');
    }
})();
