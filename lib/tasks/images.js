const connect = require('gulp-connect');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pump = require('pump');

module.exports = (cb) => {
	pump([
		gulp.src(['./src/**/images/**/*', '!./src/_assets/**/*', '!./src/_templates/**/*']),
		imagemin(),
		gulp.dest('./dist'),
	], cb);
};
