require("babel-polyfill");

var fs = require("fs");
var http2 = require("http2");
var koa = require("koa");
var mongoose = require("mongoose");
var installModel = require("./model");

var config = JSON.parse(fs.readFileSync("./config.json")+"");
var database = null;

var app = new koa();
app.use(async function(ctx,next){
	console.log("request",ctx.method,ctx.path);
	ctx.set("Access-Control-Allow-Origin","*")
	ctx.config = config;
	ctx.db = mongoose.connection;
	await next();
})
app.use(require("./api"));

var server = http2.createServer({
	key:fs.readFileSync(config.key),
	cert:fs.readFileSync(config.cert)
},app.callback());

(async function(){
	await mongoose.connect("mongodb://"+config.db);
	installModel(mongoose.connection);
	server.listen(config.port);
	console.log("successfully started");
})().catch(function(err){
	console.log(err);
});
