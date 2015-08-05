/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function (ng) {
    'use strict';

    var controllers = ng.module('agendaLr.controllers', []);

    controllers.controller('EventsController', ['$scope', 'DataService', function (
        self,
        DataService
    ) {
        DataService.getAll().then(function onSuccess(events) {
            self.events = events;
        });
    }]);

    controllers.controller('EventController', ['$scope', '$stateParams', 'DataService', 'HtmlUnescaper', function (
        self,
        $stateParams,
        DataService,
        htmlUnescaper
    ) {
        DataService.get($stateParams.eventId).then(function (event) {
            if (event.description) {
                event.description = htmlUnescaper(event.description);
            }

            if (event.more) {
                event.more = htmlUnescaper(event.more);
            }

            self.event = event;
        });
    }]);
}(angular));
