(function(){
'use strict';
 
angular.module('myApp')
 
.controller('equipmentListCtrl', function($rootScope,$scope,$state,$location,serviceFactory) {
	$rootScope.isLogin = true;
	$rootScope.curLink = $state.current.name; 
	//获取柜子列表
	serviceFactory.getKioskList($rootScope.paramers).success(function(response){
		console.log(response);
		if(response.code == 1){ 
			$scope.kiosklist = response.data.rows;
			$scope.totalCount = response.data.totalCount;
			$scope.totalPage = Math.ceil($scope.totalCount / 10);
			 
		}
		
	});
	//查询柜子列表
	$scope.searchKiosk = function(){
		var paramers = {
					'lSN' : $scope.lSN,
					'kioskNo' : $scope.kioskNo,
					'countryCode' : $scope.selCountryCode,
					'provinceCode' : $scope.selProvinceCode,
					'cityCode' : "",
					'start' : '0',
					'limit' : '20'
				}
		serviceFactory.getKioskList(paramers).success(function(response){
			$scope.kiosklist = response.data.rows;
		});
	}
	 

	
	//删除柜子数据
	$scope.delEquipment = function(id){
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
			serviceFactory.deleteKiosk(id).success(function(response){
				if(response.code == 0){
					swal("", "删除成功.", "success");
					$scope.searchKiosk();
				}
			})
		});
	}

	 
})

.controller('equipmentAddCtrl', function($rootScope,$scope,$location,$state,serviceFactory) {
    $rootScope.curLink = $state.current.name;
    $scope.lSN = "";
    $scope.kioskNo;
    $scope.address = "";
    $scope.errorKno;
    //校验是否唯一
    $scope.isKioskNo = function(kioskNo){
    	console.log(kioskNo);
    	serviceFactory.isKioskNo(kioskNo).success(function(response){
    		console.log(response);
	    	if(response){
	    		$scope.errorKno = true;//柜子简码已经存在
	    	}
	    	else{
	    		$scope.errorKno = false;
	    		$scope.errornull = false;
	    	}
	    }); 
	    return $scope.errorKno;
    }
    $scope.addKiosk = function(){
    	$scope.paramers = {
	    	'lSN' : $scope.lSN,
	    	'kioskNo' : $scope.kioskNo,
	    	'countryCode' : $scope.selCountryCode,
	    	'provinceCode' : $scope.selProvinceCode,
	    	'cityCode' : $scope.selCityCode,
	    	'address' : $scope.address,
	    	'gid' : '1'
	    }
	    if($scope.isKioskNo($scope.kioskNo)) return;
	    
	    if(!$scope.add_form.kioskNo.$valid){
	    	$scope.errornull = true;
	    }
	    if(!$scope.add_form.lsn.$valid){ //柜子简码不能为空
	    	$scope.add_form.lsn.$dirty = true;  
	    	$scope.add_form.lsn.$invalid = true;
	    }
	    if(!$scope.add_form.address.$valid){ //详细地址不能为空
	    	$scope.add_form.address.$dirty = true;  
	    	$scope.add_form.address.$invalid = true;
	    }
	    if($scope.selCountryCode == ""){//国家不能为空
	    	$rootScope.errorCountry = true;
	    	return
	    }
	    if($scope.selProvinceCode == ""){//省份不能为空
	    	$rootScope.errorProvince = true;
	    	return
	    }
	    if($scope.selCityCode == ""){//市不能为空
	    	$rootScope.errorCity = true;
	    	return
	    }
	    if($scope.add_form.$valid){ //校验通过
		   	serviceFactory.addKiosk($scope.paramers).success(function(response){
		    	if(response.code == 0){
		    		swal("", "添加成功.", "success");
		    	}else{
		    		swal("", "添加失败.", "error");
		    	}
		    });
	   }
    } 
})
.controller('equipmentEditCtrl',function($rootScope,$scope,$state,$stateParams,serviceFactory){
	$scope.id = $stateParams.id;
	serviceFactory.getkioskDetail($stateParams.id).success(function(response){
		console.log(response);
		if (response.code == 0) {
			$scope.kioskDetail = response.data.kioskInfoVo;

			$rootScope.selCountryCode = $scope.kioskDetail.countryCode;
			$rootScope.selProvinceCode = $scope.kioskDetail.provinceCode;
			$rootScope.selCityCode = $scope.kioskDetail.cityCode;
			$rootScope.selectedCountry($rootScope.selCountryCode);
			$rootScope.selectedProvince($rootScope.selProvinceCode);
		}
	});
	$scope.editKiosk = function(){
		$scope.paramers = {
	    	'kioskNo' : $scope.kioskDetail.kioskNo,
	    	'countryCode' : $scope.selCountryCode,
	    	'provinceCode' : $scope.selProvinceCode,
	    	'cityCode' : $scope.selCityCode,
	    	'address' : $scope.kioskDetail.address,
	    	'gid' : "1"
	    }
	    console.log($scope.paramers);
	    serviceFactory.updateKiosk($scope.paramers).success(function(response){
	    	if(response.code == 0){
	    		swal("", "保存成功.", "success");
	    	}else{
	    		swal("", "添加失败.", "error");
	    	}
	    })
	}
})
.controller('equipmentDetailCtrl',function($rootScope,$scope,$state,$stateParams,serviceFactory){
	$scope.id = $stateParams.id;
	serviceFactory.getkioskDetail($stateParams.id).success(function(response){
		if (response.code == 0) {
			$rootScope.kioskDetail = response.data.kioskInfoVo;
		}
	});		

})
 
;
})();
 