const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// مسار تسجيل المستخدم الجديد
app.post('/auth/register', (req, res) => {
    const { username, email, phone, password } = req.body;
    // منطق التسجيل هنا
    res.json({ message: 'تم التسجيل بنجاح!' });
});

// مسار تسجيل دخول المستخدم
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    // منطق تسجيل الدخول هنا
    res.json({ token: 'sample-token' });
});

// مسار تسجيل دخول المتجر
app.post('/auth/store-login', (req, res) => {
    const { username, password } = req.body;
    // منطق تسجيل الدخول هنا
    res.json({ token: 'store-sample-token' });
});

// مسار الحصول على قائمة المستخدمين
app.get('/api/admin/users', (req, res) => {
    // منطق الحصول على قائمة المستخدمين هنا
    res.json([
        { id: 1, username: 'user1', email: 'user1@example.com', phone: '1234567890', uniqueId: 'uid1' },
        { id: 2, username: 'user2', email: 'user2@example.com', phone: '0987654321', uniqueId: 'uid2' }
    ]);
});

// مسار حذف مستخدم
app.delete('/api/admin/users/:userId', (req, res) => {
    const { userId } = req.params;
    // منطق حذف المستخدم هنا
    res.json({ message: `تم حذف المستخدم ${userId} بنجاح!` });
});

// مسار الحصول على قائمة المتاجر
app.get('/api/admin/stores', (req, res) => {
    // منطق الحصول على قائمة المتاجر هنا
    res.json([
        { id: 1, name: 'متجر 1', category: 'مطعم', description: 'وصف متجر 1' },
        { id: 2, name: 'متجر 2', category: 'مقهى', description: 'وصف متجر 2' }
    ]);
});

// مسار حذف متجر
app.delete('/api/admin/stores/:storeId', (req, res) => {
    const { storeId } = req.params;
    // منطق حذف المتجر هنا
    res.json({ message: `تم حذف المتجر ${storeId} بنجاح!` });
});

// مسار إنشاء كود الخصم
app.post('/api/admin/discounts', (req, res) => {
    const { code, description, expiry } = req.body;
    // منطق إنشاء كود الخصم هنا
    res.json({ message: 'تم إنشاء كود الخصم بنجاح!' });
});

// مسار الحصول على الأكواد
app.get('/api/admin/discounts', (req, res) => {
    // منطق الحصول على الأكواد هنا
    res.json([
        { id: 1, code: 'DISCOUNT1', description: 'خصم 10%', expiry: '2024-12-31' },
        { id: 2, code: 'DISCOUNT2', description: 'خصم 20%', expiry: '2024-11-30' }
    ]);
});

// مسار حذف كود الخصم
app.delete('/api/admin/discounts/:discountId', (req, res) => {
    const { discountId } = req.params;
    // منطق حذف كود الخصم هنا
    res.json({ message: `تم حذف كود الخصم ${discountId} بنجاح!` });
});

// مسار إضافة إعلان
app.post('/api/admin/ads', (req, res) => {
    const { title, description, image } = req.body;
    // منطق إضافة الإعلان هنا
    res.json({ message: 'تمت إضافة الإعلان بنجاح!' });
});

// مسار الحصول على الإعلانات
app.get('/api/admin/ads', (req, res) => {
    // منطق الحصول على الإعلانات هنا
    res.json([
        { id: 1, title: 'إعلان 1', description: 'وصف إعلان 1', image: 'https://example.com/ad1.jpg' },
        { id: 2, title: 'إعلان 2', description: 'وصف إعلان 2', image: 'https://example.com/ad2.jpg' }
    ]);
});

// مسار حذف إعلان
app.delete('/api/admin/ads/:adId', (req, res) => {
    const { adId } = req.params;
    // منطق حذف الإعلان هنا
    res.json({ message: `تم حذف الإعلان ${adId} بنجاح!` });
});

// مسار الحصول على التقارير المالية
app.get('/api/admin/reports', (req, res) => {
    // منطق الحصول على التقارير المالية هنا
    res.json({ message: 'التقارير المالية' });
});

// مسار إعداد مصادقة ثنائية
app.post('/api/admin/settings/2fa', (req, res) => {
    // منطق إعداد المصادقة الثنائية هنا
    res.json({ message: 'تم تمكين المصادقة الثنائية بنجاح!' });
});

// بدء تشغيل الخادم
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
