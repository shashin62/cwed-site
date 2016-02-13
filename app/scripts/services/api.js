'use strict';

angular.module('cpApp')

.factory('Api', function() {
    var url     = "http://cake3api.app/api/";

    function urlForRoute(route) {
        var re = /^[\/]*(.*)$/;
        return url + route.replace(re, '$1');
    }

    return {
       // version: version,
        url: url,
        urlForRoute: urlForRoute
    };
});
