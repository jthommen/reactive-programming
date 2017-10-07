// Require all the gulp modules
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify');

// Define gulp task: Run server script compiling js code with babel and put it in build folder
gulp.task('scripts:server', () => {
    return gulp.src('./src-server/**/*.js')
        .pipe($.babel())
        .pipe(gulp.dest('./build'));
});

// Watch dir for changes and execute other task on change
gulp.task('watch:scripts:server', () => {
    return gulp.watch('./src-server/**/*.js', gulp.secret('scripts:server'));
});