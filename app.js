const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // إضافة JWT
const { body, validationResult } = require('express-validator'); // إضافة express-validator
const app = express();

const sequelize = require('./config/database');
const User = require('./models/userModel');
const Store = require('./models/storeModel'); // استيراد نموذج المتجر
const Ad = require('./models/adModel'); // استيراد نموذج الإعلان
const StoreRequest = require('./models/storeRequestModel'); // استيراد نموذج طلب المتجر

const corsOptions = {
    origin: 'http://localhost:9005', // استخدام المنفذ 9005
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // إذا كنت تستخدم الكوكيز
};

app.use(cors(corsOptions)); // استخدام cors للسماح بالطلبات من نطاقات مختلفة
app.use(bodyParser.json());

// تعريف سجل النقاط الوهمي لتخزين نقاط المتاجر
const pointsLog = {}; // أضف هذا السطر هنا

// إعداد المسارات الثابتة لخدمة الملفات من مجلد 'public'
app.use(express.static(path.join(__dirname, 'public')));

// مزامنة الموديل مع قاعدة البيانات
sequelize.sync({ alter: true }) // تحديث الجداول بدلاً من إعادة إنشائها
    .then(() => console.log('Database & tables synced!'))
    .catch(err => console.error('Error syncing tables:', err));
// مسار تسجيل المستخدمين
app.post('/auth/register', [
    body('username').isString().notEmpty().withMessage('يجب إدخال اسم المستخدم'),
    body('email').isEmail().withMessage('البريد الإلكتروني غير صالح'),
    body('phone').isString().notEmpty().withMessage('يجب إدخال رقم الهاتف'),
    body('password').isLength({ min: 6 }).withMessage('يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, phone, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userNumber = `user-${Date.now()}`;

        const user = await User.create({ username, email, phone, password: hashedPassword, userNumber });

        res.json({ message: "تم التسجيل بنجاح", user });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء التسجيل", error: error.message });
    }
});

// مسار تسجيل الدخول
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                // توليد JWT
                const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
                res.json({ message: "تم تسجيل الدخول بنجاح", token });
            } else {
                res.status(401).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
            }
        } else {
            res.status(401).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
        }
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء تسجيل الدخول" });
    }
});

// ميدل وير للتحقق من JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, 'your_secret_key', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// حماية المسارات الخاصة بالإدارة باستخدام JWT
app.use('/api/admin', authenticateJWT);

// مسار إضافة إعلان جديد بواسطة الإدارة
app.post('/api/admin/ads', async (req, res) => {
    const { title, description, storeId } = req.body;

    try {
        const ad = await Ad.create({ title, description, storeId });

        res.json({ message: "تم إضافة الإعلان بنجاح", ad });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء إضافة الإعلان", error: error.message });
    }
});

// مسار الحصول على الإعلانات
app.get('/api/ads', async (req, res) => {
    try {
        const ads = await Ad.findAll();
        res.json(ads);
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء جلب الإعلانات", error: error.message });
    }
});
// مسار إضافة متجر جديد بواسطة الإدارة
app.post('/api/admin/stores', async (req, res) => {
    const { name, rating } = req.body;

    try {
        const store = await Store.create({ name, rating });

        res.json({ message: "تم إضافة المتجر بنجاح", store });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء إضافة المتجر", error: error.message });
    }
});

// مسار إرسال طلب فتح حساب متجر
app.post('/api/store-requests', async (req, res) => {
    const { storeName, ownerName, email, phone } = req.body;

    try {
        // حفظ الطلب في قاعدة البيانات
        const request = await StoreRequest.create({ storeName, ownerName, email, phone });
        res.json({ message: "تم إرسال الطلب بنجاح", request });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء إرسال الطلب", error: error.message });
    }
});

// مسار جلب جميع طلبات فتح الحسابات
app.get('/api/store-requests', async (req, res) => {
    try {
        const requests = await StoreRequest.findAll();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء جلب طلبات فتح الحسابات", error: error.message });
    }
});

// مسار الموافقة على طلب فتح الحساب
app.post('/api/store-requests/:id/approve', async (req, res) => {
    const requestId = req.params.id;

    try {
        const request = await StoreRequest.findByPk(requestId);

        if (request) {
            // هنا يمكننا إنشاء متجر بناءً على بيانات الطلب
            await Store.create({ name: request.storeName, rating: 0 });
            await request.destroy();
            res.json({ message: "تمت الموافقة على الطلب بنجاح" });
        } else {
            res.status(404).json({ message: "لم يتم العثور على الطلب" });
        }
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء الموافقة على الطلب", error: error.message });
    }
});

// مسار رفض طلب فتح الحساب
app.post('/api/store-requests/:id/reject', async (req, res) => {
    const requestId = req.params.id;

    try {
        const request = await StoreRequest.findByPk(requestId);

        if (request) {
            await request.destroy();
            res.json({ message: "تم رفض الطلب بنجاح" });
        } else {
            res.status(404).json({ message: "لم يتم العثور على الطلب" });
        }
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء رفض الطلب", error: error.message });
    }
});
// مسار تحديث معلومات المتجر
app.put('/api/admin/stores/:id', async (req, res) => {
    const storeId = req.params.id;
    const { name, rating } = req.body;

    try {
        const store = await Store.findByPk(storeId);

        if (store) {
            store.name = name || store.name;
            store.rating = rating || store.rating;
            await store.save();
            res.json({ message: "تم تحديث معلومات المتجر بنجاح", store });
        } else {
            res.status(404).json({ message: "لم يتم العثور على المتجر" });
        }
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء تحديث المتجر", error: error.message });
    }
});

// مسار حذف متجر
app.delete('/api/admin/stores/:id', async (req, res) => {
    const storeId = req.params.id;

    try {
        const store = await Store.findByPk(storeId);

        if (store) {
            await store.destroy();
            res.json({ message: "تم حذف المتجر بنجاح" });
        } else {
            res.status(404).json({ message: "لم يتم العثور على المتجر" });
        }
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء حذف المتجر", error: error.message });
    }
});

// مسار حذف إعلان
app.delete('/api/admin/ads/:id', async (req, res) => {
    const adId = req.params.id;

    try {
        const ad = await Ad.findByPk(adId);

        if (ad) {
            await ad.destroy();
            res.json({ message: "تم حذف الإعلان بنجاح" });
        } else {
            res.status(404).json({ message: "لم يتم العثور على الإعلان" });
        }
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء حذف الإعلان", error: error.message });
    }
});

// مسار عرض تفاصيل متجر معين
app.get('/api/stores/:id', async (req, res) => {
    const storeId = req.params.id;

    try {
        const store = await Store.findByPk(storeId);

        if (store) {
            res.json(store);
        } else {
            res.status(404).json({ message: "لم يتم العثور على المتجر" });
        }
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء جلب تفاصيل المتجر", error: error.message });
    }
});
// مسار عرض سجل النقاط لمتجر معين
app.get('/api/stores/:id/points-log', async (req, res) => {
    const storeId = req.params.id;

    try {
        const log = pointsLog[storeId];

        if (log) {
            res.json(log);
        } else {
            res.status(404).json({ message: "لم يتم العثور على سجل النقاط" });
        }
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء جلب سجل النقاط", error: error.message });
    }
});

// مسار إضافة النقاط للمستخدمين مع التحقق من صحة البيانات
app.post('/api/store/:id/add-points', [
    body('userId').isString().notEmpty().withMessage('يجب إدخال معرف المستخدم'),
    body('amount').isNumeric().notEmpty().withMessage('يجب إدخال مبلغ صحيح')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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


// مسار تحديث بيانات المستخدم
app.put('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, email, phone } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (user) {
            user.username = username || user.username;
            user.email = email || user.email;
            user.phone = phone || user.phone;
            await user.save();
            res.json({ message: "تم تحديث بيانات المستخدم بنجاح", user });
        } else {
            res.status(404).json({ message: "لم يتم العثور على المستخدم" });
        }
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء تحديث بيانات المستخدم", error: error.message });
    }
});

// مسار حذف مستخدم
app.delete('/api/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);

        if (user) {
            await user.destroy();
            res.json({ message: "تم حذف المستخدم بنجاح" });
        } else {
            res.status(404).json({ message: "لم يتم العثور على المستخدم" });
        }
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء حذف المستخدم", error: error.message });
    }
});
// مسار عرض جميع المتاجر
app.get('/api/stores', async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء جلب المتاجر", error: error.message });
    }
});

// مسار عرض جميع المستخدمين
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء جلب المستخدمين", error: error.message });
    }
});

// إضافة المسار للصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// إضافة المسارات لشاشات مختلفة
app.get('/welcome', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/request-store', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'requestStore.html'));
});

app.get('/admin-panel', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'adminPanel.html'));
});

app.get('/add-points', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addPoints.html'));
});

const PORT = process.env.PORT || 9005;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
