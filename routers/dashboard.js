/* eslint-disable max-len */
module.exports = function(express, passport) {
  const router = express.Router();

  router.get('/', checkAuth, function(req, res) {
    res.render('dashboard.html', {companyName: process.env.COMPANY_NAME, user: req.user});
  });

  router.get('/forms', checkAuth, function(req, res) {
    res.render('forms.html', {companyName: process.env.COMPANY_NAME, user: req.user});
  });

  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  }

  return router;
};
