var Block = require('../models/block');
var Transac = require('../services/transaction');
var await = require('await');

exports.AddBlock = async function (data) {

    let b = new Block(data);
    await b.save(function (err) {
        if (err) console.log(err);
        console.log("save block");
    })
    data.transactions.forEach((transaction, index) => {
        await (Transac.AddTransaction(transaction));
    });
}