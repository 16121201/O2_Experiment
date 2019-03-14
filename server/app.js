var express = require('express');
var http = require('http');
var app = express();
var router = require('./database/router');
app.use(router);
app.listen(3500,function(){
	console.log("success!")
});
