// ملف Offer.js: تعريف نموذج العروض
// المسار: backend/models/Offer.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Offer = sequelize.define('Offer', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    storeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Stores',
            key: 'id',
        },
    },
}, {
    timestamps: true,
    tableName: 'Offers',
});

module.exports = Offer;
