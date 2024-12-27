const express = require('express');
const { Op } = require('sequelize');
const User = require('../models/User');
const Store = require('../models/Store');
const router = express.Router();

// تقرير: إحصائيات عامة
router.get('/stats', async (req, res) => {
    try {
        const [userCount, storeCount] = await Promise.all([
            User.count(), // عدد المستخدمين
            Store.count(), // عدد المتاجر
        ]);

        res.status(200).json({
            totalUsers: userCount,
            totalStores: storeCount,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Error fetching stats', details: error.message });
    }
});

// تقرير: المبيعات أو النقاط (كمثال)
router.get('/points-summary', async (req, res) => {
    try {
        // هنا يمكنك إضافة جدول خاص بالنقاط لاحقًا.
        const totalPoints = 0; // مجموع النقاط (كمثال placeholder)
        res.status(200).json({ totalPoints });
    } catch (error) {
        console.error('Error fetching points summary:', error);
        res.status(500).json({ error: 'Error fetching points summary', details: error.message });
    }
});

// تقرير: المستخدمين الجدد خلال فترة معينة
router.get('/users/new', async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    try {
        const newUsers = await User.findAll({
            where: {
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)],
                },
            },
        });

        res.status(200).json({ newUsers });
    } catch (error) {
        console.error('Error fetching new users:', error);
        res.status(500).json({ error: 'Error fetching new users', details: error.message });
    }
});

// تقرير: المتاجر الجديدة خلال فترة معينة
router.get('/stores/new', async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    try {
        const newStores = await Store.findAll({
            where: {
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)],
                },
            },
        });

        res.status(200).json({ newStores });
    } catch (error) {
        console.error('Error fetching new stores:', error);
        res.status(500).json({ error: 'Error fetching new stores', details: error.message });
    }
});

// تقرير: المتاجر الأكثر نشاطًا
router.get('/stores/top', async (req, res) => {
    try {
        // افتراض أن جدول الطلبات أو النقاط يحتوي على الحقول المطلوبة
        const topStores = await Store.findAll({
            limit: 5, // عرض أعلى 5 متاجر
            order: [['createdAt', 'DESC']], // ترتيب حسب تاريخ الإنشاء
        });

        res.status(200).json({ topStores });
    } catch (error) {
        console.error('Error fetching top stores:', error);
        res.status(500).json({ error: 'Error fetching top stores', details: error.message });
    }
});

module.exports = router;
