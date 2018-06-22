const gulp = require('gulp');

gulp.task('build', ['images', 'inline']);
gulp.task('connect', require('./lib/tasks/connect'));
gulp.task('create', require('./lib/tasks/create'));
gulp.task('images', require('./lib/tasks/images'));
gulp.task('inline', ['pug', 'sass'], require('./lib/tasks/inline'));
gulp.task('pug', require('./lib/tasks/pug'));
gulp.task('sass', require('./lib/tasks/sass'));
gulp.task('watch', require('./lib/tasks/watch'));

gulp.task('default', ['build', 'connect', 'watch']);
