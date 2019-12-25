const Sequelize = require('sequelize');
const connection = require('../config/database_globalwebapp');

const tbl_master_pp = connection.define('tbl_master_pp', {
    id_master: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    id_company: {
        type: Sequelize.STRING,
    },
    id_dept: {
        type: Sequelize.STRING,
      },
    branch_id: {
        type: Sequelize.STRING,
      },
      id_vendor: {
        type: Sequelize.STRING,
      },
      id_user: {
        type: Sequelize.STRING
      },
      user_submission: {
        type: Sequelize.STRING,
      },
      head_user: {
        type: Sequelize.STRING,
      },
      header_desc: {
        type: Sequelize.STRING,
      },
      date_pp: {
        type: Sequelize.STRING,
      },
      email_pp: {
        type: Sequelize.STRING,
      },
      email_head_pp: {
        type: Sequelize.STRING,
      },
      email_cc_pp: {
        type: Sequelize.STRING,
      },
      email_fc_pp: {
        type: Sequelize.STRING,
      },
      email_bod_pp: {
        type: Sequelize.STRING,
      },
      phone_pp: {
        type: Sequelize.STRING,
      },
      id_curr: {
        type: Sequelize.STRING,
      },
      gran_total: {
        type: Sequelize.STRING,
      },
      ppn: {
        type: Sequelize.STRING,
      },
      pph: {
        type: Sequelize.STRING,
      },
      gran_totalppn: {
        type: Sequelize.STRING,
      },
      gran_total_adjust: {
        type: Sequelize.STRING,
      },
      term_top: {
        type: Sequelize.STRING,
      },
      aprove_head: {
        type: Sequelize.STRING,
      },
      approve_purchasing: {
        type: Sequelize.STRING,
      },
      aprove_fc: {
        type: Sequelize.STRING,
      },
      aprove_bod: {
        type: Sequelize.STRING,
      },
      date_aprove_head: {
        type: Sequelize.STRING,
      },
      date_approve_purchasing: {
        type: Sequelize.STRING,
      },
      date_aprove_fc: {
        type: Sequelize.STRING,
      },
      date_aprove_bod: {
        type: Sequelize.STRING,
        
      },
      date_reject_head: {
        type: Sequelize.STRING,
      },
      date_reject_purchasing: {
        type: Sequelize.STRING,
      },
      date_reject_fc: {
        type: Sequelize.STRING,
      },
      date_reject_bod: {
        type: Sequelize.STRING,
      },
      quo_reff: {
        type: Sequelize.STRING,
      },
      attach_quo: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      status_send_aprove: {
        type: Sequelize.STRING,
      },
      date_send_aproval: {
        type: Sequelize.STRING,
      },
      flag_fpb: {
        type: Sequelize.STRING,
      },
      flag_print_fpb: {
        type: Sequelize.STRING,
      },
      date_print_fpb: {
        type: Sequelize.STRING,
      },
      flag_bpk: {
        type: Sequelize.STRING,
      },
      flag_print_bpk: {
        type: Sequelize.STRING,
      },
      date_print_bpk: {
        type: Sequelize.STRING,
      },
      giro_no: {
        type: Sequelize.STRING,
      },
      bank: {
        type: Sequelize.STRING,
      },
      note_bpk: {
        type: Sequelize.STRING,
      },
      remarks: {
        type: Sequelize.STRING,
      },
      reason_reject: {
        type: Sequelize.STRING,
      },
      date_aproval: {
        type: Sequelize.STRING,
      },
      counter_reprint: {
        type: Sequelize.STRING,
      },
      flag_purchase: {
        type: Sequelize.STRING,
      },
      flag_print_po: {
        type: Sequelize.STRING,
      },
      flag_po: {
        type: Sequelize.STRING,
      },
      date_print_po: {
        type: Sequelize.STRING,
      },
      flag_recived: {
        type: Sequelize.STRING,
      },
      po_no_created: {
        type: Sequelize.STRING,
      },
      flag_send_pr: {
        type: Sequelize.STRING,
      },
      date_send_pr: {
        type: Sequelize.STRING,
      },
      date_save_pr: {
        type: Sequelize.STRING,
      },
      attach_quo_purchase: {
        type: Sequelize.STRING,
      },
      attach_quo_purchase2: {
        type: Sequelize.STRING,
      },
      attach_quo_purchase3: {
        type: Sequelize.STRING,
      },
      flag_status_inv_receipt: {
        type: Sequelize.STRING,
      },
      flag_print_inv_receipt: {
        type: Sequelize.STRING,
      },
      flag_inv_receipt: {
        type: Sequelize.STRING,
      },
      date_print_inv_receipt: {
        type: Sequelize.STRING,
      },
      po_reff: {
        type: Sequelize.STRING,
      },
      email_purchase_pp: {
        type: Sequelize.STRING,
      },

  },{
    freezeTableName: true,
    timestamps: false
  }
  
  );

  module.exports = tbl_master_pp;
