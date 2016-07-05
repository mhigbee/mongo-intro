var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoJS = require('mongojs');
var app = express();

// the first argument is the connection string and the second arg is the collections
var db = mongoJS('devblog', ['post']);
var port = 3000;

app.use(bodyParser.json());
app.use(cors());




app.listen(port, function(){
    console.log('Now listening on port: ', port);
});