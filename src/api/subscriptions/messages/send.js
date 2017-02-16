var toBuffer = require("raw-body");
module.exports = async function(ctx,next){
	var message = new ctx.db.Message();
	message.subscription = ctx.params.subscription;
	message.data = (await toBuffer(ctx.req)).toString("base64");
	message.ttl = Date.now()+parseFloat(ctx.get("ttl")*1000);
	await message.save();
	ctx.set("Location",ctx.config.url+"messages/"+message._id);
	setTimeout(function(){
		console.log("omg")
		var subscriber = ctx.subscribers[ctx.params.subscription];
		if(subscriber) subscriber.sendMessage(message);
	})
	ctx.status = 201;
}
