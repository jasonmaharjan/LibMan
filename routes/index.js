var express = require('express');
var router = express.Router();
var path = require('path');

//Homepage

router.get('/'/*, ensureAuthenticated*/, function(req, res){
      res.sendFile(path.join(__dirname+'/index.html'));
      res.render('layout', {title: 'Hello World'})
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
