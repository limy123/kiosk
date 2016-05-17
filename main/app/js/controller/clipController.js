(function(){
'use strict';
 
angular.module('myApp')
 
.controller('clipAddCtrl', function($rootScope,$scope,$state,$location,$modal,$alert) {
	$rootScope.isLogin = true;
	$rootScope.curLink = $state.current.name;
 	 
	var myOtherModal = $modal({
		scope: $scope, templateUrl: 'view/clipManagement/addModel.html',
		show: false,animation:'am-fade-and-slide-top'});
	$scope.showModal = function() {
		myOtherModal.$promise.then(myOtherModal.show);
	};
	$scope.addClipBtn = function(){
		//隐藏弹出框
		myOtherModal.$promise.then(myOtherModal.hide);
		$alert({
			title: '', 
			content: '新增成功！', 
			placement: 'top', 
			container:'#app-panel',
			type: 'success', 
			duration:'2',
			show: true});
	}
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
 