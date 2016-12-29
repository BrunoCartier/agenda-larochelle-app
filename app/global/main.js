/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function (ng) {
    'use strict';

    var app = ng.module('agendaLr', [
        'ionic',
        'angular-locker',
        'agendaLr.filters',
        'agendaLr.services',
        'agendaLr.controllers'
    ]);

    /*
    app.run(['$ionicPlatform', function ($ionicPlatform) {
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
    */

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
                    controller: 'EventsController',
                    templateUrl: 'global/partials/events.partial.html'
                }
            }
        });

        $stateProvider.state('main.event', {
            url: '/event/:eventId',
            views: {
                'events': {
                    controller: 'EventController',
                    templateUrl: 'global/partials/event.partial.html'
                }
            }
        });

        // Agenda

        $stateProvider.state('main.agenda', {
            url: '/agenda',
            views: {
                'agenda': {
                    controller: 'AgendaController',
                    templateUrl: 'global/partials/agenda.partial.html'
                }
            }
        });

        $stateProvider.state('main.agenda-event', {
            url: '/event/:eventId',
            views: {
                'agenda': {
                    controller: 'EventController',
                    templateUrl: 'global/partials/event.partial.html'
                }
            }
        });

        // Info

        $stateProvider.state('main.info', {
            url: '/info',
            views: {
                'info': {
                    templateUrl: 'global/partials/info.partial.html'
                }
            }
        });
    }]);
}(angular));
