'use strict';

angular.module('cpApp').factory('GroomsMenService', function ($http, $rootScope, $q, $timeout, Api) {
    var GroomsMen = {};
    GroomsMen.get = function () {
        var dfd = $q.defer();
        $http({
            method: 'GET',
            url: Api.urlForRoute('GroomsMens')
        }).then(function (response) {
            return dfd.resolve(response);
        });
        return dfd.promise;
    };

    GroomsMen.delete = function (gmID) {
        if (!gmID) {
            throw 'Missing parameter "groupId"';
        }

        return $http.delete(Api.urlForRoute('GroomsMens/delete/') + gmID);
    };

//    GroomsMen.getClasses = function (arr) {
//        if (!arr) {
//            throw 'Missing parameter "ids"';
//        }
//        var dfd = $q.defer();
//        $http({
//            method: 'POST',
//            url: Api.urlForRoute('groups/subgroups'),
//            data: {'group_ids': arr.toString()}
//        }).then(function (response) {
//            return dfd.resolve(response);
//        });
//        return dfd.promise;
//    };
//
//    GroomsMen.getLabels = function (classIDs) {
//        var dfd = $q.defer();
//        $http({
//            method: 'GET',
//            url: Api.urlForRoute('labels/subgroups?subgroup_ids=') + classIDs
//        }).then(function (response) {
//            return dfd.resolve(response);
//        });
//        return dfd.promise;
//    };
//
//    GroomsMen.getClassesByInstrId = function (arr) {
//        var dfd = $q.defer();
//        $http({
//            method: 'GET',
//            url: Api.urlForRoute('/users/subgroups?user_ids=') + arr
//        }).then(function (response) {
//            return dfd.resolve(response);
//        });
//        return dfd.promise;
//    };
//
//    GroomsMen.getStudents = function (params) {
//        if (!params > 0) {
//            throw 'Missing parameter "ids"';
//        }
//        var dfd = $q.defer();
//        $http({
//            method: 'GET',
//            url: Api.urlForRoute('report?') + params.join("&")
//        }).then(function (response) {
//            return dfd.resolve(response);
//        });
//        return dfd.promise;
//    };

    return GroomsMen;
});
