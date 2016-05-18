(function(){
'use strict';
 
angular.module('myApp')
 
.controller('datesCtrl', function($rootScope,$scope,$state,$location) {
	$rootScope.curLink = $state.current.name;
 
	     
})
;
})();