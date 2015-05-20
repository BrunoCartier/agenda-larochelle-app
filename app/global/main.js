/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function (ng) {
    'use strict';

    var app = ng.module('agendaLr', [
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

    app.config(['$stateProvider', '$urlRouterProvider', function (
        $stateProvider,
        $urlRouterProvider
    ) {
        // Base stuff

        $stateProvider.state('main', {
            url: '/main',
            abstract: true,
            templateUrl: 'global/partials/main.partial.html'
        });

        $urlRouterProvider.otherwise('/main/events');

        // Events

        $stateProvider.state('main.events', {
            url: '/events',
            views: {
                'events': {
                    templateUrl: 'global/partials/events.partial.html'
                }
            }
        });
    }]);
}(angular));
