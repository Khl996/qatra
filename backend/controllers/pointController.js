// ملف pointController.js: إدارة عمليات النقاط
// المسار: backend/controllers/pointController.js

const Point = require('../models/Point');

const pointController = {
    getUserPoints: async (req, res) => {
        try {
            const points = await Point.findAll({
                where: { userId: req.user.id }
            });
            res.json(points);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    addPoints: async (req, res) => {
        try {
            const { storeId, points } = req.body;
            const newPoints = await Point.create({
                userId: req.user.id,
                storeId,
                points
            });
            res.status(201).json(newPoints);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = pointController;
