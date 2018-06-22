const gulp = require('gulp');
const pump = require('pump');
const readline = require('readline');

module.exports = () => {
	const interface = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	interface.question('Which template do you want?\n', (template) => {
		interface.question('What should the directory be called?\n', (directory) => {
			pump([
				gulp.src([`./src/_templates/${template}/**/*`], {
					base: `./src/_templates/${template}`,
				}),
				gulp.dest(`./src/${directory}`),
			]);
			interface.close();
		})
	});
};
