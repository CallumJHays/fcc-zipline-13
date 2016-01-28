'use strict';

var express = require('express');
var request = require('request');

var app = express();
var urlcount = 0;

app.get('/new/:url([^ \?]+$)/', function(req, res){
	request.get(req.params.url, function(error, result, body){
		if(error && req.query.allow !== 'true'){ // url invalid and invalidallow not true
			return res.send({ERROR: 'provided url was invalid!'});
		}
		
		var newUrl = '/' + urlcount;
		urlcount++;
		app.get(newUrl, function(inreq, inres){
			inres.redirect(req.params.url);
		});
		
		res.send({
			original_url: req.params.url,
			short_url: req.get('host') + newUrl
		});
	});
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});