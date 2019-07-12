const express = require('express');
const path = require('path');
const mysql = require('mysql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');
var path = require('path');


var con = mysql.createConnection({
  host     : 'localhost',
	user     : 'root',
	password : '#jimmypage8877#',
	database : 'LibMan'
});

con.connect(function(err){
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});


// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


// Login Process
app.get('/login', function(req, res){
  res.sendFile(path.join(__dirname+'/borrower_login.html'));
});

app.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/books/home',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});


// Query Route
app.get('/query', function(req, res){
  res.sendFile(path.join(__dirname+'/query.html'));
});

app.post('/query', function(req, res){
  con.query(
    // Add mySQL query here!
  )
});


// Displaying Query Route
app.get('/show_results', function(req, res){
  res.sendFile(path.join(__dirname + '/show_results.html'));
});

app.post('/show_results', function(req, res){
  con.query(
    // Add mySQL query here!
  )
});


// Logout
app.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});

// Start Server
app.listen(8000, function(){
  console.log('Server started on port 8000');
});
