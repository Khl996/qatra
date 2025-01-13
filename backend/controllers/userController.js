// ملف userController.js: إدارة عمليات المستخدمين
// المسار: backend/controllers/userController.js

const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User profile retrieved successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    const { userId } = req.params;
    const { name, email, phone } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        await user.save();

        res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
};

exports.getUserPurchaseHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        // إضافة منطق استخراج سجل المشتريات عند توفر الجدول المناسب
        res.status(200).json({ message: 'User purchase history retrieved successfully', history: [] });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user purchase history', error: error.message });
    }
};
