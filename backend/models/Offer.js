// ملف Offer.js: تعريف نموذج العروض
// المسار: backend/models/Offer.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // تغيير طريقة الاستيراد

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
        validate: {
            min: 0,
            max: 100,
        },
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    endDate: {
        type: DataTypes.DATE,
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
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'expired'),
        defaultValue: 'active',
    },
}, {
    timestamps: true,
    tableName: 'Offers',
});

module.exports = Offer;
