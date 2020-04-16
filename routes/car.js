var express = require('express');
require('express-async-errors');
var router = express.Router();
const connection = require('../config/database');
const TblTypePorsche = require('../models/tbl_type_porsche');
const TblModelPorsche = require('../models/tbl_model_porsche');
const TblUserNew = require('../models/tbl_user_new');
const {Op} = require('sequelize');

// Panggil global function
const global_function = require('../config/function');
const got = require('got');

// router.all('*', async (req, res, next) => {
   
//     var token = global_function.check_null(req.token)
   
//     var data = await TblUserNew.findAll({
//         where: {
//             api_token: token
//         },
//         attributes: ['email']
//     })

//     if (data.length == 0 || global_function.check_null(req.token) == '-') {
//         res.status(401).send({
//             'httpStatus': 401,
//             'message': 'unauthorized access or token is invalid',
//             'data': null,
//             'total': data.length
//         });
//     } else {
//         next();
//     }

// })

router.get('/all/model', async (req, res, next) => {

    var data = await TblModelPorsche.findAll({
        where: {
            status_del: 1
        },
        order: [
            ['desc_model', 'ASC'],
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

router.get('/all/model/search', async (req, res, next) => {
    var {q} = req.query;
    var data = await TblModelPorsche.findAll({
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

router.get('/all/model/type', async (req, res, next) => {
    var {id} = req.query;

    var query = "SELECT *"
            + " FROM view_type_model "
            + " WHERE id_model = $id"
            + " AND status_del = 1 "
            + " ORDER BY desc_type ASC"

    var data = await connection.query(query, {
        bind: { id: id },
        type: connection.QueryTypes.SELECT
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

router.get('/all/model/type/search', async (req, res, next) => {
    var {id, q} = req.query

    var query = "SELECT *"
            + " FROM view_type_model "
            + " WHERE id_model = $id"
            + " AND status_del = 1 "
            + " AND desc_type LIKE $q"
            + " ORDER BY desc_type ASC"

    var data = await connection.query(query, {
        bind: {
            id: id,
            q: `%${q}%`
        },
        type: connection.QueryTypes.SELECT
    })

    var count = data.length

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
    var query = "SELECT id_type, id_colour, desc_type, desc_colour, desc_cat_colour, desc_model, price_type, position_colour"
            + " FROM view_type_colour "
            + " WHERE id_type = $id"
            + " AND status_del = 1"
            + " GROUP BY desc_colour"

    var data = await connection.query(query, {
        bind: { id: id },
        type: connection.QueryTypes.SELECT
    })

    var count = data.length

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
    var {id, colour} = req.query
    var query = "SELECT id_type, price_type, desc_type, desc_colour, desc_cat_colour, desc_model "
            + " FROM view_type_colour "
            + " WHERE id_type = $id "
            + " AND id_colour = $colour"
            + " AND status_del = 1"

    var data = await connection.query(query, {
        bind: { 
            id: id,
            colour: colour
        },
        type: connection.QueryTypes.SELECT
    })

    var count = data.length

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



router.get('/list/car/colour/search', async (req, res, next) => {
    var {id, q} = req.query

    var query = "SELECT id_type, desc_type, desc_colour, desc_cat_colour "
    + " FROM view_type_colour "
    + " WHERE status_del = 1 "
    + " AND id_type = $id "
    + " AND desc_colour LIKE $q"
    + " GROUP BY desc_colour"

    var data = await connection.query(query, {
        bind: {
            id: id,
            q: `%${q}%`
        },
        type: connection.QueryTypes.SELECT
    })

    var count = data.length

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

    var query = "SELECT * FROM view_banner_porsche"
    
    var data = await connection.query(query, {
        type: connection.QueryTypes.SELECT
    })

    var count = data.length

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
