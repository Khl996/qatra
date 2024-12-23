const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Ad = sequelize.define('Ad', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    storeId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Stores', // اسم الجدول الذي يحتوي على المتاجر
            key: 'id'
        }
    }
});

module.exports = Ad;
