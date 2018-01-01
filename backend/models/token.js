var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator'); // Import Mongoose Validator Plugin
var passportLocalMongoose = require('passport-local-mongoose');




/*var UserSchema = Schema({
    password: { type: String },
    email: { type: String },
    coins: { type: String }
});*/




const tokenSchema = Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});


//Export model
if (mongoose.models.Token) {
    module.exports = mongoose.model('Token');
} else {
    module.exports = mongoose.model('Token', tokenSchema);
}