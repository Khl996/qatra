// ملف Point.js: تعريف نموذج النقاط
// المسار: backend/models/Point.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Point = sequelize.define('Point', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'store_id'
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    transactionAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'transaction_amount' // تحديد اسم العمود في قاعدة البيانات
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'completed'
    }
}, {
    timestamps: true,
    underscored: true, // استخدام underscore في أسماء الأعمدة
    tableName: 'Points'
});

module.exports = Point;
