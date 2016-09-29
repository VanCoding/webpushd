var mount = require("koa-mount");
var compose = require("koa-compose");
var router = require("koa-router")();

module.exports = compose([
	router
		.post("/subscribe/",require("./subscribe"))
		.routes(),
	mount("/subscriptions",require("./subscriptions"))
]);
