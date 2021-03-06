var keystone = require('keystone'),
  async = require('async');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'team';
  locals.pageTitle = 'Our Team';
  locals.filters = {
    firstName: req.params.firstName
  };
  locals.data = {
    posts: []
  };

  // Load other posts
  view.on('init', function(next) {

    var q = keystone.list('Member').model.find().sort('lastName');

    q.exec(function(err, results) {
      locals.data.members = results;
      next(err);
    });
  });

  // Render the view
  view.render('team');
};
