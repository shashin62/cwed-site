'use strict';

angular.module('cpApp').factory('Users', function($http, $rootScope, $q, $timeout, Api) {
        var Users = {};
        Users.newUser = function(newUser, enrollment) {
            if (!newUser) {
                throw 'Missing arguments';
            }
            var deferred = $q.defer(),
                postData = {
                    user: newUser
                };

            if(enrollment && enrollment.enrollment_key) {
                postData['enrollment_key'] = enrollment.enrollment_key;
            }
            var parameter = JSON.stringify(postData);
            $http.post(Api.urlForRoute('users'), parameter).then(function(result) {
                deferred.resolve(result.data.user);
            }, deferred.reject);

            return deferred.promise;
        };

        return Users;
    });
