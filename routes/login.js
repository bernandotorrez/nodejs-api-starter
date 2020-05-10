let express = require('express');
require('express-async-errors');
let router = express.Router();
const connection = require('../config/database');
const TblUserNewModel = require('../models/tbl_user_new');
const Joi = require('@hapi/joi');

// panggil fungsi global function
const global_function = require('../config/function');

router.get('/get', async(req, res, next) => {
  let {id} = req.query;
  let data = await TblUserNewModel.findOne(
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

  let {email, password} = req.body;

  // Input API Validation
  const schema = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(8).required()
  })

  const result = schema.validate(req.body);

  if(result.error) {
    res.status(400).send({'httpStatus': 400, 'message': 'error_validation', 'data': result.error.details[0].message});
    return false;
  }
  // Input API Validation
  
  let data = await TblUserNewModel.findOne({
    where: {
      email: email,
      password: password
    }
  })

  if(data) {
    res.status(200).send({'httpStatus': 200, 'message': 'success', 'data': data});
  } else {  
    res.status(200).send({'httpStatus': 200, 'message': 'username or password is wrong', 'data': null});
  }

});

router.post('/register', async(req, res, next) => {

  let {email, password, gender, phone, date_birth, name, address} = req.body;

  // Input API Validation
  const schema = Joi.object({
    email: Joi.string().min(6).max(150).required(),
    password: Joi.string().min(8).max(50).required(),
    gender: Joi.string().min(1).max(1).pattern(new RegExp('[FM]')).required(),
    phone: Joi.string().min(10).max(14).pattern(new RegExp('^[0-9]+$')).required(),
    date_birth: Joi.date().required(),
    name: Joi.string().min(3).max(100).required(),
    address: Joi.string().min(3).max(150).required()
  })

  const result = schema.validate(req.body);

  if(result.error) {
    res.status(400).send({'httpStatus': 400, 'message': 'error_validation', 'data': result.error.details[0].message});
    return false;
  }
  // Input API Validation

  let check_validate = await TblUserNewModel.findAll({
    where: {
      email: email
    }
  })

  if(check_validate.length > 0) {
    res.status(200).send({'httpStatus': 200, 'message': 'registered', 'data': 'registered'});
  } else {
    let data = await TblUserNewModel.create({
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

  let {id, login_terakhir, waktu} = req.body;

  let update = await TblUserModel.update({
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

  let {username, waktu, ip} = req.body;

  let update = await TblUserNewModel.update({
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
