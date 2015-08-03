/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function (ng) {
    'use strict';

    var services = ng.module('agendaLr.services', []);

    services.factory('DataService', [function () {
        var // Constants
            DEMO_DATA,

            // Functions
            getAll,
            get;

        DEMO_DATA = {
            14970: {
                "id": 14970,
                "titre": "Assembl&eacute;es g&eacute;n&eacute;rales des Comit&eacute;s de quartier",
                "date_debut": "30-09-2014",
                "date_fin": "11-10-2014",
                "lieu": null,
                "categorie": "Fausse catégorie",
                "description": "Comit\u00e9 de quartier de Laleu - La Pallice - La Rossignolette" +
                    "<br \/>Samedi 11 octobre \u00e0 15h \u00e0 la salle de la Pallice, " +
                    "42 Bvd Delmas&#160;30 septembre \u00e0 13h30<br \/>" +
                    "R\u00e9union pr\u00e9paratoire et mat\u00e9riel le 30 septembre \u00e0 " +
                    "13h30\n\nRens. Maelle Le Rouzes | 05 46 51 79 67",
                "complement": null
            },
            14969: {
                "id": 14969,
                "titre": "Exposition | Quand l'image est un outil de repr&eacute;sentation",
                "date_debut": "23-11-2014",
                "date_fin": "23-11-2014",
                "lieu": "Mus&eacute;e du Nouveau Monde - 10 rue Fleuriau",
                "categorie": null,
                "description": "Dimanche 23 novembre \u00e0 15h au mus\u00e9e du Nouveau Monde" +
                    "<br \/>Nicolas Dufour Laperri\u00e8re, artiste photographe " +
                    "qu\u00e9b\u00e9cois, m\u00e8ne un projet photographique sur les " +
                    "origines du Qu\u00e9bec.\n\n<br \/>Rens. Mus\u00e9e du nouveau monde " +
                    "| 05 46 41 46 50",
                "complement": null
            }
        };

        getAll = function () {
            return DEMO_DATA;
        };

        get = function (eventId) {
            if (ng.isUndefined(DEMO_DATA[eventId])) {
                return null;
            }

            return DEMO_DATA[eventId];
        };

        return {
            getAll: getAll,
            get: get
        };
    }]);
}(angular));
