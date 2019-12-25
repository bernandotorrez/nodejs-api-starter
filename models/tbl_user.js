const Sequelize = require('sequelize');
const connection = require('../config/database_globalwebapp');


  const tbl_user = connection.define('tbl_user', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    nick_name: {
        type: Sequelize.STRING
    },
    id_group: {
        type: Sequelize.STRING
    },
    id_company: {
        type: Sequelize.STRING
    },
    branch_id: {
        type: Sequelize.STRING
    },
    id_dept: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    email_head: {
        type: Sequelize.STRING
    },
    email_cc: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    status_pur: {
        type: Sequelize.STRING
    },
    aproval_flag: {
        type: Sequelize.STRING
    },
    give_righ_flag: {
        type: Sequelize.STRING
    },
    login_terakhir: {
        type: Sequelize.STRING
    },
    sign_head: {
        type: Sequelize.STRING
    },
    sign_fc: {
        type: Sequelize.STRING
    },
    sign_bod: {
        type: Sequelize.STRING
    },
    email_fc: {
        type: Sequelize.STRING
    },
    email_bod: {
        type: Sequelize.STRING
    },
    sign_penerima: {
        type: Sequelize.STRING
    },
    sign_finance: {
        type: Sequelize.STRING
    },
    sign_accounting: {
        type: Sequelize.STRING
    },
    sign_pemeriksa1: {
        type: Sequelize.STRING
    },
    sign_pemeriksa2: {
        type: Sequelize.STRING
    },
    sign_pimpinan: {
        type: Sequelize.STRING
    },
    sign_giro1: {
        type: Sequelize.STRING
    },
    sign_giro2: {
        type: Sequelize.STRING
    },
    sign_penerima_bmk: {
        type: Sequelize.STRING
    },
    email_fa: {
        type: Sequelize.STRING
    },
    waktu: {
        type: Sequelize.STRING
    },
    ip: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    },
    level_access: {
        type: Sequelize.STRING
    },
    flag_approval_democar: {
        type: Sequelize.STRING
    },
    flag_deligated: {
        type: Sequelize.STRING
    },
    email_purchase: {
        type: Sequelize.STRING
    },
    date_create: {
        type: Sequelize.STRING
    },
    date_update: {
        type: Sequelize.STRING
    },
    remarks: {
        type: Sequelize.STRING
    },
    date_create_app_democar: {
        type: Sequelize.STRING
    },
    date_update_app_democar: {
        type: Sequelize.STRING
    },
    remarks_app_democar: {
        type: Sequelize.STRING
    },
    api_token: {
        type: Sequelize.STRING
    },
    tgl_start_deligate: {
        type: Sequelize.STRING
    },
    tgl_end_deligate: {
        type: Sequelize.STRING
    },

  },{
    freezeTableName: true,
    timestamps: false,
    defaultScope: {
        attributes: { exclude: ['password'] }
      }
  }
  
  );

  module.exports = tbl_user;
