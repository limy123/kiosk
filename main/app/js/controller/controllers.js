(function(){
'use strict';
 
angular.module('myApp')
.controller('mainCtr',function($rootScope,$scope,serviceFactory,$location,$state){
	$rootScope.isLogin = true;
	 
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
					'limit' : '10'
				}
	 
	$rootScope.selCountryCode="";
	$rootScope.selProvinceCode ="";
	$rootScope.selCityCode =　"";
	$scope.provinceCode = "";

	serviceFactory.getCountry().success(function(response){
		if(response.code == 0){
			$rootScope.countrylist = response.data;
			/*$rootScope.selCountryCode = response.data[0].countryCode;
			serviceFactory.getProvince($rootScope.selCountryCode).success(function(response){
				if(response.code == 0){
					$rootScope.provincelist = response.data;
					$rootScope.selProvinceCode = response.data[0].provinceCode;
					serviceFactory.getCity($rootScope.selProvinceCode).success(function(response){
						$rootScope.citylist = response.data;
						$rootScope.selCityCode = response.data[0].cityCode;
					})
				}
				
			});*/
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
			$rootScope.citylist = response.data;
		})
	}
	$rootScope.selectedCity = function(cityCode){
		$rootScope.errorCity = false;
		console.log(cityCode);
		console.log($rootScope.selCityCode)
	}

	  
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

.controller('loginCtrl', function($rootScope,$scope,$state,serviceFactory) {
	$rootScope.isLogin = false;
    $scope.username = "" ;
    $scope.password = "";
    $scope.submitLogin = function(){
    	$rootScope.isLogin = true;

    	serviceFactory.loginIn($scope.username,$scope.password).success(function(response){
    		 
    		if(response.code == 0){
    			$state.go("equipmentList");//跳转到登录界面
    		}
    	});

    	
    }
     
     
})
;
})();
 