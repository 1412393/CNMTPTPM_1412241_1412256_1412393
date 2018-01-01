var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var compression = require('compression');
var helmet = require('helmet');

var index = require('./routes/index');
var user = require('./routes/user');
var mongoose = require('mongoose');

var app = express();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

//--------------------------------validate the register page
var validator = require('express-validator');
//--------------------------------------------------------------------
//-----------------------------express-session----------------
var session = require('express-session');
//-----------------------------------------------------------
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



var mongoDB = 'mongodb://admin:admin@cluster0-shard-00-00-qfoqg.mongodb.net:27017,cluster0-shard-00-01-qfoqg.mongodb.net:27017,cluster0-shard-00-02-qfoqg.mongodb.net:27017/wallet?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/user');
/*passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());*/


/*passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
*/

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

app.use(compression()); //Compress all routes
app.use('/', index);
app.use('/user', user);
app.use(helmet());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;