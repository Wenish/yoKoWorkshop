// Node modules
var fs = require('fs'),
    vm = require('vm'),
    merge = require('deeply'),
    chalk = require('chalk'),
    es = require('event-stream'),
    child = require('child_process');

// Gulp and plugins
var gulp = require('gulp'),
    rjs = require('gulp-requirejs-bundler'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    webserver = require('gulp-webserver');

// Config
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');
requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
    out: 'scripts.js',
    baseUrl: './src',
    name: 'app/startup',
    paths: {
        requireLib: '../node_modules/requirejs/require'
    },
    include: [
        'requireLib',
        'components/nav-bar/nav-bar',
        'pages/home/home',
        'pages/about/about',
        'pages/contact/contact'
    ],
    insertRequire: ['app/startup'],
    bundles: {
        // If you want parts of the site to load on demand, remove them from the 'include' list
        // above, and group them into bundles here.
        // 'bundle-name': [ 'some/module', 'another/module' ],
        // 'another-bundle-name': [ 'yet-another-module' ]
        // 'about-page': [ 'pages/about/about' ]
    }
});

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', function() {
    return rjs(requireJsOptimizerConfig)
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('./dist/src/'));
});

// Concatenates CSS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task('css', function() {
    var appCss = gulp.src([
          './node_modules/bootstrap/dist/css/bootstrap.min.css',
          'src/css/styles.css'
        ]),
        combinedCss = es.concat(appCss).pipe(concat('css.css')),
        fontFiles = gulp.src('./node_modules/bootstrap/fonts/*', {
            base: './node_modules/bootstrap/components-bootstrap/'
        });
    return es.concat(combinedCss, fontFiles)
        .pipe(gulp.dest('./dist/src/'));
});



// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(htmlreplace({
            'css': 'css.css',
            'js': 'scripts.js'
        }))
        .pipe(gulp.dest('./dist/src/'));
});

// Removes all files from ./dist/
gulp.task('images', function() {
    return gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dist/src/images'));
});

// Removes all files from ./dist/
gulp.task('clean', function() {
    return gulp.src('./dist/**/*', {
            read: false
        })
        .pipe(clean());
});

gulp.task('default', ['html', 'js', 'css', 'images'], function(callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});

// Sets up a webserver with live reload for development
gulp.task('webserver', function() {
    gulp.src('')
        .pipe(webserver({
            livereload: true,
            port: 8050,
            directoryListing: true,
            open: 'http://localhost:8050/src/index.html'
        }));
});

// Runs the intern client, that runs through all unit tests
gulp.task('intern', function(done) {
    var command = [
            './node_modules/intern/client.js',
            'config=intern'
        ],
        process = child.spawn('node', command, {
            stdio: 'inherit'
        });

    process.on('close', function(code) {
        if (code) {
            done(new Error('Intern exited with code ' + code));
        } else {
            done();
        }
    });
});

// Watches all source and test files and runs intern every time a file is saved
gulp.task('test', ['intern'], function() {
    gulp.watch(['./src/**/*', './test/**/*'], ['intern']);
});

// Fires up the intern web-client in your browser. NB! BEWARE OF BROWSER CACHING
gulp.task('intern-web', function() {
    gulp.src('')
        .pipe(webserver({
            livereload: true,
            port: 8080,
            directoryListing: true,
            open: 'http://localhost:8080/node_modules/intern/client.html?config=intern'
        }));
});
