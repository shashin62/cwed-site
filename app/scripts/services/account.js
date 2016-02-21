'use strict';

/**
 * @ngdoc function
 * @name cpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cpApp
 */
angular.module('cpApp')
  .factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('/api/me');
      },
      updateProfile: function(profileData) {
        return $http.put('/api/me', profileData);
      }
    };
  });