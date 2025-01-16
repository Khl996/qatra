const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/stores', require('./routes/storeRoutes'));
app.use('/api/points', require('./routes/pointRoutes'));

// Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Connect to database and start server
sequelize.authenticate()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = app;
