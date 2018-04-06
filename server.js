// express is just a node module, requiring express returns an application creator that we store in var express, which allows us to create an express app
var express = require("express");
// allows us to run methods like GET and POST
var session = require('express-session');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it
// handle our base GET route to index url. This is a callback function that runs once route is hit. Both are objects. We can console log if need be.
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');
app.use(session({secret: 'unicorns'}));
app.get('/', function(request, response) {
    response.render("index");
})
app.post('/process', function(request, response) {
    request.session.survey = request.body;
    response.redirect("results");
})
app.get('/results', function(request, response) {
    response.render('result', {survey: request.session.survey});
})
app.get('/go_back', function(request, response) {
     response.redirect("/");
})
// allows us to now listen
app.listen(8000, function(){
	console.log("listening on 8000")

})