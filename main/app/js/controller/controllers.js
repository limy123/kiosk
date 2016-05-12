(function(){
'use strict';
 
angular.module('myApp')
.controller('mainCtr',function($rootScope,$scope,serviceFactory,$location,$state){
	$rootScope.isLogin = false;
	/*$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
		console.login(22);
		if(toState.name=='login') {
			$scope.isLogin = false; return;// 如果是进入登录界面则允许
		}
		// 如果用户不存在
		if(!$rootScope.user || !$rootScope.user.token){
			event.preventDefault();// 取消默认跳转行为
			$state.go("login",{from:fromState.name,w:'notLogin'});//跳转到登录界面
		}
	});*/

	//左侧菜单
	serviceFactory.getMenulist().success(function(response){
		$scope.menudate = response;
		console.log($scope.menudate);
	});
	$scope.toggleTwoMenu = function(id){
		$scope.currentId = id;
	}
	 $rootScope.curLink = "equipmentList";
	 console.log($rootScope.curLink);
	 /*$scope.curLinkFun = function(curlink){
	 	$rootScope.curLink = $location.url();
	 	console.log($rootScope.curLink);
	 }*/
	
})
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
//设置多语言
.controller('LunchCtrl',function($scope,$translate){
	$scope.selChange = function(lang){
		$translate.use(lang);
	    window.localStorage.lang = lang;
	    window.location.reload();
	    $scope.cur_lang = $translate.use(); 
	}
	$scope.cur_lang = window.localStorage.lang;
 
})

.controller('loginCtrl', function($rootScope,$scope,$state) {
	$rootScope.isLogin = false;
    $scope.username = "" ;
    $scope.password = "";
    $scope.submitLogin = function(){
    	$rootScope.isLogin = true;
    	$state.go("equipmentList");//跳转到登录界面
    }
     
})
;
})();
 