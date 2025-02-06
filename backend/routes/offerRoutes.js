// ملف offerRoutes.js: تعريف مسارات العروض
// المسار: backend/routes/offerRoutes.js

const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const { authMiddleware, storeAuthMiddleware } = require('../middleware/authMiddleware');

// مسارات العروض العامة
router.get('/', offerController.getAllOffers);
router.get('/:id', offerController.getOfferById);

// مسارات المتاجر المحمية
router.use(storeAuthMiddleware);
router.post('/', offerController.createOffer);
router.put('/:id', offerController.updateOffer);
router.delete('/:id', offerController.deleteOffer);

module.exports = router;
