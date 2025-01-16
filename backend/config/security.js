const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX
});

module.exports = (app) => {
  app.use(helmet());
  app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }));
  app.use(limiter);
};
