const template = require('./template');

const handler = (req, res) => {
  res.marko(template);
};

module.exports = (app) => {
  app.get('/:title/:id', handler);
};