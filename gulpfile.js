// Requiring Gulp
var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var extender = require('gulp-html-extend');

var template = require('gulp-template');
var $            = require('gulp-load-plugins')();
var runSequence  = require('run-sequence');
var del          = require('del');
var reload       = browserSync.reload;
var argv         = require('yargs').argv;
var lazypipe     = require('lazypipe');
var fc2json = require('gulp-file-contents-to-json');
var svgmin = require('gulp-svgmin');


/* vars */
var appPath = './src';
var distPath = 'dist';
//var indexTmpl = appPath + '/index.html';
var partialsFolder =  './src/partials/';
var navTempl = partialsFolder + 'nav.html';
var pageBuildSrc = partialsFolder + 'index.html';
var partialsTemplateFolder = partialsFolder + '_master/templates/';
var generatedNav = partialsFolder + '_master/globals/';


var dataFolder = appPath + '/data';
var navData = require( dataFolder + '/data.json');

var svgFolder = appPath + '/svgs/';

var config = {
  defaultPort: 3000,
  supportedBrowsers: [
    'ie >= 9',
    'last 1 Firefox versions',
    'last 1 Chrome versions',
    'Safari >= 6',
    'iOS >= 6',
    'ChromeAndroid >= 4.2'
  ],
  version: require('./package.json').version,
  minify: argv.minify || false
};

// Clean site directory
gulp.task('clean', del.bind(null, ['dist'], {dot: true}));



gulp.task('svgs-min', function () {
    return gulp.src(svgFolder + '**/*')
        .pipe(svgmin())
        .pipe(gulp.dest('./src/svg-min/'));
});


gulp.task('styles', function() {
  gulp.src('src/sass/**/*.scss')
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

//https://www.npmjs.com/package/gulp-template
gulp.task('build:nav', function () {
  return gulp.src(navTempl)
    .pipe(template( {data: navData}))
    .pipe(gulp.dest(generatedNav))
    // Reloading the stream
    .pipe(browserSync.reload({
      stream: true
    }));
});

/* 
Builds out and compiles all the template pages  
*/
gulp.task('build:pages', ['build:nav'], function () {
    return  gulp.src( pageBuildSrc )
        .pipe(extender({annotations:false,verbose:false}))
        .pipe(gulp.dest( distPath ))
        .pipe(browserSync.reload({
          stream: true
        }));
});



gulp.task('create-json-blob', function() {
  gulp.src(svgFolder + '/**/*')
      .pipe(fc2json('data.json', {
        extname : false, // default is true
      }))
      .pipe(gulp.dest(dataFolder));
});

gulp.task('libs', function() {
  return gulp.src(['src/js/libs/modernizr.js'])
  .pipe(gulp.dest(distPath + '/js/'));
});

var scriptsFinish = lazypipe()
  .pipe(gulp.dest, 'dist/scripts')
  .pipe(function () {
    return $.if(config.minify, $.uglify());
  })
  .pipe(function () {
    return $.if(config.minify, $.rename({suffix: '.min'}));
  })
  .pipe(function () {
    return $.if(config.minify, gulp.dest('dist/js'));
  });

// Lint and build scripts
gulp.task('scripts', ['libs'], function() {
  return gulp.src(['src/js/*.js'])
    .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
    .pipe($.if(config.isWatching, $.jshint()))
    .pipe($.if(config.isWatching, $.jshint.reporter('jshint-stylish')))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
    //.pipe($.concat('scripts.js'))
    .pipe(scriptsFinish());
});

// Copy web fonts to dist
gulp.task('fonts', function () {
  return gulp.src(['src/fonts/*.otf'])
    .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
    .pipe(gulp.dest('dist/fonts'));
});

// Copy videos to dist
gulp.task('video', function () {
  return gulp.src(['src/video/converted/**'])
    .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
    .pipe(gulp.dest('dist/video'));
});

// Optimize images and copy that version to dist
// if the script is run with the --minify flag
gulp.task('images', function () {
  return gulp.src(['src/images/**/**'])
    .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
    .pipe($.if(config.isWatching, $.cached('images')))
    .pipe($.if(config.minify, $.cache($.imagemin({
      progressive: true,
      interlaced: true
    }))))
    .pipe(gulp.dest('dist/images'));
});





gulp.task('setWatch', function() {
  config.isWatching = true;
});

// Development task
gulp.task('dev', ['default', 'setWatch'], function() {
  browserSync({
    port: argv.port || config.defaultPort, //default: 3000
    server: { baseDir: './dist/'},
    ui: {
      port: argv.port + 5000 || config.defaultPort + 5000, //default: 8000
      weinre: { port: argv.port + 6092 || config.defaultPort + 6092 } //default: 9092
    },
    notify: false,
    logLevel: 'silent' //other oprions: info, debug
  });

  gulp.watch(['src/sass/**/*.scss'], ['styles', reload]);
  gulp.watch(['src/partials/*.html'], ['build:pages', reload]);
  gulp.watch(['src/data/*.json'], ['build:pages', reload]);
  gulp.watch(['src/fonts/**'], ['fonts', reload]);
  gulp.watch(['src/img/**/*'], ['images', reload]);
  gulp.watch(['src/scripts/*.js'], ['scripts', reload]);
  gulp.watch(['src/video/converted/**'], ['video', reload]);
});

// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {

  runSequence([
      'build:nav',
      'build:pages',
      'styles',
      'scripts',
      'fonts',
      'images',
      'video'
    ], cb);
});