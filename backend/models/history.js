var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var HistorySchema = Schema({
    sender: String,
    receiver: String,
    transaction: String,
    outputindex:Number,
    used: { type: Boolean, default: false },
    value: Number,

});

//Export model
if (mongoose.models.History) {
    module.exports = mongoose.model('History');
} else {
    module.exports = mongoose.model('History', HistorySchema);
}


