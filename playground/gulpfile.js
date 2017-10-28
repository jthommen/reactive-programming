// Require all the gulp modules
var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
source = require('vinyl-source-stream'),
browserify = require('browserify'),
watchify = require('watchify'),
babelify = require('babelify'),
path = require('path'),
fs = require('fs');

// Define gulp task: Run server script compiling js code with babel and put it in build folder
gulp.task('scripts:server', () => {
return gulp.src('./src-server/**/*.js')
    .pipe($.cached('server')) // don't reprocess no changes
    .pipe($.babel())
    .pipe(gulp.dest('./build'));
});

// Watch dir for changes and execute other task on change
gulp.task('watch:scripts:server', gulp.series(
"scripts:server", () => gulp.watch('./src-server/**/*.js', gulp.series('scripts:server'))
));

// Looks at source folder and iniates watch task on every file
gulp.task('watch:scripts:client', () => {
const files = fs.readdirSync('./src-client');
for(let i = 0; i < files.length; i++){
    const file = files[i];
    if (path.extname(file) !== ".js")
        continue;

    initBundlerWatch(path.join('src-client', file));
}

return gulp.watch('./src-client/**/*.js')
    .on('change', initBundlerWatch);
});

// Runs server and client watch task together
gulp.task('watch:scripts', gulp.parallel(
'watch:scripts:client',
'watch:scripts:server'));

// Helper functions
let bundlers = {};
function initBundlerWatch(file) {
if(bundlers.hasOwnProperty(file))
    return;
const bundler = createBundler(file);
bundlers[file] = bundler; // prevents from creating tons of new bundlers
const watcher = watchify(bundler);
const filename = path.basename(file);

function bundle() {
    return bundler
        .bundle() // bundle everything in one object
        .on('error', error => console.log.error(error))
        .pipe(source(filename)) // give it a filename (browserify doesn't)
        .pipe(gulp.dest('./public/build')); // save in f
}

watcher.on('update', bundle); // rebundle on change
watcher.on('time', time => console.log(`Built client in ${time}ms`));

bundle();
}

function createBundler(file) {
const bundler = browserify(file); // pull in modules for transpile
bundler.transform(babelify); // transile bundles
return bundler; // return bundles
}