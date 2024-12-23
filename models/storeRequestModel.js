const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const StoreRequest = sequelize.define('StoreRequest', {
    storeName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ownerName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = StoreRequest;
