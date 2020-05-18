const global_function = require('../config/function');
const jwt = require('jsonwebtoken');

function auth_admin(req, res, next) {
    if(req.user._isAdmin == true) {
        next();
    } else {
        res.status(403).send({
            'httpStatus': 403,
            'message': 'forbidden access, you are not Administrator',
            'data': null,
            'total': 0
        });
    }
    
}

module.exports = auth_admin;