/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function (ng) {
    'use strict';

    var app = ng.module('akIonicTpl');

    app.directive('akIonicVersion', [function () {
        var controller;

        controller = ['$window', '$scope', function ($window, self) {
            self.version = $window.ionic.version;
        }];

        return {
            restrict: 'E',
            controller: controller,
            templateUrl: 'global/partials/ionic-version.partial.html',
            scope: true
        };
    }]);
}(angular));
