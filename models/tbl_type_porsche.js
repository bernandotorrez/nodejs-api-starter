const Sequelize = require('sequelize');
const connection = require('../config/database');

const tbl_type_porsche = connection.define('tbl_type_porsche', {
  id_type: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  id_model: {
    type: Sequelize.INTEGER,
  },
  desc_type: {
    type: Sequelize.STRING,
  },
  price_type: {
    type: Sequelize.STRING,
  },
  status_del: {
    type: Sequelize.STRING,
  },

}, {
  freezeTableName: true,
  timestamps: false,
  // defaultScope: {
  //     attributes: { exclude: ['password'] }
  //   }
});

module.exports = tbl_type_porsche
