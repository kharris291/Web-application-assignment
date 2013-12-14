
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.nope = function(req, res){
  res.render('nope', { title: 'Nope' });
};


exports.create = function(req, res, next){
  res.render('create', { title: 'create' });
};