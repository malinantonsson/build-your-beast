'use strict';

var browserSync  = require('browser-sync');
var bundler      = require('../utilities/browserify');
var buffer       = require('vinyl-buffer');
var config       = require('../config');
var errorHandler = require('../utilities/errorHandler');
var gulp         = require('gulp');
var source       = require('vinyl-source-stream');
var stripDebug   = require('gulp-strip-debug');
var uglify       = require('gulp-uglify');
var util         = require('gulp-util');
var join 		 = require('path').join;

module.exports = function() {

    return gulp.src(join(config.html.src, '/**/*.html'))
        .pipe(gulp.dest(join(config.html.dist)))
        .pipe(config.production ? util.noop() : browserSync.reload({ stream: true }));

};
