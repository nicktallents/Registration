'use strict';

// Requires
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes.js');

// Create App
var app = express();

// Serve Static Files
app.use(express.static('public'));
app.use(bodyParser.json());

// API Routes
app.post('/api/isValidLogin', routes.isValidLogin);
app.get('/api/isUsernameUnique/:username', routes.isUsernameUnique);
app.post('/api/registerUser', routes.registerUser);

// Default route
app.get('*', function (req, res) {
    res.sendFile("index.html", { root: __dirname + '/public/'});  
});

// Create the Server
var server = app.listen(8081, function () {
   console.log("Example app listening at http://localhost:8081");
});