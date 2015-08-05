/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function (ng) {
    'use strict';

    var // Constants
        JSON_URL = 'http://agenda-larochelle.fr/events.json',
        AGENDA_KEY = 'inAgenda',

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

                    ng.forEach(data, function (event) {
                        allIdentifiers.push(event.id);
                        locker.put(event.id, event);
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
                //console.log('in - index = ', memoryAgenda.indexOf(eventId));
                memoryAgenda.splice(memoryAgenda.indexOf(eventId), 1);
                locker.put(AGENDA_KEY, memoryAgenda);
                console.log('now array is', memoryAgenda);
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
