const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
    },
    userNumber: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
});

module.exports = User;
