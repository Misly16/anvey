/* eslint-disable max-len */
module.exports = function(express, passport) {
  const User = require('../db/models/user');
  const router = express.Router();

  router.get('/', function(req, res) {
    console.log(req.user)
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

  router.post('/auth', passport.authenticate('local', {failureRedirect: '/login'}), function(req, res) {
    res.redirect('/');
  });
  return router;
};
