const Sequelize = require('sequelize');
const connection = require('../config/database');

const tbl_user_new = connection.define('tbl_user_new', {
  email: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  gender: {
    type: Sequelize.STRING,
  },
  date_birth: {
    type: Sequelize.STRING,
  },
  verification: {
    type: Sequelize.STRING,
  },
  api_token: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.INTEGER,
  },

}, {
  freezeTableName: true,
  timestamps: false,
  defaultScope: {
      attributes: { exclude: ['password'] }
    }
});

module.exports = tbl_user_new
