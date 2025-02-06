// ملف associations.js: إعداد العلاقات بين النماذج
// المسار: backend/models/associations.js

const User = require('./User');
const Store = require('./Store');
const Point = require('./Point'); // تعديل الاستيراد
const Offer = require('./Offer');
const Purchase = require('./Purchase');
const Review = require('./Review');

// علاقة النقاط مع المستخدمين والمتاجر
Point.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Point, { foreignKey: 'userId', as: 'points' });

Point.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });
Store.hasMany(Point, { foreignKey: 'storeId', as: 'points' });

// علاقة العروض مع المتاجر
Offer.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });
Store.hasMany(Offer, { foreignKey: 'storeId', as: 'offers' });

// علاقة المشتريات مع المستخدمين
Purchase.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Purchase, { foreignKey: 'userId', as: 'purchases' });

// علاقة التقييمات
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Review.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Store.hasMany(Review, { foreignKey: 'storeId', as: 'reviews' });

module.exports = () => {
    console.log('Associations have been set up successfully.');
};
