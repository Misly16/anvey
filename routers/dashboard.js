/* eslint-disable max-len */
module.exports = function(express, passport) {
  const Survey = require('../db/models/form');
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
    arr = [];
    let i;
    // eslint-disable-next-line guard-for-in
    for (i = 0; i < req.body.length; i++) {
      if (req.body[i].name === 'question') {
        arr.push({question: req.body[i].value, type: req.body[i + 1].value});
      }
    };
    new Survey({
      id: nanoid(10),
      title: req.body[0].value,
      description: req.body[1].value,
      questions: arr,
    }).save();
    res.redirect('/dashboard/forms');
  });

  router.get('/forms/remove/:id', checkAuth, function(req, res) {
    Survey.deleteOne({id: req.params.id}, function(err) {
      if (err) throw new Error(err);
      res.redirect('/dashboard/forms');
    });
  });
  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  }

  return router;
};
