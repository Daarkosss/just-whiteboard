var createError = require('http-errors');
const mongoose = require("mongoose");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
require("dotenv").config();

const indexRouter = require('./routes/index.router.js');
const userRouter = require('./routes/user.router.js');
const boardRouter = require('./routes/board.router.js');
const privilegeRouter = require('./routes/privilege.router.js');
const objectRouter = require('./routes/object.router.js');
const { confirmToken } = require("./middleware/jwt.middleware.js");

var app = express();

// Ustawienie widoków
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Skonfiguruj CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware do potwierdzenia tokenu JWT
app.use(confirmToken);

// Routing
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/board', boardRouter);
app.use('/privilege', privilegeRouter);
app.use('/object', objectRouter);

// Obsługa błędów 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Globalna obsługa błędów
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderowanie strony błędu
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
