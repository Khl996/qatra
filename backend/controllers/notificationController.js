const Notification = require('../models/Notification');
const logger = require('../config/logger');

const notificationController = {
    getUserNotifications: async (req, res) => {
        try {
            const notifications = await Notification.findAll({
                where: { 
                    userId: req.user.id,
                    read: false
                },
                order: [['createdAt', 'DESC']],
                limit: 20
            });

            res.json(notifications);
        } catch (error) {
            logger.error('Error fetching notifications:', error);
            res.status(500).json({ message: 'خطأ في جلب الإشعارات' });
        }
    },

    markAsRead: async (req, res) => {
        try {
            await Notification.update(
                { read: true },
                { 
                    where: { 
                        id: req.params.id,
                        userId: req.user.id
                    }
                }
            );
            res.json({ message: 'تم تحديث حالة الإشعار' });
        } catch (error) {
            logger.error('Error marking notification as read:', error);
            res.status(500).json({ message: 'خطأ في تحديث حالة الإشعار' });
        }
    }
};

module.exports = notificationController;
