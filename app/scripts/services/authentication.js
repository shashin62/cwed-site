'use strict';

angular.module('cpApp').factory('Authentication', function Authentication($http, $rootScope, Api, $q, Messages, Users, localStorageService, CPCache) {
    /*jshint camelcase: false */
    /*global _: true */

    var loginSuccess = function (data, authPromise) {
        $rootScope.isAuthenticated = true;
        $rootScope.token = data.token;
        $rootScope.user_id = data.user_id;
        $rootScope.justSignedIn = true;
        console.log('$rootScope.isAuthenticated:');
        console.log($rootScope.isAuthenticated);

        localStorageService.set('userId', data.user_id);
        localStorageService.set('token', data.token);

        Users.setCurrentUser(data.user_id).then(function (user) {
            authPromise.resolve();
        });
    };

    var clearUserDetails = function () {
        $rootScope.isAuthenticated = false;

        localStorageService.remove('userId');
        localStorageService.remove('token');

        CPCache.clearAllCache();

        delete $rootScope.token;
        delete $rootScope.user_id;
        delete $rootScope.currentUser;
    };

    var AuthenticationService = {
        login: function (credentials) {
            var authPromise = $q.defer();

            CPCache.clearAllCache();

            $http.post(Api.urlForRoute('users/token'), credentials)
                    .success(function (data) {
                        loginSuccess(data.data, authPromise)
                    })
                    .error(function () {
                        authPromise.reject();
                    });

            return authPromise.promise;
        },
        createLocalSession: function (data) {
            var authPromise = $q.defer();
            loginSuccess(data, authPromise);
            return authPromise.promise;
        },
        clearLocalSession: function () {
            clearUserDetails();
        },
        logout: function () {
            return $http.delete(Api.urlForRoute('sessions/destroy')).success(function () {
                clearUserDetails();
            });
        },
        isAuthenticated: function () {
            var dfd = $q.defer(),
                    storedToken;

            if ($rootScope.isAuthenticated) {
                dfd.resolve(true);
            } else {
                storedToken = localStorageService.get('token');
                if (storedToken) {
                    $http.put(Api.urlForRoute('sessions/ping')).success(function () {
                        dfd.resolve(true);
                    }).error(function () {
                        localStorageService.remove('token');
                        localStorageService.remove('userId');
                        delete $rootScope.currentUser;
                        delete $rootScope.user_id;
                        dfd.reject();
                    });
                } else {
                    dfd.reject();
                }
            }

            return dfd.promise;
        }
    };

    return AuthenticationService;
})
        .factory('authenticationHttpRequestInterceptor', function ($q, $rootScope, $injector, Messages, localStorageService, $location) {
            var clearUserDetails = function () {
                $rootScope.isAuthenticated = false;

                localStorageService.remove('userId');
                localStorageService.remove('token');

                delete $rootScope.token;
                delete $rootScope.user_id;
                delete $rootScope.currentUser;
            };

            return {
                request: function (config) {
                    var token = $rootScope.token || localStorageService.get('token'),
                            userId = $rootScope.user_id || '';
                    if (token) {
                        config.headers.Authorization = 'Bearer ' + $rootScope.token;
                        config.headers.UserId = userId;
                    }
                    return config;
                },
                responseError: function (response) {
                    if (response.status === 401) {
                        // 401 unauthorized
                        if (response.data.success === false) {
                            Messages.add('Sorry. The email address or password you entered is not correct. Please try again.');
                        }

                        clearUserDetails();
                        $injector.get('$state').go('login');
                    }

                    return $q.reject(response);
                }
            };
        });

