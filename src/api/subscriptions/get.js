module.exports = async function(ctx){
	var messages = await ctx.db.Message.find({subscription:ctx.params.subscription});

	ctx.subscribers[ctx.params.subscription] = ctx.res;
	ctx.res.sendMessage = function(message){
		var stream = this.push("/subscriptions/"+ctx.params.subscription+"/messages/"+message._id);
		stream.writeHead(200,{
			"Link":"</subscriptions/"+ctx.params.subscription+">;rel=\"urn:ietf:params:push\"",
			"Content-Type":"text/plain"
		});
		stream.end(new Buffer(message.data,"base64"));
	}
	for(var message of messages){
		ctx.res.sendMessage(message);
	}
	await new Promise(function(s){
		setTimeout(s,1000*60*60*1);
	})
	delete ctx.subscribers[ctx.params.subscription];
}
