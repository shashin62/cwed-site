'use strict';

/**
 * @ngdoc function
 * @name cpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cpApp
 */
angular.module('cpApp')
        .controller('LogoutCtrl', function ($state, LoadingSpinner, Authentication) {
            LoadingSpinner.show();
            Authentication.logout().then(function () {
                $state.go('login');
            });
        });