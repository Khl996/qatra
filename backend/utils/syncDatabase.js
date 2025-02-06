// ملف syncDatabase.js: تهيئة قاعدة البيانات وإنشاء الجداول
// المسار: backend/utils/syncDatabase.js

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// طباعة المسار الحالي وملف البيئة
console.log('Current Directory:', process.cwd());
console.log('Environment Variables Path:', require('path').resolve('.env'));

const sequelize = require('../config/database'); // تغيير طريقة الاستيراد
const User = require('../models/User');
const Purchase = require('../models/Purchase');
const Store = require('../models/Store');
const Offer = require('../models/Offer');
const Point = require('../models/Point');
const Admin = require('../models/Admin');
const setupAssociations = require('../models/associations');
const logger = require('../config/logger');

// تأكيد تحميل ملف .env
console.log('Attempting to load .env variables');
(async () => {
    try {
        // إضافة فحص لبيئة التشغيل
        if (process.env.NODE_ENV === 'production' && process.env.FORCE_SYNC === 'false') {
            throw new Error('Cannot force sync in production without FORCE_SYNC flag');
        }

        // طباعة المتغيرات البيئية للتأكد من تحميلها
        console.log('Environment Variables:', {
            DB_NAME: process.env.DB_NAME,
            DB_USER: process.env.DB_USER,
            DB_PASSWORD: process.env.DB_PASSWORD ? 'LOADED' : 'MISSING',
            DB_HOST: process.env.DB_HOST,
        });

        // إعداد العلاقات
        setupAssociations();

        // إضافة مراقبة أداء قاعدة البيانات
        sequelize.afterConnect((connection) => {
            logger.info('New database connection established');
        });

        // إضافة خيارات المزامنة المتقدمة
        await sequelize.sync({ 
            force: process.env.NODE_ENV !== 'production',
            alter: process.env.NODE_ENV === 'development',
            logging: (msg) => logger.debug(msg)
        });

        console.log('All models were synchronized successfully.');

        // يمكن إضافة بيانات افتراضية هنا (اختياري)
        console.log('Database initialized successfully.');
    } catch (error) {
        logger.error('Database synchronization error:', error);
        process.exit(1);
    } finally {
        await sequelize.close();
        console.log('Database connection closed');
    }
})();
