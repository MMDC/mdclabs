var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'careers';
  locals.pageTitle = 'Careers';	
	
	// Render the view
	view.render('careers');
	
};
