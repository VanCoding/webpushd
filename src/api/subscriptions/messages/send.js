var parse = require("co-body");
module.exports = async function(ctx){
	var message = new ctx.db.Message();
	message.subscription = ctx.params.subscription;
	message.receipt = ctx.get("push-receipt").split("/").slice(-1)[0];
	message.data = await parse.text(ctx);
	/* TODO: support TTL header */
	await message.save();
	ctx.set("Location",ctx.config.url+"messages/"+message._id);
	setTimeout(function(){
		var subscriber = ctx.subscribers[ctx.params.subscription];
		if(subscriber) subscriber.sendMessage(message);
	})
}
