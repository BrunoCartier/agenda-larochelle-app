/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function (ng) {
    'use strict';

    var app = ng.module('akIonicTpl', [
        'ionic'
    ]);

    app.run(['$ionicPlatform', function ($ionicPlatform) {
        /*global window */
        // https://github.com/driftyco/ionic-starter-tabs/blob/master/js/app.js#L10
        $ionicPlatform.ready(function () {
            if (window.cordova &&
                window.cordova.plugins &&
                window.cordova.plugins.Keyboard) {
                window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if (window.StatusBar) {
                window.StatusBar.styleDefault();
            }
        });
    }]);
}(angular));
