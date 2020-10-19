const bodyParser = require('body-parser');
const { ParseServer } = require('parse-server');
const parsefile = require('../database/parsefile');

const api = new ParseServer(parsefile.config);

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use('/parse', api);
};
