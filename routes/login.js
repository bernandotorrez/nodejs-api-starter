var express = require('express');
require('express-async-errors');
var router = express.Router();
const connection = require('../config/database_globalwebapp');
const TblUserModel = require('../models/tbl_user');


router.get('/get', async(req, res, next) => {
  var {id} = req.query;
  var data = await TblUserModel.findOne(
    {
      where: { id: id, status: ['1', '2'] },
      attributes: { exclude: ["password"] },
    });

  if(data) {
    res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data});
  } else {  
    res.status(404).send({'httpStatus': 404, 'message': 'no data', 'data': null});
  }

})

router.post('/doLogin', async(req, res, next) => {

  var {username, password} = req.body;
  
  var data = await connection.query("SELECT * FROM qv_complite_user where status IN (1, 2) AND username = $username AND password = $password", {
    bind: { username: username, password: password }, 
    attributes: { exclude: ["password"] },
    type: connection.QueryTypes.SELECT
  });


  if(data[0]) {
    res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data[0]});
  } else {  
    res.status(404).send({'httpStatus': 404, 'message': 'username or password is wrong', 'data': null});
  }

});

router.put('/doLogout', async(req, res, next) => {

  var {id, login_terakhir, waktu} = req.body;

  var update = await TblUserModel.update({
    waktu: waktu,
    login_terakhir: login_terakhir
  }, {
    where: {
      id: id
    },
      returning: true,
      plain: true
  })

  if(update) {
    res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': update});
  } else {
    res.status(400).send({'httpStatus': 400, 'message': 'fail', 'data': null});
  }

});

router.put('/updateSuccessLogin', async(req, res, next) => {

  var {username, waktu, ip} = req.body;

  var update = await TblUserModel.update({
    waktu: waktu,
    ip: ip
  }, {
    where: {
      username: username
    },
      returning: true,
      plain: true
  })

  if(update) {
    res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': update});
  } else {
    res.status(400).send({'httpStatus': 400, 'message': 'fail', 'data': null});
  }

});

module.exports = router;
