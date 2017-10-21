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
var svgSymbols = require('gulp-svg-symbols');

//var rsp = require('remove-svg-properties').stream;

var rsp = require('remove-svg-properties');
var gutil = require('gulp-util');
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});


/* vars */
var appPath = './src';
var distPath = 'dist';
//var indexTmpl = appPath + '/index.html';
var partialsFolder =  './src/partials/';

/* templates for nav and about */
var navTempl = partialsFolder + 'nav.html';
var aboutTempl = partialsFolder + 'about.html';

var pageBuildSrc = partialsFolder + 'index.html';
var partialsTemplateFolder = partialsFolder + '_master/templates/';
var generatedPartials = partialsFolder + '_master/globals/';

sassPath = appPath + '/sass/';
sassSpriteTmpl = partialsTemplateFolder + 'sprite-template.scss';


var dataFolder = appPath + '/data';
var navData = require( dataFolder + '/nav-data.json');
var aboutData = require( dataFolder + '/about-data.json');

var svgFolder = appPath + '/svg-original/';
var svgMinFolder = appPath + '/svg-min/';

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
  minify: argv.minify || true
};

gulp.task('svg-symbols', function () {
  return gulp.src(svgMinFolder +'**/*.svg')
    .pipe(svgSymbols())
    .pipe(gulp.dest(dataFolder));
});





gulp.task('svgSprite', function () {

    return gulp.src(appPath + '/icons/*.svg')
        .pipe(svgmin())
        .pipe(plugins.svgSprite({
            "mode": {
                "css": {
                    "dest": "./",
                    "sprite": "../images/sprite.svg",
                    "bust": false,
                    "render": {
                        "scss": {
                            "dest": "_sprite.scss",
                            "template": sassSpriteTmpl
                        }
                    }
                }
            }
        }))
        .pipe(gulp.dest(sassPath));

});


gulp.task('sprite', ['svgSprite']);

gulp.task('data', function() {
  return gulp.src(appPath + '/data/*')
    .pipe(gulp.dest(distPath + '/data/'));
});

// Clean site directory
gulp.task('clean', del.bind(null, ['dist'], {dot: true}));



gulp.task('minify-svgs', function () {
    return gulp.src(svgFolder + '**/*')
        .pipe(svgmin())
        .pipe(gulp.dest('./src/svg-min/'));
});


gulp.task('styles', function() {
  gulp.src('src/sass/**/*.scss')
  	.pipe(sourcemaps.init()) // Initialize sourcemap plugin
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer()) // Passes it through gulp-autoprefixer
    .pipe(sourcemaps.write()) // Writing sourcemaps 
    .pipe(gulp.dest('dist/css')) // Outputs it in the css folder
    // Reloading the stream
    .pipe(browserSync.reload({
      stream: true
    }));
});

//https://www.npmjs.com/package/gulp-template
gulp.task('build:about', function () {
  return gulp.src(aboutTempl)
    .pipe(template( {data: aboutData}))
    .pipe(gulp.dest(generatedPartials))
    // Reloading the stream
    .pipe(browserSync.reload({
      stream: true
    }));
});

//https://www.npmjs.com/package/gulp-template
gulp.task('build:nav', function () {
  return gulp.src(navTempl)
    .pipe(template( {data: navData}))
    .pipe(gulp.dest(generatedPartials))
    // Reloading the stream
    .pipe(browserSync.reload({
      stream: true
    }));
});

/*
Builds out and compiles all the template pages
*/
gulp.task('build:pages', ['build:nav', 'build:about'], function () {
    return  gulp.src( pageBuildSrc )
        .pipe(extender({annotations:false,verbose:false}))
        .pipe(gulp.dest( distPath ))
        .pipe(browserSync.reload({
          stream: true
        }));
});


gulp.task('trickortreat', function () {
    return  gulp.src( appPath + '/trickortreat/index.html' )
        .pipe(gulp.dest( distPath + '/trickortreat/' ))
        .pipe(browserSync.reload({
          stream: true
        }));
});

gulp.task('pages', function () {
    return  gulp.src( appPath + '/*.html' )
        .pipe(gulp.dest( distPath ))
        .pipe(browserSync.reload({
          stream: true
        }));
});


/*
  Builds beast data from minified svgs
 */
gulp.task('create-json-beast', function() {
  gulp.src(svgMinFolder + 'beast/**/*')
      .pipe(fc2json('beast-data.json', {
        extname : false, // default is true
      }))
      .pipe(gulp.dest(dataFolder));
});

/*
  Builds nav data from minified svgs
 */
gulp.task('create-json-nav', function() {
  gulp.src(svgMinFolder + 'nav/**/*')
      .pipe(fc2json('nav-data.json', {
        extname : false, // default is true
      }))
      .pipe(gulp.dest(dataFolder));
});



gulp.task('libs', function() {
  return gulp.src(['src/js/libs/*.js'])
  .pipe(gulp.dest(distPath + '/js/'));
});

var scriptsFinish = lazypipe()
  .pipe(gulp.dest, 'dist/js/')
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
  return gulp.src(['src/js/shared/*.js', 'src/js/create-beast/*.js'])
    .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
    .pipe($.if(config.isWatching, $.jshint()))
    .pipe($.if(config.isWatching, $.jshint.reporter('jshint-stylish')))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
    .pipe($.concat('scripts.js'))
    .pipe(scriptsFinish());
});

// Lint and build scripts
gulp.task('trickortreat-scripts', function() {
  return gulp.src(['src/js/shared/*.js', 'src/js/*.js'])
    .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
    .pipe($.if(config.isWatching, $.jshint()))
    .pipe($.if(config.isWatching, $.jshint.reporter('jshint-stylish')))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
    .pipe($.concat('trickortreat.js'))
    .pipe(scriptsFinish());
});



// Optimize images and copy that version to dist
// if the script is run with the --minify flag
gulp.task('images', function () {
  return gulp.src(['src/images/**/**'])
    .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
    .pipe($.if(config.isWatching, $.cached('images')))
   /* .pipe($.if(config.minify, $.cache($.imagemin({
      progressive: true,
      interlaced: true
    }))))*/
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
  gulp.watch(['src/*.html'], ['pages', reload]);
  gulp.watch(['src/trickortreat/index.html'], ['trickortreat', reload]);
  gulp.watch(['src/data/*'], ['build:pages', reload]);
  gulp.watch(['src/img/**/*'], ['images', reload]);
  gulp.watch(['src/js/**/*.js'], ['trickortreat-scripts', 'scripts', reload]);
});

// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {

  runSequence([
      'build:nav',
      'build:about',
      'build:pages',
      'pages',
      'styles',
      'scripts',
      'trickortreat',
      'trickortreat-scripts',
      'images',
      'data'
    ], cb);
});
