const connect = require('gulp-connect');
const gulp = require('gulp');
const inlineCss = require('gulp-inline-css');
const pump = require('pump');
const replace = require('gulp-replace');
const through2 = require('through2');
const yargv = require('yargs').argv;

const inlineCssOptions = {
	applyStyleTags: false,
	removeStyleTags: false,
	preserveMediaQueries: true,
};

module.exports = (cb) => {
	pump([
		gulp.src('dist/**/*.html'),
		yargv.noInline ? through2.obj() : inlineCss(inlineCssOptions),
		replace('<!-- startMSO-->', '<!--[if (mso)|(IE)]>'),
		replace('<!-- endMSO-->', '<![endif]-->'),
		gulp.dest('./dist'),
		connect.reload(),
	], cb);
};
