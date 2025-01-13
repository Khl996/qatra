// ملف Purchase.js: تعريف نموذج سجل المشتريات
// المسار: backend/models/Purchase.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Purchase = sequelize.define('Purchase', {
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
        },
    },
    item: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true,
    tableName: 'Purchases',
});

module.exports = Purchase;
