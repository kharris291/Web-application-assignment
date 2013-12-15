var express = require('express')
  , engine = require('ejs-locals')
	, routes = require('./routes')
  , home = require('./routes/index')
  , messages = require('./routes/message')
  , http = require('http')
  , path = require('path')
  , message = require('./models/message')
  , mongoskin = require('mongoskin');

var app = express();

// all environments
app.set('views', path.join(__dirname, 'app'));
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'app')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*app.param('entries', function(req, res, next, entry) {
    req.Entry = Entry;
    return next();
});


app.param('assignmentLogin', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName)
  return next()
});
*/


  var db = require('mongoskin').db('localhost:27017/user', {safe:true});
  var collection = db.collection('user');

/*mongoskin.db('localhost:27017/user',{safe: true}).collection('user').find().toArray(function (err, items) {
  console.dir(items);
})
*/
app.param('user', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName)
  return next()
});


/*app.get('/', function(req, res) {
    Message.all(function(e, results) {
        if (e) return next(e);
        app.locals.messages = results;
        home.index(req, res);
    });
});
*/
app.get('/', routes.index);
app.get('/assignmentLogin', routes.index);
app.get('/Create', routes.index);
app.get('/mainPage', routes.index);

app.get('/assignmentLogin/:user', messages.index);

app.post('/Create/:user', messages.create);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

