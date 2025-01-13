// ملف pointController.js: إدارة عمليات النقاط
// المسار: backend/controllers/pointController.js

const Point = require('../models/Point');

exports.addPoints = async (req, res) => {
    const { userId, storeId, points } = req.body;

    try {
        const newPoint = await Point.create({ userId, storeId, points });
        console.log('Points added successfully');
        res.status(201).json({ message: 'Points added successfully', point: newPoint });
    } catch (error) {
        console.error('Error adding points:', error);
        res.status(500).json({ message: 'Error adding points', error: error.message });
    }
};

exports.getUserPoints = async (req, res) => {
    const { userId } = req.params;

    try {
        const userPoints = await Point.findAll({ where: { userId } });
        res.status(200).json({ message: 'User points retrieved successfully', points: userPoints });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user points', error: error.message });
    }
};
