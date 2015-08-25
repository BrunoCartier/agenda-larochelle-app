/*jslint indent: 4, maxlen: 100 */
/*globals angular, moment */

(function (ng, m) {
    'use strict';

    var // Functions
        makeFilter,

        // Variables
        filters = ng.module('agendaLr.filters', []);

    makeFilter = function (duration) {
        return function () {
            //var now = m();
            var now = m('2015-09-20'); // Debug

            return function (input) {
                var output = {};

                ng.forEach(input, function (ev, key) {
                    var startDiff = m(ev.date_start).diff(now, 'hours'),
                        endDiff = m(ev.date_end).diff(now, 'hours');

                    if ((startDiff >= 0 && startDiff <= duration) ||
                            (endDiff >= 0 && endDiff <= duration)) {
                        output[key] = ev;
                    }
                });

                return output;
            };
        };
    };

    filters.filter('twoDays', makeFilter(2 * 24));
    filters.filter('week', makeFilter(7 * 24));
}(angular, moment));
