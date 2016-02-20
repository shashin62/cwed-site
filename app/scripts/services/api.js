'use strict';

angular.module('cpApp')

.factory('Api', function(SETTINGS) {
    var url     = SETTINGS.ApiUrl;

    function urlForRoute(route) {
        var re = /^[\/]*(.*)$/;
        return url + route.replace(re, '$1');
    }

    return {
       // version: version,
        url: url,
        urlForRoute: urlForRoute
    };
})
.service('CPCache', function () {
    return {
        clearAllCache: function () {

        }
    };
});