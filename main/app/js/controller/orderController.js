(function(){
'use strict';
 
angular.module('myApp')
 
.controller('orderListCtrl', function($rootScope,$scope,$state,$location) {
	$rootScope.curLink = $state.current.name;

	$scope.fromDate = "2016-05-02";
	$scope.untilDate = "";
	$scope.selectForm = function(){
		console.log($scope.fromDate);
		console.log($scope.untilDate);
	}
 
	     
})

.controller('returnDepositCtrl', function($rootScope,$scope,$location,$state,$modal,$alert) {
    $rootScope.curLink = $state.current.name;

    $scope.clips = [{'id':'电池坏了','val':'0'},
    {'id':'无法开机','val':'1'},
    {'id':'数据线丢失','val':'2'},
    {'id':'其他','val':'3'},
    {'id':'10005','val':'4'},
    {'id':'10006','val':'5'},
    {'id':'10007','val':'6'},
    {'id':'10008','val':'7'},
    {'id':'10009','val':'8'}];
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

	


  //绑定checkbox选中和不选中的值
  $scope.selected = []; 
  $scope.selectedTags = []; 
  
  var updateSelected = function(action,id,name){ 
    if(action == 'add' && $scope.selected.indexOf(id) == -1){ 
      $scope.selected.push(id); 
      $scope.selectedTags.push(name); 
    } 
    if(action == 'remove' && $scope.selected.indexOf(id)!=-1){ 
      var idx = $scope.selected.indexOf(id); 
      $scope.selected.splice(idx,1); 
      $scope.selectedTags.splice(idx,1); 
    }
  } 
  
  $scope.updateSelection = function($event, id){ 
    var checkbox = $event.target; 
    var action = (checkbox.checked?'add':'remove'); 
    updateSelected(action,id,checkbox.name); 
  }
  $scope.isSelected = function(id){ 
    return $scope.selected.indexOf(id)>=0; 
  } 
  /////////////////////////

  
})
 
;
})();