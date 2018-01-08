var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var HistorySchema = Schema({
    sender: String,
    receiver: String,
    transaction: String,
    value: Number,

});

//Export model
if (mongoose.models.History) {
    module.exports = mongoose.model('History');
} else {
    module.exports = mongoose.model('History', HistorySchema);
}


