module.exports = async function(ctx){
	var subscription = new ctx.db.Subscription();
	await subscription.save();

	ctx.set("Link",[
		"</subscriptions/"+subscription._id+"/messages>; rel=\"urn:ietf:params:push\"",
		"</subscriptions/"+subscription._id+"/receipts>; rel=\"urn:ietf:params:push:receipt\""
	]);
	ctx.set("Location",ctx.config.url+"subscriptions/"+subscription._id);
	ctx.status = 201;
}
