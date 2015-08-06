/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function (ng) {
    'use strict';

    var // Constants
        JSON_URL = 'http://agenda-larochelle.fr/events.json',
        AGENDA_KEY = 'inAgenda',
        AUTO_UPDATE_KEY = 'prefAutoUpdate',

        // Variables
        services = ng.module('agendaLr.services', []);

    services.factory('DataService', ['$http', '$q', 'locker', function (
        $http,
        $q,
        locker
    ) {
        var // Variables
            initialDeferred = $q.defer(),
            fetching = false,

            // Functions
            initalGetData,
            isFetching,
            getAll,
            get;

        initalGetData = function () {
            initialDeferred = $q.defer();
            fetching = true;

            $http
                .get(JSON_URL)
                .success(function (data) {
                    var allIdentifiers = [];

                    locker.put('lastTimestamp', data.timestamp);
                    delete data.timestamp;

                    ng.forEach(data, function (event) {
                        allIdentifiers.push(event.id);
                        locker.put(event.id, event);
                    });

                    locker.put('allIdentifiers', allIdentifiers);

                    fetching = false;
                    initialDeferred.resolve();
                })
                .error(function () {
                    fetching = false;
                    initialDeferred.reject();
                });
        };

        isFetching = function () {
            return fetching;
        };

        getAll = function () {
            var deferred = $q.defer();

            initialDeferred.promise.then(function () {
                var identifiers = locker.get('allIdentifiers').slice(0, 20),
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
            isFetching: isFetching,
            update: initalGetData,
            getAll: getAll,
            get: get
        };
    }]);

    services.factory('AgendaService', ['locker', function (locker) {
        var // Variables
            memoryAgenda,

            // Functions
            getAll,
            add,
            remove,
            isIn;

        getAll = function () {
            return memoryAgenda;
        };

        add = function (eventId) {
            if (memoryAgenda.indexOf(eventId) === -1) {
                memoryAgenda.push(eventId);
                locker.put(AGENDA_KEY, memoryAgenda);
            }
        };

        remove = function (eventId) {
            if (memoryAgenda.indexOf(eventId) !== -1) {
                memoryAgenda.splice(memoryAgenda.indexOf(eventId), 1);
                locker.put(AGENDA_KEY, memoryAgenda);
            }
        };

        isIn = function (eventId) {
            return memoryAgenda.indexOf(eventId) !== -1;
        };

        (function () {
            memoryAgenda = locker.get(AGENDA_KEY, []);
        }());

        return {
            getAll: getAll,
            add: add,
            remove: remove,
            isIn: isIn
        };
    }]);

    services.factory('SettingsService', ['locker', function (locker) {
        var // Variables
            autoUpdate,

            // Functions
            get,
            set;

        get = function () {
            return autoUpdate;
        };

        set = function (val) {
            autoUpdate = val;
            locker.put(AUTO_UPDATE_KEY, val);
        };

        (function () {
            autoUpdate = locker.get(AUTO_UPDATE_KEY, true);
        }());

        return {
            get: get,
            set: set
        };
    }]);

    services.factory('HtmlUnescaper', [function () {
        // Taken from here: https://goo.gl/4Xs23Q
        return function (jsonString) {
            /*global document */
            var tempElement = document.createElement('div'),
                out = '',
                i;

            tempElement.innerHTML = jsonString;

            for (i = 0; i < tempElement.childNodes.length; i += 1) {
                out += tempElement.childNodes[i].nodeValue;
            }

            tempElement.removeChild(tempElement.firstChild);

            return out;
        };
    }]);
}(angular));
