'use strict';

angular.module('cpApp').factory('RememberMe', function rememberMe(localStorageService) {
    var exports = {};

    /**
     * @param {string} credentials.email - the user's email - this is what will be stored
     * @param {string} credentials.password - the user's password. Passed in, but not stored
     * @param {bool} remember - if true, remember this user. if false, forget the user and clear the localStorage field
     */
    exports.remember = function (credentials, remember) {
        if (remember) {
            localStorageService.set('rememberme', credentials.email);
        } else {
            localStorageService.remove('rememberme');
        }
    };

    /**
     * @returns {string} email - the 'Remember me' user's email
     */
    exports.recall = function (credentials) {
        return localStorageService.get('rememberme');
    };

    return exports;
});
