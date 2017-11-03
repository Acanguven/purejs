const manifest = JSON.stringify(require('../pwa/manifest.json'));
const sw = require('fs').readFileSync(__dirname + '/../pwa/sw.js');

module.exports = (app) => {
  require('./homepage')(app);
  require('./offline')(app);
  require('./postdetail')(app);

  app.get('/manifest.json', function (req, res) {
    res.end(manifest);
  });

  app.get('/sw.js', function (req, res) {
    res.setHeader('content-type', 'text/javascript');
    res.end(sw);
  });
};