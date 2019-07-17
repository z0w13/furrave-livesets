const path       = require('path')
const gulp       = require('gulp')
const sass       = require('gulp-sass')
const source     = require('vinyl-source-stream')
const browserify = require('browserify')
const replace    = require('gulp-replace')

const config = {
  sass: {
    includePaths: [
      'node_modules/bootstrap/scss',
      'assets/sass',
    ],
  },
  css_entry: 'assets/sass/main.scss',
  css_glob: 'assets/sass/**/*.scss',
  js_entry: 'assets/js/main.js',
  js_glob: 'assets/js/**/*.js',
}

gulp.task('js', function() {
  return browserify(config.js_entry)
    .transform('babelify')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('static/assets/js'))
})

gulp.task('css', function() {
  var stream = gulp.src(config.css_entry)
    .pipe(sass(config.sass).on('error', sass.logError))

  return stream.pipe(gulp.dest('static/assets/css'))
})

gulp.task('default', gulp.parallel('js', 'css'))
gulp.task('watch', gulp.series('default', function() {
  gulp.watch(config.js_glob, gulp.series('js'))
  gulp.watch(config.css_glob, gulp.series('css'))
}))
