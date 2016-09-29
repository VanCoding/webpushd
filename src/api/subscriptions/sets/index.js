var router = require("koa-router")();

module.exports = router
	.get("/:set",require("./get"))
	.routes();
