// ملف User.js: تعريف نموذج المستخدم
// المسار: backend/models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Point = require('./Point');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uniqueCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM('active', 'blocked'),
    defaultValue: 'active'
  }
}, {
  timestamps: true,
  tableName: 'Users'
});

// تعريف العلاقة بين المستخدم والنقاط
User.hasMany(Point, { foreignKey: 'userId', onDelete: 'CASCADE' });
Point.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
