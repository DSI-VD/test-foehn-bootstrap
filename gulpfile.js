var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function () {
        return del('./assets');
    });

gulp.task('copy-bootstrap', function() {
   gulp.src('./node_modules/bootstrap/dist/**/*.*')
   .pipe(gulp.dest('./assets/bootstrap'));
});

gulp.task('copy-foehn', function() {
   gulp.src('./node_modules/foehn/dist/assets/foehn/**/*.*')
   .pipe(gulp.dest('./assets/foehn'));
});

gulp.task('default', ['clean', 'copy-bootstrap', 'copy-foehn'], function() {
  // place code for your default task here
});
