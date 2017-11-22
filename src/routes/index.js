const manifest = JSON.stringify(require('../pwa/manifest.json'));
const sw = require('fs').readFileSync(__dirname + '/../pwa/sw.js');
const express = require('express');
const path = require('path');

module.exports = (app) => {
  // require('./homepage')(app);

  // require('./postdetail')(app);


  app.get('/manifest.json', function (req, res) {
    res.end(manifest);
  });

  app.get('/sw.js', function (req, res) {
    res.setHeader('content-type', 'text/javascript');
    res.end(sw);
  });

  app.use('/pwa', express.static(__dirname + '/../pwa'));


  require('./offline')(app);
  require('./soon')(app);
};