'use strict';

angular.module('cardinal.data')

.factory('Files', function(SETTINGS) {

    return {
        getFileLink : function (file) {
            return SETTINGS.FileServerUrl.concat('/uploads/', file);
        }
    };
})

.factory('Api', function(SETTINGS) {
    var version = SETTINGS.ApiVersion,
        url     = SETTINGS.ApiUrl;

    function urlForRoute(route) {
        var re = /^[\/]*(.*)$/;
        return url + route.replace(re, '$1');
    }

    return {
        version: version,
        url: url,
        urlForRoute: urlForRoute
    };
})

.service('CPCache', function (Users, Schools, Messages, Courses, Documents, Progresses, MessagesService, SubGroups, Groups) {
    return {
        clearAllCache: function () {
            Users.userCache.removeAll();
            Users.userSchoolCache.removeAll();
            Schools.schoolCache.removeAll();
            Courses.courseCache.removeAll();
            Courses.courseDataCache.removeAll();
            Documents.documentsCache.removeAll();
            Progresses.progressCache.removeAll();
            MessagesService.messagesCache.removeAll();
            SubGroups.subgroupCache.removeAll();
            Groups.groupCache.removeAll();
            Groups.groupSubgroupCache.removeAll();
        }
    };
});
