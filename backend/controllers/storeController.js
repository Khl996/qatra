const Store = require('../models/Store');
const Offer = require('../models/Offer');
const User = require('../models/User');
const Point = require('../models/Point');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { validationResult } = require('express-validator');
const AppError = require('../utils/errors');
const { sendResponse } = require('../utils/responses');
const logger = require('../config/logger');
const { Op } = require('sequelize');

const storeController = {
    createStore: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new AppError('Validation error', 400);
            }

            const { name, email, phone, password, category, description } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const store = await Store.create({
                name,
                email,
                phone,
                password: hashedPassword,
                category,
                description
            });

            logger.info(`New store created: ${store.name}`);
            return sendResponse(res, 201, { store }, 'Store created successfully');
        } catch (error) {
            logger.error(`Store creation error: ${error.message}`);
            next(error);
        }
    },

    storeLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const store = await Store.findOne({ where: { email } });

            if (!store) {
                return res.status(404).json({ message: 'المتجر غير موجود' });
            }

            const isValid = await bcrypt.compare(password, store.password);
            if (!isValid) {
                return res.status(401).json({ message: 'كلمة المرور غير صحيحة' });
            }

            const token = jwt.sign(
                { id: store.id, type: 'store' },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({ token, store: { id: store.id, name: store.name } });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getStoreProfile: async (req, res) => {
        try {
            const store = await Store.findByPk(req.store.id);
            res.json(store);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateStore: async (req, res) => {
        try {
            const store = await Store.findByPk(req.store.id);
            await store.update(req.body);
            res.json(store);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getStorePoints: async (req, res) => {
        try {
            const points = await Point.findAll({
                where: { storeId: req.store.id },
                include: [{ model: User, as: 'user' }]
            });
            res.json(points);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createOffer: async (req, res) => {
        try {
            const { title, description, discount } = req.body;
            const offer = await Offer.create({
                title,
                description,
                discount,
                storeId: req.store.id
            });
            res.status(201).json(offer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllStores: async (req, res) => {
        try {
            const stores = await Store.findAll({
                where: { status: 'approved' }
            });
            res.json(stores);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getStoreById: async (req, res) => {
        try {
            const store = await Store.findByPk(req.params.id);
            if (!store) {
                return res.status(404).json({ message: 'Store not found' });
            }
            res.json(store);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getNearbyStores: async (req, res) => {
        try {
            const { lat, lng, radius = 5000 } = req.query; // radius بالأمتار

            const stores = await Store.findAll({
                where: {
                    status: 'approved',
                    location: {
                        [Op.not]: null
                    }
                },
                attributes: {
                    include: [
                        [
                            sequelize.literal(`
                                ST_Distance(
                                    location,
                                    ST_SetSRID(ST_MakePoint(:latitude, :longitude), 4326)
                                )
                            `),
                            'distance'
                        ]
                    ]
                },
                replacements: {
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lng)
                },
                having: sequelize.literal(`distance <= ${radius}`),
                order: [[sequelize.literal('distance'), 'ASC']],
                limit: 20
            });

            res.json(stores);
        } catch (error) {
            logger.error('Error fetching nearby stores:', error);
            res.status(500).json({ message: 'خطأ في جلب المتاجر القريبة' });
        }
    },

    updateProfile: async (req, res) => {
        try {
            const store = await Store.findByPk(req.store.id);
            await store.update(req.body);
            res.json(store);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    addPoints: async (req, res) => {
        try {
            const { userId, points, transactionAmount } = req.body;
            const newPoints = await Point.create({
                userId,
                storeId: req.store.id,
                points,
                transactionAmount
            });
            res.status(201).json(newPoints);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getTransactions: async (req, res) => {
        try {
            const transactions = await Point.findAll({
                where: { storeId: req.store.id }
            });
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = storeController;
