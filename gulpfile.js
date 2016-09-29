var gulp = require("gulp");
var babel = require("gulp-babel");
var rimraf = require("rimraf");
var fs = require("fs");
var cp = require("child_process");

gulp.task("clean",function(){
	rimraf.sync("./lib")
    fs.mkdirSync("./lib");
});

gulp.task("build",["clean"],function(cb){
	gulp.src("./src/**")
		.pipe(babel({
			presets:["es2015"],
			plugins:["transform-regenerator","syntax-async-functions"],
		}))
		.pipe(gulp.dest("./lib"))
		.on("finish",cb)
})

gulp.task("run",["build"],function(){
	require("./lib/index.js");
})
