const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// وظيفة لتوليد رقم فريد
const generateUniqueNumber = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
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
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: generateUniqueNumber,
    },
}, {
    timestamps: true,
});

module.exports = User;
