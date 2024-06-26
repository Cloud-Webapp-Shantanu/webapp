const { DataTypes } = require('sequelize');
const db = require('../connection.js');

const User = db.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    writeOnly: true
  },
  account_created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  account_updated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  account_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false
});

module.exports = User
