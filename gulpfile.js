var gulp = require('gulp');

gulp.task('copy-bootstrap', function() {
   gulp.src('./node_modules/bootstrap/dist/**/*.*')
   .pipe(gulp.dest('./assets/bootstrap'));
});

gulp.task('copy-foehn', function() {
   gulp.src('./node_modules/foehn/dist/assets/foehn/**/*.*')
   .pipe(gulp.dest('./assets/foehn'));
});

gulp.task('default', ['copy-bootstrap', 'copy-foehn'], function() {
  // place code for your default task here
});
