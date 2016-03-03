/*jslint indent: 4, maxlen: 100, nomen: true */
/*global require */

(function () {
    'use strict';

    var // Constants
        ANGULAR_APP_NAME = 'agendaLr',
        PUBLICLY_AVAILABLE = ['default', 'dev', 'show', 'build', 'jslint'],
        JS_FILTER,
        CSS_FILTER,

        // Require, gulp stuff
        gulp = require('gulp'),
        util = require('gulp-util'),
        less = require('gulp-less'),
        plumber = require('gulp-plumber'),
        useref = require('gulp-useref'),
        gulpif = require('gulp-if'),
        uglify = require('gulp-uglify'),
        cssNano = require('gulp-cssnano'),
        replace = require('gulp-replace'),
        templateCache = require('gulp-angular-templatecache'),
        rename = require('gulp-rename'),
        serve = require('gulp-serve'),
        merge = require('merge-stream'),
        AutoprefixerPlugin = require('less-plugin-autoprefix'),
        autoprefixer = new AutoprefixerPlugin({browsers: ["last 2 versions"]}),

        // Require, node stuff
        del = require('del'),
        spawn = require('child_process').spawn,
        exec = require('child_process').exec;

    JS_FILTER = '**/*.js';
    CSS_FILTER = '**/*.css';

    gulp.task('clean:www', function () {
        return del(['www/**/**/*', '!www/.gitkeep']);
    });

    gulp.task('clean:bower', function () {
        return del(['app/bower_components/**/**/*', '!app/bower_components/.gitkeep']);
    });

    gulp.task('less', function () {
        return gulp.src('app/**/**/*.less')
            .pipe(plumber())
            .pipe(less({
                plugins: [autoprefixer]
            }))
            .pipe(gulp.dest('app/'));
    });

    gulp.task('icon', function (cb) {
        exec('node node_modules/cordova-icon/bin/cordova-icon',
            function (err, stdout) {
                if (!err) {
                    util.log(stdout);
                } else {
                    util.log(util.colors.red(err));
                }

                cb(err);
            });
    });

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

            cb(err);
        });
    });

    gulp.task('dev', ['less'], function (cb) {
        var ionicServer;

        gulp.watch('app/**/*.less', ['less']);

        util.log(util.colors.bold(
            'Ionic Server will launch, but you wont be able to interact with it.'
        ));

        ionicServer = spawn('ionic', [
            'serve',
            '--livereload',
            '--lab',
            '--address',
            'localhost'
        ]);

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

    gulp.task('show', ['build'], serve({
        root: 'www',
        port: 8101
    }));

    gulp.task('build', ['less', 'clean:www', 'jslint', 'icon'], function () {
        var main,
            partials,
            fonts;

        main = gulp.src('app/index.html')
            // Take all referenced assets in index.html
            .pipe(useref())

            // JS concat & soft minify
            .pipe(gulpif(JS_FILTER, uglify({
                mangle: false,
                compress: false
            })))

            // CSS concat & soft minify, with paths fix
            .pipe(gulpif(CSS_FILTER, cssNano()))
            .pipe(gulpif(CSS_FILTER, replace('../fonts', '../assets/fonts')))

            // We're good to go
            .pipe(gulp.dest('www/'));

        // Step 2: Partials caching
        partials = gulp.src('app/**/*.partial.html')
            .pipe(templateCache({
                module: ANGULAR_APP_NAME
            }))
            .pipe(gulp.dest('www/assets/'));

        // Step 3: Copy the fonts
        fonts = gulp.src([
            'app/bower_components/ionic/release/fonts/*',
            'app/global/style/fonts/*'
        ])
            .pipe(rename({
                dirname: ''
            }))
            .pipe(gulp.dest('www/assets/fonts/'));

        return merge(
            main,
            partials,
            fonts
        );
    });
}());
