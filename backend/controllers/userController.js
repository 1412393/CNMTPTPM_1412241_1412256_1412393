var express = require('express');
var User = require('../models/user');
var Transaction = require('../models/transaction');
var Token = require('../models/token');
var crypto = require('crypto');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var utils = require('../services/utils')
var History = require('../models/history');
const _ = require('lodash');
const bitInt = require('big-integer');
const ursa = require('ursa');
var await = require('await');
const HASH_ALGORITHM = 'sha256';
var Localtransaction = require('../models/localtransaction');

exports.login = function(req, res, next) {

    req.assert('content.email', 'Email is not valid').isEmail();
    req.assert('content.email', 'Email cannot be blank').notEmpty();
    req.assert('content.password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    // Check for validation erro
    var errors = req.validationErrors();
    if (errors) return res.json({ msg: "retry" });

    User.findOne({ email: req.body.content.email }, function(err, user) {
        if (!user) return res.json({ msg: "notexist" });
        var isMatch = bcrypt.compareSync(req.body.content.password, user.password);

        //if (req.body.content.password=== user.password) isMatch = true;
        //user.comparePassword(req.body.content.password, function (err, isMatch) {
            if (!isMatch) return res.json({ msg: "wrong" });

            // Make sure the user has been verified
            if (!user.isVerified) return res.json({ msg: "notverified" });

            // Login successful, write token, and send back user
            //res.json({ msg: "success", token: generateToken(user), user: user });
            res.json({ msg: "success",  user: {email:user.email, available_coins:user.available_coins, actual_coins:user.actual_coins, address:user.address.address, role:user.roles} });


       // });
    });
}


exports.updateData = function(req, res, next){
    User.findOne({ email: req.body.content.email }, function(err, user) {
        if (!user) return res.json({ msg: "notexist" });

        // Make sure the user has been verified
        if (!user.isVerified) return res.json({ msg: "notverified" });

        // Login successful, write token, and send back user
        //res.json({ msg: "success", token: generateToken(user), user: user });
        History.find({ 'receiver': user.address.address }, function(err, histories1) {
            if (err) {
            }
            else {
                History.find({'sender': user.address.address}, function (err, histories2) {
                    if (err) {
                    }
                    else {
                        let his = [];
                        let c = 0;
                        if (histories1 != null)
                            histories1.forEach((history, index) => {
                                his.push(history);
                            });

                        if (histories2 != null)
                            histories2.forEach((history, index) => {
                                his.push(history);
                            });
                        Localtransaction.find({'sender': user.address.address}, function (err, lts) {
                            if (err) {
                            }
                            else {
                                let localtran = [];
                                if (lts != null)
                                    lts.forEach((lt, index) => {
                                        localtran.push({transaction: lt.transaction, state: lt.state, value: lt.value });
                                    });
                                res.json({ msg: "success",  available_coins:user.available_coins, actual_coins:user.actual_coins, history: his, localtransaction: localtran} );
                                //console.log({ msg: "success",  user: {email:user.email, available_coins:user.available_coins, actual_coins:user.actual_coins, address:user.address.address, role:user.roles, history: his, localtransaction: localtran} });
                            }
                        });

                    }


                });
            }
        });

        // });
    });
}

exports.register = function(req, res, next) {


    req.assert('content.name', 'Name cannot be blank').notEmpty();
    req.assert('content.email', 'Email is not valid').isEmail();
    req.assert('content.email', 'Email cannot be blank').notEmpty();
    req.assert('content.password', 'Password must be at least 4 characters long').len(4);
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    // Check for validation errors
    var errors = req.validationErrors();

    if (errors) {return res.json({ msg: "retry" }); }

    // Make sure this account doesn't already exist
    User.findOne({ email: req.body.content.email }, function (err, user) {

        // Make sure user doesn't already exist
        if (user) return res.json({ msg: "existed" });
        var address = utils.generateAddress();
        //var address = {"privateKey":"2d2d2d2d2d424547494e205253412050524956415445204b45592d2d2d2d2d0a4d4949435867494241414b42675144633831306b704254452f486a7644425a7256736a6e43396f3071784e5175626d664639786661792b3158594a34797a66750a55715236587758716747332b694e3741356b4e61746669776f593547736a6c4a6f713353536d2b43625437446c3955575275754746646f39737354624d344d6a0a385533505748374443794f525948707045454b614656676334676c7938542b386448644c37626d5a554f3648626e53534a6e6b502f66545731774944415141420a416f4742414d4549504d2f4f4b6663504f2f686362786e48384330717862424e35636f592b487074746a494779742b416d6f513978746548692f72394759594f0a506771714f5448392b636f2b514d37503169556466373839534f315955794c3778685056447357644342754a3433763238665a7574552b5733767163654576440a652f612f36696d74515436534b3354574356686e68796942487a4a586b5978764462646c464f7256774431774d565942416b454138492b4e592f5659646e53710a56507a5871683539325937526169737851697130617a676a46647351486c3942705334456b765078454e584258306c6141466c373530634844635439556665330a31677955746f444264774a42414f73686e56584b3155642b744d6f7a39724f503852642b6c77414e7641752f2b32382f67586446426e736e59554a344a6663390a6553336a5538654c37335256474b526a423555697475726b634e476b34424d67376145435151437656324d7576644571486d56644a794b6e5843784e4848316c0a7a6d2f4d453861483946595767794d666b4430514168665261542b4944745977397731442f6657444956467835756a6943786154545835442f467548416b42310a38702f464349466959746e33304964425863525876385770586a706c506f47334e596b524e6b76672f556b5a6d63475a75336d4e486b724a66355733716e51350a4367416b764977375769714a7a34596a736c4868416b454130572b443663506e6e7679634a566535444d5272736d786d376e4a4644634749444d4d42506b68780a346a43614a306c68624c756a4b37374632545a6a656c6130524a2b4551634f5135647a36794630526b454a3668773d3d0a2d2d2d2d2d454e44205253412050524956415445204b45592d2d2d2d2d0a","publicKey":"2d2d2d2d2d424547494e205055424c4943204b45592d2d2d2d2d0a4d4947664d413047435371475349623344514542415155414134474e4144434269514b42675144633831306b704254452f486a7644425a7256736a6e43396f300a71784e5175626d664639786661792b3158594a34797a667555715236587758716747332b694e3741356b4e61746669776f593547736a6c4a6f713353536d2b430a625437446c3955575275754746646f39737354624d344d6a385533505748374443794f525948707045454b614656676334676c7938542b386448644c37626d5a0a554f3648626e53534a6e6b502f66545731774944415141420a2d2d2d2d2d454e44205055424c4943204b45592d2d2d2d2d0a","address":"14c68e95b1238c97bdf3d777611e296c3246765ba95533fdde5a40e275f627f2"};
        //var address = {"privateKey":"2d2d2d2d2d424547494e205253412050524956415445204b45592d2d2d2d2d0a4d4949435841494241414b426751444d4f68705765776a72314637485a622b4f674c6435364b48556d587335366f5a6a4f6145556658513761566674694770360a396d6e484463474a686974774b6637494e2f6c3279382f6f6d564d4c31335078337945454b34704255464f716c2f6e374c52676b7735593558456b74417051470a45395a6c714e7545617064584c4655514753676e6156504c364d743971704668796962464677584434414b3642546a6f314d4b335649546270514944415141420a416f4741436b2f41747138646f7a4b6b326e4b44756f4537516c65426e45646e6c6d51474277714933497a39436d626d50714d4e70556d3979345168536e31510a7769674d716a5652546a4d364f79644b727956677745796730517236564c4864767a773437416661376f5633574d56366d36427030624861437a65376f476c450a6c2b48656f767662316c5a47346e426743557468486c4176586d7157625a48674f4f756f53794169772b44434f313043515144746f545a6a64755932637443520a616644396d38473950665657474b6f71536d6645777178734a682b6e71657441476c446552755954794f69354870634c416c4663366d53324f35514348472b360a627666652b34522f416b45413341505745654c4c4d5149555743545a78484434776179447a49334463366e466c6a507042626256596b6448415468666e2b76320a586a66705a4c43685655457661744877765875377a4c554e6e4364573568663932774a41484a596b514e7277337550354330552f5a494c3054357641673962370a775a4b70345257365146686c766e6e47667a4f72507449776f336972356e6b7a6d6e4e77376b69555451666c796b7335646167623059745961514a41507438350a78564b794467637947523475764e7772756579366e544846734c2f4c48756b6d70654e686876776e5a6b6e64796131386365413461665776704e5644333571750a3250634b36367978667659653978485545514a42414959494d72695a714868753165646647486c4b5932444d364e4d647432624e38372b3266654b5a505150510a427275392b58547163526362306e6e544b68725355395038456b69785a562b47313830556b794662617a413d0a2d2d2d2d2d454e44205253412050524956415445204b45592d2d2d2d2d0a","publicKey":"2d2d2d2d2d424547494e205055424c4943204b45592d2d2d2d2d0a4d4947664d413047435371475349623344514542415155414134474e4144434269514b426751444d4f68705765776a72314637485a622b4f674c6435364b48550a6d587335366f5a6a4f614555665851376156667469477036396d6e484463474a686974774b6637494e2f6c3279382f6f6d564d4c31335078337945454b3470420a55464f716c2f6e374c52676b7735593558456b744170514745395a6c714e7545617064584c4655514753676e6156504c364d74397170466879696246467758440a34414b3642546a6f314d4b335649546270514944415141420a2d2d2d2d2d454e44205055424c4943204b45592d2d2d2d2d0a","address":"35da0a0c1dc4f61834359c62873f9647e848126c3941a8e5fe25799b61e7844f"};
        //console.log(address);
        // Create and save the user
        user = new User({
            name: req.body.content.name,
            email: req.body.content.email,
            password: bcrypt.hashSync(req.body.content.password, bcrypt.genSaltSync(8), null),
            address: address,
            available_coins: 0,
            actual_coins: 0});

        user.save(function (err) {
            if ( err) return res.json({ msg: "existed" });
            // Create a verification token for this user
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

            // Save the verification token
            token.save(function (err) {
                if ( err) return res.json({ msg: "retry" });

                // Send the email
                var transporter = nodemailer.createTransport("SMTP",{
                    service: "Gmail",
                    auth: {
                        user: "bachuchimhihi@gmail.com",
                        pass: "bachuchim"
                    }
                });
                var mailOptions = { from: 'no-reply@3chuchim.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user\/confirmation\/' + token.token + '.\n' };

                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                            return res.json({ msg: "sendfail" });
                        }
                    return res.json({ msg: "success" });
                    //res.status(200).send('A verification email has been sent to ' + user.email + '.');
                });
            });
        });
    });


}





exports.confirmation = function(req, res, next) {

    /*req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('token', 'Token cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    // Check for validation errors
    var errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);*/

    // Find a matching token
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
};

exports.resendToken = function(req, res, next) {

    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    // Check for validation errors
    var errors = req.validationErrors();
    if (errors) return res.json({ msg: "retry" });

    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.json({ msg: "notexist" });
        if (user.isVerified) return res.json({ msg: "verified" });

        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

        // Save the token
        token.save(function (err) {
            if (err) { return res.json({ msg: "retry" }); }

            // Send the email
            // Send the email
            var transporter = nodemailer.createTransport("SMTP",{
                service: "Gmail",
                auth: {
                    user: "bachuchimhihi@gmail.com",
                    pass: "bachuchim"
                }
            });
            var mailOptions = { from: 'no-reply@3chuchim.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user\/confirmation\/' + token.token + '.\n' };

            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.json({ msg: "sendfail" }); }
                return res.json({ msg: "success" });
            });
        });

    });
};

function Cal(add) {

    History.find({ 'receiver': add }, function(err, histories1) {
        if (err) {
        }
        else if (histories1!==null)
        {
            History.find({ 'sender': add }, function(err, histories2) {
                if (err) {
                }
                else if (histories2!==null)
                {
                    let c=0;
                    histories1.forEach((history, index) => {
                        c+=history.value;
                    });
                    histories2.forEach((history, index) => {
                        c-=history.value;
                    });
                    return c;
                }
            });
        }
    });



};

exports.CalCoin = async function () {

    await User.find({}, function(err, users) {
        if (err) {
            console.log(err);
            return;
        }
        if (users !== null) {
            await(users.forEach((user, index) => {

                //let c = await (Cal(user.address.address));

                History.find({ 'receiver': user.address.address }, function(err, histories1) {
                    if (err) {
                    }
                    else
                    {
                        History.find({ 'sender': user.address.address }, function(err, histories2) {
                            if (err) {
                            }
                            else
                            {
                                let c=0;
                                if (histories1!=null)
                                histories1.forEach((history, index) => {
                                    c+=history.value;
                                });

                                if (histories2!=null)
                                histories2.forEach((history, index) => {
                                    c-=history.value;
                                });
                                await(user.update({
                                    actual_coins: c,
                                    available_coins: c
                                }, function (err, result) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {

                                    }
                                }));
                            }
                        });
                    }
                });
                //console.log(c);
               /* await(user.update({
                    actual_coins: c,
                    available_coins: c
                }, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {

                    }
                }));*/
            }));
        }
        else {
            return;
        }
    });
    console.log("cal done!");
}
function CountUser()
{

}

/*exports.register = function(req, res, next) {
    //var usr = req.body.user.email;
    //console.log(usr);
    //var pass;
    User.findOne({ 'email': req.body.user.email }, function(err, user) {
        if (err) {
            console.log(err);
            return;

        }
        if (user !== null) {
            res.json({ 'status': 'invalid' });
        }
        else {
            console.log(user);
            var user_instance = new User({
                email: req.body.user.email,
                password: req.body.user.password,
                coins: '1000'
            });

            user_instance.save(function(err) {
                if (err) {
                    console.log(err);
                    res.json({ 'status': 'fail' });
                    return;
                }
                res.json({ 'status': 'success', 'user': user_instance });


            });
        }



    });



}


exports.login = function(req, res, next) {

    User.findOne({ 'email': req.body.user.email }, function(err, user) {
        if (err) {
            console.log(err);
            return;

        }
        if (user !== null) {
            var k=false;
            if (req.body.user.password=== user.password) k = true;
            console.log(k);
            if (k)
            {
                User.find({}, function(err, users) {
                    if (err) return res.status(500).send("There was a problem finding the Students.");
                    res.json({ 'status': 'success', 'user': user});
                });

            }
            else res.json({ 'status': 'fail' });
        }
        else {
            res.json({ 'status': 'fail' });
        }



    });



}


exports.all = function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            console.log(err);
            res.json({ 'status': 'fail' });
            return;
        }
        if (users !== null) {
            var emails = [];
            for (var user in users)
                emails.push(users[user].email);
            res.json({'status': 'success', 'users': emails});
        }
        else {
            res.json({ 'status': 'fail' });
        }
    });



};*/