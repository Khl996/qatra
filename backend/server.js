// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// استيراد المسارات
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ربط المسارات
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.send('مرحباً بكم في تطبيق قطرة!');
});

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
