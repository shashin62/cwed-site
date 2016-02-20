'use strict';

angular.module('cpApp').factory('Messages', function Messages($rootScope) {
  $rootScope.messages = {};

  return {
    // gets all messages
    // @param key optionall fetch only a single message
    // @return array login messages
    get: function (key) {
      return key ? $rootScope.messages[key] : $rootScope.messages;
    },

    // push a login message. these are stored on the $rootScope
    // @param string message
    // @param string type - [error|warning] - optional
    add: function (message, type) {
      var stamp = new Date().getTime() + Math.floor(Math.random() * 1000);

      $rootScope.messages[stamp] = {
        message: message,
        type: type || 'error'
      };

      return stamp;
    },

    // clear all login messages
    clear: function () {
      $rootScope.messages = {};
    }
  };
})
.factory('clearMessagesHttpRequestInterceptor', function (Messages) {
  return {
    request: function (config) {
      Messages.clear();
      return config;
    }
  };
});
