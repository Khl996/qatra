// ملف purchaseController.js: إدارة عمليات المشتريات
// المسار: backend/controllers/purchaseController.js

const { Op } = require('sequelize');
const Purchase = require('../models/Purchase');

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
