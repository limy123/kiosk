(function(){
'use strict';
 
angular.module('myApp')
 
.controller('clipAddCtrl', function($rootScope,$scope,$state,$location) {
	$rootScope.isLogin = true;
	$rootScope.curLink = $state.current.name;
 
	     
})

.controller('clipListCtrl', function($rootScope,$scope,$location,$state) {
    $rootScope.isLogin = true;
    $rootScope.curLink = $state.current.name;

    $scope.aa = "2015-05-01";
 	$scope.bb = "";
 	 
  
})
.controller('diagramCtrl', function($rootScope,$scope,$location,$state) {
    $rootScope.isLogin = true;
    $rootScope.curLink = $state.current.name;
  
})
 
;
})();
 