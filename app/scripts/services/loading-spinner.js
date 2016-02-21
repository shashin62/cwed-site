'use strict';
angular.module('cpApp').service('LoadingSpinner', function loadingSpinner() {
    var exports = {};

    $('body').click(function (e) {
        if ($(e.target).is('#preloader')) {
            e.preventDefault();
        }
    });

    exports.show = function () {
        $('#preloader').show();
//        $('#content').toggleClass('loading');
    };

    exports.hide = function () {
        $('#preloader').hide();
//        $('#content').toggleClass('loading');
    };

    return exports;
});
