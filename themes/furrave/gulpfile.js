var merge  = require('merge-stream'),
    gulp   = require('gulp'),
    jquery = require('gulp-jquery'),
    concat = require('gulp-concat'),
    clean  = require('./components/semantic/tasks/clean'),
    watch  = require('./components/semantic/tasks/watch'),
    build  = require('./components/semantic/tasks/build');

// import task with a custom task name
gulp.task('watch-ui', watch);
gulp.task('build-ui', build);
gulp.task('clean-ui', clean);

gulp.task('clean', ['clean-ui']);
gulp.task('build', ['concat-js', 'concat-css', 'copy-theme', 'copy-static']);

var config = {
  static_files: [
    'components/site/static/**',
  ],
  mejs_files: [
    'components/mediaelementjs/build/*.png',
    'components/mediaelementjs/build/*.svg',
    'components/mediaelementjs/build/*.gif',
    'components/mediaelementjs/build/flashmediaelement.swf',
  ],
  js_files: [
    'components/semantic/dist/semantic.js',
    'components/site/site.js',
    'components/mediaelementjs/build/mediaelement-and-player.js',
  ],
  css_files: [
    'components/mediaelementjs/build/mediaelementplayer.css',
    'components/semantic/dist/semantic.css',
    'components/site/site.css',
  ],

  asset_output: 'static/assets',
  js_output: 'site.js',
  css_output: 'site.css',

  semantic_path: 'components/semantic',
  semantic_theme: 'default',
}

gulp.task('concat-css', ['build-ui'], function() {
  return gulp.src(config.css_files)
    .pipe(concat(config.css_output))
    .pipe(gulp.dest(config.asset_output));
});

gulp.task('concat-js', ['build-ui'], function() {
  return merge(jquery.src(), gulp.src(config.js_files))
    .pipe(concat(config.js_output))
    .pipe(gulp.dest(config.asset_output));
});

gulp.task('copy-theme', ['build-ui'], function() {
  return gulp.src(config.semantic_path + '/themes/' + config.semantic_theme + '/**')
    .pipe(gulp.dest(config.asset_output + '/themes/' + config.semantic_theme));
});

gulp.task('copy-mejs', function() {
  return gulp.src(config.mejs_files)
    .pipe(gulp.dest(config.asset_output));
});

gulp.task('copy-static', ['copy-mejs'], function() {
  return gulp.src(config.static_files)
    .pipe(gulp.dest(config.asset_output));
});
