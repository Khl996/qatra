const config = {
  app: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationInterval: 24 * 60 * 60, // 24 hours in seconds
    port: process.env.PORT || 4000,
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
  pointsSystem: {
    pointsPerPurchase: 10,
    minimumPointsForRedemption: 100,
    pointsExpirationDays: 365,
  }
};

module.exports = config;
