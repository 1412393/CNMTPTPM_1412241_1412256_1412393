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
<<<<<<< HEAD
var transactionroute = require('./routes/transaction');
=======
var admin = require('./routes/admin')
>>>>>>> 2320d25b75e28d7d3ec0d1a696d37a05546f823d
var mongoose = require('mongoose');
var utils = require('./services/utils')
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
var appp = require('./services/app');
var block = require('./services/block');
var transaction = require('./services/transaction');


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


//const WebSocket = require('ws');

//const ws = new WebSocket('wss://api.kcoin.club/');

//ws.onopen = function () {
 //   console.log('connected');
//};
//var await = require('await');
<<<<<<< HEAD
ws.onmessage = async function (data) {
    //console.log('incoming data', data.data);
=======
/*ws.onmessage = async function (data) {
    console.log('incoming data', data.data);
>>>>>>> 2320d25b75e28d7d3ec0d1a696d37a05546f823d
    let d = JSON.parse(data.data);
    if (d.type === "block"){
        await block.AddBlock(d.data);
    }
    else
    if (d.type === "transaction"){
        await transaction.AddTransaction(d.data);
    }
};
*/


//appp.InitData();

//transaction.InitHistory();

var transactionController = require("./controllers/transactionController");
let sender = {
    "address" : "14c68e95b1238c97bdf3d777611e296c3246765ba95533fdde5a40e275f627f2",
    "available_coins": 9999
}

let receivers = [{
    "address" : "35da0a0c1dc4f61834359c62873f9647e848126c3941a8e5fe25799b61e7844f",
    "value": 1
}]
//transactionController.PostTransaction(sender, receivers);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

app.use(compression()); //Compress all routes
app.use('/', index);
app.use('/user', user);
<<<<<<< HEAD
app.use('/transaction', transactionroute);
=======
app.use('/admin',admin);
>>>>>>> 2320d25b75e28d7d3ec0d1a696d37a05546f823d
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