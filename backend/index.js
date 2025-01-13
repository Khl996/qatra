// ملف index.js: نقطة البداية لتشغيل السيرفر
// المسار: backend/index.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { sequelize } = require('./config/database');
const setupSwagger = require('./utils/swagger');
const userRoutes = require('./routes/userRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const storeRoutes = require('./routes/storeRoutes');
console.log('Store routes loaded'); // طباعة لتأكيد تحميل مسارات المتاجر
const pointRoutes = require('./routes/pointRoutes');
const offerRoutes = require('./routes/offerRoutes'); // تسجيل مسارات العروض
const supportRoutes = require('./routes/supportRoutes');
const adminRoutes = require('./routes/adminRoutes'); // إضافة مسارات الإدارة
const errorMiddleware = require('./middleware/errorMiddleware');
const setupAssociations = require('./models/associations');

// تحميل متغيرات البيئة من .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// إعداد العلاقات بين النماذج
setupAssociations();

// استخدام الميدل وير لتحسين الأمان وتحليل البيانات
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// إعداد المسارات
app.use('/api/users', userRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/stores', storeRoutes); // تسجيل مسارات المتاجر
app.use('/api/points', pointRoutes);
app.use('/api/offers', offerRoutes); // تسجيل مسارات العروض
app.use('/api/support', supportRoutes);
app.use('/api/admin', adminRoutes); // تسجيل مسارات الإدارة

// إعداد Swagger
setupSwagger(app);

// نقطة اختبار للتأكد من عمل السيرفر
app.get('/', (req, res) => {
    res.status(200).send('Qatra Backend Server is Running!');
});

// ميدل وير لمعالجة الأخطاء
app.use(errorMiddleware);

// توصيل قاعدة البيانات
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// تشغيل السيرفر
app.listen(PORT, '172.20.10.4', () => {
    console.log(`Server is running on http://172.20.10.4:4000${PORT}`);
});
