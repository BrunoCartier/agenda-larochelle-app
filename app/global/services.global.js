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

    services.factory('DataService', ['$http', '$q', '$filter', 'locker', 'CordovaToast', function (
        $http,
        $q,
        $filter,
        locker,
        CordovaToast
    ) {
        var // Variables
            initialDeferred = $q.defer(),
            fetching = false,

            // Functions
            initalGetData,
            isFetching,
            getAll,
            getTwoDays,
            getWeek,
            get;

        initalGetData = function (noToast) {
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
                    if (!noToast) {
                        CordovaToast.showShortBottom('Mise à jour réussie.');
                    }
                })
                .error(function () {
                    fetching = false;
                    initialDeferred.reject();
                    CordovaToast.showShortBottom('Échec de la récupération des évènements.');
                });
        };

        isFetching = function () {
            return fetching;
        };

        getAll = function () {
            var deferred = $q.defer();

            initialDeferred.promise.then(function () {
                var identifiers = locker.get('allIdentifiers'),
                    out = {};

                identifiers.forEach(function (eventId) {
                    out[eventId] = locker.get(eventId);
                });

                deferred.resolve(out);
            });

            return deferred.promise;
        };

        getTwoDays = function () {
            var deferred = $q.defer();

            getAll().then(function (allEvents) {
                var output = $filter('twoDays')(allEvents);
                deferred.resolve(output);
            });

            return deferred.promise;
        };

        getWeek = function () {
            var deferred = $q.defer();

            getAll().then(function (allEvents) {
                var output = $filter('week')(allEvents);
                deferred.resolve(output);
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
            initalGetData(true);
        }());

        return {
            isFetching: isFetching,
            update: initalGetData,
            getAll: getAll,
            getTwoDays: getTwoDays,
            getWeek: getWeek,
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

    // Source: https://github.com/driftyco/ng-cordova/blob/master/src/plugins/toast.js
    // ngCordova is around 100kb, so I don't want to install it here
    services.factory('CordovaToast', ['$q', '$window', function ($q, $window) {
        var // Functions
            showShortBottom;

        showShortBottom = function (message) {
            var q = $q.defer();

            if ($window.plugins && $window.plugins.toast) {
                $window
                    .plugins
                    .toast
                    .showShortBottom(message, function (response) {
                        q.resolve(response);
                    }, function (error) {
                        q.reject(error);
                    });
            } else {
                $window.console.info(message);
                q.resolve();
            }

            return q.promise;
        };

        return {
            showShortBottom: showShortBottom
        };
    }]);
}(angular));
