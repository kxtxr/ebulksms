var unirest = require('unirest');
if(typeof Promise !== 'function') var Promise = require('promise');

module.exports = function(gsms, username, apiKey, message, flash, senderId, restEndpoint) {
    var params = {
      'SMS': { 
        'auth': {
          'username': username,
          'apikey': apiKey
        },
        'message': {
          'sender': senderId,
          'messagetext': message,
          'flash': flash
        },
        'recipients': {
          'gsm': gsms
        }
      }
    };
    
    return new Promise (function(resolve, reject) {
        unirest.post(restEndpoint)
          .headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
          .send(params)
          .end(response => {
            if (response.body.response.status === 'SUCCESS') {
              resolve(response.body);
            } else {
              reject(response.body);
            }
          });
    });
};