var unirest = require('unirest');

// import 'promise' if not supported natively
if(typeof Promise !== 'function') var Promise = require('promise');

/**
* Send sms
*
* @param {string[]} gsms        - Array of phone numbers to send sms to
* @param {string} username      - Ebulksms username
* @param {string} apiKey        - Ebulksms apiKey
* @param {string} flash         - '1' for flash and '0' for otherwise
* @param {string} senderId      - Sender's name
* @param {string} restEndpoint  - Ebulksms endpoint
*
* @return {Promise}
*/
module.exports = function(gsms, username, apikey, message, flash, senderId, restEndpoint) {
    var params = {
      'SMS': { 
        'auth': {
          'username': username,
          'apikey': apikey
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
    // JSON POST not working for some reason as ebulksms.com does not conform with api docs
    // restEndpoint += '?username=' + username + '&apikey=' + apikey + '&sender=' + senderId + '&messagetext=' + encodeURIComponent(message) + '&flash=' + flash + '&recipients=' + gsms.join(',')
    return new Promise (function(resolve, reject) {
        unirest.post(restEndpoint)
          .headers({'Content-Type': 'application/json'})
          .send(params)
          .send(params)
          .end(response => {
            console.log(response.body)
            if (response.body.response.status === 'SUCCESS') {
              resolve(response.body);
            } else {
              reject(response.body);
            }
          });
    });
};
