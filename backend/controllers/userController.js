var express = require('express');
var User = require('../models/user');
var Token = require('../models/token');
var passport = require('passport');
var crypto = require('crypto');
var nodemailer = require('nodemailer');



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
        var isMatch = false;
        if (req.body.content.password=== user.password) isMatch = true;
        //user.comparePassword(req.body.content.password, function (err, isMatch) {
            if (!isMatch) return res.json({ msg: "wrong" });

            // Make sure the user has been verified
            if (!user.isVerified) return res.json({ msg: "notverified" });

            // Login successful, write token, and send back user
            //res.json({ msg: "success", token: generateToken(user), user: user });
            res.json({ msg: "success",  user: user });
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

        // Create and save the user
        user = new User({ name: req.body.content.name, email: req.body.content.email, password: req.body.content.password });
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