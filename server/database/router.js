var express = require('express');
var router = express.Router();
var method = require('./method');

router.get('/api',method.getALL);

module.exports = router;
