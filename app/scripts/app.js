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
            'ngImgCrop',
            'angular-confirm',
            'satellizer']
                )
        .value('DEBUG', false)
        .config(function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, localStorageServiceProvider, CacheFactoryProvider) {
            $httpProvider.interceptors.push('authenticationHttpRequestInterceptor');
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
                    })
                    .state('signup', {
                        url: '/signup',
                        templateUrl: 'views/signup.html',
                        controller: 'SignupCtrl',
                    })
                    .state('groomsMen', {
                        url: '/grooms-men',
                        templateUrl: 'views/grooms-men.html',
                        controller: 'GroomsMenCtrl',
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

//            function skipIfLoggedIn($q, $auth) {
//                var deferred = $q.defer();
//                if ($auth.isAuthenticated()) {
//                    deferred.reject();
//                } else {
//                    deferred.resolve();
//                }
//                return deferred.promise;
//            }
//
//            function loginRequired($q, $location, $auth) {
//                var deferred = $q.defer();
//                if ($auth.isAuthenticated()) {
//                    deferred.resolve();
//                } else {
//                    $location.path('/login');
//                }
//                return deferred.promise;
//            }
        })
        .run(function (DEBUG, Users, $window, $rootScope, $state, $location, $timeout, Authentication, Messages, LoadingSpinner, localStorageService) {

//                $rootScope.$on("$stateChangeStart", function (event, next, current) {
//                    // redirect to /login if is not logged  
//                    if (!Authentication.isAuthenticated() && $state.is('login') === false) {
//                        Authentication.logout(function (user) {
//                            $state.go('login');
//                        });
//                        // also redirect when user is logged in and hits /login route      
//                    } else if (Authentication.isAuthenticated() && $state.is('login')) {
//                        $state.go('profile');
//                    }
//                });

            $rootScope.token = localStorageService.get('token');
            $rootScope.user_id = localStorageService.get('userId');

            $rootScope.uiState = {
                isCollapsed: true
            };

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                // LoadingSpinner.show();
                $rootScope.uiState.isCollapsed = true;

                if (!$rootScope.user_id && toState.name !== 'login') {
                    if (DEBUG) {
                        console.warn('1');
                    }

                    event.preventDefault();
                    //$state.go('login');
                    LoadingSpinner.hide();
                } else if (toState.name === 'login') {
                    if (DEBUG) {
                        console.warn('2');
                    }

                    if ($rootScope.currentUser) {
                        // user is authed, so don't let go to login
                        event.preventDefault();
                        LoadingSpinner.hide();

                        $timeout(function () {

                            $state.go('grooms-men');

                        });
                    }

                    // proceed
                } else if ($rootScope.user_id && _.isEmpty($rootScope.currentUser)) {
                    if (DEBUG) {
                        console.warn('3', toState, $rootScope.user_id, _.isEmpty($rootScope.currentUser));
                    }

                    // if there is a saved id
                    event.preventDefault();

                    Authentication.isAuthenticated().then(function () {
                        if (DEBUG) {
                            console.warn('3.5');
                        }

                        Users.setCurrentUser($rootScope.user_id).then(function () {
                            if (DEBUG) {
                                console.warn('3.6');
                            }
                            $state.go(toState, toParams);
                        });
                    }, function () {
                        $state.go('login');
                    });
                } else {
                    if (DEBUG) {
                        console.warn('4 ' + toState.name);
                    }
                    
                    // user should be logged in here
                    Users.currentUser().then(function (user) {
                        if (!user) {
                            // user is logging out or in the onboarding process
                            if (DEBUG) {
                                console.warn('5');
                            }
                            return;
                        }

                        if (DEBUG) {
                            console.warn('5.5\t' + toState.name);
                        }
                    });
                }
            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.stateName = toState.name;

                $rootScope.previousStateLink = fromState.name.length ? $state.href(fromState, fromParams) : '/#/';

                Messages.clear();
                LoadingSpinner.hide();

                if (toState.name.indexOf('student') !== 0) {
                    $rootScope.bodyClass = '';
                }
            });

            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                LoadingSpinner.hide();
                if (!(error && error.status === 401)) {
                    console.warn(error);
                } else if (error && error.status === 401) {
                    $state.go('login');
                }
            });

            // default
            $rootScope.$on('$locationChangeStart', function () {
                if ($location.path() === '' || $location.path() === '/') {
                    // this is the reroute the user to the right dashboard based on whether they are a student or an admin
                    Authentication.isAuthenticated().then(function () {
                        Users.currentUser().then(function (user) {
                            if (!user) {
                                $state.go('login');
                                return;
                            }

                            $state.go('grooms-men');

                        });
                    }, function () {
                        $state.go('login');
                    });
                }
            });


        });
