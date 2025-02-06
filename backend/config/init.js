const sequelize = require('./database');
const User = require('../models/User');
const Store = require('../models/Store');
const Point = require('../models/Point');
const Offer = require('../models/Offer');
const Purchase = require('../models/Purchase');
const Review = require('../models/Review');
const Notification = require('../models/Notification');

const initDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully');
    } catch (error) {
        console.error('Database sync error:', error);
        process.exit(1);
    }
};

module.exports = initDatabase;
