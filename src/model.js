var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

module.exports = function(db){
	db.Subscription = db.model("subscriptions",{
	});
    db.Receipt = db.model("receipts",{
		subscription: {type: ObjectId, ref: "subscriptions"}
	});
	var Message = new Schema({
		subscription: {type: ObjectId, ref: "subscriptions"},
		ttl: Number,
		data: String
	});
	Message.index({ttl:1},{expireAfterSeconds:0});
	db.Message = db.model("messages",Message);
}
