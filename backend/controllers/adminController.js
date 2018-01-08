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



exports.manage = function(req,res,next) {
    User.find({}, function(err, users) {
                var userInfo = {};
                var amount_user = 0;
                var amount_actual_coin = 0;
                var amount_available_coin = 0;
                users.forEach(function(user) {
                    userInfo[user._id] = user;
                    amount_user +=1;
                    amount_actual_coin += user.actual_coins;
                    amount_available_coin+= user.available_coins;
                    });

            });
    res.json({ msg: "success",  info: {amount_user: amount_user, amount_actual_coin: amount_actual_coin , amount_available_coin: amount_available_coin  } });
}



exports.user_manage = function (req,res,next) {
    User.find({}, function(err, users) {
        var userMap = {};

        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
}
exports.transaction_manage = function (req,res,next) {
    Transaction.find({}, function(err, transactions) {
        var transactionMap = {};

        transactions.forEach(function(transaction) {
            transactionMap[transaction._id] = transaction;
        });

        res.send(transactionMap);
    });

}