// Requiring Gulp
var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');


gulp.task('styles', function() {
  gulp.src('src/scss/*.scss')
  	.pipe(sourcemaps.init()) // Initialize sourcemap plugin
    .pipe(sass()) 
    .pipe(autoprefixer()) // Passes it through gulp-autoprefixer 
    .pipe(sourcemaps.write()) // Writing sourcemaps 
    .pipe(gulp.dest('dist/css')) // Outputs it in the css folder
    // Reloading the stream
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'styles'], function() {
  gulp.watch('src/scss/*.scss', ['styles']);
});

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    }
  })
});