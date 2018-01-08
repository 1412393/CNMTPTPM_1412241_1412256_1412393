var express = require('express');
var User = require('../models/user');
var Token = require('../models/token');
var crypto = require('crypto');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var utils = require('../services/utils')
var History = require('../models/history');
const _ = require('lodash');
const bitInt = require('big-integer');
const ursa = require('ursa');
varawait = require('await');
const HASH_ALGORITHM = 'sha256';
var Transaction = require('../models/transaction');
var Localtransaction = require('../models/localtransaction');
var request = require('request');
var utils = require('../services/utils')
var await = require('await');
var nodemailer = require('nodemailer');


exports.sendCoin = function(req, res, next) {
    const sender = req.body.content.user;
    const receivers = req.body.content.receivers;
    User.findOne({ 'address.address': sender.address}, function(err, user) {
        if (err) {
        }
        let av = user.available_coins;
        let sc = 0;
        receivers.forEach((receiver, index) => {
            sc += receiver.value;
        });
        if (av<sc || user.canSend==false) return res.json({ msg: "fail" });
        var jsonO = {
            "inputs" : [],
            "outputs" : [],
            "version": 1
        }

        let k= false;
        if (av>sc) k = true;
        let sum=0;
        History.find({'receiver': sender.address, used: false}, function (err, histories) {
            if (err) {
            }
            else if (histories !== null) {
                //console.log(sum + " " + sc );
                //console.log(histories);
                histories.forEach((history, index) => {

                    if (sum < sc) {
                        jsonO.inputs.push({
                            "unlockScript": "",
                            "referencedOutputHash": history.transaction,
                            "referencedOutputIndex": history.outputindex
                        });

                        sum += history.value;
                    }
                });
                if (sum>sc){
                    jsonO.outputs.push({"value": sum-sc, "lockScript": "ADD " + sender.address});
                }
                receivers.forEach((receiver, index) => {
                    jsonO.outputs.push({"value": receiver.value, "lockScript": "ADD " + receiver.address});
                });

                let message = utils.toBinary(jsonO, true);
                var unlock = "PUB " + user.address.publicKey + " SIG " + utils.sign(message, user.address.privateKey);
                jsonO.inputs.forEach((receiver, index) => {
                    jsonO.inputs[index].unlockScript = unlock;
                });
                console.log(jsonO);

                let l = new Localtransaction({
                    sender: sender.address,
                    transaction: "",
                    value: sc,
                    tran:jsonO
                });
                l.save(function (err) {
                    if (err){ return}
                    // Send the email
                    var transporter = nodemailer.createTransport("SMTP",{
                        service: "Gmail",
                        auth: {
                            user: "bachuchimhihi@gmail.com",
                            pass: "bachuchim"
                        }
                    });
                    var mailOptions = { from: 'no-reply@3chuchim.com', to: user.email, subject: 'Account Verification Tranction', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + "localhost:3001" + '\/transaction\/confirmation\/' + l.id + '.\n' };

                    transporter.sendMail(mailOptions, function (err) {
                        if (err) {
                            return res.json({ msg: "sendfail" });
                        }
                        return res.json({ msg: "success" });
                        //res.status(200).send('A verification email has been sent to ' + user.email + '.');
                    });
                });

            }
        });
    });



}

exports.PostTransaction = async function(sender, receivers ){
    //await CheckTran();
    User.findOne({ 'address.address': sender.address}, function(err, user) {
        if (err) {
        }
        let av = user.available_coins;
        let sc = 0;
        receivers.forEach((receiver, index) => {
            sc += receiver.value;
        });
        if (av<sc || user.canSend==false) return res.json({ msg: "fail" });
        var jsonO = {
            "inputs" : [],
            "outputs" : [],
            "version": 1
        }

        let k= false;
        if (av>sc) k = true;
        let sum=0;
        History.find({'receiver': sender.address, used: false}, function (err, histories) {
            if (err) {
            }
            else if (histories !== null) {
                //console.log(sum + " " + sc );
                //console.log(histories);
                histories.forEach((history, index) => {

                    if (sum < sc) {
                        jsonO.inputs.push({
                            "unlockScript": "",
                            "referencedOutputHash": history.transaction,
                            "referencedOutputIndex": history.outputindex
                        });

                        sum += history.value;
                    }
                });
                if (sum>sc){
                    jsonO.outputs.push({"value": sum-sc, "lockScript": "ADD " + sender.address});
                }
                receivers.forEach((receiver, index) => {
                    jsonO.outputs.push({"value": receiver.value, "lockScript": "ADD " + receiver.address});
                });

                let message = utils.toBinary(jsonO, true);
                var unlock = "PUB " + user.address.publicKey + " SIG " + utils.sign(message, user.address.privateKey);
                jsonO.inputs.forEach((receiver, index) => {
                    jsonO.inputs[index].unlockScript = unlock;
                });


                let l = new Localtransaction({
                    sender: sender.address,
                    transaction: "",
                    value: sc,
                    tran:jsonO
                });
                l.save(function (err) {
                    if (err){ return}
                    // Send the email
                    var transporter = nodemailer.createTransport("SMTP",{
                        service: "Gmail",
                        auth: {
                            user: "bachuchimhihi@gmail.com",
                            pass: "bachuchim"
                        }
                    });
                    var mailOptions = { from: 'no-reply@3chuchim.com', to: user.email, subject: 'Account Verification Tranction', text: 'Hello,\n\n' + 'Please verify your transaction by clicking the link: \nhttp:\/\/' + req.headers.host + '\/transaction\/confirmation\/' + l.id + '.\n' };

                    transporter.sendMail(mailOptions, function (err) {
                        if (err) {
                            return res.json({ msg: "sendfail" });
                        }
                        return res.json({ msg: "success" });
                        //res.status(200).send('A verification email has been sent to ' + user.email + '.');
                    });
                });

            }
        });
    });

}


async function CheckTran(){

    await Transaction.find({}, function(err, transactions) {
        if (err) {
            return;
        }
        if (transactions !== null) {
            await (transactions.forEach((transaction, index) => {
                await (transaction.inputs.forEach((input, i) => {
                    //if (input.referencedOutputHash == "f3d218bad02b3d8069a46e8020de8ef620e1b03f5fa904061499631a94a1b985" && input.referencedOutputIndex== 1)
                    //    console.log("cc");
                    History.findOne({ 'transaction': input.referencedOutputHash, 'outputindex':input.referencedOutputIndex, 'used': false }, function(err, history) {
                        if (err) {
                        }
                        else if (history!==null) {

                            await(history.update({
                                used: true
                            }, function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                }
                            }));
                        }

                });

                }));
            }));


        }


        else {
            return;
        }
    });
}

exports.Confirmation = function(req, res, next) {
    let id = req.params.id;
    //res.status(200).send("Transaction had been sent!!");
    Localtransaction.findOne({ '_id': id, "state": "init" }, function(err, lt) {
        if (err) {
        }
        else if(lt!= null){

            var jsonO = {
                "inputs" : lt.tran.inputs,
                "outputs" : lt.tran.outputs,
                "version": 1
            }

            request({
                url: "https://api.kcoin.club/transactions",
                method: "POST",
                json: true,
                body: jsonO
            }, function (error, response, body){
                if (error){
                    return;
                }

                if (response.body.hash){
                    let avc = user.available_coins - sc;
                    lt.update({
                        state: "processing",
                        transaction: response.body.hash
                    }, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    user.update({
                        available_coins: avc,
                        canSend: false
                    }, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.status(200).send("Transaction had been sent!!");
                        }
                    });

                } else  res.status(200).send("Transaction wrong!!");

            });
           // res.status(200).send("Transaction had been sent!!");
        }
    });

}