/* eslint-disable max-len */
module.exports = function(express, passport) {
  const Survey = require('../db/models/survey');
  const {nanoid} = require('nanoid');
  const router = express.Router();

  router.get('/', checkAuth, function(req, res) {
    res.render('dashboard.html', {companyName: process.env.COMPANY_NAME, user: req.user});
  });

  router.get('/forms', checkAuth, function(req, res) {
    Survey.find({}, function(err, doc) {
      if (err) throw new Error(err);
      res.render('forms.html', {companyName: process.env.COMPANY_NAME, user: req.user, forms: doc});
    });
  });

  router.get('/forms/new', checkAuth, function(req, res) {
    res.render('new-form.html', {companyName: process.env.COMPANY_NAME, user: req.user});
  });

  router.post('/forms/new', checkAuth, function(req, res) {
    if (!req.body || !req.body[0] || !req.body[1] || req.body[0].value === '' || req.body[1].value === '') return res.status(400).send('Incorrect body');
    new Survey({
      id: nanoid(10),
      title: req.body[0].value,
      description: req.body[1].value,
    }).save();
    res.redirect('/dashboard/forms');
  });

  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  }

  return router;
};
