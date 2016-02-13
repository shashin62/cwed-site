'use strict';

/**
 * @ngdoc function
 * @name cpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cpApp
 */
angular.module('cpApp')
        .controller('SignupCtrl', function ($scope, $state, $location, $auth, toastr, Users) {

            $scope.signUp = function (newUser) {
                Users.newUser(newUser).then(function (createdUser) {

                }, function errorFn(response) {
                    _.each(response.data.errors, function (errorMessage) {
                        //Messages.add(errorMessage);
                    });
                });
            };
//    $scope.signup = function() {
//      $auth.signup($scope.user)
//        .then(function(response) {
//          $auth.setToken(response);
//          $location.path('/');
//          toastr.info('You have successfully created a new account and have been signed-in');
//        })
//        .catch(function(response) {
//          toastr.error(response.data.message);
//        });
//    };
        });