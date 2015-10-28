var
  gulp  = require('gulp'),
  watch = require('./semantic/tasks/watch'),
  build = require('./semantic/tasks/build')
;

// import task with a custom task name
gulp.task('watch-ui', watch);
gulp.task('build-ui', build);

gulp.task('build', ['copy-assets', 'copy-theme']);

gulp.task('copy-assets', ['build-ui'], function() {
    return gulp.src([
        'semantic/dist/semantic.css',
        'semantic/dist/semantic.js',
    ]).pipe(gulp.dest('static/assets/semantic'))
})
gulp.task('copy-theme', ['build-ui'], function() {
    return gulp.src('semantic/dist/themes/default/**')
               .pipe(gulp.dest('static/assets/semantic/themes/default'))
})
