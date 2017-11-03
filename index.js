require('marko/node-require');

/* hot reload */
require('marko/hot-reload').enable();
require('fs').watch('./src', function (event, filename) {
  if (/\.marko$/.test(filename)) {
    // Resolve the filename to a full template path:
    var templatePath = path.join(templatesDir, filename);

    console.log('Marko template modified: ', templatePath);

    // Pass along the *full* template path to marko
    require('marko/hot-reload').handleFileModified(templatePath);
  }
});
require('marko/browser-refresh').enable();


/* Lasso */
require('lasso/node-require-no-op').enable('.css', '.less', '.styl', '.scss', '.sass', '.ico','.png', '.svg');
require('lasso').configure({
  "plugins": [
      "lasso-marko",
      "lasso-image"
  ],
  "outputDir": "static",
  "fingerprintsEnabled": true,
  "minify": false,
  "resolveCssUrls": true,
  "bundlingEnabled": true,
  "relativeUrlsEnabled": true,
});

console.log(process.env.NODE_ENV);

const port = 443;
const spdy = require('spdy');
const express = require('express');
const path = require('path');
const fs = require('fs');
const markoExpress = require('marko/express');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(require('lasso/middleware').serveStatic());
app.use(compression());
app.use(markoExpress());


const options = {
  key: fs.readFileSync('./ssl/server.key'),
  cert:  fs.readFileSync('./ssl/server.crt')
};


require('./src/routes')(app);

spdy
  .createServer(options, app)
  .listen(port, (error) => {
    if (error) {
      console.error(error);
      return process.exit(1)
    } else {
      console.log('Listening on port: ' + port + '.')
    }
  });

