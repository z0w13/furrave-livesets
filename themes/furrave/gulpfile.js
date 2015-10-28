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
gulp.task('build', ['concat-js', 'concat-css', 'copy-theme']);

gulp.task('concat-css', ['build-ui'], function() {
  return gulp.src([
    'components/semantic/dist/semantic.css',
    'components/site/site.css',
  ]).pipe(concat('site.css'))
    .pipe(gulp.dest('static/assets'));
});

gulp.task('concat-js', ['build-ui'], function() {

  return merge(
    jquery.src(),
    gulp.src([
      'components/semantic/dist/semantic.js',
    ])
  ).pipe(concat('site.js'))
   .pipe(gulp.dest('static/assets'));
});

gulp.task('copy-theme', ['build-ui'], function() {
  return gulp.src('semantic/dist/themes/default/**')
    .pipe(gulp.dest('static/assets/themes/default'));
});
