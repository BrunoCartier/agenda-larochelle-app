/*jslint indent: 4, maxlen: 100, nomen: true */
/*globals require, __dirname */

(function (r, ENV_DIR_NAME) {
    'use strict';

    var // Constants
        PUBLICLY_AVAILABLE = ['default', 'jslint'],

        // Require, gulp stuff
        gulp = r('gulp'),
        util = r('gulp-util'),
        less = r('gulp-less'),
        plumber = r('gulp-plumber'),

        // Require, node stuff
        del = r('del'),
        path = r('path'),
        spawn = r('child_process').spawn,
        exec = r('child_process').exec;

    // Private tasks

    gulp.task('clean:www', function (cb) {
        del(['www/**/**/*', '!www/.gitkeep'], cb);
    });

    gulp.task('clean:bower', function (cb) {
        del(['bower_components/**/**/*', '!bower_components/.gitkeep'], cb);
    });

    gulp.task('less', function () {
        return gulp.src('app/**/**/*.less')
            .pipe(plumber())
            .pipe(less({
                paths: [path.join(ENV_DIR_NAME, 'less', 'includes')]
            }))
            .pipe(gulp.dest('app/'));
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
        exec('jslint gulpfile.js app/**/*.js', function (err, stdout) {
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

    gulp.task('dev', function (cb) {
        var ionicServer;

        gulp.watch('app/**/*.less', ['less']);

        util.log(util.colors.bold(
            'Ionic Server will launch, but you wont be able to interact with it.'
        ));

        ionicServer = spawn('ionic', ['serve', '--livereload', '--lab']);

        ionicServer.stdout.on('data', function (buffer) {
            util.log(buffer.toString());
        });

        ionicServer.on('error', function (error) {
            util.log('Ionic server error' + error);
            cb();
        });

        ionicServer.on('exit', function (code) {
            util.log('Ionic server exit' + code);
            cb();
        });
    });
}(require, __dirname));
