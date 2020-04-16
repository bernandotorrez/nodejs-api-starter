var express = require('express');
require('express-async-errors');
var router = express.Router();
const connection = require('../config/database');
const TblUserNewModel = require('../models/tbl_user_new');

// panggil fungsi global function
const global_function = require('../config/function');

router.get('/get', async(req, res, next) => {
  var {id} = req.query;
  var data = await TblUserNewModel.findOne(
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

  var {email, password} = req.body;
  
  var data = await TblUserNewModel.findAll({
    where: {
      email: email,
      password: password
    }
  })

  var total = data.length

  if(total > 0) {
    res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data[0]});
  } else {  
    res.status(200).send({'httpStatus': 404, 'message': 'username or password is wrong', 'data': null});
  }

});

router.post('/register', async(req, res, next) => {

  var {email, password, gender, phone, date_birth, name, address} = req.body;

  var check_validate = await TblUserNewModel.findAll({
    where: {
      email: email
    }
  })

  if(check_validate.length > 0) {
    res.status(200).send({'httpStatus': 200, 'message': 'registered', 'data': 'registered'});
  } else {
    var data = await TblUserNewModel.create({
      email: email,
      password: password,
      gender: gender,
      phone: phone,
      date_birth: global_function.check_date(date_birth),
      name: name,
      address: address,
      api_token: password
    })
  
    if(data) {
      res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': 'success'});
    } else {  
      res.status(200).send({'httpStatus': 404, 'message': 'username or password is wrong', 'data': null});
    }
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

  var update = await TblUserNewModel.update({
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
