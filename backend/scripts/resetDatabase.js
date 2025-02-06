const { sequelize } = require('../config/database');
const logger = require('../config/logger');

async function resetDatabase() {
    try {
        await sequelize.sync({ force: true });
        logger.info('Database reset and tables recreated successfully');
        process.exit(0);
    } catch (error) {
        logger.error('Error resetting database:', error);
        process.exit(1);
    }
}

resetDatabase();
