var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator'); // Import Mongoose Validator Plugin
var passportLocalMongoose = require('passport-local-mongoose');




/*var UserSchema = Schema({
    password: { type: String },
    email: { type: String },
    coins: { type: String }
});*/


var UserSchema = Schema({
    name: String,
    email: { type: String, unique: true },
    roles: [{ type: 'String' }],
    isVerified: { type: Boolean, default: false },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date
});

/*UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return cb(err); }

        cb(null, isMatch);
    });
};*/
//Export model
if (mongoose.models.User) {
    module.exports = mongoose.model('User');
} else {
    module.exports = mongoose.model('User', UserSchema);
}


