const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

// Additional security headers
const securityMiddleware = [
    helmet(),
    limiter,
    // Add more security middleware
];

module.exports = securityMiddleware;
