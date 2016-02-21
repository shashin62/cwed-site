'use strict';

/**
 * @ngdoc function
 * @name cpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cpApp
 */
angular.module('cpApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $timeout, Upload, groomsMens, menID) {
    // modal
    $scope.param = {};
    $scope.log = '';
    $scope.groomsMens = groomsMens;
    if (_.isInteger(menID)) {
        $scope.param = _.find($scope.groomsMens, {'id': menID});
    }


    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    // File upload

    $scope.$watch('param.files', function () {
        $scope.upload($scope.param.files);
    });

    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.param.files = [$scope.file];
        }
    });


    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    Upload.upload({
                        url: 'http://cwapi.quadzero.in/api/users/upload.json',
                        data: {
                            username: $scope.username,
                            file: file
                        }
                    }).then(function (resp) {
                        $timeout(function () {
                            $scope.log = 'file: ' +
                                    resp.config.data.file.name +
                                    ', Response: ' + JSON.stringify(resp.data) +
                                    '\n' + $scope.log;
                        });
                    }, null, function (evt) {
                        var progressPercentage = parseInt(100.0 *
                                evt.loaded / evt.total);
                        $scope.log = 'progress: ' + progressPercentage +
                                '% ' + evt.config.data.file.name + '\n' +
                                $scope.log;
                    });
                }
            }
        }
    };


});

angular.module('cpApp')
        .controller('GroomsMenCtrl', function ($scope, $state, $uibModal, $log, $http, GroomsMenService) {

            console.log('GroomsMen:');
            console.log(GroomsMenService);

            GroomsMenService.get().then(function (response) {
                $scope.groomsMens = response.data.groomsMens;
            });

//            $http({
//                method: 'GET',
//                url: "http://cake3api.app/api/GroomsMens.json",
//                useXDomain: true,
//            })
//                    .success(function (data, status, headers, config) {
//                        console.log(data);
//                        $scope.groomsMens = data.groomsMens;
//                    })
//                    .error(function (data, status, headers, config) {
//                        console.log('ERROR');
//                    });

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