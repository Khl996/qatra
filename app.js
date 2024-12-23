const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors'); // استيراد مكتبة cors
const app = express();

const sequelize = require('./config/database');
const User = require('./models/userModel'); // تحديث المسار هنا

app.use(cors()); // استخدام cors للسماح بالطلبات من نطاقات مختلفة
app.use(bodyParser.json());

// إعداد المسارات الثابتة لخدمة الملفات من مجلد 'public'
app.use(express.static(path.join(__dirname, 'public')));

// مزامنة الموديل مع قاعدة البيانات
sequelize.sync({ force: true }) // إعادة إنشاء الجداول في قاعدة البيانات
    .then(() => console.log('Database & tables created!'))
    .catch(err => console.error('Error creating tables:', err));

// بيانات وهمية للإعلانات والمتاجر
const ads = [
    { id: 1, title: "عرض خاص!", description: "احصل على خصم 20% في متجر A" },
    { id: 2, title: "منتجات جديدة", description: "استعرض أحدث المنتجات في متجر B" },
];

const topStores = [
    { id: 1, name: "متجر A", rating: 4.8 },
    { id: 2, name: "متجر B", rating: 4.5 },
];

const storeDetails = {
    1: { name: "متجر A", points: 120, offers: ["خصم 20% على الشراء القادم", "اشترِ واحدًا واحصل على الآخر مجانًا"] },
    2: { name: "متجر B", points: 150, offers: ["شحن مجاني على الطلبات التي تزيد عن 50$", "استرجاع نقدي 10%"] },
};

// سجل وهمي لنقاط المستخدمين
const pointsLog = {
    1: [
        { date: "2024-01-01", details: "إضافة 20 نقطة" },
        { date: "2024-01-05", details: "استبدال 10 نقاط بخصم" },
    ],
    2: [
        { date: "2024-01-02", details: "إضافة 30 نقطة" },
        { date: "2024-01-06", details: "استبدال 20 نقطة بخصم" },
    ],
};

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

        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ message: "تم تسجيل الدخول بنجاح", user });
        } else {
            res.status(401).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: "حدث خطأ أثناء تسجيل الدخول" });
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

const PORT = process.env.PORT || 9004;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
