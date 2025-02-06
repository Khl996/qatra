// ملف offerController.js: إدارة عمليات العروض
// المسار: backend/controllers/offerController.js

const Offer = require('../models/Offer');
const Store = require('../models/Store');
const logger = require('../config/logger');

const offerController = {
    getAllOffers: async (req, res) => {
        try {
            const offers = await Offer.findAll({
                where: { 
                    status: 'active',
                    endDate: {
                        [Op.gt]: new Date()
                    }
                },
                include: [{
                    model: Store,
                    attributes: ['name', 'id', 'imageUrl']
                }],
                order: [['createdAt', 'DESC']]
            });

            res.json(offers);
        } catch (error) {
            logger.error('Error fetching offers:', error);
            res.status(500).json({ message: 'خطأ في جلب العروض' });
        }
    },

    getOfferById: async (req, res) => {
        try {
            const offer = await Offer.findByPk(req.params.id, {
                include: [{ 
                    model: Store,
                    attributes: ['name', 'id'] 
                }]
            });
            if (!offer) {
                return res.status(404).json({ message: 'العرض غير موجود' });
            }
            res.json(offer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createOffer: async (req, res) => {
        try {
            const { title, description, discount, startDate, endDate } = req.body;
            const offer = await Offer.create({
                title,
                description,
                discount,
                startDate,
                endDate,
                storeId: req.store.id
            });
            res.status(201).json(offer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateOffer: async (req, res) => {
        try {
            const offer = await Offer.findOne({
                where: { 
                    id: req.params.id,
                    storeId: req.store.id 
                }
            });

            if (!offer) {
                return res.status(404).json({ message: 'العرض غير موجود' });
            }

            await offer.update(req.body);
            res.json(offer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteOffer: async (req, res) => {
        try {
            const offer = await Offer.findOne({
                where: { 
                    id: req.params.id,
                    storeId: req.store.id 
                }
            });

            if (!offer) {
                return res.status(404).json({ message: 'العرض غير موجود' });
            }

            await offer.destroy();
            res.json({ message: 'تم حذف العرض بنجاح' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = offerController;
