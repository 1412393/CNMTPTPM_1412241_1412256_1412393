var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var LocaltransactionSchema = Schema({
    sender: String,
    transaction: String,
    state:  { type: String, default: 'init' },
    value: Number,
    tran:{
        inputs:[
            {
                unlockScript:String,
                referencedOutputHash: String,
                referencedOutputIndex: Number
            }
        ],
        outputs:[
            {
                value: Number,
                lockScript:String
            }
        ],
        version: Number
    }

});

//Export model
if (mongoose.models.Localtransaction) {
    module.exports = mongoose.model('Localtransaction');
} else {
    module.exports = mongoose.model('Localtransaction', LocaltransactionSchema);
}


