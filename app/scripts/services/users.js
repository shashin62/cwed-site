'use strict';

angular.module('cpApp').factory('Users', function($http, $rootScope, $q, $timeout, Api) {
        var Users = {};
        Users.newUser = function(newUser, enrollment) {
//            if (!newUser) {
//                throw 'Missing arguments';
//            }
//            var deferred = $q.defer(),
//                postData = {
//                    user: newUser
//                };
             var data = {username: 'prasad', password: 'aaaa'};   
            var parameter = JSON.stringify(data);
            console.log('parameter:');
            console.log(parameter);

            $http.post(Api.urlForRoute('users/token.json'), parameter).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(status);
                }).
                error(function (data, status, headers, config) {
                    console.log('dataE:');
                    console.log(data);

                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            
//            $http({
//                method: 'POST',
//                url: Api.urlForRoute('users/add.json'),
//                headers: {
//                    'Content-Type':'application/json'
//                  },
//                data: {
//                        username: 'prasad',
//                        password: 'prasad'
//                }
//            }).then(function(result) {
//                deferred.resolve(result.data.user);
//            }, deferred.reject);
            
//            $http.post(Api.urlForRoute('users/add.json'), parameter).then(function(result) {
//                deferred.resolve(result.data.user);
//            }, deferred.reject);

           // return deferred.promise;
        };

        return Users;
    });
