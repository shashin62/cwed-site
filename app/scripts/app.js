'use strict';
angular
        .module('cpApp', [
            'ngResource',
            'ngMessages',
            'ngAnimate',
            'toastr',
            'ui.router',
            'ui.bootstrap',
            'ngSanitize',
            'ngFileUpload',
            'textAngular',
            'config',
            'angular-cache',
            'LocalStorageModule',
            'satellizer']
                )
        .config(function ($stateProvider, $urlRouterProvider, $authProvider, localStorageServiceProvider, CacheFactoryProvider) {
            angular.extend(CacheFactoryProvider.defaults, {
                // This cache can hold 1000 items
                capacity: 1000,
                // Items added to this cache expire after 15 minutes
                maxAge: 900000,
                // Items will be actively deleted when they expire
                deleteOnExpire: 'aggressive',
                // This cache will check for expired items every minute
                recycleFreq: 60000,
                // This cache will clear itself every 10 minutes
                cacheFlushInterval: 600000,
                // This cache will sync itself with localStorage
                storageMode: 'localStorage',
                // Full synchronization with localStorage on every operation
                verifyIntegrity: true,
            });



            $stateProvider
                    .state('home', {
                        url: '/',
                        controller: 'HomeCtrl',
                        templateUrl: 'views/home.html'
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: 'views/login.html',
                        controller: 'LoginCtrl',
                        resolve: {
                            skipIfLoggedIn: skipIfLoggedIn
                        }
                    })
                    .state('signup', {
                        url: '/signup',
                        templateUrl: 'views/signup.html',
                        controller: 'SignupCtrl',
                        resolve: {
                            skipIfLoggedIn: skipIfLoggedIn
                        }
                    })
                    .state('groomsMen', {
                        url: '/grooms-men',
                        templateUrl: 'views/grooms-men.html',
                        controller: 'GroomsMenCtrl',
                        resolve: {
                            skipIfLoggedIn: skipIfLoggedIn
                        }
                    })
                    .state('logout', {
                        url: '/logout',
                        template: null,
                        controller: 'LogoutCtrl'
                    })
                    .state('profile', {
                        url: '/profile',
                        templateUrl: 'views/profile.html',
                        controller: 'ProfileCtrl',
                        resolve: {
                            loginRequired: loginRequired
                        }
                    });

            $urlRouterProvider.otherwise('/');

            // set a prefix for local storage variables
            localStorageServiceProvider.prefix = 'cw';

            $authProvider.facebook({
                clientId: '158250177576775',
                url: 'http://cake3api.app/api/users/facebook.json'
            });

            $authProvider.google({
                clientId: '829417752576-eok1lo1898psc2rqvb2drr8mc95iru5a.apps.googleusercontent.com',
                url: 'http://cake3api.app/api/users/google.json'
            });

            $authProvider.oauth2({
                name: 'foursquare',
                url: '/auth/foursquare',
                clientId: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
                redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
                authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
            });

            function skipIfLoggedIn($q, $auth) {
                var deferred = $q.defer();
                if ($auth.isAuthenticated()) {
                    deferred.reject();
                } else {
                    deferred.resolve();
                }
                return deferred.promise;
            }

            function loginRequired($q, $location, $auth) {
                var deferred = $q.defer();
                if ($auth.isAuthenticated()) {
                    deferred.resolve();
                } else {
                    $location.path('/login');
                }
                return deferred.promise;
            }
        });
