/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function (ng) {
    'use strict';

    var controllers = ng.module('agendaLr.controllers', []);

    controllers.controller('EventsController', [
        '$scope',
        'DataService',
        '$ionicPlatform'
    ].concat([function (
        self,
        DataService,
        $ionicPlatform
    ) {
        var // Functions
            hideSplash,
            onSuccess,
            setTwoDays,
            setWeek;

        hideSplash = function () {
            /*global setTimeout, navigator */

            $ionicPlatform.ready(function () {
                setTimeout(function () {
                    navigator.splashscreen.hide();
                }, 250);
            });
        };

        onSuccess = function (events) {
            if (Object.keys(events).length > 0) {
                self.events = Object
                    .keys(events)
                    .map(function (key) {
                        return events[key];
                    });
            } else {
                self.events = null;
            }

            self.isLoading = false;
            hideSplash();
        };

        setTwoDays = function () {
            self.control.mode = 'twoDays';
            DataService
                .getTwoDays()
                .then(onSuccess);
        };

        setWeek = function () {
            self.control.mode = 'week';
            DataService
                .getWeek()
                .then(onSuccess);
        };

        self.DataService = DataService;
        self.setTwoDays = setTwoDays;
        self.setWeek = setWeek;
        self.control = {};
        self.isLoading = true;
        // setTwoDays();
        DataService
            .getMonth()
            .then(onSuccess);
    }]));

    controllers.controller('EventController', [
        '$scope',
        '$stateParams',
        'DataService',
        'AgendaService',
        'HtmlUnescaper'
    ].concat([function (
        self,
        $stateParams,
        DataService,
        AgendaService,
        htmlUnescaper
    ) {
        var htmlFromSanitizedEvent;

        htmlFromSanitizedEvent = function (event) {
            var out = ng.copy(event);

            out.title = htmlUnescaper(event.title);

            if (event.description) {
                out.description = htmlUnescaper(event.description);
            }

            if (event.more) {
                out.more = htmlUnescaper(event.more);
            }

            return out;
        };

        DataService
            .get($stateParams.eventId)
            .then(function onSuccess(event) {
                self.event = htmlFromSanitizedEvent(event);
            });

        self.AgendaService = AgendaService;
    }]));

    controllers.controller('AgendaController', [
        '$scope',
        '$q',
        'DataService',
        'AgendaService'
    ].concat([function (
        self,
        $q,
        DataService,
        AgendaService
    ) {
        var // Variables
            agendaIdentifiers,
            agenda,
            promisesArray = [],

            // Functions
            refreshAgenda;

        refreshAgenda = function () {
            agendaIdentifiers = AgendaService.getAll();
            agenda = {};

            agendaIdentifiers.forEach(function (eventId) {
                var d = DataService.get(eventId);

                promisesArray.push(d.promise);

                d.then(function (e) {
                    agenda[eventId] = e;
                });
            });

            $q
                .all(promisesArray)
                .then(function () {
                    self.agenda = agenda;
                    self.agendaSize = Object.keys(agenda).length;
                });
        };

        (function () {
            self.$on('$ionicView.enter', refreshAgenda);

            self.$watch(function () {
                return AgendaService.getAll();
            }, refreshAgenda, true);
        }());
    }]));
}(angular));
