module.exports = function(express, passport) {
  const Survey = require('../db/models/form');
  const router = express.Router();

  router.get('/:id', function(req, res) {
    Survey.findOne({id: req.params.id}, function(err, doc) {
      if (err) throw new Error(err);
      if (doc) return res.render('forms/index.html', {companyName: process.env.COMPANY_NAME, user: req.user, form: doc});
      res.status(404).send('This form does not exist');
    });
  });

  return router;
};
