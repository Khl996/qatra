const Store = require('../models/Store');
const Offer = require('../models/Offer');
const User = require('../models/User');
const Point = require('../models/Point');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { validationResult } = require('express-validator');

const storeController = {
    createStore: async (req, res) => {
        try {
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

            res.status(201).json({
                message: 'تم إنشاء المتجر بنجاح',
                store: {
                    id: store.id,
                    name: store.name,
                    email: store.email
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
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
    }
};

module.exports = storeController;
