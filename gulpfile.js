var gulp = require('gulp');
var del = require('del');
var postcss = require('gulp-postcss');
var scopify = require('postcss-scopify');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var gulpSequence = require('gulp-sequence');
var browserSync = require('browser-sync').create();
var ghPages = require('gulp-gh-pages');

gulp.task('clean', function() {
    return del('./dist');
});

gulp.task('copy-html', function() {
    return gulp.src('./*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy-bootstrap', function() {
    return gulp.src('./node_modules/foehn-bootstrap/dist/**/*.*')
        .pipe(gulp.dest('./dist/assets/bootstrap'));
});

gulp.task('scope-bootstrap', function() {
    var processors = [
        scopify('.twbs')
    ];
    return gulp.src('./dist/assets/bootstrap/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(rename({
            prefix: "scope-"
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets/bootstrap'));
});

gulp.task('copy-foehn', function() {
    return gulp.src('./node_modules/foehn/dist/assets/foehn/**/*.*')
        .pipe(gulp.dest('./dist/assets/foehn'));
});

gulp.task('scope-foehn', function() {
    var processors = [
        scopify('.foehn')
    ];
    return gulp.src('./dist/assets/foehn/**/*.css')
        //.pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(rename({
            prefix: "scope-"
        }))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets/foehn'));
});

// Default
gulp.task('default', gulpSequence('clean', 'copy-html', ['copy-bootstrap', 'copy-foehn'], ['scope-bootstrap', 'scope-foehn']));

// Serve
gulp.task('serve', ['default'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    gulp.watch("*.html").on('change', browserSync.reload);
});

//Deploy
gulp.task('deploy', ['default'], function() {
  return gulp.src('./dist/**/*.*')
    .pipe(ghPages());
});
