'use strict';

/**
 * @ngdoc function
 * @name cpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cpApp
 */
angular.module('cpApp')
        .controller('LoginCtrl', function ($scope, $rootScope, $location, $auth, $state, LoadingSpinner, Authentication, RememberMe, userInfo, toastr) {

            $scope.credentials = {
                email: RememberMe.recall()
            };

            $scope.remember = _.isString(RememberMe.recall());

            $scope.login = function (credentials, remember) {
                Authentication.clearLocalSession();
                RememberMe.remember.apply(null, arguments);

               // LoadingSpinner.show();

                Authentication.login(credentials).then(function () {
                    // transitioning to the root will automatically redirect to the correct 'default' page
                    LoadingSpinner.hide();
                    $location.path('/');
                }, function () {
                   LoadingSpinner.hide();
                });
            };

            // Method to authenticate via social login accounts
            $scope.authenticate = function (provider) {
                //clear all the local session details
                Authentication.clearLocalSession();

                var auth = $auth.authenticate(provider);

                auth.then(function (response) {
                    //Successfull authentication - Found account with social login uid
                    Authentication.createLocalSession(response.data).then(function () {
                        $location.path('/');
                    });
                }, function (response) {
                    LoadingSpinner.hide();
                    var user = response.data.user;
                    user.provider = provider;
                    userInfo.setUser(user);
                    switch (response.status) {
                        case 403:
                            // Account with Same email exists.
                            $state.go('socialMapAuth');
                            break;
                        case 404:
                            //No mapping found. So it is a new account.
                            $state.go('signup');
                            break;
                    }
                });
            };
        });
