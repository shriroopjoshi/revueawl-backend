// app.js
// This file configures the app

var express = require('express'),
    session = require('express-session'),
    errorhandler = require('errorhandler'),
    bodyParser = require('body-parser'),
    cors = require('cors');

var isProduction = process.env.NODE_ENV === 'production';

var app = express();
app.use(cors());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'some-secret',
    cookie: { maxAge: 6000 },
    resave: false,
    saveUninitialized: false
}));

if (!isProduction) {
    app.use(errorhandler());
}

var routes = require('./src/routes');
app.use('/', routes);

// catch 404s and fwd to error handler
app.use(function (req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

// dev error handlers - will print stacktrace
if (!isProduction) {
    app.use(function (err, req, res, next) {
        console.log(err.stack);
        res.status(err.staatus || 500);
        res.json({
            'errors': {
                message: err.message,
                error: err
            }
        });
    });
}

// prod error handlers - no stacktrace
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});

module.exports = app;

