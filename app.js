var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const loginRoute = require('./components/login')
const newUserRoute = require ('./components/newUser')
const cors = require('cors')
const ForgetRouter = require('./components/forgetPassword')
const GetUserDetail = require('./components/getUser')
const EmailRouter = require('./components/email')

var app = express();
app.use(cors())

require('./common/dbconfig')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',loginRoute)
app.use('/', newUserRoute)
app.use('/' , ForgetRouter)
app.use('/' , EmailRouter)
app.use('/', GetUserDetail)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
