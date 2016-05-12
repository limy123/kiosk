(function(){
'use strict';
 
angular.module('myApp')
 
.controller('datesCtrl', function($rootScope,$scope,$state,$location) {
	$rootScope.isLogin = true;
	$rootScope.curLink = $state.current.name;
 
	     
})
;
})();