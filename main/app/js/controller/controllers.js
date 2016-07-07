(function(){
'use strict';
 
angular.module('myApp')
.controller('mainCtr',function($rootScope,$scope,serviceFactory,$location,$state,$cookieStore,$modal,$filter){
	console.log($location);
	 
	$scope.toggleTwoMenu = function(id){
		$scope.currentId = id;
	}
	$rootScope.curLink = "equipmentList";
	//左侧菜单
	serviceFactory.getMenulist().success(function(response){
		$scope.menudate = response;
		//console.log($scope.menudate);
	});

	//基础数据
	$rootScope.paramers = { 
					'start' : '0',
					'limit' : '10',
					'token' :$cookieStore.get("token")
				}
	 
	$rootScope.selCountryCode="";
	$rootScope.selProvinceCode ="";
	$rootScope.selCityCode =　"";
	$scope.provinceCode = "";

	serviceFactory.getCountry().success(function(response){
		if(response.code == 0){
			$rootScope.countrylist = response.data;
		}
	});
	
	$rootScope.selectedCountry = function(selCountryCode){
		$rootScope.errorCountry = false;
		serviceFactory.getProvince(selCountryCode).success(function(response){
			$rootScope.provincelist = response.data;
		})
	}
	$rootScope.selectedProvince = function(selProvinceCode){
		$rootScope.errorProvince = false;
		serviceFactory.getCity(selProvinceCode).success(function(response){
			console.log(response);
			$rootScope.citylist = response.data;
		})
	}
	$rootScope.selectedCity = function(cityCode){
		$rootScope.errorCity = false;
		console.log(cityCode);
		console.log($rootScope.selCityCode)
	}
	//退出登录
	$scope.loginOut = function(){
		swal({   
				title: "",   
				text: $filter("translate")("确定退出")+"?",   
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: $filter("translate")("确定"),   
				cancelButtonText: $filter("translate")("取消"),
				closeOnConfirm: true,  
				loseOnCancel: false 
			}, 
			function(){
				serviceFactory.loginOut().success(function(response){
					console.log(response);
					if(response.code == 0 || response.code == result_code){
						$state.go("login");
					}
				})
			}
					
		);
	}
	//多语言
	//$rootScope.isDelete = "";
	 
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

.controller('loginCtrl', function($rootScope,$scope,$state,serviceFactory,$cookieStore,$location) {
	console.log($location.absUrl());
    $scope.username = "" ;
    $scope.password = "";
    $scope.submitLogin = function(){
    	if(!$scope.loginForm.username.$valid){ //柜子简码不能为空
	    	$scope.loginForm.username.$dirty = true;  
	    	$scope.loginForm.username.$invalid = true;
	    }
	    if(!$scope.loginForm.password.$valid){ //柜子简码不能为空
	    	$scope.loginForm.password.$dirty = true;  
	    	$scope.loginForm.password.$invalid = true;
	    }
	    if($scope.loginForm.$valid){ //校验通过
	    	serviceFactory.loginIn($scope.username,$scope.password).success(function(response){
	    	 
	    		if(response.code == 0){
	    			 
	    			$cookieStore.put("token",response.data.token);
	    			cookies = $cookieStore.get("token");
	    		 

	    			$state.go("layout.equipmentList");//跳转到主界面
	    		}else if(response.code == -1){
	    			$scope.loginError = true;
	    			$scope.showError = response.message;
	    		}
	    	});
	    }

    	
    }

     
     
})
;
})();
 