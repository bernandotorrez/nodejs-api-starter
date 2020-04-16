const Sequelize = require('sequelize');
const connection = require('../config/database');

const tbl_model_porsche = connection.define('tbl_model_porsche', {

    id_model: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    desc_model: {
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

module.exports = tbl_model_porsche