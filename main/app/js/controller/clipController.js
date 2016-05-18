(function(){
'use strict';
 
angular.module('myApp')
 
.controller('clipAddCtrl', function($rootScope,$scope,$state,$location,$modal,$alert) {
	$rootScope.curLink = $state.current.name;
 	
 	$scope.clips = [{'id':'10001'},{'id':'10002'},{'id':'10003'},{'id':'10004'},{'id':'10005'},{'id':'10006'},{'id':'10007'},{'id':'10008'},{'id':'10009'}];
	var myOtherModal = $modal({
		scope: $scope, templateUrl: 'view/clipManagement/addModel.html',
		show: false,animation:'am-fade-and-slide-top'});
	$scope.showModal = function() {
		myOtherModal.$promise.then(myOtherModal.show);
	};
	$scope.addClipBtn = function(){
		//隐藏弹出框
		myOtherModal.$promise.then(myOtherModal.hide);
		//提示框
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
    $rootScope.curLink = $state.current.name;

    $scope.aa = "2015-05-01";
 	$scope.bb = "";
 	 
  
})
.controller('diagramCtrl', function($rootScope,$scope,$location,$state) {
    $rootScope.curLink = $state.current.name;
  
})
.controller('editSNCtrl',function($rootScope,$scope,$location,$state){
    $rootScope.curLink = $state.current.name;
})
.controller('clipsinCtrl',function($rootScope,$scope,$location,$state,$alert){
    $rootScope.curLink = $state.current.name;
    $scope.okClipsin = function(){
    	$alert({
			title: '', 
			content: '导入成功！', 
			placement: 'top', 
			container:'#app-panel',
			type: 'success', 
			duration:'2',
			show: true});
    }
})
;
})();
 