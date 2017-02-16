module.exports = async function(ctx){
	var message = await ctx.db.Message.findById(ctx.params.message);
	if(message == null) ctx.throw(404);
	var sender = ctx.senders[ctx.params.subscription];
	if(sender) sender.sendConfirmation(message);
	await message.remove();
	console.log("deleted")
}
