const express = require('express');
const path = require('path');
//const helmet = require('helmet');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const config = require('./config')();

const routes = require('./app/controller');
const db_connect = require('./lib/db_connect')();

const app = express();

/*******************************************************
    MIDDLEWARES
********************************************************/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(helmet());
//app.use(helmet.hidePoweredBy())
app.use(cors());
app.use(logger('dev'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ parameterLimit: 100000,limit: "1000mb", extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*******************************************************
    SESSION CREATION
********************************************************/

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
}

app.use(session(config.SESSION.OPTIONS));

/*******************************************************
    BASE API ENDPOINT
********************************************************/

app.use('/api/v1', routes);

/*******************************************************
    ERROR HANDLER FOR REQUESTS
********************************************************/

app.get('*', (req, res) => {
  res.status(404).json({
    msg: 'route not found',
    status: 404,
    check: true,
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('Not found');
  next();
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});



module.exports = app;
