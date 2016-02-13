var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server:  './'
    });

    gulp.watch("app/source/scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/source/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/assets/stylesheets"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
  //     gutil  = require('gulp-util');

  //Gulp says it's running!

  // gulp.task('default', function () {
  //   return gutil.log('Gulp is running!')
  // });

  // gulp.task('default', ['watch']);
  //jshint would be here

  // gulp.task('jshint', function() {
  //   return gulp.src('source/javascript/**/*.js')
  //     .pipe(jshint())
  //     .pipe(jshint.reporter('jshint-stylish'));
  // });
  //
  // // css build task
  //
  // gulp.task('build-css', function() {
  //   return gulp.src('source/scss/**/*.scss')
  //     .pipe(sass())
  //     .pipe(gulp.dest('../assets/stylesheets/'))
  // });
  //
  // // Added  watch to incluce sass
  // gulp.task('watch', function () {
  //   // gulp.watch('source/javascript/**/*.js', ['jshint']);
  //   gulp.watch('source/scss/**/*.scss', ['build-css']);
  // });
