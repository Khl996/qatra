// ملف adminRoutes.js: تعريف مسارات الإدارة
// المسار: backend/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { Op, fn, col } = require('sequelize'); // إضافة استيراد Op وأدوات أخرى
const sequelize = require('../config/database');
// تصحيح مسار الاستيراد
const { Store, User, Point } = require('../models/relationships'); // تحديث الاستيراد ليستخدم العلاقات
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models/relationships');

// إحصائيات لوحة التحكم
router.get('/dashboard/stats', async (req, res) => {
    try {
        console.log('Fetching dashboard stats...'); // للتأكد من وصول الطلب

        const stats = {
            usersCount: await User.count(),
            storesCount: await Store.count(),
            pendingStoresCount: await Store.count({ where: { status: 'pending' } }),
            totalPoints: await Point.sum('points') || 0,
            totalSales: await Point.sum('transactionAmount') || 0
        };

        console.log('Stats:', stats); // للتأكد من البيانات
        res.json(stats);
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ error: 'خطأ في جلب البيانات' });
    }
});

// قائمة المتاجر
router.get('/stores', async (req, res) => {
    try {
        console.log('Fetching stores...'); // للتأكد من وصول الطلب

        const stores = await Store.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'name', 'category', 'status', 'createdAt']
        });

        console.log('Stores:', stores); // للتأكد من البيانات
        res.json({ stores });
    } catch (error) {
        console.error('Stores error:', error);
        res.status(500).json({ error: 'خطأ في جلب بيانات المتاجر' });
    }
});

// إضافة مسار جديد لجلب الإشعارات
router.get('/notifications', async (req, res) => {
    try {
        const notifications = await Store.findAll({
            where: { status: 'pending' },
            attributes: ['id', 'name', 'createdAt'],
            limit: 5,
            order: [['createdAt', 'DESC']]
        });

        const formattedNotifications = notifications.map(store => ({
            id: store.id,
            title: 'طلب متجر جديد',
            desc: `طلب انضمام من ${store.name}`,
            time: new Date(store.createdAt).toLocaleDateString('ar-SA'),
            type: 'store'
        }));

        res.json(formattedNotifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'خطأ في جلب الإشعارات' });
    }
});

// الموافقة على المتجر
router.put('/stores/:storeId/approve', async (req, res) => {
    try {
        const { storeId } = req.params;
        const store = await Store.findByPk(storeId);
        
        if (!store) {
            return res.status(404).json({ error: 'المتجر غير موجود' });
        }

        await store.update({ 
            status: 'approved',
            rejectionReason: null
        });

        // إرسال إشعار للمتجر (يمكن إضافة هذه الميزة لاحقاً)
        
        res.json({
            message: 'تم قبول المتجر بنجاح',
            store
        });
    } catch (error) {
        console.error('Error approving store:', error);
        res.status(500).json({ error: 'خطأ في قبول المتجر' });
    }
});

// رفض المتجر
router.put('/stores/:storeId/reject', async (req, res) => {
    try {
        const { storeId } = req.params;
        const { reason } = req.body;
        
        const store = await Store.findByPk(storeId);
        
        if (!store) {
            return res.status(404).json({ error: 'المتجر غير موجود' });
        }

        await store.update({ 
            status: 'rejected',
            rejectionReason: reason
        });

        // إرسال إشعار للمتجر
        
        res.json({
            message: 'تم رفض المتجر',
            store
        });
    } catch (error) {
        console.error('Error rejecting store:', error);
        res.status(500).json({ error: 'خطأ في رفض المتجر' });
    }
});

// تفاصيل المتجر
router.get('/stores/:storeId', async (req, res) => {
    try {
        const { storeId } = req.params;
        const store = await Store.findByPk(storeId, {
            include: [
                {
                    model: Point,
                    attributes: [
                        [fn('sum', col('transaction_amount')), 'totalSales'],
                        [fn('count', col('id')), 'transactionCount']
                    ]
                }
            ]
        });
        
        if (!store) {
            return res.status(404).json({ error: 'المتجر غير موجود' });
        }

        res.json({ store });
    } catch (error) {
        console.error('Error fetching store details:', error);
        res.status(500).json({ error: 'خطأ في جلب تفاصيل المتجر' });
    }
});

// قائمة المستخدمين
router.get('/users', async (req, res) => {
    try {
        console.log('Fetching users...'); // للتأكد من وصول الطلب
        const users = await User.findAll({
            attributes: [
                'id',
                'name',
                'email',
                'phone',
                'uniqueCode',
                'status',
                'createdAt'
            ],
            order: [['createdAt', 'DESC']]
        });

        console.log(`Found ${users.length} users`); // للتأكد من البيانات
        res.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'خطأ في جلب بيانات المستخدمين' });
    }
});

// حظر/إلغاء حظر مستخدم
router.put('/users/:userId/block', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'المستخدم غير موجود' });
        }

        // تبديل حالة المستخدم
        const newStatus = user.status === 'active' ? 'blocked' : 'active';
        await user.update({ status: newStatus });

        res.json({ 
            message: `تم ${newStatus === 'blocked' ? 'حظر' : 'إلغاء حظر'} المستخدم بنجاح`,
            user
        });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ error: 'خطأ في تحديث حالة المستخدم' });
    }
});

// تقارير النظام
router.get('/reports', async (req, res) => {
    try {
        const { period = 'month' } = req.query;
        const periodMap = {
            week: 7,
            month: 30,
            year: 365
        };
        const days = periodMap[period] || 30;
        const startDate = new Date(new Date() - days * 24 * 60 * 60 * 1000);

        // إحصائيات المبيعات والعمولات
        const stats = await Store.findAll({
            include: [{
                model: Point,
                where: {
                    created_at: { [Op.gte]: startDate }
                },
                attributes: []
            }],
            attributes: [
                'id',
                'name',
                [fn('sum', col('Points.transaction_amount')), 'totalSales'],
                [fn('count', col('Points.id')), 'transactionCount']
            ],
            group: ['Store.id', 'Store.name']
        });

        // البيانات الشهرية للرسم البياني
        const monthlyData = await Point.findAll({
            where: {
                created_at: { [Op.gte]: startDate }
            },
            attributes: [
                [fn('date_trunc', 'day', col('created_at')), 'date'],
                [fn('sum', col('transaction_amount')), 'sales']
            ],
            group: [fn('date_trunc', 'day', col('created_at'))],
            order: [[fn('date_trunc', 'day', col('created_at')), 'ASC']]
        });

        // تنسيق البيانات
        const formattedStats = stats.map(store => ({
            id: store.id,
            name: store.name,
            totalSales: parseFloat(store.getDataValue('totalSales') || 0),
            commission: parseFloat(store.getDataValue('totalSales') || 0) * 0.05,
            transactionCount: parseInt(store.getDataValue('transactionCount') || 0)
        }));

        const chartData = {
            labels: monthlyData.map(d => new Date(d.get('date')).toLocaleDateString('ar-SA')),
            sales: monthlyData.map(d => parseFloat(d.get('sales') || 0)),
            commissions: monthlyData.map(d => parseFloat(d.get('sales') || 0) * 0.05)
        };

        res.json({
            totalSales: formattedStats.reduce((acc, curr) => acc + curr.totalSales, 0),
            totalCommissions: formattedStats.reduce((acc, curr) => acc + curr.commission, 0),
            storeTransactions: formattedStats,
            monthlyData: chartData
        });
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'خطأ في جلب التقارير' });
    }
});

// تقارير النقاط
router.get('/reports/points', async (req, res) => {
    try {
        const { period = 'month' } = req.query;
        const startDate = getStartDate(period);

        const pointsStats = await Point.findAll({
            include: [
                { model: Store, attributes: ['name'] },
                { model: User, attributes: ['name'] }
            ],
            where: {
                created_at: { [Op.gte]: startDate }
            },
            attributes: [
                [fn('sum', col('points')), 'totalPoints'],
                [fn('avg', col('points')), 'avgPoints'],
                [fn('count', col('id')), 'transactionCount']
            ],
            group: ['Store.id', 'Store.name', 'User.id', 'User.name']
        });

        res.json({
            pointsStats: pointsStats.map(stat => ({
                storeName: stat.Store.name,
                userName: stat.User.name,
                totalPoints: parseInt(stat.get('totalPoints') || 0),
                avgPoints: parseFloat(stat.get('avgPoints') || 0),
                transactionCount: parseInt(stat.get('transactionCount') || 0)
            }))
        });
    } catch (error) {
        console.error('Error fetching points stats:', error);
        res.status(500).json({ error: 'خطأ في جلب إحصائيات النقاط' });
    }
});

// تقارير أداء المتاجر
router.get('/reports/stores-performance', async (req, res) => {
    try {
        const { period = 'month' } = req.query;
        const startDate = getStartDate(period);

        const storesPerformance = await Store.findAll({
            include: [{
                model: Point,
                where: { created_at: { [Op.gte]: startDate } },
                attributes: []
            }],
            attributes: [
                'id',
                'name',
                'category',
                [fn('sum', col('Points.transaction_amount')), 'totalSales'],
                [fn('sum', col('Points.points')), 'totalPoints'],
                [fn('count', col('Points.id')), 'transactionCount'],
                [fn('avg', col('Points.transaction_amount')), 'avgTransactionAmount']
            ],
            group: ['Store.id', 'Store.name', 'Store.category'],
            order: [[fn('sum', col('Points.transaction_amount')), 'DESC']]
        });

        const rankings = storesPerformance.map((store, index) => ({
            rank: index + 1,
            id: store.id,
            name: store.name,
            category: store.category,
            totalSales: parseFloat(store.get('totalSales') || 0),
            totalPoints: parseInt(store.get('totalPoints') || 0),
            transactionCount: parseInt(store.get('transactionCount') || 0),
            avgTransactionAmount: parseFloat(store.get('avgTransactionAmount') || 0),
            commission: parseFloat(store.get('totalSales') || 0) * 0.05
        }));

        res.json({ rankings });
    } catch (error) {
        console.error('Error fetching store performance:', error);
        res.status(500).json({ error: 'خطأ في جلب تقارير أداء المتاجر' });
    }
});

// تقارير العمليات
router.get('/reports/transactions', async (req, res) => {
    try {
        const { startDate, endDate, storeId } = req.query;
        const where = {
            created_at: {
                [Op.between]: [
                    startDate || new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
                    endDate || new Date()
                ]
            },
            ...(storeId && { store_id: storeId })
        };

        const transactions = await Point.findAll({
            where,
            include: [
                { model: Store, attributes: ['name', 'category'] },
                { model: User, attributes: ['name'] }
            ],
            order: [['created_at', 'DESC']]
        });

        const summary = {
            totalTransactions: transactions.length,
            totalAmount: transactions.reduce((sum, t) => sum + parseFloat(t.transaction_amount), 0),
            totalPoints: transactions.reduce((sum, t) => sum + t.points, 0),
            avgTransactionAmount: transactions.length ? 
                transactions.reduce((sum, t) => sum + parseFloat(t.transaction_amount), 0) / transactions.length : 0
        };

        res.json({
            transactions: transactions.map(t => ({
                id: t.id,
                storeName: t.Store.name,
                storeCategory: t.Store.category,
                userName: t.User.name,
                amount: parseFloat(t.transaction_amount),
                points: t.points,
                date: t.created_at,
                description: t.description
            })),
            summary
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'خطأ في جلب تقارير العمليات' });
    }
});

// الفواتير المالية
router.get('/finance/invoices', async (req, res) => {
    try {
        const { status = 'all' } = req.query;
        let where = {};
        
        if (status !== 'all') {
            where.status = status;
        }

        const invoices = await Point.findAll({
            where,
            include: [
                { 
                    model: Store,
                    attributes: ['name', 'category']
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ],
            attributes: [
                'id',
                'transaction_amount',
                'points',
                'created_at',
                'status',
                'description'
            ],
            order: [['created_at', 'DESC']]
        });

        const formattedInvoices = invoices.map(invoice => ({
            id: invoice.id,
            storeName: invoice.Store.name,
            userName: invoice.User.name,
            category: invoice.Store.category,
            amount: parseFloat(invoice.transaction_amount),
            commission: parseFloat(invoice.transaction_amount) * 0.05,
            points: invoice.points,
            date: invoice.created_at,
            status: invoice.status,
            description: invoice.description
        }));

        const summary = {
            totalAmount: formattedInvoices.reduce((sum, inv) => sum + inv.amount, 0),
            totalCommission: formattedInvoices.reduce((sum, inv) => sum + inv.commission, 0),
            totalPoints: formattedInvoices.reduce((sum, inv) => sum + inv.points, 0),
            count: formattedInvoices.length
        };

        console.log('Sending invoices:', { 
            count: formattedInvoices.length, 
            summary 
        });

        res.json({
            invoices: formattedInvoices,
            summary
        });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ error: 'خطأ في جلب الفواتير' });
    }
});

// الإحصائيات المالية
router.get('/finance/stats', async (req, res) => {
    try {
        const [dailyStats, monthlyStats, yearlyStats] = await Promise.all([
            getFinancialStats('day'),
            getFinancialStats('month'),
            getFinancialStats('year')
        ]);

        res.json({
            daily: dailyStats,
            monthly: monthlyStats,
            yearly: yearlyStats
        });
    } catch (error) {
        console.error('Error fetching finance stats:', error);
        res.status(500).json({ error: 'خطأ في جلب الإحصائيات المالية' });
    }
});

// دالة مساعدة لحساب الإحصائيات المالية
async function getFinancialStats(period) {
    const date = new Date();
    let startDate;

    switch (period) {
        case 'day':
            startDate = new Date(date.setHours(0,0,0,0));
            break;
        case 'month':
            startDate = new Date(date.getFullYear(), date.getMonth(), 1);
            break;
        case 'year':
            startDate = new Date(date.getFullYear(), 0, 1);
            break;
    }

    const stats = await Point.findAll({
        where: {
            createdAt: {
                [Op.gte]: startDate
            }
        },
        attributes: [
            [fn('sum', col('transactionAmount')), 'totalSales'],
            [fn('sum', col('points')), 'totalPoints'],
            [fn('count', col('id')), 'transactionCount'],
            [sequelize.literal('SUM(transactionAmount * 0.05)'), 'totalCommission']
        ]
    });

    return {
        totalSales: parseFloat(stats[0].get('totalSales') || 0),
        totalPoints: parseInt(stats[0].get('totalPoints') || 0),
        transactionCount: parseInt(stats[0].get('transactionCount') || 0),
        totalCommission: parseFloat(stats[0].get('totalCommission') || 0)
    };
}

// دالة مساعدة لحساب تاريخ البداية
function getStartDate(period) {
    const now = new Date();
    switch (period) {
        case 'week':
            return new Date(now - 7 * 24 * 60 * 60 * 1000);
        case 'month':
            return new Date(now - 30 * 24 * 60 * 60 * 1000);
        case 'year':
            return new Date(now - 365 * 24 * 60 * 60 * 1000);
        default:
            return new Date(now - 30 * 24 * 60 * 60 * 1000);
    }
}

// إحصائيات النظام
router.get('/system/stats', async (req, res) => {
    try {
        const os = require('os');
        const stats = {
            cpu: {
                usage: Math.round(os.loadavg()[0] * 100) / 10,
                cores: os.cpus().length
            },
            memory: {
                total: os.totalmem(),
                free: os.freemem(),
                used: os.totalmem() - os.freemem()
            },
            storage: {
                total: 1000000000000, // مثال: 1TB
                used: 350000000000,   // مثال: 350GB
                free: 650000000000    // مثال: 650GB
            },
            uptime: os.uptime(),
            lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000) // مثال: آخر 24 ساعة
        };
        
        res.json(stats);
    } catch (error) {
        console.error('Error fetching system stats:', error);
        res.status(500).json({ error: 'خطأ في جلب إحصائيات النظام' });
    }
});

// سجل النظام
router.get('/system/activities', async (req, res) => {
    try {
        // يمكن استبدال هذا بقراءة من قاعدة البيانات
        const activities = [
            {
                id: 1,
                type: 'نسخ احتياطي',
                description: 'تم إنشاء نسخة احتياطية للنظام',
                status: 'success',
                timestamp: new Date()
            },
            {
                id: 2,
                type: 'تحديث النظام',
                description: 'تم تحديث إعدادات النظام',
                status: 'success',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
            },
            {
                id: 3,
                type: 'تنبيه',
                description: 'استخدام CPU مرتفع',
                status: 'warning',
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
            }
        ];
        
        res.json(activities);
    } catch (error) {
        console.error('Error fetching system activities:', error);
        res.status(500).json({ error: 'خطأ في جلب سجل النظام' });
    }
});

// الأدوار
router.get('/system/roles', async (req, res) => {
    try {
        // يمكن استبدال هذا بقراءة من قاعدة البيانات
        const roles = [
            {
                id: '1',
                name: 'مدير النظام',
                description: 'صلاحيات كاملة على النظام',
                permissions: ['users_manage', 'stores_manage', 'reports_view', 'system_manage'],
                createdAt: new Date()
            },
            {
                id: '2',
                name: 'مشرف المتاجر',
                description: 'إدارة المتاجر وطلبات الانضمام',
                permissions: ['stores_view', 'stores_manage'],
                createdAt: new Date()
            }
        ];
        res.json({ roles });
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ error: 'خطأ في جلب الأدوار' });
    }
});

// الموظفين
router.get('/system/employees', async (req, res) => {
    try {
        // يمكن استبدال هذا بقراءة من قاعدة البيانات
        const employees = [
            {
                id: '1',
                name: 'أحمد محمد',
                email: 'ahmed@qatra.com',
                role: 'مدير النظام',
                status: 'active'
            },
            {
                id: '2',
                name: 'سارة خالد',
                email: 'sara@qatra.com',
                role: 'مشرف المتاجر',
                status: 'active'
            }
        ];
        res.json({ employees });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'خطأ في جلب الموظفين' });
    }
});

// إنشاء نسخة احتياطية
router.post('/system/backup', async (req, res) => {
    try {
        // يمكن إضافة منطق النسخ الاحتياطي هنا
        setTimeout(() => {
            res.json({ 
                message: 'تم بدء عملية النسخ الاحتياطي بنجاح',
                backupId: Date.now()
            });
        }, 2000);
    } catch (error) {
        console.error('Error creating backup:', error);
        res.status(500).json({ error: 'خطأ في إنشاء النسخة الاحتياطية' });
    }
});

// تسجيل دخول المسؤول
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email }); // للتشخيص

        // التحقق من وجود المسؤول
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            console.log('Admin not found:', email);
            return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
        }

        // التحقق من كلمة المرور
        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            console.log('Invalid password for:', email);
            return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
        }

        // إنشاء توكن
        const token = jwt.sign(
            { 
                id: admin.id,
                role: 'admin',
                email: admin.email
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        console.log('Login successful:', email);

        // إرجاع البيانات
        res.json({
            token,
            user: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            },
            role: 'admin'
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'حدث خطأ في عملية تسجيل الدخول' });
    }
});

module.exports = router;
