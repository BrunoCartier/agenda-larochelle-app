/*jslint indent: 4, maxlen: 100 */
/*globals angular, moment */

(function (ng, m) {
    'use strict';

    var // Functions
        makeFilter,

        // Variables
        filters = ng.module('agendaLr.filters', []);

    filters.filter('moment', function () {
        var cache = {};

        return function (inputString, wantedFormat) {
            if (!wantedFormat) {
                wantedFormat = 'L';
            }

            var key = inputString + '-' + wantedFormat;

            if (!cache.hasOwnProperty(key)) {
                cache[key] = moment(inputString).format(wantedFormat);
            }

            return cache[key];
        };
    });

    makeFilter = function (duration) {
        return function () {
            var now = m();
            // Debug
            //var now = m('2015-09-20');

            return function (input) {
                var output = {};

                if (Object.keys(input).length === 0) {
                    return input;
                }

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
    filters.filter('month', makeFilter(30 * 24));
}(angular, moment));
