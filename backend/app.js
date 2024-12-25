require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = 4000;

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);

// Database connection and model synchronization
sequelize.authenticate()
    .then(() => {
        console.log('✅ Connection to the database has been established successfully.');
        return sequelize.sync({ force: false });
    })
    .then(() => {
        console.log('✅ All models were synchronized successfully.');
    })
    .catch((error) => {
        console.error('❌ Unable to connect to the database:', error);
    });

// Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
