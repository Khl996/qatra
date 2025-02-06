const User = require('../models/User');
const crypto = require('crypto');

// دالة لإنشاء كود فريد للمستخدم
const generateUniqueCode = async () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
};

// دالة لتنظيف وتنسيق رقم الهاتف
const formatPhoneNumber = (phone) => {
    return phone.startsWith('+') ? phone : `+${phone}`;
};

module.exports = {
    generateUniqueCode,
    formatPhoneNumber
};
