/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function (ng) {
    'use strict';

    var controllers = ng.module('agendaLr.controllers', []);

    controllers.controller('EventsController', ['$scope', 'DataService', function (
        self,
        DataService
    ) {
        DataService
            .getAll()
            .then(function onSuccess(events) {
                self.events = events;
            });
    }]);

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
        DataService
            .get($stateParams.eventId)
            .then(function onSuccess(event) {
                if (event.description) {
                    event.description = htmlUnescaper(event.description);
                }

                if (event.more) {
                    event.more = htmlUnescaper(event.more);
                }

                self.event = event;
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

    controllers.controller('SettingsController', ['$scope', 'SettingsService', function (
        self,
        SettingsService
    ) {
        var updateSetting;

        updateSetting = function () {
            SettingsService.set(self.settings.autoUpdate);
        };

        self.settings = {
            autoUpdate: SettingsService.get()
        };
        self.updateSetting = updateSetting;
    }]);
}(angular));
