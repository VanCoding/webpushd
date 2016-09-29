var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

module.exports = function(db){
	db.Subscription = db.model("subscriptions",{
		_id: ObjectId
	});
    db.Receipt = db.model("receipts",{
        _id: ObjectId,
		subscription: {type: ObjectId, ref: "subscriptions"}
	});
	db.Message = db.model("messages",{
		_id: ObjectId,
		subscription: {type: ObjectId, ref: "subscriptions"},
		receipt: {type: ObjectId, ref: "receipts"},
		data: String
	});
}
