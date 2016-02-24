'use strict';

angular.module('cpApp').controller('ModalInstanceCtrl', function (GroomsMenService, SETTINGS, $scope, $uibModalInstance, $timeout, Upload, groomsMens, menID, Api) {
    // modal
    $scope.param = {};
    $scope.log = '';
    $scope.apiURL = SETTINGS.ApiUrl;
    $scope.groomsMens = groomsMens;

    $scope.flag = {};
    $scope.flag.showCrop = false;

    if (_.isInteger(menID)) {
        $scope.param = _.find($scope.groomsMens, {'id': menID});
        $scope.param.date = new Date();
        $scope.flag.showAvatar = _.isEmpty($scope.param.photo_url) ? false : true;
    }

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.imgSelected = function () {
        $scope.flag.showCrop = true;
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.removeAvatar = function (menID) {
        GroomsMenService.removeAvatar(menID).then(function (response) {
            $scope.param = response.data.data.groomsMen;
            $scope.flag.showAvatar = false;
        });
    };

    $scope.upload = function (dataUrl) {
        var files = _.isEmpty($scope.param.photo_url) ? Upload.dataUrltoBlob(dataUrl) : null;
        Upload.upload({
            url: Api.urlForRoute('files/upload'),
            data: {
                file: files,
                params: $scope.param
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.param.result = response.data;
                $uibModalInstance.close($scope.param.result);
            });
        }, function (response) {
            if (response.status > 0)
                $scope.param.errorMsg = response.status
                        + ': ' + response.data;
        }, function (evt) {
            $scope.param.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

    // Datepicker
    $scope.date = {};
    $scope.date.popup1 = {
        opened: false
    };

    $scope.date.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.date.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.date.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.date.format = $scope.date.formats[1];
    $scope.date.altInputFormats = ['M!/d!/yyyy'];
});


angular.module('cpApp')
        .controller('GroomsMenCtrl', function ($scope, $state, $uibModal, $log, $http, GroomsMenService, SETTINGS) {
            $scope.apiURL = SETTINGS.ApiUrl;

            GroomsMenService.get().then(function (response) {
                $scope.groomsMens = response.data.groomsMens;
            });

            // Modal
            $scope.animationsEnabled = true;

            $scope.open = function (menID) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    //size: size,
                    resolve: {
                        groomsMens: function () {
                            return $scope.groomsMens;
                        },
                        menID: menID
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                    GroomsMenService.get().then(function (response) {
                        $scope.groomsMens = response.data.groomsMens;
                    });

                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.deleteGroomsMen = function (gmID) {
                return GroomsMenService.delete(gmID).then(function () {
                    $scope.groomsMens = _.filter($scope.groomsMens, function (mens) {
                        return mens.id !== gmID;
                    });
                });
            };


        });