var express = require('express');
var User = require('../models/user');
var Transaction = require('../models/transaction');
var Token = require('../models/token');
var crypto = require('crypto');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var utils = require('../services/utils')
var History = require('../models/history');
var LocalHistory = require('../models/localhistory')
const _ = require('lodash');
const bitInt = require('big-integer');
const ursa = require('ursa');
var await = require('await');
const HASH_ALGORITHM = 'sha256';

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}

exports.manage = function(req,res,next) {
    User.find({}, function(err, users) {
                var userInfo = {};
                var historyInfo = {};
                var local_history;
                var amount_user = 0;
                var amount_actual_coin = 0;
                var amount_available_coin = 0;
                users.forEach(function(user) {
                    userInfo[user._id] = user;
                    amount_user +=1;
                    amount_actual_coin += parseInt(user.actual_coins);
                    amount_available_coin+= parseInt(user.available_coins);
                    });

                users.forEach(function (user) {
                       History.find({sender : user.address.address },function (err,history) {
                           //local_history = jsonConcat(local_history, history);
                           history.forEach(function (historyitem) {
                               local_history = new LocalHistory({
                                   sender: historyitem.sender,
                                   receiver: historyitem.receiver,
                                   transaction: historyitem.transaction,
                                   value: historyitem.value
                               });
                               local_history.save(function (err) {
                                   if (err) {
                                       return res.status(500).send({msg: err.message});
                                   }
                                   res.status(200);
                               });
                           })
                       })
                        History.find({receiver : user.address.address},function (err,history) {

                           // local_history = jsonConcat(local_history,history);
                            history.forEach(function (historyitem) {
                                local_history = new LocalHistory({
                                    sender: historyitem.sender,
                                    receiver: historyitem.receiver,
                                    transaction: historyitem.transaction,
                                    value: historyitem.value
                                });
                                local_history.save(function (err) {
                                    if (err) {
                                        return res.status(500).send({msg: err.message});
                                    }
                                    res.status(200);
                                });
                            })
                    });

                })
    LocalHistory.find({},function (err,localhtr) {
            res.json({ msg: "success",  info: {amount_user: amount_user, amount_actual_coin: amount_actual_coin , amount_available_coin: amount_available_coin  },users, localhtr });
        })







    });
}



