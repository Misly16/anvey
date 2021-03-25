require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
});

const indexRouter = require('./routers/index')(express);

app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('App started http://localhost:3000');
});
