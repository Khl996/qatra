const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
    }
);

const connectToDatabase = async () => {
    try {
        console.log('DB Configuration:');
        console.log(`DB_NAME: ${process.env.DB_NAME}`);
        console.log(`DB_USERNAME: ${process.env.DB_USERNAME}`);
        console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`);
        console.log(`DB_HOST: ${process.env.DB_HOST}`);
        console.log(`DB_PORT: ${process.env.DB_PORT}`);

        await sequelize.authenticate();
        console.log('✅ Connection to the database has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectToDatabase };
