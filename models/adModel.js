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
            model: 'Stores', // الربط مع جدول Stores
            key: 'id'
        }
    }
});

module.exports = Ad;
