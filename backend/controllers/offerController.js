// ملف offerController.js: إدارة عمليات العروض
// المسار: backend/controllers/offerController.js

const Offer = require('../models/Offer');

exports.createOffer = async (req, res) => {
    const { title, description, discount, storeId } = req.body;

    try {
        const newOffer = await Offer.create({ title, description, discount, storeId });
        console.log('Offer created successfully');
        res.status(201).json({ message: 'Offer created successfully', offer: newOffer });
    } catch (error) {
        console.error('Error creating offer:', error);
        res.status(500).json({ message: 'Error creating offer', error: error.message });
    }
};

exports.getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.findAll();
        res.status(200).json({ message: 'All offers retrieved successfully', offers });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving offers', error: error.message });
    }
};

exports.getStoreOffers = async (req, res) => {
    const { storeId } = req.params;

    try {
        const storeOffers = await Offer.findAll({ where: { storeId } });
        res.status(200).json({ message: 'Store offers retrieved successfully', offers: storeOffers });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving store offers', error: error.message });
    }
};
