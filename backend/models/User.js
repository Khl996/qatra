// ملف User.js: تعريف نموذج المستخدم
// المسار: backend/models/User.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Point = require('./Point');

const User = sequelize.define('User', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    uniqueCode: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user', // roles: "user", "admin", "sub-admin"
    },
    permissions: {
        type: DataTypes.JSON, // For storing permissions for sub-admins
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active', // "active", "inactive"
    },
}, {
    timestamps: true,
    tableName: 'Users',
});

// تعريف العلاقة بين المستخدم والنقاط
User.hasMany(Point, { foreignKey: 'userId', onDelete: 'CASCADE' });
Point.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
