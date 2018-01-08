var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var LocalHistorySchema = Schema({
    sender: String,
    receiver: String,
    transaction: String,
    value: Number,

});

//Export model
if (mongoose.models.LocalHistory) {
    module.exports = mongoose.model('LocalHistory');
} else {
    module.exports = mongoose.model('LocalHistory', LocalHistorySchema);
}