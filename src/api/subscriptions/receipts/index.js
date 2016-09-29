var router = require("koa-router")();

module.exports = router
	.post("",require("./create"))
	.post("/:receipt",require("./get"))
	.routes();
