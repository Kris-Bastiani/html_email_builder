const gulp = require('gulp');

module.exports = () => {
	gulp.watch(['./src/**/*.+(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)'], ['images']);
	gulp.watch(['./src/**/*.pug', './src/**/*.scss'], ['inline']);
};
