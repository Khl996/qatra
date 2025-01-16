// ملف purchaseController.js: إدارة عمليات المشتريات
// المسار: backend/controllers/purchaseController.js

const { Op } = require('sequelize');
const Purchase = require('../models/Purchase');
const Point = require('../models/Point');
const Store = require('../models/Store');

// فلترة المشتريات بناءً على التاريخ
exports.filterPurchases = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const purchases = await Purchase.findAll({
            where: {
                date: {
                    [Op.between]: [new Date(startDate), new Date(endDate)],
                },
            },
        });

        res.status(200).json({ message: 'Purchases filtered successfully', purchases });
    } catch (error) {
        res.status(500).json({ message: 'Error filtering purchases', error: error.message });
    }
};

const purchaseController = {
    createPurchase: async (req, res) => {
        try {
            const { storeId, amount } = req.body;
            const userId = req.user.id;

            const purchase = await Purchase.create({
                userId,
                storeId,
                amount
            });

            // إضافة النقاط
            const pointsToAdd = Math.floor(amount / 10); // مثال: نقطة لكل 10 ريال
            await Point.create({
                userId,
                storeId,
                points: pointsToAdd
            });

            res.status(201).json({ purchase, pointsAdded: pointsToAdd });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUserPurchases: async (req, res) => {
        try {
            const purchases = await Purchase.findAll({
                where: { userId: req.user.id },
                include: [{ model: Store, as: 'store' }]
            });
            res.json(purchases);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = purchaseController;
