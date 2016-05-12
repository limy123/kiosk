(function(){
'use strict';
 
angular.module('myApp')
 
.controller('faultListCtrl', function($rootScope,$scope,$state,$location) {
	$rootScope.isLogin = true;
	$rootScope.curLink = $state.current.name;
 
	     
})

.controller('historyRecordCtrl', function($rootScope,$scope,$location,$state) {
    $rootScope.isLogin = true;
    $rootScope.curLink = $state.current.name;
  
})
 
;
})();