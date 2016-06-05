var async = require("async"),
  request = require('request'),
  config = require('./config.json');

// the 'handler' that lambda calls to execute our code
exports.handler = function(event, context) {
  context.done(null, 'success');
};
