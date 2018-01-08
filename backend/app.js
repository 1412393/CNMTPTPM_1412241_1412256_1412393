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
var admin = require('./routes/admin')
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
/*ws.onmessage = async function (data) {
    console.log('incoming data', data.data);
    let d = JSON.parse(data.data);
    if (d.type === "block"){
        await block.AddBlock(d.data);
    }
    else{
        await transaction.AddTransaction(d.data);
    }
};
*/


//appp.InitData();

//transaction.InitHistory();

//var userController = require("./controllers/userController");
//userController.CalCoin();

/*var JSONObject = {
    "inputs":[
        {
            "unlockScript": "",
            "referencedOutputHash":"f3d218bad02b3d8069a46e8020de8ef620e1b03f5fa904061499631a94a1b985",
            "referencedOutputIndex":1
        }
    ],
    "outputs":[
        {
            "value":9999,
            "lockScript":"ADD 14c68e95b1238c97bdf3d777611e296c3246765ba95533fdde5a40e275f627f2"
        },
        {
            "value":1,
            "lockScript":"ADD 35da0a0c1dc4f61834359c62873f9647e848126c3941a8e5fe25799b61e7844f"
        }
    ],
    "version":1
}

var request = require('request');
var add={"privateKey":"2d2d2d2d2d424547494e205253412050524956415445204b45592d2d2d2d2d0a4d4949435867494241414b42675144633831306b704254452f486a7644425a7256736a6e43396f3071784e5175626d664639786661792b3158594a34797a66750a55715236587758716747332b694e3741356b4e61746669776f593547736a6c4a6f713353536d2b43625437446c3955575275754746646f39737354624d344d6a0a385533505748374443794f525948707045454b614656676334676c7938542b386448644c37626d5a554f3648626e53534a6e6b502f66545731774944415141420a416f4742414d4549504d2f4f4b6663504f2f686362786e48384330717862424e35636f592b487074746a494779742b416d6f513978746548692f72394759594f0a506771714f5448392b636f2b514d37503169556466373839534f315955794c3778685056447357644342754a3433763238665a7574552b5733767163654576440a652f612f36696d74515436534b3354574356686e68796942487a4a586b5978764462646c464f7256774431774d565942416b454138492b4e592f5659646e53710a56507a5871683539325937526169737851697130617a676a46647351486c3942705334456b765078454e584258306c6141466c373530634844635439556665330a31677955746f444264774a42414f73686e56584b3155642b744d6f7a39724f503852642b6c77414e7641752f2b32382f67586446426e736e59554a344a6663390a6553336a5538654c37335256474b526a423555697475726b634e476b34424d67376145435151437656324d7576644571486d56644a794b6e5843784e4848316c0a7a6d2f4d453861483946595767794d666b4430514168665261542b4944745977397731442f6657444956467835756a6943786154545835442f467548416b42310a38702f464349466959746e33304964425863525876385770586a706c506f47334e596b524e6b76672f556b5a6d63475a75336d4e486b724a66355733716e51350a4367416b764977375769714a7a34596a736c4868416b454130572b443663506e6e7679634a566535444d5272736d786d376e4a4644634749444d4d42506b68780a346a43614a306c68624c756a4b37374632545a6a656c6130524a2b4551634f5135647a36794630526b454a3668773d3d0a2d2d2d2d2d454e44205253412050524956415445204b45592d2d2d2d2d0a","publicKey":"2d2d2d2d2d424547494e205055424c4943204b45592d2d2d2d2d0a4d4947664d413047435371475349623344514542415155414134474e4144434269514b42675144633831306b704254452f486a7644425a7256736a6e43396f300a71784e5175626d664639786661792b3158594a34797a667555715236587758716747332b694e3741356b4e61746669776f593547736a6c4a6f713353536d2b430a625437446c3955575275754746646f39737354624d344d6a385533505748374443794f525948707045454b614656676334676c7938542b386448644c37626d5a0a554f3648626e53534a6e6b502f66545731774944415141420a2d2d2d2d2d454e44205055424c4943204b45592d2d2d2d2d0a","address":"14c68e95b1238c97bdf3d777611e296c3246765ba95533fdde5a40e275f627f2"};
//var unlock = "PUB " + add.publicKey + " SIG " + utils.sign("" ,add.privateKey);

let message = utils.toBinary(JSONObject, true);
var unlock = "PUB " + add.publicKey + " SIG " + utils.sign(message ,add.privateKey);
console.log(unlock);
//var unlock = "PUB 2d2d2d2d2d424547494e205055424c4943204b45592d2d2d2d2d0a4d4947664d413047435371475349623344514542415155414134474e4144434269514b42675144633831306b704254452f486a7644425a7256736a6e43396f300a71784e5175626d664639786661792b3158594a34797a667555715236587758716747332b694e3741356b4e61746669776f593547736a6c4a6f713353536d2b430a625437446c3955575275754746646f39737354624d344d6a385533505748374443794f525948707045454b614656676334676c7938542b386448644c37626d5a0a554f3648626e53534a6e6b502f66545731774944415141420a2d2d2d2d2d454e44205055424c4943204b45592d2d2d2d2d0a SIG a255d0687b11a657c9ec00e426764bffb0dd10703d4920c6646f4d53fa9c329046cc8f7215e43e08550e25499c1b2a980686ee673ecf99f64a6d6146d98bde590fd178c2b81d8d9c62ed6f7583461520e9e1b7a07cb1eadd55cc4f4fd8d031d9c5a8bf32cb9ba1955ed34cc44b42a1e87373a784c1754f2080b20c239ef51e42";
var myJSONObject = {
    "inputs":[
        {
            "unlockScript": unlock,
            "referencedOutputHash":"f3d218bad02b3d8069a46e8020de8ef620e1b03f5fa904061499631a94a1b985",
            "referencedOutputIndex":1
        }
    ],
    "outputs":[
        {
            "value":9999,
            "lockScript":"ADD 14c68e95b1238c97bdf3d777611e296c3246765ba95533fdde5a40e275f627f2"
        },
        {
            "value":1,
            "lockScript":"ADD 35da0a0c1dc4f61834359c62873f9647e848126c3941a8e5fe25799b61e7844f"
        }
    ],
    "version":1
}
request({
    url: "https://api.kcoin.club/transactions",
    method: "POST",
    json: true,
    body: myJSONObject
}, function (error, response, body){
    console.log(response);
});*/
//appp.GetALlBlock();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

app.use(compression()); //Compress all routes
app.use('/', index);
app.use('/user', user);
app.use('/admin',admin);
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