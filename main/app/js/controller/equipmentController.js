(function(){
'use strict';

angular.module('myApp')
 
.controller('equipmentListCtrl', function($rootScope,$scope,$state,$alert,$location,serviceFactory,$cookieStore,$filter) {
	$rootScope.curLink = $state.current.name; 

	$scope.selpage = "1";//跳转到第几页
    $scope.currentPage = 1;
    $scope.numPages = 10;//总共多少页
    $scope.pageSize = "10";//每页显示几条
    $scope.pages = [];
     
    $rootScope.curLink = $state.current.name;
    //获取列表
    $scope.getKioskList = function(paramers){
    	serviceFactory.getKioskList(paramers).success(function(response){
    		 
    		console.log(response)
    		if(response.code == 0){
    			$scope.kiosklist = response.data.rows;
    			$scope.numPages = Math.ceil(response.data.totalCount / $scope.pageSize);
    			$scope.totalPages = ($scope.numPages) >= 10 ? "10" : $scope.numPages;//超过10页则显示10个
    		}else if(response.code == "-1"){
    			$alert({
    				title: '', 
					content: $filter("translate")("请求出错") + ":"+ response.massage, 
					placement: 'top', 
					container:'#app-panel',
					type: 'info', 
					duration:'2',
					show: true
    			})
    		}else if(response.code == result_code){
    			serviceFactory.loginTimeout(response.message);
    		}
    	});
    }
    
    $scope.getKioskList($rootScope.paramers);
     
    //分页
    $scope.onSelectPage = function (page) { 
    	$scope.currentPage = page;
       /* $scope.parame = {
    		'start' : $scope.pageSize*(page-1),
			'limit' : $scope.pageSize,
			'token' :$cookieStore.get("token")
    	}
    	$scope.getKioskList($scope.parame);*/
    	$scope.searchKiosk();

    	//设置按钮分页
    	if($scope.numPages <=10) return;
    	var _page = $scope.numPages - page;//距离末尾还有几个
    	$scope.pages=[];
    	if(_page <5){ //末尾的5个 
    		for (var i = $scope.numPages - 9; i <= $scope.numPages ; i++) {
                $scope.pages.push(i);
            }
    	}else if(page <10){ //前面10个
    		for (var i = 1; i <= 10; i++) {
                $scope.pages.push(i);
            }
		}else if(page <= $scope.numPages - 5){ 
			for (var i = page-5; i < page + 5; i++) {
                $scope.pages.push(i);
            }
		}
    };
    //查询
    $scope.searchKiosk = function(){
    	var paramers = {
					'lSN' : $scope.lSN,
					'kioskNo' : $scope.kioskNo,
					'countryCode' : $scope.selCountryCode,
					'provinceCode' : $scope.selProvinceCode,
					'cityCode' : "",
					'start' : $scope.pageSize*($scope.currentPage-1),
					'limit' : $scope.pageSize,
					'token' : $cookieStore.get("token")
				}
    	$scope.getKioskList(paramers);
    }
 
	//删除柜子数据
	$scope.delEquipment = function(id){
		console.log($rootScope.isDelete);
		swal({   
			title: "",   
			text: $filter("translate")("删除柜子信息将无法找回,确定删除?"),   
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: $filter("translate")("确定删除"),   
			cancelButtonText: $filter("translate")("取消"),   
			closeOnConfirm: false,  
			loseOnCancel: false 
		}, 
		function(){
			serviceFactory.deleteKiosk(id).success(function(response){
				console.log(response)
				if(response.code == 0){
					swal("", $filter("translate")("删除成功"), "success");
					$scope.searchKiosk();
				}else if(response.code == result_code){
	    			serviceFactory.loginTimeout(response.message);
	    		}else{
					swal("", $filter("translate")("删除失败") + response.message , "error");
				}
			})
		});
	}

	 
})

.controller('equipmentAddCtrl', function($rootScope,$scope,$location,$state,serviceFactory,$cookieStore,$filter) {
    $rootScope.curLink = $state.current.name;
    $scope.lSN = "";
    $scope.kioskNo;
    $scope.address = "";
    $scope.errorKno;
    //校验是否唯一
    $scope.isKioskNo = function(kioskNo){
    	if(kioskNo == null || kioskNo == undefined) return;
    	console.log(kioskNo);
    	if($scope.kioskNo == null || $scope.kioskNo == ""){
    		$scope.errornull = true;
    		$scope.errorKno = false;
    		return;
    	} 
    	serviceFactory.isKioskNo(kioskNo).success(function(response){
    		console.log(response);
    		$scope.errornull = false;
	    	if(response){
	    		$scope.errorKno = true;//柜子简码已经存在
	    	}
	    	else{
	    		$scope.errorKno = false;
	    		
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
	    	'gid' : '1',
	    	'token' :$cookieStore.get("token")
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
	    console.log($scope.selCountryCode)
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
		   		console.log(response);
		    	if(response.code == 0){
		    		swal("", $filter("translate")("添加成功"), "success");
		    		$state.go("layout.equipmentList");
		    	}else if(response.code == result_code){
	    			serviceFactory.loginTimeout(response.message);
	    		}else{
			    		swal("", $filter("translate")("添加失败"), "error");
			    	}
			    });
	   }
    } 
})
//编辑柜子信息
.controller('equipmentEditCtrl',function($rootScope,$scope,$state,$stateParams,serviceFactory,$cookieStore,$filter){
	$scope.id = $stateParams.id;
	serviceFactory.getkioskDetail($stateParams.id).success(function(response){
		console.log(response);
		if (response.code == 0) {
			$scope.kioskDetail = response.data.kioskInfoVo;

			$scope.selCountryCode = $scope.kioskDetail.countryCode;
			$scope.selProvinceCode = $scope.kioskDetail.provinceCode;
			$scope.selCityCode = $scope.kioskDetail.cityCode;
			 
			$rootScope.selectedCountry($scope.selCountryCode);
			$rootScope.selectedProvince($scope.selProvinceCode);
			$rootScope.selectedCity($scope.selCityCode);
		}else if(response.code == result_code){
			serviceFactory.loginTimeout(response.message);
		}
	});
	$scope.editKiosk = function(){
		$scope.paramers = {
	    	'kioskNo' : $scope.kioskDetail.kioskNo,
	    	'countryCode' : ($scope.selCountryCode == 'undefined' || $scope.selCountryCode == "" || $scope.selCountryCode == null ) ? '' : $scope.selCountryCode,
			'provinceCode' : ($scope.selProvinceCode  == 'undefined' || $scope.selProvinceCode == "" || $scope.selProvinceCode == null) ? '' : $scope.selProvinceCode,
	    	'cityCode' : $scope.selCityCode,
	    	'address' : $scope.kioskDetail.address,
	    	'gid' : "1",
	    	'token' :$cookieStore.get("token")
	    }
	    console.log($scope.paramers);
	    serviceFactory.updateKiosk($scope.paramers).success(function(response){
	    	if(response.code == 0){
	    		swal("", $filter("translate")("保存成功"), "success");
	    		$state.go('layout.equipmentDetail',{id:$scope.kioskDetail.kioskNo});

	    	}else if(response.code == result_code){
    			serviceFactory.loginTimeout(response.message);
    		}else{
	    		swal("", $filter("translate")("保存失败") + ":" + response.message, "error");
	    	}
	    })
	}
})
.controller('equipmentDetailCtrl',function($rootScope,$scope,$state,$stateParams,serviceFactory){
	$scope.id = $stateParams.id;
	serviceFactory.getkioskDetail($stateParams.id).success(function(response){
		if (response.code == 0) {
			$rootScope.kioskDetail = response.data.kioskInfoVo;
		}else if(response.code == result_code){
    			serviceFactory.loginTimeout(response.message);
    		}
	});		

})
.controller('mapsCtrl',function($rootScope,$scope,$state,$stateParams,serviceFactory){
	$rootScope.curLink = $state.current.name;
})
 
;
})();
 