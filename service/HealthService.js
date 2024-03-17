const sequelize = require('../connection.js');
const { logger } = require('../winston-log/winston');

async function checkDatabaseConnection() {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    return false;
  }
}

module.exports = {
  checkDatabaseConnection,
};
