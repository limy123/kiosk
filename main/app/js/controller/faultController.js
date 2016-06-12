(function(){
'use strict';
 
angular.module('myApp')
 
.controller('faultListCtrl', function($rootScope,$scope,$state,$location,$alert,serviceFactory,$cookieStore) { 
	$scope.fortime = "";
 	$scope.selpage = "1";//跳转到第几页
    $scope.currentPage = 1;
    $scope.numPages = 10;//总共多少页
    $scope.pageSize = "10";//每页显示几条
    $scope.pages = [];
     
    $rootScope.curLink = $state.current.name;
    //获取列表
    $scope.getBreakDown = function(paramers){ 
    	serviceFactory.getBreakDownList(paramers).success(function(response){
            
    		if(response.code == 0){
    			$scope.breakDownList = response.data.rows;
    			 
    			$scope.numPages = Math.ceil(response.data.totalCount / $scope.pageSize);
    			$scope.totalPages = ($scope.numPages) >= 10 ? "10" : $scope.numPages;//超过10页则显示10个

    			//设置故障时间
    			/*for (var i = 0; i < $scope.breakDownList.length; i++) {
    				var date1 = new Date($scope.breakDownList[i].createDate);//故障时间
					var date2 = new Date(serviceFactory.CurentTime());//当前时间
					var longtime = serviceFactory.getLongTime(date1,date2);
    				$scope.breakDownList[i]['howtime'] = longtime.split('|')[0];
    				$scope.breakDownList[i]['totaltime'] = parseInt(longtime.split('|')[1]);
    			}*/
    		 
    		}else if(response.code == result_code){
                serviceFactory.loginTimeout(response.message);
            }else if(response.code == "-1"){
    			$alert({
    				title: '', 
					content: '请求出错' + response.massage, 
					placement: 'top', 
					container:'#app-panel',
					type: 'info', 
					duration:'2',
					show: true
    			})
    		}
    	});
    }
    //排序
    $scope.orderByTime = function(orderBy){
    	$scope.fortime = orderBy;
    }
     

    $scope.getBreakDown($rootScope.paramers);
     
    //分页
    $scope.onSelectPage = function (page) { 
    	$scope.currentPage = page;
        $scope.parame = {
    		'start' : $scope.pageSize*(page-1),
			'limit' : $scope.pageSize,
            'token' :$cookieStore.get("token")
    	}
    	$scope.getBreakDown($scope.parame);

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
    $scope.searchFault = function(){
        console.log($scope.selProvinceCode);
    	$scope.paramers = {
			'kioskNo' : $scope.kioskNo,
			'startTime' :($scope.fromDate == 'undefined' || $scope.fromDate == "" || $scope.fromDate == null) ? '': serviceFactory.formatDateTime($scope.fromDate,' 00:00:00'),
			'endTime' :($scope.untilDate == 'undefined' || $scope.untilDate == "" || $scope.untilDate == null) ? '' : serviceFactory.formatDateTime($scope.untilDate,' 23:59:59'),
			'countryCode' : ($scope.selCountryCode == 'undefined' || $scope.selCountryCode == "" || $scope.selCountryCode == null ) ? '' : $scope.selCountryCode,
			'provinceCode' : ($scope.selProvinceCode  == 'undefined' || $scope.selProvinceCode == "" || $scope.selProvinceCode == null) ? '' : $scope.selProvinceCode,
			'cityCode' : "",
			'start' : '0',
			'limit' : $scope.pageSize,
            'token' :$cookieStore.get("token")
		}
	 
    	$scope.getBreakDown($scope.paramers);
    }
})
//故障历史列表
.controller('historyRecordCtrl', function($rootScope,$scope,$location,$state,$alert,serviceFactory,$cookieStore) {
	$scope.selpage = "1";//跳转到第几页
    $scope.currentPage = 1;
    $scope.numPages = 10;//总共多少页
    $scope.pageSize = "10";//每页显示几条
    $scope.pages = [];
     
    $rootScope.curLink = $state.current.name;
    //获取列表
    $scope.getBreakDownHis = function(paramers){
    	serviceFactory.getBreakDownHisList(paramers).success(function(response){
    		 
    		if(response.code == 0){
    			$scope.breakDownHisList = response.data.rows;
    			$scope.numPages = Math.ceil(response.data.totalCount / $scope.pageSize);
    			$scope.totalPages = ($scope.numPages) >= 10 ? "10" : $scope.numPages;//超过10页则显示10个

    			//设置故障时间
    			/*for (var i = 0; i < $scope.breakDownHisList.length; i++) {
    				var date1 = new Date($scope.breakDownHisList[i].createDate);//故障时间
					var date2 = new Date($scope.breakDownHisList[i].updateDate);//当前时间
					var longtime = serviceFactory.getLongTime(date1,date2);
    				$scope.breakDownHisList[i]['howtime'] = longtime.split('|')[0];
    				$scope.breakDownHisList[i]['totaltime'] = parseInt(longtime.split('|')[1]);
    			}*/
    		 
    		}else if(response.code == result_code){
                serviceFactory.loginTimeout(response.message);
            }else if(response.code == "-1"){
    			$alert({
    				title: '', 
					content: '请求出错' + response.massage, 
					placement: 'top', 
					container:'#app-panel',
					type: 'info', 
					duration:'2',
					show: true
    			})
    		}
    	});
    }
    //排序
    $scope.orderByTime = function(orderBy){
    	$scope.fortime = orderBy;
    }
    $scope.getBreakDownHis($rootScope.paramers);
     
    //分页
    $scope.onSelectPage = function (page) { 
    	$scope.currentPage = page;
        $scope.parame = {
    		'start' : $scope.pageSize*(page-1),
			'limit' : $scope.pageSize,
            'token' :$cookieStore.get("token")
    	}
    	$scope.getBreakDownHis($scope.parame);

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
    $scope.searchhisFault = function(){

    	$scope.paramers = {
			'kioskNo' : ($scope.kioskNo == 'undefined' || $scope.kioskNo == "" || $scope.kioskNo == null) ? '':$scope.kioskNo,
			'startTime' : ($scope.fromDate == 'undefined' || $scope.fromDate == "" || $scope.fromDate == null) ? '': serviceFactory.formatDateTime($scope.fromDate,' 00:00:00'),
			'endTime' : ($scope.fromDate == 'undefined' || $scope.fromDate == "" || $scope.fromDate == null) ? '': serviceFactory.formatDateTime($scope.untilDate,' 23:59:59'),
			'countryCode' : ($scope.selCountryCode == 'undefined' || $scope.selCountryCode == "" || $scope.selCountryCode == null ) ? '' : $scope.selCountryCode,
            'provinceCode' : ($scope.selProvinceCode  == 'undefined' || $scope.selProvinceCode == "" || $scope.selProvinceCode == null) ? '' : $scope.selProvinceCode,
			'cityCode' : "",
			'start' : '0',
			'limit' : $scope.pageSize,
            'token' :$cookieStore.get("token")
		}
		console.log($scope.paramers)
    	$scope.getBreakDownHis($scope.paramers);
    }

  
})
 
;
})();