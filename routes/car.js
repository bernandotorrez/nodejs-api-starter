var express = require('express');
require('express-async-errors');
var router = express.Router();
const connection = require('../config/database');

// Panggil Model
const TblTypePorsche = require('../models/tbl_type_porsche');
const {TblModelPorsche, validateModelSearch} = require('../models/tbl_model_porsche');
const {ViewTypeModelPorsche, validateTypeModelSearch, validateTypeModelGetId} = require('../models/view_type_model');
const {ViewTypeColour, validateTypeColourId, validateTypeColourIdColour} = require('../models/view_type_colour');
const {ViewBannerPorsche} = require('../models/view_banner_porsche');

const {Op} = require('sequelize');
const global_function = require('../config/function');
const got = require('got');
const auth = require('../middleware/auth');

// auth_admin is middleware to check whether is admin or no, if admin, she / he can delete / update spesific data
const auth_admin = require('../middleware/auth_admin');

router.all('*', auth, async (req, res, next) => {
    //console.log(req.user._email)
    next();
})

router.get('/all/model', async (req, res, next) => {

    let data = await TblModelPorsche.findAll({
        where: {
            status_del: 1
        },
        order: [
            ['desc_model', 'ASC'],
        ],
    })

    let count = data.length;

    if (count > 0) {
        res.status(200).send({
            'httpStatus': 200,
            'message': 'success',
            'total': count,
            'data': data   
        });
    } else {
        res.status(404).send({
            'httpStatus': 404,
            'message': 'no data',
            'total': count,
            'data': null
        });
    }

})

router.get('/all/model/search', async (req, res, next) => {
    let {q} = req.query;

    // Input Validation
    let validation = validateModelSearch(req.query);

    if (validation.error) {
        res.status(400).send({
          'httpStatus': 400,
          'message': 'error_validation',
          'data': validation.error.details[0].message
        });
        return false;
      }
    // Input Validation

    let data = await TblModelPorsche.findAll({
        where: {
            status_del: 1,
            desc_model: {
                [Op.like]: `%${q}%`
            }
        },
        order: [
            ['desc_model', 'ASC'],
        ],
    })

    let count = data.length;

    if (count > 0) {
        res.status(200).send({
            'httpStatus': 200,
            'message': 'success',
            'total': count,
            'data': data   
        });
    } else {
        res.status(404).send({
            'httpStatus': 404,
            'message': 'no data',
            'total': count,
            'data': null
        });
    }

})

router.get('/all/model/type', async (req, res, next) => {
    let {id} = req.query;

    // Input Validation
    let validation = validateTypeModelGetId(req.query);

    if (validation.error) {
        res.status(400).send({
          'httpStatus': 400,
          'message': 'error_validation',
          'data': validation.error.details[0].message
        });
        return false;
      }
    // Input Validation

    let data = await ViewTypeModelPorsche.findAll({
        where: {
            status_del: 1,
            id_model: id
        },
        order: [
            ['desc_model', 'ASC'],
        ],
    })

    let count = data.length;

    if (count > 0) {
        res.status(200).send({
            'httpStatus': 200,
            'message': 'success',
            'total': count,
            'data': data   
        });
    } else {
        res.status(404).send({
            'httpStatus': 404,
            'message': 'no data',
            'total': count,
            'data': null
        });
    }

})

router.get('/all/model/type/search', async (req, res, next) => {
    var {id, q} = req.query

    // Input Validation
    let validation = validateTypeModelSearch(req.query);

    if (validation.error) {
        res.status(400).send({
          'httpStatus': 400,
          'message': 'error_validation',
          'data': validation.error.details[0].message
        });
        return false;
      }
    // Input Validation

    let data = await ViewTypeModelPorsche.findAll({
        where: {
            id_model: id,
            status_del: 1,
            desc_type: {
                [Op.like]: `%${q}%`
            }
        },
        order: [
            ['desc_model', 'ASC'],
        ],
    });

    let count = data.length;

    if (count > 0) {
        res.status(200).send({
            'httpStatus': 200,
            'message': 'success',
            'data': data,
            'total': count
        });
    } else {
        res.status(200).send({
            'httpStatus': 404,
            'message': 'no data',
            'data': null,
            'total': count
        });
    }

})

router.get('/all/type/colour', async (req, res, next) => {
    var {id} = req.query

    // Input Validation
    let validation = validateTypeColourId(req.query);

    if (validation.error) {
        res.status(400).send({
          'httpStatus': 400,
          'message': 'error_validation',
          'data': validation.error.details[0].message
        });
        return false;
      }
    // Input Validation
    
    let data = await ViewTypeColour.findAll({
        where: {
            id_type: id,
            status_del: 1
        },
        order: [
            ['desc_colour', 'ASC']
        ]
    });

    let count = data.length;

    if (count > 0) {
        res.status(200).send({
            'httpStatus': 200,
            'message': 'success',
            'total': count,
            'data': data
        });
    } else {
        res.status(200).send({
            'httpStatus': 404,
            'message': 'no data',
            'total': count,
            'data': null
        });
    }

})

router.get('/one/colour/detail', async (req, res, next) => {
    let {id, colour} = req.query

    // Input Validation
    let validation = validateTypeColourIdColour(req.query);

    if (validation.error) {
        res.status(400).send({
          'httpStatus': 400,
          'message': 'error_validation',
          'data': validation.error.details[0].message
        });
        return false;
      }
    // Input Validation

    let data = await ViewTypeColour.findOne({
        where: {
            id_type: id,
            id_colour: colour,
            status_del: 1
        }
    })
    
    if (data) {
        res.status(200).send({
            'httpStatus': 200,
            'message': 'success',
            'total': 1,
            'data': data
        });
    } else {
        res.status(200).send({
            'httpStatus': 404,
            'message': 'no data',
            'total': 0,
            'data': null
        });
    }

})

router.get('/list/car/colour/search', async (req, res, next) => {
    let {id, q} = req.query

    let data = await ViewTypeColour.findAll({
        where: {
            id_type: id,
            status_del: 1,
            desc_colour: {
                [Op.like]: `%${q}%`
            }
        },
        order: [
            ['desc_colour', 'ASC']
        ]
    })

    let count = data.length

    if (count > 0) {
        res.status(200).send({
            'httpStatus': 200,
            'message': 'success',
            'total': count,
            'data': data
            
        });
    } else {
        res.status(200).send({
            'httpStatus': 404,
            'message': 'no data',
            'total': count,
            'data': null
            
        });
    }

})

router.get('/banner/porsche', async (req, res, next) => {

    let data = await ViewBannerPorsche.findAll();

    let count = data.length

    if (count > 0) {
        res.status(200).send({
            'httpStatus': 200,
            'message': 'success',
            'total': count,
            'data': data
            
        });
    } else {
        res.status(200).send({
            'httpStatus': 404,
            'message': 'no data',
            'total': count,
            'data': null
            
        });
    }

})

router.get('/currency', async(req, res, next) => {
    var {base, price} = req.query
    const response = await got(`https://api.exchangeratesapi.io/latest?base=${base}`);
    
    var response1 = JSON.parse(response.body)
    var idr = response1.rates.IDR
    var total = parseInt(price * idr)
    res.status(200).send({
        'httpStatus': 200,
        'message': 'success',
        'total': 1,
        'data': {
            idr_currency: total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
        }
        
    });
    
})

router.get('/detail/image', async(req, res, next) => {
    var {q} = req.query
    var url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDgMIotUgDnPQk-bImN6nsmfTmPFytsNLI&cx=002578793392232878610:hi0acbfyklq';
    const response = await got(`${url}&q=${q}&searchType=image&imgType=photo&num=1`);
    
    var response1 = JSON.parse(response.body)

    res.status(200).send({
        'httpStatus': 200,
        'message': 'success',
        'total': 1,
        'data': {
            data: response1.items
        }
        
    });
    
})

// Menu
router.get('/menu/all/type', async (req, res, next) => {
    //var {id} = req.query;
    var data = await TblTypePorsche.findAll({
        where: {
            status_del: 1
        },
        order: [
            ['desc_type', 'ASC'],
        ],
    })

    var count = data.length;

    if (data) {
        res.status(200).send({
            'httpStatus': 200,
            'message': 'success',
            'total': count,
            'data': data   
        });
    } else {
        res.status(404).send({
            'httpStatus': 404,
            'message': 'no data',
            'total': count,
            'data': null
        });
    }

})

module.exports = router;
