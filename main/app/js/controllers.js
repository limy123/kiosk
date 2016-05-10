(function(){
'use strict';
 
angular.module('myApp')
.controller('equipmentListCtrl', function($scope,$state) {
     
     
})

.controller('equipmentAddCtrl', function($scope) {
    $scope.chk11 = "wwws";

     
})
.controller('equipmentDetailCtrl',function($scope,$state,$stateParams){
	$scope.id = $stateParams.id;
	console.log($scope.id);

})
//设置多语言
.controller('LunchCtrl',function($scope,$translate){
	$scope.selChange = function(lang){
		$translate.use(lang);
	    window.localStorage.lang = lang;
	    window.location.reload();
	    $scope.cur_lang = $translate.use();
	}
	$scope.cur_lang = $translate.use();
})
.controller('menulistCtr',function($scope,serviceFactory){
	serviceFactory.getMenulist().success(function(response){
		$scope.menudate = response;
		console.log($scope.menudate);
	});
	$scope.toggleTwoMenu = function(id){
		$scope.currentId = id;
	}
})

;
})();
 