'use strict';

/**
 * @ngdoc function
 * @name cpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cpApp
 */
angular.module('cpApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, Upload, $timeout) {
    // modal
  $scope.items = items;
    console.log('ModalInstanceCtrl:');
   // console.log(toState);

  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  
  // File upload
    $scope.param = {};
    $scope.$watch('param.files', function () {
        $scope.upload($scope.param.files);
    });
    
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.param.files = [$scope.file];
        }
    });
    $scope.log = '';

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    Upload.upload({
                        url: 'http://cake3api.app/api/users/upload.json',
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
        .controller('GroomsMenCtrl', function ($scope, $state, $uibModal, $log) {
            //var data = [{"id":2,"title":"Paper Town","course_builder_path":null,"course_builder_id":"-K17nC5w1Wvi3LPmsyyj"},{"id":3,"title":"Wildlife","course_builder_path":null,"course_builder_id":"-K18_hHjskk28euVtV2q"},{"id":4,"title":"Created 10th Nov 2015","course_builder_path":null,"course_builder_id":"-K2ju07ReOfxWGMXg7w7"},{"id":5,"title":"Created 16th Nov 2015","course_builder_path":null,"course_builder_id":"-K3EjgDDlEo30jOkuZUA"},{"id":6,"title":"New Category","course_builder_path":null,"course_builder_id":"-K3Uhi2U1zb42XiPXN7h"},{"id":7,"title":"Test","course_builder_path":null,"course_builder_id":"-K3Uhm2aNCXZtfdeUGbe"},{"id":8,"title":"Exploration","course_builder_path":null,"course_builder_id":"-K7lYGxFFmZ7yjSwXNHn"},{"id":1,"title":"Sample test group","course_builder_path":null,"course_builder_id":"-K0yzSu8HhYfB7uv-XF8"},{"id":9,"title":"Demo","course_builder_path":null,"course_builder_id":"-K7tZbSVXFu-n8jLTIRo"},{"id":10,"title":"Category Added","course_builder_path":null,"course_builder_id":"-K8Iz4AWiu51XsBjsKNu"},{"id":11,"title":"Photography","course_builder_path":null,"course_builder_id":"-K8Y3oXEiD5TVhvSOfxy"},{"id":12,"title":"History","course_builder_path":null,"course_builder_id":"-K8YVrY9MVVXotQK2cQW"},{"id":13,"title":"New Category","course_builder_path":null,"course_builder_id":"-K8Yd31O6WHEJR8Pfs7T"},{"id":14,"title":"New Category","course_builder_path":null,"course_builder_id":"-K8YdAS-aqmLIdSMlEkG"},{"id":15,"title":"New Category","course_builder_path":null,"course_builder_id":"-K8YdD4cbiVxPGo59Hpl"},{"id":16,"title":"New Category 123","course_builder_path":null,"course_builder_id":"-K8dL2rgk13pNNDXM9At"},{"id":17,"title":"sample test","course_builder_path":null,"course_builder_id":"-K8dLWcNkkWmTbuB5r-m"},{"id":18,"title":"25th Jan 2016 (Category Added)","course_builder_path":null,"course_builder_id":"-K8rTaC6hulXsyv_38Tu"},{"id":21,"title":"New Category","course_builder_path":null,"course_builder_id":"-K9QD6Pw8LdWSvB2Af4p"},{"id":22,"title":"New Category","course_builder_path":null,"course_builder_id":"-K9QD7BugzUaNFPZcqfa"},{"id":23,"title":"New Category","course_builder_path":null,"course_builder_id":"-K9QD8ZmVEGgv3zGN2-V"},{"id":24,"title":"New Category","course_builder_path":null,"course_builder_id":"-K9QD9A1AowX8PQmcGOl"},{"id":19,"title":"Example name","course_builder_path":null,"course_builder_id":"-K8slpaOl_-6CYJZzfTT"},{"id":20,"title":"Demo Cat123","course_builder_path":null,"course_builder_id":"-K8smHgNTVl6yQ7x706L"},{"id":25,"title":"Demo Ct","course_builder_path":null,"course_builder_id":"-K9X1csyTkzbqamrlriK"},{"id":26,"title":"Newly Added Category 02 feb 2016","course_builder_path":null,"course_builder_id":"-K9kgx5xgV9ST_se9Zjz"}];
            $scope.groomsMen = [{
                    "id": 1,
                    "name": "Tom Dick",
                    "relation": 'BEST MAN',
                    "date_added": "-K17nC5w1Wvi3LPmsyyj",
                    "image_url": "images/groomsmen-1.jpg"
                }, {
                    "id": 2,
                    "name": "David Jone",
                    "relation": 'Friend',
                    "date_added": "-K17nC5w1Wvi3LPmsyyj",
                    "image_url": "images/groomsmen-2.jpg"
                },
                {
                    "id": 3,
                    "name": "Tommy Hass",
                    "relation": 'Brother',
                    "date_added": "-K17nC5w1Wvi3LPmsyyj",
                    "image_url": "images/groomsmen-3.jpg"
                },
                {
                    "id": 4,
                    "name": "John Cena",
                    "relation": 'Brother',
                    "date_added": "-K17nC5w1Wvi3LPmsyyj",
                    "image_url": "images/groomsmen-3.jpg"
                }
            ];

            // Modal
            $scope.items = ['item1', 'item2', 'item3'];

            $scope.animationsEnabled = true;
            $scope.open = function (size) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
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