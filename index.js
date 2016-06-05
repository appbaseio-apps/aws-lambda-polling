var async = require("async"),
  request = require('request'),
  config = require('./config.json');


// the 'handler' that lambda calls to execute our code
exports.handler = function(event, context) {

  var data;
  var url = 'https://api.bitcoinaverage.com/ticker/USD/';

  async.waterfall([

    function(callback) {

      // Make a request to bitcoin API for current price
      request(url, function(error, response, body) {
        if (!error && response != undefined && response.statusCode == 200) {
          data = JSON.parse(body);
          callback(null);
        } else {
          console.log("Got an error: ", error, ", status code: ", response.statusCode);
        }
      });

    },

    function(callback) {

      // Index the data into Appbase
      request({
        url: 'http://scalr.api.appbase.io/' + config.appname + '/' + config.type, //URL to hit
        headers: {
          Authorization: 'Basic ' + new Buffer(config.username + ':' + config.password).toString('base64')
        },
        json: data,
        method: 'POST' //Specify the method
      }, function(error, response, body) {
        if (error) {
          console.log(error);
        } else {
          callback(null, 'done');
        }
      });

    }

    // optional callback for results
  ], function(err, result) {
    if (err) context.done(err, "Error!!");
    if (!err) context.done(null, "Success!");
  });

};
