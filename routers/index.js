/* eslint-disable max-len */
module.exports = function(express, passport) {
  const User = require('../db/models/user');
  const bcrypt = require('bcrypt');
  const router = express.Router();

  router.get('/', function(req, res) {
    res.render('index.html', {companyName: process.env.COMPANY_NAME});
  });

  router.get('/login', function(req, res) {
    User.findOne({admin: true}, function(err, doc) {
      if (err) {
        throw new Error(err);
      }
      res.render('login.html', {companyName: process.env.COMPANY_NAME, admin: doc});
    });
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  router.post('/auth', passport.authenticate('local', {failureRedirect: '/login'}), function(req, res) {
    res.redirect('/dashboard');
  });

  router.post('/register', function(req, res) {
    User.findOne({admin: true}, function(err, doc) {
      if (err) throw new Error(err);
      if (doc) return res.status(403).send('Inactive route');
      if (!req.body || !req.body[0] || !req.body[1]) return res.status(400).send('Incorrect body');
      bcrypt.hash(req.body[1].value, 14, function(err, hash) {
        if (err) throw new Error(err);
        new User({
          username: req.body[0].value,
          password: hash,
          admin: true,
        }).save();
      });
      // Prevents it from asking the user to register again
      setTimeout(function() {
        res.redirect('/login');
      }, 1000);
    });
  });
  return router;
};
