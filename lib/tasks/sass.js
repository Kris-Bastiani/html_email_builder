const connect = require('gulp-connect');
const gulp = require('gulp');
const pump = require('pump');
const sass = require('gulp-sass');

module.exports = (cb) => {
	pump([
		gulp.src(['./src/**/[!_]*.scss', '!src/_templates/**/*']),
		sass({
			outputStyle: 'compressed',
		}),
		gulp.dest('./dist'),
	], cb);
};
