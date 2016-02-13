angular
    .module('cpApp', [
        'ngResource',
        'ngMessages',
        'ngAnimate',
        'toastr',
        'ui.router',
        'satellizer']
    )
    .config(function ($stateProvider, $urlRouterProvider, $authProvider) {
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

        $authProvider.facebook({
            clientId: '158250177576775'
        });

        $authProvider.google({
            clientId: '829417752576-eok1lo1898psc2rqvb2drr8mc95iru5a.apps.googleusercontent.com'
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
