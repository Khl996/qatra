const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

const sequelize = require('./config/database');
const User = require('./models/userModel');
const Store = require('./models/storeModel'); // استيراد نموذج المتجر
const Ad = require('./models/adModel'); // استيراد نموذج الإعلان

const corsOptions = {
    origin: 'http://localhost:9005', // استبدل هذا بالنطاق الصحيح إذا لزم الأمر
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // إذا كنت تستخدم الكوكيز
};

app.use(cors(corsOptions)); // استخدام cors للسماح بالطلبات من نطاقات مختلفة
app.use(bodyParser.json());

// إعداد المسارات الثابتة لخدمة الملفات من مجلد 'public'
app.use(express.static(path.join(__dirname, 'public')));

// مزامنة الموديل مع قاعدة البيانات
sequelize.sync({ alter: true }) // تحديث الجداول بدلاً من إعادة إنشائها
    .then(() => console.log('Database & tables synced!'))
    .catch(err => console.error('Error syncing tables:', err));

// مسار API للتسجيل
app.post('/auth/register', async (req, res) => {
    const { username, email, phone, password } = req.body;

    console.log('Received registration request:', { username, email, phone, password }); // سجل التنقيح

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userNumber = `user-${Date.now()}`;

        const user = await User.create({ username, email, phone, password: hashedPassword, userNumber });

        console.log('User created:', user); // سجل التنقيح

        res.json({ message: "تم التسجيل بنجاح", user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: "حدث خطأ أثناء التسجيل", error: error.message });
    }
});

// مسار API لتسجيل الدخول
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Received login request:', { email, password }); // سجل التنقيح

    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            console.log('Password match:', isMatch); // سجل نتيجة المقارنة

            if (isMatch) {
                console.log('Login successful for user:', user.username);
                res.json({ message: "تم تسجيل الدخول بنجاح", user });
            } else {
                console.log('Login failed: Incorrect password');
                res.status(401).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
            }
        } else {
            console.log('Login failed: User not found');
            res.status(401).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: "حدث خطأ أثناء تسجيل الدخول" });
    }
});

// مسار API لإضافة إعلان جديد بواسطة الإدارة
app.post('/api/admin/ads', async (req, res) => {
    const { title, description, storeId } = req.body;

    console.log('Received request to add ad:', { title, description, storeId }); // سجل التنقيح

    try {
        const ad = await Ad.create({ title, description, storeId });

        console.log('Ad added:', ad); // سجل التنقيح

        res.json({ message: "تم إضافة الإعلان بنجاح", ad });
    } catch (error) {
        console.error('Error adding ad:', error);
        res.status(500).json({ message: "حدث خطأ أثناء إضافة الإعلان", error: error.message });
    }
});

// مسار API للحصول على الإعلانات
app.get('/api/ads', async (req, res) => {
    try {
        const ads = await Ad.findAll();
        res.json(ads);
    } catch (error) {
        console.error('Error fetching ads:', error);
        res.status(500).json({ message: "حدث خطأ أثناء جلب الإعلانات", error: error.message });
    }
});

// مسار API لإضافة متجر جديد بواسطة الإدارة
app.post('/api/admin/stores', async (req, res) => {
    const { name, rating } = req.body;

    console.log('Received request to add store:', { name, rating }); // سجل التنقيح

    try {
        const store = await Store.create({ name, rating });

        console.log('Store added:', store); // سجل التنقيح

        res.json({ message: "تم إضافة المتجر بنجاح", store });
    } catch (error) {
        console.error('Error adding store:', error);
        res.status(500).json({ message: "حدث خطأ أثناء إضافة المتجر", error: error.message });
    }
});

// إضافة المسار للصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// مسار API للحصول على الإعلانات
app.get('/api/ads', (req, res) => {
    res.json(ads);
});

// مسار API للحصول على المتاجر الأعلى تقييمًا
app.get('/api/top-stores', (req, res) => {
    res.json(topStores);
});

// مسار API لتفاصيل المتجر
app.get('/api/store/:id', (req, res) => {
    const storeId = req.params.id;
    const store = storeDetails[storeId];
    if (store) {
        res.json(store);
    } else {
        res.status(404).json({ message: "لم يتم العثور على المتجر" });
    }
});

// مسار API للحصول على سجل النقاط
app.get('/api/store/:id/points-log', (req, res) => {
    const storeId = req.params.id;
    const log = pointsLog[storeId];
    if (log) {
        res.json(log);
    } else {
        res.status(404).json({ message: "لم يتم العثور على سجل النقاط" });
    }
});

// مسار API لإضافة النقاط للمستخدمين
app.post('/api/store/:id/add-points', (req, res) => {
    const storeId = req.params.id;
    const { userId, amount } = req.body;

    // حساب النقاط (لنفترض 1 نقطة لكل 10 وحدات من المبلغ)
    const points = Math.floor(amount / 10);

    // تحديث السجل الوهمي (يمكن استبداله بالتحديث الحقيقي للقاعدة البيانات)
    if (!pointsLog[storeId]) {
        pointsLog[storeId] = [];
    }
    pointsLog[storeId].push({ date: new Date().toISOString(), details: `إضافة ${points} نقطة للمستخدم ${userId}` });

    res.json({ message: "تمت إضافة النقاط بنجاح", points });
});

// إضافة المسار لشاشة الترحيب
app.get('/welcome', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

// إضافة المسار لشاشة إدارة الإعلانات
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

const PORT = process.env.PORT || 9005;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
