const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const rooms = require('./routes/rooms');
const admin = require('./routes/admin');
const posts = require('./routes/posts');

const app = express();

const session = require('express-session');
app.use(session({ secret: 'secret-unique-code', cookie: { maxAge: 7200000 }, resave: true, saveUninitialized: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rooms', rooms);
app.use('/admin', admin);
app.use('/posts', posts);

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

const mongoURI = 'mongodb+srv://dhernqvist:Lorien1986@memeit-lkmkp.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to mongoDB!');
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
