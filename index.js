var path = require("path");
var express = require('express');
var app = express();

// setup ejs view engine
app.set('view engine', 'ejs');

//setup a middleware to serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/',function(req, res, next){
	res.render('index');
});

app.listen(process.env.PORT || 3000, function () {
	console.log("Server running ...");
});