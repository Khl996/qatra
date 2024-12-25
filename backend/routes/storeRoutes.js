const express = require('express');
const Store = require('../models/Store');
const router = express.Router();

// تسجيل متجر جديد
router.post('/register', async (req, res) => {
    const { name, ownerName, phone, email, description, category } = req.body;

    try {
        const newStore = await Store.create({
            name,
            ownerName,
            phone,
            email,
            description,
            category,
        });
        res.status(201).json({ message: 'Store registered successfully', store: newStore });
    } catch (error) {
        console.error('Error registering store:', error);
        res.status(400).json({ error: 'Error registering store', details: error.message });
    }
});

module.exports = router;
