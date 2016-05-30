(function(){
'use strict';
 
angular.module('myApp')
 
.controller('faultListCtrl', function($rootScope,$scope,$state,$location,serviceFactory) {
	$rootScope.curLink = $state.current.name;
	var paramers = { 
					'start' : '0',
					'limit' : '10'
				}
	serviceFactory.getBreakDownList(paramers).success(function(response){
		console.log(response);
	});
	$scope.searchFault = function(){
		$scope.paramers = {
			'kioskNo' : $scope.kioskNo,
			'startTime' : $scope.fromDate,
			'endTime' : $scope.untilDate,
			'countryCode' : $scope.selCountryCode,
			'provinceCode' : $scope.selProvinceCode,
			'cityCode' : "",
			'start' : '0',
			'limit' : '20'
		}
		console.log($scope.paramers)
		serviceFactory.getBreakDownList($scope.paramers).success(function(response){
			console.log(response);
		});
	}
	 
 	 

	     
})

.controller('historyRecordCtrl', function($rootScope,$scope,$location,$state) {
    $rootScope.curLink = $state.current.name;
  
})
 
;
})();