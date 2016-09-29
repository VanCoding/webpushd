var router = require("koa-router")();

module.exports = router
	.post("",require("./send"))
	.delete("/:message",require("./delete"))
	.routes();
