const { DataTypes } = require('sequelize');
const db = require('../connection.js');

/**
 * @swagger
 * components:
 *  schemas:
 *      CreateUser:
 *        type: object
 *        required:
 *          - first_name
 *          - last_name
 *          - email
 *          - password
 *        properties:
 *          - first_name:
 *              type: string
 *              default: Sam
 *          - last_name:
 *              type: string
 *              default: 50
 *          - email:
 *              type: string
 *          - username:
 *              type: string
 *          - password:
 *              type: string
 *          - account_created:
 *              type: date
 *          - account_updated:
 *              type: date
 */

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
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
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
    type: DataTypes.DATE
  }
}, {
  timestamps: false
});

module.exports = User
