const gulp = require('gulp');
const bump = require('gulp-bump');
var argv = require('yargs').argv;

var version = '';

if (argv.major) {
  version = 'major';
} else if (argv.minor) {
  version = 'minor';
} else {
  version = 'patch';
}

gulp.task('bump', () => {
  gulp.src('./package.json')
    .pipe(bump({type:version}))
    .pipe(gulp.dest('./'));
});
