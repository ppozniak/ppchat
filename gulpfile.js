var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minify = require('gulp-cssmin'),
    concat = require('gulp-concat-css'),
    autoprefix = require('gulp-autoprefixer'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    del = require('del');

// Settings
var entryPoint = 'app/components/App.jsx';
var paths = {
  styles: 'app/styles/*.scss',
  components: 'app/components/*.{jsx,js}',
  reducers: 'app/reducers/*.{js}',
  js: 'app/helpers.js',
  dist: 'public'
}
var prefixRange = ['last 4 versions'];

// Watch for changes
gulp.task('watch', ['build', 'sass'], function() {
  gulp.watch(paths.components, ['build']);
  gulp.watch(paths.js, ['build']);
  gulp.watch(paths.reducers, ['build']);
  gulp.watch(paths.styles, ['sass']);
});

// SCSS
gulp.task('sass', function() {
  return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(concat('style.min.css'))
        .pipe(autoprefix(prefixRange))
        .pipe(minify())
        .pipe(gulp.dest(paths.dist));
});

// Copy rest of the files
gulp.task('files', function() {
  return gulp.src('app/files/**.{ico,ogg}')
        .pipe(gulp.dest(paths.dist));
});

// Clean dist directory
gulp.task('clean', function() {
  return del([paths.dist]);
});

// Babelify + bundle
gulp.task('build', ['files'], function() {
  return browserify({ entries: entryPoint,
                      extensions: ['.jsx'],
                      debug: true })
        .transform(babelify, { presets: ['es2015', 'react', 'stage-0'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['watch']);
