'use strict';
// Used to transfer the data from login to signup screen. Only called if the login is
// via Social accounts.
angular.module('cpApp').factory('userInfo', function() {
  var user = {};

  var setUser = function(newUser) {
     user = newUser;
     user.email_confirmation = user.email;
  };

  var getUser = function() {
    return user;
  };
  
  return {
    setUser: setUser,
    getUser: getUser
  };
});