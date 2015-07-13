var express = require('express');
var router = express.Router();
var NodeCache = require('node-cache');
var cache = new NodeCache();
var request = require('request');
var xml2js = require('xml2js');
var utils = require('../libs/utils');
var config = require('../config.json');

/* GET get all disruptions */
router.get('/', function (req, res, next) {
    var cacheKey = utils.md5('/getAll'),
        cachedItems = cache.get(cacheKey);
    if (utils.isEmptyObject(cachedItems)) {
        console.log('GetAll: Fetching FRESH Feed');
        request({
            uri: config.TIMS_FEED_URL,
            qs: {
                app_id: config.TIMS_APP_ID,
                app_key: config.TIMS_APP_KEY
            }
        }, function (error, response, resBody) {
            if (!error && response.statusCode == 200) {
                var XMLParser = new xml2js.Parser({
                    trim: true
                });
                XMLParser.parseString(resBody, function (err, result) {
                    cache.set(cacheKey, result);
                    res.send(utils.buildRESTCallback(req.query, result));
                });
            } else {
                res.send(utils.buildRESTCallback(req.query, []));
            }
        });
    } else {
        console.log('GetAll: Serving CACHED Data');
        res.send(utils.buildRESTCallback(req.query, cachedItems[cacheKey]));
    }

});

module.exports = router;