'use strict';
angular.module('cpApp')
  .config(function($authProvider, SETTINGS) {

     $authProvider.unlinkUrl = SETTINGS.ApiUrl + '/users/0/unlink';

    $authProvider.facebook({
      clientId: SETTINGS.FacebookAppId,
      url: SETTINGS.ApiUrl + 'sessions/facebook'
    });

    $authProvider.google({
      clientId: SETTINGS.GoogleClientId,
      url: SETTINGS.ApiUrl + 'sessions/google'
    });

    $authProvider.linkedin({
      clientId: SETTINGS.LinkedInClientId,
      url: SETTINGS.ApiUrl + 'sessions/linkedin'
    });
  });