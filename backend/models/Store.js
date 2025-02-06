// ملف Store.js: تعريف نموذج المتجر
// المسار: backend/models/Store.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // تصحيح الاستيراد

const Store = sequelize.define('Store', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    workingHours: {
        type: DataTypes.JSON,
        allowNull: true
    },
    attachments: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    rejectionReason: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'Stores',
    underscored: true
});

module.exports = Store;
