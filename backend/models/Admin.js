// ملف Admin.js: تعريف نموذج حسابات الإدارة
// المسار: backend/models/Admin.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // تغيير طريقة الاستيراد

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('super_admin', 'admin'),
        defaultValue: 'admin'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
}, {
    timestamps: true,
    tableName: 'Admins',
    underscored: true
});

module.exports = Admin;
