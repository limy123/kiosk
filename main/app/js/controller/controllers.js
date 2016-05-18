(function(){
'use strict';
 
angular.module('myApp')
.controller('mainCtr',function($rootScope,$scope,serviceFactory,$location,$state){
	$rootScope.isLogin = true;
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
 