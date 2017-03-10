'use strict';

var util = require('gulp-util');

module.exports = function(error) {
    util.log(util.colors.red.bold('Error' + (error.plugin ? ': ' + error.plugin : '')), '\n\n' + error.message, (error.codeFrame ?  '\n' + error.codeFrame : ''));
    this.emit('end');
    return;
};
