// ملف pointController.js: إدارة عمليات النقاط
// المسار: backend/controllers/pointController.js

const Point = require('../models/Point');
const User = require('../models/User');
const Store = require('../models/Store');
const logger = require('../config/logger');

const pointController = {
    getUserPoints: async (req, res) => {
        try {
            const totalPoints = await Point.sum('points', {
                where: { userId: req.user.id }
            }) || 0;

            logger.info(`Points fetched for user ${req.user.id}: ${totalPoints}`);
            res.json({ total: totalPoints });
        } catch (error) {
            logger.error('Error fetching user points:', error);
            res.status(500).json({ message: 'خطأ في جلب النقاط' });
        }
    },

    getPointsHistory: async (req, res) => {
        try {
            const history = await Point.findAll({
                where: { userId: req.user.id },
                include: [{
                    model: Store,
                    attributes: ['name', 'id']
                }],
                order: [['createdAt', 'DESC']],
                limit: 50
            });

            res.json(history);
        } catch (error) {
            logger.error('Error fetching points history:', error);
            res.status(500).json({ message: 'خطأ في جلب سجل النقاط' });
        }
    },

    addPoints: async (req, res) => {
        try {
            const { userId, points, transactionAmount } = req.body;
            const newPoints = await Point.create({
                userId,
                storeId: req.store.id,
                points,
                transactionAmount
            });
            res.status(201).json(newPoints);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = pointController;
