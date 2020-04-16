var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var helmet = require('helmet');
var winston = require('winston');
var global_function = require('./config/function');
var bearerToken = require('express-bearer-token');
var appRoot = require('app-root-path');
var cors = require('cors')

// setiap membuat file router baru, silahkan panggil disini
var carRouter = require('./routes/car');
var loginRouter = require('./routes/login');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bearerToken());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
//app.options('*', cors())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// wajib saat naik ke production
if(process.env.NODE_ENV=='production'){
    app.use(helmet());
}

// setiap ada penambahan Router, inisialisasi index nya disini
app.use('/car', carRouter);
app.use('/login', loginRouter);
  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  
  process.on('uncaughtException', (ex) => {
    var log_date = global_function.time_date();
    var file_name = `uncaughtException ${log_date}.log`;
    var log_location = `${appRoot}/logs/${file_name}`;

    const logFile = winston.createLogger({
     
      transports: [
   
        new winston.transports.File({ filename: log_location, level: 'error' })
      ]
    });

    logFile.log({
      level: 'error',
      message: `uncaughtException : ${ex.message}`,
      timestamp : global_function.log_time()
    });

    process.exit(1)
  })

  process.on('unhandledRejection', (ex) => {
    var log_date = global_function.time_date();
    var file_name = `unhandledRejection ${log_date}.log`;
    var log_location = `${appRoot}/logs/${file_name}`;

    const logFile = winston.createLogger({
     
      transports: [
   
        new winston.transports.File({ filename: log_location, level: 'error' })
      ]
    });

    logFile.log({
      level: 'error',
      message: `unhandledRejection : ${ex}`,
      timestamp : global_function.log_time()
    });

    process.exit(1)
  })

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env').trim() == 'development' ? err : {};

    var log_date = global_function.time_date();
    var file_name = `error ${log_date}.log`;
    var log_location = `${appRoot}/logs/${file_name}`;

    const logFile = winston.createLogger({
     
      transports: [
   
        new winston.transports.File({ filename: log_location, level: 'error' })
      ]
    });

    logFile.log({
      level: 'error',
      message: `${err}`,
      httpStatus: `${err.status || 500}`,
      ip: `${req.ip}`,
      url: `${req.originalUrl}`,
      method: `${req.method}`,
      api_token: `${req.token}`,
      timestamp : global_function.log_time()
    });

    // render the error page
    res.status(err.status || 500).send({'httpStatus': err.status || 500, 'message': err.message, 'data': null});
  });
  

module.exports = app;
