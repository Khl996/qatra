const sequelize = require('../config/database');
const User = require('../models/User');
const Store = require('../models/Store');
const Point = require('../models/Point');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

async function seedTestData() {
    try {
        console.log('🔄 جاري الاتصال بقاعدة البيانات...');
        await sequelize.authenticate();
        console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');

        console.log('🔄 جاري مزامنة الجداول...');
        await sequelize.sync({ force: true }); // إعادة إنشاء الجداول
        console.log('✅ تم مزامنة الجداول بنجاح');

        console.log('🔄 جاري إضافة المستخدمين...');
        const hashedPassword = await bcrypt.hash('Test123!@#', 10);
        const users = await User.bulkCreate([
            {
                name: 'محمد أحمد',
                email: 'mohammed@test.com',
                phone: '0501234567',
                password: hashedPassword,
                uniqueCode: '12345678',
                status: 'active'
            },
            {
                name: 'سارة علي',
                email: 'sara@test.com',
                phone: '0507654321',
                password: hashedPassword,
                uniqueCode: '87654321',
                status: 'active'
            }
        ]);
        console.log('✅ تم إضافة المستخدمين بنجاح');

        console.log('🔄 جاري إضافة المتاجر...');
        const stores = await Store.bulkCreate([
            {
                name: 'كافيه السعادة',
                email: 'cafe@test.com',
                phone: '0541234567',
                category: 'مقاهي',
                status: 'approved',
                password: hashedPassword,
                location: { type: 'Point', coordinates: [24.7136, 46.6753] }
            },
            {
                name: 'مطعم الذواق',
                email: 'restaurant@test.com',
                phone: '0547654321',
                category: 'مطاعم',
                status: 'approved',
                password: hashedPassword,
                location: { type: 'Point', coordinates: [24.7136, 46.6753] }
            }
        ]);
        console.log('✅ تم إضافة المتاجر بنجاح');

        console.log('🔄 جاري إضافة النقاط...');
        await Point.bulkCreate([
            {
                userId: users[0].id,
                storeId: stores[0].id,
                points: 100,
                transactionAmount: 200.00, // تحديث اسم العمود ليطابق النموذج
                description: 'مشتريات كافيه'
            },
            {
                userId: users[1].id,
                storeId: stores[1].id,
                points: 150,
                transactionAmount: 300.00, // تحديث اسم العمود ليطابق النموذج
                description: 'وجبة عشاء'
            }
        ]);
        console.log('✅ تم إضافة النقاط بنجاح');

        console.log('🔄 جاري إضافة المسؤول...');
        const adminHashedPassword = await bcrypt.hash('Admin@123', 10);
        await Admin.create({
            name: 'مسؤول النظام',
            email: 'admin@qatra.com',
            password: adminHashedPassword,
            role: 'super_admin',
            status: 'active'
        });
        console.log('✅ تم إضافة المسؤول بنجاح');

        console.log('✅ تم إضافة جميع البيانات التجريبية بنجاح');
    } catch (error) {
        console.error('❌ خطأ:', error);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
}

// تنفيذ الدالة
console.log('🚀 بدء إضافة البيانات التجريبية...');
seedTestData();
