var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator'); // Import Mongoose Validator Plugin





/*var UserSchema = Schema({
    password: { type: String },
    email: { type: String },
    coins: { type: String }
});*/


/*var UserSchema = Schema({
    name: String,
    email: { type: String, unique: true },
    roles: [{ type: 'String' }],
    isVerified: { type: Boolean, default: false },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    address:{ address: String, privateKey: String, publicKey:String },
    available_coins: Number,
    actual_coins: Number
});*/

var TransactionSchema = Schema(
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
);

/*UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return cb(err); }

        cb(null, isMatch);
    });
};*/
//Export model
if (mongoose.models.Transaction) {
    module.exports = mongoose.model('Transaction');
} else {
    module.exports = mongoose.model('Transaction', TransactionSchema);
}


