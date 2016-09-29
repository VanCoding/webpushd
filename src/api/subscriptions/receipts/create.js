module.exports = async function(ctx){
	var receipt = new ctx.db.Receipt();
	receipt.subscription = ctx.params.subscription;
	await receipt.save();
	ctx.set("Location",ctx.url+"receipts/"+receipt._id);
}
