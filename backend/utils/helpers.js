const User = require('../models/User');
const crypto = require('crypto');

// دالة لإنشاء كود فريد للمستخدم
const generateUniqueCode = async () => {
    let isUnique = false;
    let uniqueCode;

    while (!isUnique) {
        // إنشاء كود عشوائي من 8 خانات
        uniqueCode = crypto.randomBytes(4).toString('hex').toUpperCase();
        
        // التحقق من عدم وجود الكود مسبقاً
        const existingUser = await User.findOne({ where: { uniqueCode } });
        if (!existingUser) {
            isUnique = true;
        }
    }

    return uniqueCode;
};

// دالة لتنظيف وتنسيق رقم الهاتف
const formatPhoneNumber = (phone) => {
    // إزالة كل شيء ما عدا الأرقام
    const cleaned = phone.replace(/\D/g, '');
    
    // إضافة رمز البلد إذا لم يكن موجوداً
    if (!cleaned.startsWith('966')) {
        return `966${cleaned.startsWith('0') ? cleaned.slice(1) : cleaned}`;
    }
    
    return cleaned;
};

// دالة للتحقق من صلاحية رقم الهاتف
const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^(966|0)(5[0-9]{8})$/;
    return phoneRegex.test(phone);
};

// دالة لإنشاء رقم تسلسلي للفاتورة
const generateInvoiceNumber = () => {
    const prefix = 'INV';
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
};

module.exports = {
    generateUniqueCode,
    formatPhoneNumber,
    isValidPhoneNumber,
    generateInvoiceNumber
};
