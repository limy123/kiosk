(function(){
'use strict';
 
angular.module('myApp')
 
.controller('faultListCtrl', function($rootScope,$scope,$state,$location) {
	$rootScope.curLink = $state.current.name;
	$scope.pstart = "";
	$scope.pend = "";
	 
 	$scope.selectForm = function(){
 		console.log($scope.pstart);
 		console.log("===================");
 		console.log($scope.pend);
 		 
 	}
 	

	     
})

.controller('historyRecordCtrl', function($rootScope,$scope,$location,$state) {
    $rootScope.curLink = $state.current.name;
  
})
 
;
})();