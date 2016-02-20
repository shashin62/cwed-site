'use strict';

angular.module('cpApp').factory('Users', function ($http, $rootScope, $q, $timeout, Api) {
    var Users = {};

    Users.currentUser = function (options) {
        var deferred;

        if (options && options.requery) {
            deferred = Users.setCurrentUser($rootScope.currentUser.id);
        } else {
            deferred = $q.when($rootScope.currentUser);
        }

        return deferred;
    };

    Users.setCurrentUser = function (id) {
        var deferred = $q.defer();

        Users.get(id).then(function (user) {
            $rootScope.currentUser = user;

            deferred.resolve(user);
        });

        return deferred.promise;
    };

    // Get a user with a query. If the user is a student, associate the appropriate schools. If the user is an admin or instructor, associate the correct "faculty" (the school the person works at)
    // @param { number|object } queryObj
    Users.get = function (queryObj) {
        var deferred = $q.defer(),
                query = '', // empty string will fetch index route
                user = {},
                id = '';

        if (_.isNumber(queryObj) || (_.isNumber(parseInt(queryObj, 10)) && !_.isNaN(parseInt(queryObj, 10)))) {
            // id
            id = queryObj;
            query = {
                id: id,
                name: 'prasad'
            };
        } else if (_.isObject(queryObj)) {
            // search parameters
            query = queryObj;
        } else {
            query = {
                quantity: 'all'
            };
        }

        $http({
            method: 'GET',
            url: Api.urlForRoute('users/view/') + id,
            params: query,
        }).success(function (data) {
            if (_.has(data, 'users')) {
                // the index route
                deferred.resolve(data);
            } else {
                // query an individual user
                user = data.user;
                deferred.resolve(user);
            }
        }).error(function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    Users.newUser = function (newUser, enrollment) {
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
