const template = require('./template');

const handler = (req, res) => {
  res.marko(template, {
    name: 'Frank',
    count: 30,
    colors: ['red', 'green', 'blue']
  });
};

module.exports = (app) => {
  app.get('/', handler);
};