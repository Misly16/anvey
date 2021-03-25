require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
require('./db/connect');
const app = express();
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
});
app.use(express.urlencoded({extended: false}));
app.use(express.json());
const indexRouter = require('./routers/index')(express);

app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('App started http://localhost:3000');
});
