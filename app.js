const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const path = require('path');
const hbs = require('express-handlebars');

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
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: null, layoutsDir:__dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

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

// Initial Route
app.get('/', function(req, res){
  //res.sendFile(path.join(__dirname+'/routes/index.html'));
  res.render('layout',{
    title: 'Hello World'
  });
});

app.post('/', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/query',
    failureRedirect:'/login',
    failureFlash: true
  })(req, res, next);
});


// Login Process
app.get('/login', function(req, res){
  //res.sendFile(path.join(__dirname+'/routes/index.html'));
  res.render('index', {
    title: 'Login page'
  });
});

app.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/query',
    failureRedirect:'/login',
    failureFlash: true
  })(req, res, next);
});


// Query Route
app.get('/query', function(req, res){
  res.render('query', {title: 'Query page'})
});

app.post('/query', function(req, res){

});


// Displaying Query Route
app.get('/query_results', function(req, res){
  res.render('query_results')
});

app.post('/query_results', function(req, res){
  let title = req.body.title;
  let isbn= req.body.ISBN;
  let book_edition= req.body.edition;
  let date = req.body.date;

  con.query(
    "SELECT * FROM LibMan where Title =? OR ISBN =? OR BookEdition = ? OR PublicationDate = ?",[title, isbn, book_edition, date], function(err, result){
      res.render('query_results', {title: title, ISBN: isbn, book_edition: book_edition, date: date});
    }

  )
});


// Logout
app.get('/logout', function(req, res){
  res.redirect('/login');
});

// Start Server
app.listen(8000, function(){
  console.log('Server started on port 8000');
});
