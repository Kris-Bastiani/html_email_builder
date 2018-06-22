const connect = require('gulp-connect');

module.exports = () => {
	connect.server({
		livereload: true,
		port: 3030,
		root: 'dist',
	});
};
