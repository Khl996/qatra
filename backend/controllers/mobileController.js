const User = require('../models/User');
const Store = require('../models/Store');
const jwt = require('jsonwebtoken');

exports.getNearbyStores = async (req, res) => {
    try {
        const { latitude, longitude, radius } = req.query;
        const stores = await Store.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: parseInt(radius) || 5000 // بالمتر
                }
            }
        });
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserPoints = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('points pointsHistory');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAvailableOffers = async (req, res) => {
    try {
        const offers = await Store.find({ 
            'offers.status': 'active',
            'offers.endDate': { $gt: new Date() }
        });
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
