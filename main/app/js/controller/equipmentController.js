(function(){
'use strict';
 
angular.module('myApp')
 
.controller('equipmentListCtrl', function($rootScope,$scope,$state,$location) {
	$rootScope.isLogin = true;
	$scope.delEquipment = function(id){
		console.log(id);
		swal({   
			title: "",   
			text: "删除设备信息将无法找回,确定删除？",   
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "确定删除",   
			cancelButtonText: "取消",   
			closeOnConfirm: false,  
			loseOnCancel: false 
		}, 
		function(){
			swal("", "删除成功.", "success");
		});
	}

		//分页
	  $scope.filteredTodos = [];
	  $scope.itemsPerPage = 30;
	  $scope.currentPage = 4;

	  $scope.makeTodos = function() {
	    $scope.todos = [];
	    for (var i=1;i<=50;i++) {
	      $scope.todos.push({ text:'todo '+i, done:false});
	    }
	  };

	  $scope.figureOutTodosToDisplay = function() {
	    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
	    var end = begin + $scope.itemsPerPage;
	    $scope.filteredTodos = $scope.todos.slice(begin, end);
	  };

	  $scope.makeTodos(); 
	  $scope.figureOutTodosToDisplay();

	  $scope.pageChanged = function() {
	    $scope.figureOutTodosToDisplay();
	  };
/////////////////////
$rootScope.curLink = $state.current.name;
console.log($rootScope.curLink);
	     
})

.controller('equipmentAddCtrl', function($rootScope,$scope,$location,$state) {

    $scope.chk11 = "wwws";
    $rootScope.isLogin = true;
    $rootScope.curLink = $state.current.name;
    console.log($rootScope.curLink);

})
.controller('equipmentDetailCtrl',function($rootScope,$scope,$state,$stateParams){
	$scope.id = $stateParams.id;
	$rootScope.isLogin = true;
	console.log($scope.id);
	$rootScope.curLink = $state.current.name;
console.log($rootScope.curLink);

})
 
;
})();
 