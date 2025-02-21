const express = require('express');
const router = express.Router();
const { Store } = require('../models/Store');
const multer = require('multer');
// ...existing imports...

// تسجيل متجر جديد
router.post('/register', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'attachments', maxCount: 5 }
]), async (req, res) => {
  try {
    // ...handle store registration...
  } catch (error) {
    // ...handle error...
  }
});

// تسجيل دخول المتجر
router.post('/login', async (req, res) => {
  try {
    // ...handle store login...
  } catch (error) {
    // ...handle error...
  }
});

module.exports = router;
