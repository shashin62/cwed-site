'use strict';

/**
 * @ngdoc function
 * @name cpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cpApp
 */
angular.module('cpApp')
        .controller('SignupCtrl', function ($scope, $state, $location, $auth, $http, toastr,$window) {
            var data = {username: 'prasad', password: 'aaaa'};
            var parameter = JSON.stringify(data);
            console.log('parameter:');
            console.log(parameter);
		delete $http.defaults.headers.common['AuthToken'];
                
                $http.post('http://cake3api.app/api/users/token.json', parameter).
                success(function (data, status, headers, config) {
                        console.log(data);
                        console.log('toState:');
                        console.log('Bearer '+data.data.token);
//                        $http.defaults.headers.common['Authorization'] = 'Bearer ' + data.data.token;
//                        $http.get('http://cake3api.app/api/cocktails.json').then(function successFn() {
////                            $state.go('^.success');
//                        }, function errorFn(response) {
//                            console.log('response:');
//                            console.log(response);
//
//                        });
                        
                        // 
                        $http({
				method: 'GET',
				url: "http://cake3api.app/api/cocktails.json",
				useXDomain:true,
				headers: {'Authorization': 'Bearer ' + data.data.token}
			})
			.success(function (data, status, headers, config) {
				console.log(data);
			})
			.error(function (data, status, headers, config) {
				console.log('ERROR');
			});
                    ;
                }).
                error(function (data, status, headers, config) {
                    console.log('dataE:');
                    console.log(data);
                });

//                        $http({
//				method: 'GET',
//				url: "http://cake3api.app/api/cocktails.json",
//				useXDomain:true,
//				headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImV4cCI6MTQ1NTYyODE3OH0.lDNatUZ_Eqwp9nlqtiMN2ZWMAgFVr0NI_AKHlFw8d8o'}
//			})
//			.success(function (data, status, headers, config) {
//				console.log(data);
//			})
//			.error(function (data, status, headers, config) {
//				console.log('ERROR');
//			});
        });