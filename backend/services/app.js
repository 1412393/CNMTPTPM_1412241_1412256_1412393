const request = require('request');
var Block = require('../models/block');
var Promise = require("promise");
var Transaction = require('../models/transaction');
var Transac = require('../services/transaction');
var await = require('await');

exports.InitData =  function () {
    /*Block.remove(function(err,removed) {

    });
    Transaction.remove(function(err,removed) {

    });*/
    const options = {
        url: 'https://api.kcoin.club/blocks',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
        },
        qs : {
            'limit': 100,
            'offset': 0,
            'order': 0
        }
    };

    /*function doCall(options) {
        request(options, function (err, res, body) {
            let blocks = JSON.parse(body);
            count = blocks.length;
            console.log(count);
            blocks.forEach((block, index) => {
                let b = new Block(block);
                //b.save();

                b.save(function (err) {
                    if (err) console.log(err);
                    //console.log(index);
                })
            });
            if (count > 0){
                options.qs.offset +=100;
                doCall(options);
            }
        });
    }
    doCall(options);*/




         requestp(options);


}

async  function requestp(options) {
    return new Promise(function (resolve, reject) {
        request(options, function (err, res, body) {
            if (err) {
                return reject(err);
            } else {

                let blocks = JSON.parse(body);
                count = blocks.length;
                console.log(count);
                blocks.forEach((block, index) => {
                    let b = new Block(block);
                    //b.save();

                    b.save(function (err) {
                        if (err) console.log(err);
                        //console.log(index);
                    })

                    b.transactions.forEach((transaction, index) => {
                        let t = new Transaction(transaction);
                        t.save(function (err) {
                            if (err) console.log(err);
                            //console.log(index);
                        })
                    });

                });
                if (count > 0){
                    options.qs.offset +=100;
                    requestp(options);
                }
                else
                {
                    await (Transac.InitHistory());
                }

                resolve(body);
            }

        });
    });
}



