const connect = require('gulp-connect');
const gulp = require('gulp');
const pug = require('gulp-pug');
const pump = require('pump');
const yargv = require('yargs').argv;

module.exports = (cb) => {
	pump([
		gulp.src(['./src/**/[!_]*.pug', '!./src/_pug/**/*', '!./src/_templates/**/*.pug']),
		pug({
			basedir: './src',
			locals: {
				noInline: yargv.noInline,
			},
			pretty: true,
		}),
		gulp.dest('./dist'),
	], cb);
};
