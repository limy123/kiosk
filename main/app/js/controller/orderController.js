(function(){
'use strict';
 
angular.module('myApp')
 
.controller('orderListCtrl', function($rootScope,$scope,$state,$location) {
	$rootScope.isLogin = true;
	$rootScope.curLink = $state.current.name;
 
	     
})

.controller('returnDepositCtrl', function($rootScope,$scope,$location,$state,$modal,$alert) {
    $rootScope.isLogin = true;
    $rootScope.curLink = $state.current.name;

    $scope.clips = [{'id':'电池坏了'},{'id':'无法开机'},{'id':'数据线丢失'},{'id':'其他'},{'id':'10005'},{'id':'10006'},{'id':'10007'},{'id':'10008'},{'id':'10009'}];
	var myOtherModal = $modal({
		scope: $scope, templateUrl: 'view/orderManagement/orderModel.html',
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
 
;
})();