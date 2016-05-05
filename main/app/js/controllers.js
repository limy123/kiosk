(function(){
'use strict';

/* Controllers */


/*function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2($scope,$translate) {
	 $scope.test = "abd";
	 $scope.testClick = function(){
	 	alert(112);
	 }
}
MyCtrl2.$inject = [];*/


 
angular.module('myApp')
.controller('myCtrl1', function($scope) {
    $scope.chk = "123";
     
})
.controller('myCtrl2', function($scope) {
    $scope.chk11 = "wwws";

     
})
.controller('LunchCtrl',function($scope,$translate){
	$scope.selChange = function(lang){
		$translate.use(lang);
	    window.localStorage.lang = lang;
	    window.location.reload();
	    $scope.cur_lang = $translate.use();
	}
	$scope.cur_lang = $translate.use();
})

;
})();
 