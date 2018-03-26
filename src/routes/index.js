// src/routes/index.js
// add api/ prefix to url

var router = require('express').Router();

router.use('/api', require('./api'));

module.exports = router;