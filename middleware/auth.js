const global_function = require('../config/function');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = global_function.check_null(req.header('X-Auth-Token'));

    if(token == '-') {
        res.status(401).send({
            'httpStatus': 401,
            'message': 'token not set',
            'data': null,
            'total': 0
        });
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            req.user = decoded;
            next();
        } catch(ex) {
            res.status(401).send({
                'httpStatus': 401,
                'message': 'token is invalid',
                'data': null,
                'total': 0
            });
        }
    }
}

module.exports = auth;