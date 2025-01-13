// ملف Store.js: تعريف نموذج المتجر
// المسار: backend/models/Store.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Point = require('./Point');

const Store = sequelize.define('Store', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending', // القيم المتوقعة: "pending", "approved", "rejected"
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'Stores',
});

// تعريف العلاقة بين المتجر والنقاط
Store.hasMany(Point, { foreignKey: 'storeId' });
Point.belongsTo(Store, { foreignKey: 'storeId' });

module.exports = Store;
