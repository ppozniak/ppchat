var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', ['copy'] , function () {
    return browserify({entries: './main.js', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));

});

gulp.task('copy', function () {
  return gulp
          .src('app/*.css')
          .pipe(gulp.dest('dist'));
})

gulp.task('watch', ['build'], function () {
    gulp.watch('app/*.jsx', ['build']);
});

gulp.task('default', ['watch']);
