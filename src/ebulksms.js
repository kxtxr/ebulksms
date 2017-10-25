var uniqueKey = require('unique-key');
var sendSms = require('./utils/sendsms');
var balance = require('./utils/balance');
var report = require('./utils/report');

/**
 * @param {string} username - Ebulksms username
 * @param {string} apiKey = Ebulksms apiKey
 * @param {Object} [config] = Additional configuration parameters
 */
function Ebulksms(username, apiKey, config) {
    this.username = username;
    this.apikey = apiKey;
    this.senderId = config.senderId || 'Ebulksms';
    this.restEndpoint = config.restEndpoint || 'http://api.ebulksms.com:8080';
}

/**
 * Send sms
 * @param {string|string[]} recipients - Recipicient phone or recipient object array
 * @param {string} message - The message to send
 * @param {string} [message='auto'] - (Optional) unique messageId. 'auto' means autogenerate
 * @param {Object} [config={}] - (Optional) additional config parameters
 * @return {Promise}
 */
Ebulksms.prototype.send = function(recipients, message, messageId, config) {
    var gsms = [];
    config = config || {};
    var flash = config.flash || false,
        senderId = config.senderId || this.senderId;
    if (recipients instanceof Array) {
        for(var i = 0; i < recipients.length; i++) {
            gsms.push({ msidn: recipients[i].recipient, msgid: recipients[i].msgId || uniqueKey() });
        }
    }
    if (typeof recipients === 'string') {
        if ((messageId && messageId === 'auto') || !messageId) messageId = uniqueKey();
        gsms.push({ msidn: recipients, msgid: messageId });
    }
    return sendSms(gsms, this.username, this.apiKey, message, flash.toString(), senderId, this.restEndpoint + '/sendsms.json');
};

/**
 * Get account balance
 * @return {Promise}
 */
Ebulksms.prototype.balance = function() {
    var restEndpoint = this.restEndpoint + '/balance/' + this.username + '/' + this.apikey;
    return balance(restEndpoint);
};

/**
 * Get sms report
 * @param {string} [messageId] - (Optional messageId to get report of)
 * @return {Promise}
 */
Ebulksms.prototype.report = function(messageId) {
    var restEndpoint = this.restEndpoint + '/getdlr.json?username=' + this.username + '&apikey=' + this.apikey;
    if(messageId) restEndpoint += '&uniqueid=' + messageId;
    return report(restEndpoint);
};

/**
 * TODO
Ebulksms.prototype.newKey = function() {
    console.log('')
}*/

module.exports  = Ebulksms;