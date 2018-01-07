var mongoose = require('mongoose');
var Schema = mongoose.Schema;





var BlockSchema = Schema(
    {
        hash: String,
        nonce: Number,
        version: Number,
        timestamp: Number,
        difficulty: Number,
        transactions:[
            {
                hash: String,
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
        ],
        transactionsHash: String,
        previousBlockHash: String
    }
);

/*BlockSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return cb(err); }

        cb(null, isMatch);
    });
};*/
//Export model
if (mongoose.models.Block) {
    module.exports = mongoose.model('Block');
} else {
    module.exports = mongoose.model('Block', BlockSchema);
}


