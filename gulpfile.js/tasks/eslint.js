'use strict';

var config = require('../config');
var eslint = require('gulp-eslint');
var gulp   = require('gulp');
var join   = require('path').join;

module.exports = function() {

    return gulp.src([
            join('gulpfile.js', '**', '*.js'),
            join(config.scripts.src, '**', '*.js'),
            '!' + join(config.scripts.src, 'libs', '*.js'),
            '!' + join(config.scripts.src, 'plugins', '*.js'),
            '!' + join(config.scripts.src, '*.min.js'),
            '!' + join('gulpfile.js', '**', '*.js'),
            '!' + join(config.scripts.src, 'modernizr.js')
        ])
        .pipe(eslint())
        .pipe(eslint.format());

};
