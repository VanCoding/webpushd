module.exports = async function(ctx){
	ctx.senders[ctx.params.receipt] = ctx.res;
	ctx.res.sendConfirmation = function(message){
		var stream = ctx.res.push("/subscriptions/"+ctx.params.subscription+"/messages/"+message._id);
		stream.writeHead(200,{});
		stream.end();
	}
	await new Promise(function(s){
		setTimeout(s,1000*60*60*1);
	})
	delete ctx.senders[ctx.params.receipt];
}
