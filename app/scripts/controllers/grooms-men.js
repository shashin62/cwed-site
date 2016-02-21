'use strict';

angular.module('cpApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $timeout, Upload, groomsMens, menID, Api) {
    // modal
    $scope.param = {};
    $scope.log = '';
    $scope.groomsMens = groomsMens;
    if (_.isInteger(menID)) {
        $scope.param = _.find($scope.groomsMens, {'id': menID});
        $scope.param.date = '2016-02-15';
    }

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.upload = function (dataUrl) {
        Upload.upload({
            url: Api.urlForRoute('files/upload'),
            data: {
                file: Upload.dataUrltoBlob(dataUrl),
                params: $scope.param
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.param.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.param.errorMsg = response.status
                        + ': ' + response.data;
        }, function (evt) {
            $scope.param.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };
});


angular.module('cpApp')
        .controller('GroomsMenCtrl', function ($scope, $state, $uibModal, $log, $http, GroomsMenService) {

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
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
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
            $scope.date.format = $scope.date.formats[0];
            $scope.date.altInputFormats = ['M!/d!/yyyy'];
        });