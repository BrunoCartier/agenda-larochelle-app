/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function (ng) {
    'use strict';

    var app = ng.module('agendaLr');

    app.directive('akTestDirective', [function () {
        return {
            restrict: 'E',
            templateUrl: 'global/partials/test-directive.partial.html',
            scope: true
        };
    }]);
}(angular));
