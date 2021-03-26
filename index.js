require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const Strategy = require('./plugins/passport-local').Strategy;
require('./db/connect');
const User = require('./db/models/user');
const app = express();
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
});

passport.use(new Strategy(
    function(username, password, cb) {
      User.findOne({username: username}, function(err, user) {
        if (err) {
          return cb(err);
        }
        if (!user) {
          return cb(null, false);
        }
        bcrypt.compare(password, user.password, function(err, result) {
          if (result === false) {
            return cb(null, false);
          }
          return cb(null, user);
        });
      });
    }));


passport.serializeUser(function(user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function(username, cb) {
  User.findOne({username: username}, function(err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(require('express-session')({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

const indexRouter = require('./routers/index')(express, passport);

app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('App started http://localhost:3000');
});
