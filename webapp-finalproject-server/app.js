var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
require('./db/db.js')

// Load routers
var indexRouter = require('./routes/index');
var itemsRouter = require('./routes/items');
var donationsRouter = require('./routes/donations');
var usersRouter = require('./routes/users');
var requestsRouter = require('./routes/requests');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, "public", "smile-givers")));
app.get("/smile-givers/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "smile-givers", "index.html"));
});

// Plug routers
app.use('/', indexRouter);
app.use('/items', itemsRouter);
app.use('/donations', donationsRouter);
app.use('/users', usersRouter);
app.use('/requests', requestsRouter);


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
