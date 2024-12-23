# مشروع قطرة

## مقدمة
مشروع "قطرة" هو تطبيق يهدف إلى تقديم تجربة مميزة للمستخدمين والمتاجر من خلال نظام نقاط ولاء وعروض خاصة.

## التقنيات المستخدمة
- HTML
- CSS
- JavaScript
- Node.js/Express
- Sequelize
- PostgreSQL
- SQLite
- dotenv

## إعداد المشروع

### 1. تهيئة مشروع Node.js
تم تهيئة المشروع باستخدام npm وتثبيت الحزم المطلوبة.

### 2. إنشاء هيكلية المجلدات
تم إنشاء المجلدات الأساسية: `models`, `routes`, `controllers`, `middleware`, `config`, `public`.

## إعداد قاعدة البيانات والموديل

### 1. إعداد قاعدة البيانات
تم إعداد قاعدة البيانات باستخدام SQLite وPostgreSQL، وتم تهيئة ملف `database.js` لاستخدام متغيرات البيئة.

### 2. إنشاء الموديل
تم إنشاء موديل `User` في ملف `userModel.js`.

## إعداد التحكم والروابط

### 1. إنشاء وحدات التحكم
تم إعداد `authController.js` للتحكم في التسجيل وتسجيل الدخول.

### 2. إنشاء الروابط
تم إعداد `authRoutes.js` لإدارة مسارات التسجيل وتسجيل الدخول.

## تطوير الواجهة الأمامية

### 1. إنشاء صفحات HTML وCSS
تم إنشاء الملفات: `index.html`, `styles.css`.

### 2. إعداد الصفحة الرئيسية للمستخدمين
تم عرض إعلانات المتاجر المدفوعة وقائمة المتاجر الأكثر طلبًا والأعلى تقييمًا.

### 3. إضافة صفحة تفاصيل المتجر
تم إنشاء ملف `store.html` وربط المتاجر في الصفحة الرئيسية بصفحة تفاصيل المتجر.

## اختبار المشروع

### 1. اختبار الوظائف الأساسية باستخدام Postman
تم اختبار وظائف التسجيل وتسجيل الدخول وعرض البيانات في الصفحة الرئيسية وصفحة تفاصيل المتجر.

## الخطوات التالية

### 1. تطوير شاشة الترحيب وتسجيل الدخول
### 2. إضافة سجل إضافة واستبدال النقاط في صفحة المتجر
### 3. تطوير واجهة المتاجر ولوحة التحكم
### 4. تطوير واجهة إدارة التطبيق وإدارة أكواد الخصم وتقارير الأداء والمبيعات
### 5. توسيع التطبيق ليعمل على iOS و Android و صفحة ويب
### 6. تحسين التوثيق وإجراء الاختبارات الشاملة

