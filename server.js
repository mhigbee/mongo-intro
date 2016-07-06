var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoJS = require('mongojs');
var app = express();

// the first argument is the connection string and the second arg is the collections
var db = mongoJS('devblog', ['posts']);
var port = 3000;

var Posts = db.getCollection('posts');
app.use(bodyParser.json());
app.use(cors());

/*
 * ROUTES
 */

// post

app.post('/api/posts', function (req,res){
   db.posts.save(req.body, function(err, response){
       if(err) return res.status(500).json(err);
       else return res.json(response);
   });
});


// get
app.get('/api/posts', function(req,res){
    var query = {};
    if(req.query.name) query.name = new RegExp(req.query.name);
    if(req.query.date) query.date = req.query.date;
    if(req.query.id) query._id = mongoJS.ObjectID(req.query.id);
   db.posts.find(query, function(err,result){
       if(err) return res.status(500).json(err);
       else return res.json(result);
   });

});


// put

app.put('/api/posts',function(req,res) {
    db.posts.findAndModify({query: {_id: mongoJS.ObjectId(req.query.id)}, update: {$set: req.body },new: true},
        function(err, response){
            if(err) res.status(500).json(err);
            else res.json(response);
        })
});


// delete

app.delete('/api/posts', function(req,res){
    db.posts.remove( {_id: mongoJS.ObjectId(req.query.id)}, function(err, response){
        if(err) res.status(500).json(err);
        else return res.json(response);
    })
});


app.listen(port, function(){
    console.log('Now listening on port: ', port);
});