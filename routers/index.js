/* eslint-disable max-len */
module.exports = function(express) {
  const router = express.Router();

  router.get('/', function(req, res) {
    res.render('index.html', {companyName: process.env.COMPANY_NAME});
  });

  router.get('/login', function(req, res) {
    res.render('login.html', {companyName: process.env.COMPANY_NAME});
  });

  router.post('/auth', function(req, res) {
    if (!req.headers.referer || !req.headers.referer.includes('/login')) return res.status(400).send('Missing headers');
  });
  return router;
};
