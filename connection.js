require('dotenv').config();
const { Sequelize } = require('sequelize');

let sequelize;

// if (process.env.DB_HOST === 'localhost') {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  });

  // sequelize.authenticate()
  //   .then(() => {
  //     console.log('Connection has been established successfully.');
  //   })
  //   .catch((error) => {
  //     console.error('Unable to connect to the database:', error);
  //   });

  //   sequelize.sync({ force: process.env.DB_FORCE_SYNC === 'true' })
  //   .then(() => {
  //     console.log('All models were synchronized successfully.');
  //   })
  //   .catch((error) => {
  //     console.error('Unable to synchronize the models:', error);
  //   });

// } 
// else {
//   sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//     port: process.env.DB_PORT,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false
//       }
//     },
//   });
// }

module.exports = sequelize;