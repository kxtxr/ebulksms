const Ebulksms = require('./src/ebulksms');


/**
 * @param {string} username - Ebulksms username
 * @param {string} apiKey = Ebulksms apiKey
 * @param {Object} [config] = Additional configuration parameters
 */
module.exports = function(username, apiKey, config) {
    config = config || {};
    return new Ebulksms(username, apiKey, config);
};