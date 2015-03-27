/*jslint indent: 4, maxlen: 100 */
/*global require */

(function (r) {
    'use strict';

    var // Constants
        PUBLICLY_AVAILABLE = ['default', 'jslint'],

        // Require, gulp stuff
        gulp = r('gulp'),
        util = r('gulp-util'),

        // Require, node stuff
        del = r('del'),
        exec = r('child_process').exec;

    // Private tasks

    gulp.task('clean:www', function (cb) {
        del(['www/**/**/*', '!www/.gitkeep'], cb);
    });

    gulp.task('clean:bower', function (cb) {
        del(['bower_components/**/**/*', '!bower_components/.gitkeep'], cb);
    });

    // Public tasks

    gulp.task('default', function () {
        var msg = util.colors.bold('# Welcome to this awesome gulpfile #\n') +
                'Here are the available tasks:\n' +
                PUBLICLY_AVAILABLE.map(function (val) {
                    return util.colors.cyan(val);
                }).join(' | ');

        util.log(msg);
    });

    gulp.task('jslint', function (cb) {
        exec('jslint app/**/*.js', function (err, stdout) {
            util.log(util.colors.bold('JSLint validation ❤'));

            if (!err) {
                util.log(util.colors.green('✔ Good work, all green.'));
            } else {
                util.log(util.colors.red(
                    '✗ Erf, there are errors in your files, please correct them!'
                ));

                util.log(util.colors.white.bgBlack(stdout));
            }

            cb();
        });
    });
}(require));
