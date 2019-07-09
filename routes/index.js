var express = require('express');
var router = express.Router();
var index = '../views/index.html';
var path = require('path');

//Homepage

router.get('/'/*, ensureAuthenticated*/, function(req, res){
      res.sendFile(path.join(__dirname+'/index.html'));
});
/*
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}
*/
module.exports = router;
