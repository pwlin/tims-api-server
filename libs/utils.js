var crypto = require('crypto');
var util = require('util');

function buildRESTCallback(reqQuery, items) {
    items = items || [];
    if (!reqQuery.callback) {
        return JSON.stringify(items);
    }
    reqQuery.context = reqQuery.context ? '"' + reqQuery.context.replace(/\W+\./g, '') + '", ' : '';
    return reqQuery.callback.replace(/\W+\./g, '') + '(' + reqQuery.context + JSON.stringify(items) + ');';
}

function md5(str) {
    return crypto.createHash('md5').update(str).digest("hex");
}

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

function log(mix) {
    console.log(util.inspect(mix, false, null));
}

// exports 
exports.buildRESTCallback = buildRESTCallback;
exports.md5 = md5;
exports.isEmptyObject = isEmptyObject;
exports.log = log;