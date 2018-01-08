var Transaction = require('../models/transaction');
var History = require('../models/history');
var Block = require('../models/block');
var User = require('../models/user');
var userController = require("../controllers/userController");
var async = require('async');
var await = require('await');
var Localtransaction = require('../models/localtransaction');

exports.AddTransaction = async function (data) {
    const transaction = data;
    const t = new Transaction(transaction);
    await t.save(function (err) {
        if (err) console.log(err);
        console.log("save transaction");
            await(Transaction.findOne({'hash': transaction.inputs[0].referencedOutputHash}, function (err, t) {
                if (err) {
                }
                else if (t !== null) {
                    let sender = (t.outputs[transaction.inputs[0].referencedOutputIndex].lockScript.replace('ADD ', ''));
                    await(transaction.outputs.forEach((tt, i) => {
                        let receiver = (tt.lockScript.replace('ADD ', ''));
                        let h = new History({
                            sender: sender,
                            receiver: receiver,
                            transaction: transaction.hash,
                            outputindex: i,
                            value: tt.value
                        });
                        await(h.save(function (err) {
                            if (err) console.log(err);
                            if (sender != receiver) {
                                await(User.findOne({'address.address': receiver}, function (err, user) {
                                    if (err) {
                                    }
                                    else if (user !== null) {
                                        let ac = user.actual_coins + tt.value;
                                        //let av = user.available_coins + tt.value;
                                        console.log(user.actual_coins + " " + tt.value);
                                        await(user.update({
                                            actual_coins: ac
                                        }, function (err, result) {
                                            if (err) {
                                                console.log(err);
                                            }
                                            else {
                                                console.log(ac + "nhan " + av);
                                                await(User.findOne({'address.address': sender}, function (err, user) {
                                                    if (err) {
                                                    }
                                                    else if (user !== null) {

                                                        let ac = user.actual_coins - tt.value;
                                                        //let av = user.available_coins - tt.value;
                                                        console.log(user.actual_coins + " " + tt.value);
                                                        await(user.update({
                                                            actual_coins: ac,
                                                            canSend: true,
                                                        }, function (err, result) {
                                                            if (err) {
                                                                console.log(err);
                                                            }
                                                            else {
                                                                console.log(ac + "chuyen " + av);
                                                                return;
                                                            }
                                                        }));
                                                    }
                                                }));
                                            }
                                        }));

                                    }
                                }));
                            }
                        }));

                    }));
                }
            }));
    })
    Localtransaction.findOne({ 'transacsion': transaction.hash, "state": "processing" }, function(err, lt) {
        if (err) {
        }
        else if(lt!= null) {
            lt.update({
                state: "done",
            }, function (err, result) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}


exports.InitHistory = async function () {

    /*History.remove(function(err,removed) {

    });*/

    await Transaction.find({}, function(err, transactions) {
        if (err) {
            console.log(err);
            console.log("cc");
            return;
        }
        if (transactions !== null) {
            //console.log(transactions.length )
            await (transactions.forEach((transaction, index) => {
                //await for (let transaction of transactions) {
                //console.log(transaction.inputs.length );
                //if (transaction.inputs.length < 1) console.log(transaction + " " + index);
                //sender = "";
                await(Transaction.findOne({'hash': transaction.inputs[0].referencedOutputHash}, function (err, t) {

                    if (err) {

                    }
                    else if (t !== null) {
                        let sender = (t.outputs[transaction.inputs[0].referencedOutputIndex].lockScript.replace('ADD ', ''));
                        await(transaction.outputs.forEach((tt, i) => {
                            //for (let tt of transaction.outputs) {
                            let receiver = (tt.lockScript.replace('ADD ', ''));
                            let h = new History({
                                sender: sender,
                                receiver: receiver,
                                transaction: transaction.hash,
                                outputindex: i,
                                value: tt.value
                            });
                            //b.save();

                            await(h.save(function (err) {
                                if (err) console.log(err);
                               /* if (sender != receiver) {
                                    await(User.findOne({'address.address': receiver}, function (err, user) {
                                        if (err) {
                                        }
                                        else if (user !== null) {
                                            let ac = user.actual_coins + tt.value;
                                            let av = user.available_coins + tt.value;
                                            console.log(user.actual_coins + " " + tt.value);
                                            await(user.update({
                                                actual_coins: ac,
                                                available_coins: av
                                            }, function (err, result) {
                                                if (err) {
                                                    console.log(err);
                                                }
                                                else {
                                                    console.log(ac + "nhan " + av);
                                                    await(User.findOne({'address.address': sender}, function (err, user) {
                                                        if (err) {
                                                        }
                                                        else if (user !== null) {

                                                            let ac = user.actual_coins - tt.value;
                                                            let av = user.available_coins - tt.value;
                                                            console.log(user.actual_coins + " " + tt.value);
                                                            await(user.update({
                                                                actual_coins: ac,
                                                                available_coins: av
                                                            }, function (err, result) {
                                                                if (err) {
                                                                    console.log(err);
                                                                }
                                                                else {
                                                                    console.log(ac + "chuyen " + av);
                                                                    return;
                                                                }
                                                            }));
                                                        }
                                                    }));
                                                }
                                            }));

                                        }
                                    }));
                                }*/
                            }));

                        }));
                    }
                    }));
                }));


            }


        else {
            return;
        }
    });


    userController.CalCoin();
}


