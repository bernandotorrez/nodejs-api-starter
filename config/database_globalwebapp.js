const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

var config = {
    user: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    server: process.env.HOST_DB,
    database: process.env.DATABASE_WEBAPP
  };

const connection = new Sequelize(config.database, config.user, config.password, {
    host: config.server,
    dialect: process.env.DIALECT_DB,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  

module.exports = connection;
