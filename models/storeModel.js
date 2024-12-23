const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Store = sequelize.define('Store', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

module.exports = Store;
