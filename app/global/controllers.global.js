/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function (ng) {
    'use strict';

    var controllers = ng.module('agendaLr.controllers', []);

    controllers.controller('EventsController', ['$scope', 'DataService', function (
        self,
        DataService
    ) {
        self.DataService = DataService;
    }]);

    controllers.controller('EventController', ['$scope', '$stateParams', 'DataService', function (
        self,
        $stateParams,
        DataService
    ) {
        self.event = DataService.get($stateParams.eventId);
    }]);
}(angular));
