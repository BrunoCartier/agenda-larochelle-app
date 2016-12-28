/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function (ng) {
    'use strict';

    var app = ng.module('agendaLr');

    app.directive('extHref', ['$window', function ($window) {
        function link(scope, element) {
            var c = $window.cordova;

            element.bind('click', function (event) {
                event.preventDefault();

                if (c && c.InAppBrowser) {
                    c.InAppBrowser.open(scope.url, '_system');
                } else {
                    // Not on device ➞ Open in wew tab
                    $window.open(scope.url, '_blank');
                }
            });
        }

        return {
            restrict: 'A',
            link: link,
            scope: {
                url: '@extHref'
            }
        };
    }]);
}(angular));
