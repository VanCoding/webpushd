var compose = require("koa-compose");
var mount = require("koa-mount");
var router = require("koa-router")();

var sub = compose([
	mount("/receipts",require("./receipts")),
	mount("/messages",require("./messages")),
	mount("/sets",require("./sets"))
]);

var subscribers = {};
var senders = {};

module.exports = compose([
	async function(ctx, next){
		ctx.subscribers = subscribers;
		ctx.senders = senders;
		await next();
	},
	router
		.get("/:subscription",require("./get"))
		.all("/:subscription/*",async function(ctx,next){
			var prev = ctx.path;
			ctx.path = ctx.path.slice(("/"+ctx.params.subscription).length);
			await sub(ctx,async function(){
				ctx.path = prev;
				await next();
			});
		})
		.routes()
]);
