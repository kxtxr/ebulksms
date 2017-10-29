var unirest = require('unirest');
if(typeof Promise !== 'function') var Promise = require('promise');

module.exports = function(restEndpoint) {
    return new Promise (function(resolve, reject) {
        unirest.get(restEndpoint)
          .end(response => {
            if(response.body.dlr) {
              resolve(response.body);
            } else {
              reject(response.body);
            }
          });
    });
};