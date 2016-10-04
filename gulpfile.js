var gulp = require('gulp');
var del = require('del');
var postcss = require('gulp-postcss');
var scopify = require('postcss-scopify');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var gulpSequence = require('gulp-sequence');
var browserSync = require('browser-sync').create();

gulp.task('clean', function() {
    return del('./assets');
});

gulp.task('copy-bootstrap', function() {
    return gulp.src('./node_modules/bootstrap/dist/**/*.*')
        .pipe(gulp.dest('./assets/bootstrap'));
});

gulp.task('scope-bootstrap', function() {
    var processors = [
        scopify('.twbs')
    ];
    return gulp.src('./assets/bootstrap/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(rename({
            prefix: "scope-"
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/bootstrap'));
});

gulp.task('copy-foehn', function() {
    return gulp.src('./node_modules/foehn/dist/assets/foehn/**/*.*')
        .pipe(gulp.dest('./assets/foehn'));
});

gulp.task('scope-foehn', function() {
    var processors = [
        scopify('.foehn')
    ];
    return gulp.src('./assets/foehn/**/*.css')
        //.pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(rename({
            prefix: "scope-"
        }))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/foehn'));
});

// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on('change', browserSync.reload);
});

//gulp.task('default', ['clean', 'copy-bootstrap', 'scope-bootstrap', 'copy-foehn', 'scope-foehn'], function() {
gulp.task('default', gulpSequence('clean', ['copy-bootstrap', 'copy-foehn'], ['scope-bootstrap', 'scope-foehn'], 'serve'));
