'use strict';
(function (angular) {
    function aclCheck (roleName) {
        return this.Users.currentUserSync().role === roleName;
    }

    function Acl (Users) {
        this.Users = Users;

        this.isStudent = aclCheck.bind(this, 'student');
        this.isInstructor = aclCheck.bind(this, 'instructor');
        this.isAdmin = aclCheck.bind(this, 'admin');
        this.isPowerAdmin = aclCheck.bind(this, 'poweradmin');
    }

    angular.module('cpApp').service('Acl', Acl);
}(angular));
