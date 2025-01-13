// ملف Point.js: تعريف نموذج النقاط
// المسار: backend/models/Point.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Point = sequelize.define('Point', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
            onDelete: 'CASCADE', // إضافة الحذف المتسلسل
        },
    },
    storeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Stores',
            key: 'id',
        },
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: true,
    tableName: 'Points',
});

module.exports = Point;
