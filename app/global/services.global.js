/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function (ng) {
    'use strict';

    var // Constants
        JSON_URL = 'http://agenda-larochelle.fr/events.json',

        // Variables
        services = ng.module('agendaLr.services', []);

    services.factory('DataService', ['$http', '$q', 'locker', function (
        $http,
        $q,
        locker
    ) {
        var // Variables
            initialDeferred = $q.defer(),

            // Functions
            initalGetData,
            getAll,
            get;

        initalGetData = function () {
            $http
                .get(JSON_URL)
                .success(function (data) {
                    var allIdentifiers = [];

                    locker.put('lastTimestamp', data.timestamp);
                    delete data.timestamp;

                    ng.forEach(data, function (event, eventId) {
                        allIdentifiers.push(eventId);
                        locker.put(eventId, event);
                    });

                    locker.put('allIdentifiers', allIdentifiers);

                    initialDeferred.resolve();
                })
                .error(function () {
                    initialDeferred.reject();
                });
        };

        getAll = function () {
            var deferred = $q.defer();

            initialDeferred.promise.then(function () {
                var identifiers = locker.get('allIdentifiers').slice(0, 10),
                    out = {};

                identifiers.forEach(function (eventId) {
                    out[eventId] = locker.get(eventId);
                });

                deferred.resolve(out);
            });

            return deferred.promise;
        };

        get = function (eventId) {
            var deferred = $q.defer();

            initialDeferred.promise.then(function () {
                deferred.resolve(locker.get(eventId, null));
            });

            return deferred.promise;
        };

        (function () {
            initalGetData();
        }());

        return {
            getAll: getAll,
            get: get
        };
    }]);
}(angular));
