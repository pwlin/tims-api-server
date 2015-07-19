// First things first. Please make sure there is a config.json file available.
try {
    var config = require('./config.json');
} catch (e) {
    var error = "========== TIMS-MAP-API-INIT ERROR ==========\n";
    if (e.code === 'MODULE_NOT_FOUND') {
        error += "The configuration file (config.json) does not exists.\n";
        error += "Rename config.json.sample to config.json and run the app again.\n";
    } else {
        error += "The configuration file (config.json) contains error(s):\n\n";
        error += e + "\n\n";
        error += "Please correct the error(s) and run the app again.\n";
    }
    error += "Exiting...\n";
    error += "===========================";
    console.error(error);
    process.exit();
}

var compression = require('compression');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var utils = require('./libs/utils');

var index = require('./routes/index');
var disruptions = require('./routes/disruptions');

var app = express();

app.use(logger('dev'));
app.use(compression({
    threshold: 100
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.disable('etag');

app.use(function (req, res, next) {
    res.header('X-Powered-By', 'TIMS-API-SERVER');
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    res.header('Content-Type', 'text/javascript; charset=utf-8');
    res.header('Connection', 'close');
    next();
});

app.use('/', index);
app.use('/disruptions', disruptions);

// catch 404 error
app.use(function (req, res, next) {
    res.status(404);
    res.send(JSON.stringify({
        status: 404,
        message: 'Not Found'
    }));
});

// error handler
app.use(function (err, req, res, next) {
    if (app.get('env') === 'development') {
        utils.log(err);
    }
    res.status(err.status || 500);
    res.send(JSON.stringify({
        status: err.status || 500,
        message: err.message
    }));
});


module.exports = app;