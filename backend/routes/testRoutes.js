const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.json({
        message: 'Connection successful',
        timestamp: new Date().toISOString(),
        headers: req.headers,
        ip: req.ip
    });
});

module.exports = router;
