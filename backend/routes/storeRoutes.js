// ملف storeRoutes.js: تعريف مسارات المتاجر
// المسار: backend/routes/storeRoutes.js

const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { storeAuthMiddleware } = require('../middleware/authMiddleware');

// المسارات العامة
router.post('/register', storeController.createStore);
router.post('/login', storeController.storeLogin);

// المسارات المحمية
router.get('/profile', storeAuthMiddleware, storeController.getStoreProfile);
router.put('/profile', storeAuthMiddleware, storeController.updateStore);
router.get('/points', storeAuthMiddleware, storeController.getStorePoints);
router.post('/offers', storeAuthMiddleware, storeController.createOffer);

module.exports = router;
