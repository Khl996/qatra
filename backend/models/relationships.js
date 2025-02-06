const User = require('./User');
const Store = require('./Store');
const Point = require('./Point');
const Admin = require('./Admin');

// تعريف العلاقات
User.hasMany(Point, { foreignKey: 'userId' });
Point.belongsTo(User, { foreignKey: 'userId' });

Store.hasMany(Point, { foreignKey: 'storeId' });
Point.belongsTo(Store, { foreignKey: 'storeId' });

module.exports = {
    User,
    Store,
    Point,
    Admin
};
