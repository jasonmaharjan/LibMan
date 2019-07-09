const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var path = require('path');

// Register Form

router.get('/register', function(req, res){
  res.sendFile(path.join(__dirname+'/register.html'));
});

// Register Proccess
router.post('/register', function(req, res) {

  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var password_confirm = req.body.password_confirm;

  req.checkBody('username', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password_confirm', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {

    if (!username){
      res.send({message:'Username missing'});
    }

    else if (!email){
      res.send({message:'Email missing'});
    }

    else if (!password){
      res.send({message:'Password missing'});
    }

    else if (password != password_confirm){
      res.send({message:'Passwords do not match'});
    }

    console.log(errors);
  }

  else{

    // Check if username is already taken

    con.query(
      "SELECT * FROM users WHERE username = ?", username, function(err, row, field){

        if (err) throw err;

        else if (row.length>0){
          res.send({'success': false});

          console.log('Username is already taken');
        }

        // If username is available

        else{

          // Password Encryption

          bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, function(err, hash){

              if (err) throw err;

              password = hash;

              con.query(

                "INSERT INTO users (username, email, password) VALUES ('" + username + "', '" + email + "', '" + password + "')",
                 function(err, row, field){

                   if (err) throw err;

                   else {
                   console.log('1 user-record inserted');

                   res.send({'success': true});
                   }
                 }
              )
            })
          })
        }
      }
    )
  }
});

// Admin Login Form
router.get('/employee_login', function(req, res){
  res.sendFile(path.join(__dirname+'/employee_login.html'));
});


// Customer Login Form
router.get('/borrower_login', function(req, res){
  res.sendFile(path.join(__dirname+'/borrower_login.html'));
});

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/books/home',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
