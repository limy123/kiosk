(function(){
'use strict';
 
angular.module('myApp')
.controller('mainCtr',function($rootScope,$scope,serviceFactory,$location,$state,$cookieStore,$modal){
	 
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
			$rootScope.selCountryCode = "";
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
			$rootScope.selProvinceCode = "";
			$rootScope.provincelist = response.data;
		})
	}
	$rootScope.selectedProvince = function(selProvinceCode){
		$rootScope.selCityCode =　"";
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
	$scope.loginOut = function(){
	swal({   
			title: "",   
			text: "确定退出？",   
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "确定",   
			cancelButtonText: "取消",   
			closeOnConfirm: true,  
			loseOnCancel: false 
		}, 
		function(){
			serviceFactory.loginOut().success(function(response){
				console.log(response);
				if(response.code == 0){
					$state.go("login");
				}
			})
		}
				
	);
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

.controller('loginCtrl', function($rootScope,$scope,$state,serviceFactory,$cookieStore) {
    $scope.username = "" ;
    $scope.password = "";
    $scope.submitLogin = function(){
    	serviceFactory.loginIn($scope.username,$scope.password).success(function(response){
    		console.log(response);
    		if(response.code == 0){
    			 
    			$cookieStore.put("token",response.data.token);
    			cookies = $cookieStore.get("token");
    			console.log($rootScope.token)

    			$state.go("layout.equipmentList");//跳转到主界面
    		}
    	});

    	
    }

     
     
})
;
})();
 