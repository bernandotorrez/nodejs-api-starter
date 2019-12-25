var express = require('express');
require('express-async-errors');
var router = express.Router();
const connection = require('../config/database_globalwebapp');

// Panggil Model
const TblMasterPP = require('../models/tbl_master_pp');

// Panggil global function
const global_function = require('../config/function');

router.all('*', async(req, res, next) => {
  
  var token = global_function.check_null(req.token)

  var data = await TblUser.findAll({
    where: {
      api_token: token
    },
    attributes: ['id']
  })

  if(data.length == 0 || global_function.check_null(req.token) == '-') {
    res.status(401).send({'httpStatus': 401, 'message': 'unauthorized access or token is invalid', 'data': null});
  } else {
    next();
  }

  
})

router.get('/countAllResult', async(req, res, next) => {

    var {id_company, id_dept, user_submission, search } = req.query;

    var query;

    if(global_function.check_null(search) == '-') {
      query = "SELECT id_master FROM qv_head_pp_complite"
        + " WHERE "
        + " id_company = $id_company"
        + " AND id_dept = $id_dept"
        + " AND user_submission = $user_submission"
        + " AND status = '1'"
        + " AND flag_send_pr IN(0, -1)";
    } else {
      query = "SELECT * FROM qv_head_pp_complite" 
        + " WHERE "
        + " status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND id_master like $search" 
        + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND vendor like $search" 
        + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND date_pp like $search" 
        + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND type_purchase like $search"
        + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND currency like $search"
        + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND gran_total like $search"
        + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND term_top like $search"
        
    }

    search = global_function.check_date(search);

    var data = await connection.query(query, {
        bind: { status: '1', id_company: id_company, id_dept: id_dept, user_submission: user_submission, search: '%'+search+'%' }, 
        //attributes: { exclude: ["password"] },
        type: connection.QueryTypes.SELECT
      });
      
    if(data[0]) {
        res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data, 'length': data.length});
      } else {  
        res.status(404).send({'httpStatus': 404, 'message': 'no data', 'data': data, 'length': data.length});
    }
})

router.get('/datatableSearch', async(req, res, next) => {

  var {id_company, id_dept, user_submission, limit, start, search, order, dir} = req.query

  if(global_function.check_null(search) != '-') search = search.trim()

  if(!order) order = 'date_pp', dir = 'DESC';

  if(global_function.check_null(search) == '-') {

    if(global_function.check_null_start(start) == '-') {
      var query = "SELECT * FROM qv_head_pp_complite"
      + " WHERE id_company = $id_company AND id_dept = $id_dept"
      + " AND user_submission = $user_submission"
      + " AND flag_send_pr IN('0', '-1')"
      + " AND status = '1'"
      + " ORDER BY "+order+" "+dir+" "
      + " LIMIT $limit";
    } else {
      var query = "SELECT * FROM qv_head_pp_complite"
      + " WHERE id_company = $id_company AND id_dept = $id_dept"
      + " AND user_submission = $user_submission"
      + " AND flag_send_pr IN('0', '-1')"
      + " AND status = '1'"
      + " ORDER BY "+order+" "+dir+" "
      + " LIMIT $limit OFFSET $start";
    }
      
  } else {
    if(global_function.check_null_start(start) == '-') {

    var query = "SELECT * FROM qv_head_pp_complite" 
    + " WHERE "
    + " status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND id_master like $search" 
    + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND vendor like $search" 
    + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND date_pp like $search" 
    + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND type_purchase like $search"
    + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND currency like $search"
    + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND gran_total like $search"
    + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND term_top like $search"
    + " ORDER BY "+order+" "+dir+" "
    + " LIMIT $limit";

    } else {
      var query = "SELECT * FROM qv_head_pp_complite" 
    + " WHERE "
    + " status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND id_master like $search" 
    + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND vendor like $search" 
    + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND date_pp like $search" 
    + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND type_purchase like $search"
    + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND currency like $search"
    + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND gran_total like $search"
    + " OR status = '1'AND id_company = $id_company AND id_dept = $id_dept AND user_submission = $user_submission AND flag_send_pr IN('0', '-1') AND term_top like $search"
    + " ORDER BY "+order+" "+dir+" "
    + " LIMIT $limit OFFSET $start";

    }
    
      
  }

  search = global_function.check_date(search);

  var data = await connection.query(query, {
    bind: { status: '1', id_company: id_company, id_dept: id_dept, user_submission: user_submission, search: '%'+search+'%', limit: limit, start: start }, 
    //attributes: { exclude: ["password"] },
    type: connection.QueryTypes.SELECT
  });

  if(data[0]) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data, 'length': data.length});
    } else {  
      res.status(404).send({'httpStatus': 404, 'message': 'no data', 'data': data, 'length': 0});
  }
})

router.get('/tampilAddPP', async(req, res, next) => {
  var {id_dept, id_company, branch_id, short, branch_short, dept} = req.query;

  var query = "SELECT * FROM qv_head_pp_complite"
  + " WHERE "
  + " id_company = $id_company AND branch_id = $branch_id AND id_dept = $id_dept AND status = 1 "
  + " AND short = $short AND branch_short = $branch_short AND dept = $dept AND status_send_aprove IN (0, -1)";

  var data = await connection.query(query, {
    bind: { id_company: id_company, id_dept: id_dept, branch_id: branch_id, short: short, branch_short: branch_short, dept: dept }, 
    type: connection.QueryTypes.SELECT
  });

  if(data[0]) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data, 'length': data.length});
    } else {  
      res.status(404).send({'httpStatus': 404, 'message': 'no data', 'data': data, 'length': 0});
  }
})

// router.post('/getInfoReject', async(req, res, next) => {
//   var {id_master} = req.body;

//    var data = await TblMasterPP.findAll({
//     where: { id_master: id_master, status: 1 },
//     attributes: ['id_master', 'reason_reject']
//   })
  
//   if(data) {
//       res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data, 'length': data.length});
//     } else {  
//       res.status(404).send({'httpStatus': 404, 'message': 'no data', 'data': null, 'length': 0});
//   }

// })

router.get('/getPP', async(req, res, next) => {
  var {id_master} = req.query;

  var query = "SELECT * FROM qv_head_pp_complite"
  + " WHERE "
  + " status = $status AND id_master = $id_master";

  var data = await connection.query(query, {
    bind: { status: '1', id_master: id_master }, 
    type: connection.QueryTypes.SELECT
  });
  
  if(data[0]) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data, 'length': data.length});
    } else {  
      res.status(404).send({'httpStatus': 404, 'message': 'no data', 'data': null, 'length': 0});
  }

})

router.get('/getDetailPP', async(req, res, next) => {
  var {id_master} = req.query;

  var data = await TblDetailPP.findAll({
    where: { id_master: id_master, status: 1 },
    order: 
     [ ['id_detail', 'ASC'] ],
  })
  
  if(data[0]) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data, 'length': data.length});
    } else {  
      res.status(404).send({'httpStatus': 404, 'message': 'no data', 'data': null, 'length': 0});
  }

})

router.get('/getPurchaseType', async(req, res, next) => {

  var {id} = req.query;

  var data = await TblUser.findAll({
    where: {  status: 1, id: id },
    attributes: ['id', 'status_pur']
  })

  var status_pur = data[0].status_pur;
  var flag_purchase = status_pur.split(',');

  var data1 = await TblTypePurchase.findAll({
    where: {
      flag: flag_purchase
    },
    order: 
     [ ['type_purchase', 'ASC'] ],
  })
  
  
  if(data1[0]) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data1, 'length': data1.length});
    } else {  
      res.status(404).send({'httpStatus': 404, 'message': 'no data', 'data': null, 'length': 0});
  }

})

router.get('/generatePRNumber', async(req, res, next) => {

  var {id_master} = req.query;

  var query = "SELECT max(id_master) as id_master FROM tbl_master_pp"
  + " WHERE "
  + " id_master LIKE $id_master ";

  var data = await connection.query(query, {
    bind: { id_master: '%'+id_master+'%' } ,
    type: connection.QueryTypes.SELECT
  });
  
  if(data[0]) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data, 'length': data.length});
    } else {  
      res.status(404).send({'httpStatus': 404, 'message': 'no data', 'data': null, 'length': 0});
  }

})

// router.post('/getDuplicatePP', async(req, res, next) => {

//   var {id_master} = req.body;

//   var data = await TblMasterPP.findAll({
//     where: { id_master: id_master },
//     attributes: ['id_master']
//   })
  
//   if(data[0]) {
//       res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data, 'length': data.length});
//     } else {  
//       res.status(404).send({'httpStatus': 404, 'message': 'no data', 'data': null, 'length': 0});
//   }

// })

router.get('/getCounterPPNo', async(req, res, next) => {

  var {id_dept} = req.query;

  var query = "SELECT RIGHT(counter,3) as code_max from tbl_counter_ppno"
  + " WHERE "
  + " id_dept = $id_dept ";

  var data = await connection.query(query, {
    bind: { id_dept: id_dept } ,
    type: connection.QueryTypes.SELECT
  });
  
  if(data[0]) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data, 'length': data.length});
    } else {  
      res.status(404).send({'httpStatus': 404, 'message': 'no data', 'data': null, 'length': 0});
  }

})

router.get('/getDateCompare', async(req, res, next) => {

  var {date_add} = req.query;

  var data = await TblDateCompare.findAll({
    where: { date_add: date_add }
  })

  if(data[0]) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data, 'length': data.length});
    } else {  
      res.status(404).send({'httpStatus': 404, 'message': 'no data', 'data': null, 'length': 0});
  }

})

router.put('/updateDateCompare', async(req, res, next) => {

  var {date_add} = req.body;

  var update = await TblDateCompare.update({
    date_add: date_add
  }, {
    where: {
      id: 1
    },
      returning: true,
      plain: true
  })

  if(update) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': update});
    } else {  
      res.status(400).send({'httpStatus': 400, 'message': 'update date compare failed', 'data': null});
  }

})

router.put('/updateCounterPPNo', async(req, res, next) => {

  var {id_dept, counter} = req.body;

  var update = await TblCounterPPNo.update({
    counter: counter
  }, {
    where: {
      id_dept: id_dept
    },
      returning: true,
      plain: true
  })

  if(update) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': update});
    } else {  
      res.status(400).send({'httpStatus': 400, 'message': 'update counter pp failed', 'data': null});
  }

})

router.post('/insertMasterPP', async(req, res, next) => {

  // var {
  //   id_master, id_company, id_dept, branch_id, id_vendor, user_submission, head_user, 
  //   header_desc, date_pp, email_pp, email_head_pp, email_cc_pp, email_fc_pp, email_bod_pp,
  //   phone_pp, gran_total, ppn, pph, gran_totalppn, term_top, id_curr, aprove_head, approve_purchasing,
  //   aprove_fc, aprove_bod, status, status_send_aprove, remarks, po_reff, flag_fpb, flag_print_fpb,
  //   flag_bpk, flag_print_bpk, flag_purchase, flag_po, flag_recived, counter_reprint, date_save_pr,
  //   flag_status_inv_receipt, email_purchase_pp, id_user
  // } = req.body;

  // column: value
  // var insert = {
  //   id_master: id_master,
  //   id_company: id_company,
  //   id_dept: id_dept,
  //   branch_id: branch_id,
  //   id_vendor: id_vendor,
  //   user_submission: user_submission,
  //   head_user: head_user,
  //   header_desc: header_desc,
  //   date_pp: date_pp,
  //   email_pp: email_pp,
  //   email_head_pp: email_head_pp,
  //   email_cc_pp: email_cc_pp,
  //   email_fc_pp: email_fc_pp,
  //   email_bod_pp: email_bod_pp,
  //   phone_pp: phone_pp,
  //   gran_total: gran_total,
  //   ppn: ppn,
  //   pph: pph,
  //   gran_totalppn: gran_totalppn,
  //   term_top: term_top,
  //   id_curr: id_curr,
  //   aprove_head: aprove_head,
  //   approve_purchasing: approve_purchasing,
  //   aprove_fc: aprove_fc,
  //   aprove_bod: aprove_bod,
  //   status: status,
  //   status_send_aprove: status_send_aprove,
  //   remarks: remarks,
  //   po_reff: po_reff,
  //   flag_fpb: flag_fpb,
  //   flag_print_fpb: flag_print_fpb,
  //   flag_bpk: flag_bpk,
  //   flag_print_bpk: flag_print_bpk,
  //   flag_purchase: flag_purchase,
  //   flag_po: flag_po,
  //   flag_recived: flag_recived,
  //   counter_reprint: counter_reprint,
  //   date_save_pr: date_save_pr,
  //   flag_status_inv_receipt: flag_status_inv_receipt,
  //   email_purchase_pp: email_purchase_pp,
  //   id_user: id_user
  // }

  var {id_master} = req.body;

  var check = await TblMasterPP.findAll({
    where: {
      id_master: id_master
    }
  })

  if(check.length > 0) {
    res.status(200).send({'httpStatus': 200, 'message': 'duplicate pr no', 'data': null, 'length': check.length});
  } else {
    var insert = await TblMasterPP.create(req.body, 
      {
          returning: true,
          plain: true
      })
    
      if(insert) {
          res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': insert, 'length': 0});
        } else {  
          res.status(400).send({'httpStatus': 400, 'message': 'insert master pp fail', 'data': null, 'length': 0});
      }
  }

})

router.post('/insertDetailPP', async(req, res, next) => {

  // var {
  //   id_master, desc, spec, qty, harga, total, tax_type, tax_typepph, tax_detail, 
  //   tax_detailpph, flagadjust, keterangan, status
  // } = req.body;

  // column: value
  // var insert = {
  //   id_master: id_master,
  //   desc: desc,
  //   spec: spec,
  //   qty: qty,
  //   harga: harga,
  //   total: total,
  //   tax_type: tax_type,
  //   tax_typepph: tax_typepph,
  //   tax_detail: tax_detail,
  //   tax_detailpph: tax_detailpph,
  //   flagadjust: flagadjust,
  //   keterangan: keterangan,
  //   status: status
  // }

  var insert = await TblDetailPP.create(req.body, 
  {
      returning: true,
      plain: true
  })
  
  if(insert) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': insert});
    } else {  
      res.status(400).send({'httpStatus': 400, 'message': 'insert detail pp fail', 'data': null});
  }

})

router.put('/updateMasterPP', async(req, res, next) => {

  var {id_master} = req.body;

  var update = await TblMasterPP.update(req.body, {
    where: {
      id_master: id_master
    },
      returning: true,
      plain: true,
      omitNull: false
  })
  
  if(update) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': update});
    } else {  
      res.status(400).send({'httpStatus': 400, 'message': 'update master pp fail', 'data': null});
  }

})

router.put('/updateDetailPP', async(req, res, next) => {

  var {id_detail} = req.body;

  // var {
  //   id_master, desc, spec, qty, harga, total, tax_type, tax_typepph, tax_detail, 
  //   tax_detailpph, flagadjust, keterangan, status
  // } = req.body;

  // column: value
  // var update = {
  //   id_master: id_master,
  //   desc: desc,
  //   spec: spec,
  //   qty: qty,
  //   harga: harga,
  //   total: total,
  //   tax_type: tax_type,
  //   tax_typepph: tax_typepph,
  //   tax_detail: tax_detail,
  //   tax_detailpph: tax_detailpph,
  //   flagadjust: flagadjust,
  //   keterangan: keterangan,
  //   status: status
  // }

  var update = await TblDetailPP.update(req.body, {
    where: {
      id_detail: id_detail
    },
      returning: true,
      plain: true
  })
  
  if(update) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': update});
    } else {  
      res.status(400).send({'httpStatus': 400, 'message': 'update detail pp fail', 'data': null});
  }

})

router.put('/deleteDetailPP', async(req, res, next) => {

  var {id_master} = req.body;

  var update = await TblDetailPP.update(req.body, {
    where: {
      id_master: id_master
    },
      returning: true,
      plain: true
  })
  
  if(update) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': update});
    } else {  
      res.status(400).send({'httpStatus': 400, 'message': 'update detail pp fail', 'data': null});
  }

})

router.put('/updateDateApprove', async(req, res, next) => {
  var {id_master, date_aprove_head, date_approve_purchasing, date_aprove_fc, date_aprove_bod} = req.body;  

  if(date_aprove_head == 'null') {
    var updateHead = await updateDateApproveHead(id_master);
  }

  if(date_approve_purchasing == 'null') {
    var updatePurchasing = await updateDateApprovePurchasing(id_master);
  }

  if(date_aprove_fc == 'null') {
    var updateFC = await updateDateApproveFC(id_master);
  }

  if(date_aprove_bod == 'null') {
    var updateBOD = await updateDateApproveBOD(id_master);
  }

  var update = {
    'updateHead': updateHead,
    'updatePurchasing': updatePurchasing,
    'updateFC': updateFC,
    'updateBOD': updateBOD
  }

  if(update) {
    res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': update});
  } else {  
    res.status(404).send({'httpStatus': 404, 'message': 'no data', 'data': null});
  }

})

router.get('/getMasterReason', async(req, res, next) => {
  var data = await TblMasterReason.findAll({
    where: {
      status: 1
    }
  })

  if(data[0]) {
    res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data, 'length': data.length});
  } else {  
    res.status(404).send({'httpStatus': 404, 'message': 'no data', 'data': null, 'length': 0});
}
})

async function updateDateApproveHead(id_master) {
  var update = await TblMasterPP.update({
    date_aprove_head: null
  }, {
    where: {
      id_master: id_master
    },
      returning: true,
      plain: true
  })

  return update;

}

async function updateDateApprovePurchasing(id_master) {
  var update = await TblMasterPP.update({
    date_approve_purchasing: null
  }, {
    where: {
      id_master: id_master
    },
      returning: true,
      plain: true
  })

  return update;

}

async function updateDateApproveFC(id_master) {
  var update = await TblMasterPP.update({
    date_aprove_fc: null
  }, {
    where: {
      id_master: id_master
    },
      returning: true,
      plain: true
  })

  return update;

}

async function updateDateApproveBOD(id_master) {
  var update = await TblMasterPP.update({
    date_aprove_bod: null
  }, {
    where: {
      id_master: id_master
    },
      returning: true,
      plain: true
  })

  return update;

}


module.exports = router;
