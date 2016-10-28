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
  mediaelement_files: [
    "node_modules/mediaelement/build/background.png",
    "node_modules/mediaelement/build/bigplay.png",
    "node_modules/mediaelement/build/bigplay.svg",
    "node_modules/mediaelement/build/controls.png",
    "node_modules/mediaelement/build/controls.svg",
    "node_modules/mediaelement/build/flashmediaelement.swf",
    "node_modules/mediaelement/build/jumpforward.png",
    "node_modules/mediaelement/build/loading.gif",
    "node_modules/mediaelement/build/silverlightmediaelement.xap",
    "node_modules/mediaelement/build/skipback.png",
  ],
  css_entry: 'assets/sass/main.scss',
  css_glob: 'assets/sass/**/*.scss',
  js_entry: 'assets/js/main.js',
  js_glob: 'assets/js/**/*.js',
}

gulp.task('js', function() {
  browserify(config.js_entry)
    .transform('babelify')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('static/assets/js'))
})

gulp.task('css', function() {
  var stream = gulp.src(config.css_entry)
    .pipe(sass(config.sass).on('error', sass.logError))

  config.mediaelement_files.forEach(f => {
    const fName = path.basename(f)
    stream = stream.pipe(replace(fName, "../mediaelement/" + fName))
  })

  stream.pipe(gulp.dest('static/assets/css'))
})

gulp.task('static', function() {
  gulp
    .src(config.mediaelement_files)
    .pipe(gulp.dest('static/assets/mediaelement'))
})

gulp.task('default', ['js', 'css', 'static'])
gulp.task('watch', ['default'], function() {
  gulp.watch(config.js_glob, ['js'])
  gulp.watch(config.css_glob, ['css'])
})
