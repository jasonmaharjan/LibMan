const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var path = require('path');

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
