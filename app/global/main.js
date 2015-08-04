/*jslint indent: 4, maxlen: 100 */
/*globals angular, window */

(function (ng, win) {
    'use strict';

    var app = ng.module('akIonicTpl', [
        'ionic'
    ]);

    app.run(['$ionicPlatform', function ($ionicPlatform) {
        // https://github.com/driftyco/ionic-starter-tabs/blob/master/js/app.js#L10
        $ionicPlatform.ready(function () {
            if (win.cordova &&
                    win.cordova.plugins &&
                    win.cordova.plugins.Keyboard) {
                win.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                win.cordova.plugins.Keyboard.disableScroll(true);
            }

            if (win.StatusBar) {
                win.StatusBar.styleDefault();
            }
        });
    }]);
}(angular, window));
