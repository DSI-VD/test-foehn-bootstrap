var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');

gulp.task('clean', function () {
        return del('./assets');
    });

gulp.task('copy-bootstrap', function() {
  return gulp.src('./src/styles/**/*.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('./assets/bootstrap'));
});

gulp.task('copy-foehn', function() {
   gulp.src('./node_modules/foehn/dist/assets/foehn/**/*.*')
   .pipe(gulp.dest('./assets/foehn'));
});

gulp.task('default', ['clean', 'copy-bootstrap', 'copy-foehn'], function() {
  // place code for your default task here
});
