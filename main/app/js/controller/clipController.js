(function(){
'use strict';
 
angular.module('myApp')
//新增弹夹
.controller('clipAddCtrl', function($rootScope,$scope,$state,$location,$modal,$alert,serviceFactory) {
	$rootScope.curLink = $state.current.name;
	$scope.clipNum = "5"; 
	var myOtherModal = $modal({
		scope: $scope, templateUrl: 'view/clipManagement/addModel.html',
		show: false,animation:'am-fade-and-slide-top'});
	$scope.showModal = function() {
		myOtherModal.$promise.then(myOtherModal.show);
		serviceFactory.addDeviceBox($scope.clipNum).success(function(response){
			$scope.clips = response.data;
		});
	};
	$scope.addClipBtn = function(){
		//隐藏弹出框
		myOtherModal.$promise.then(myOtherModal.hide);
		//提示框
		$alert({
			title: '', 
			content: '新增成功！', 
			placement: 'top', 
			container:'#app-panel',
			type: 'success', 
			duration:'2',
			show: true
		});
	}
})
//获取弹夹列表
.controller('clipListCtrl', function($rootScope,$scope,$location,$state,$alert,serviceFactory) {
	$scope.selpage = "1";//跳转到第几页
    $scope.currentPage = 1;
    $scope.numPages = 10;//总共多少页
    $scope.pageSize = "10";//每页显示几条
    $scope.pages = [];
     
    $rootScope.curLink = $state.current.name;
    //获取列表
    $scope.getDeviceBox = function(paramers){
    	serviceFactory.getDeviceBoxList(paramers).success(function(response){
    		console.log(response)
    		if(response.code == 0){
    			$scope.clipsList = response.data.rows;
    			$scope.numPages = Math.ceil(response.data.totalCount / $scope.pageSize);
				
    			$scope.totalPages = ($scope.numPages) >= 10 ? "10" : $scope.numPages;//超过10页则显示10个


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
    
    $scope.getDeviceBox($rootScope.paramers);
     
    //分页
    $scope.onSelectPage = function (page) { 
    	$scope.currentPage = page;
        $scope.parame = {
    		'start' : $scope.pageSize*(page-1),
			'limit' : $scope.pageSize
    	}
    	$scope.getDeviceBox($scope.parame);

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
		}else if(page < $scope.numPages - 5){ 
			for (var i = page-5; i < page + 5; i++) {
                $scope.pages.push(i);
            }
		}
    };
    //查询
    $scope.searchClip = function(){
    	$scope.parame = {
    		'boxNumber' : $scope.boxNumber,
    		'deviceType' : $scope.deviceType,
    		'status' : $scope.status,
    		'startTime' : ($scope.fromDate == 'undefined' || $scope.fromDate == "" || $scope.fromDate == null) ? undefined: $scope.fromDate.valueOf(),
    		'endTime' : ($scope.untilDate == 'undefined' || $scope.untilDate == "" || $scope.untilDate == null) ? undefined : $scope.untilDate.valueOf(),
    		'start' : '0',
			'limit' : '10'
    	}
    	$scope.getDeviceBox($scope.parame);
    }
    
    //删除弹夹
    $scope.delectDeviceBox = function(id){
    	swal({   
			title: "",   
			text: "确定删除" + id + "?",   
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "确定删除",   
			cancelButtonText: "取消",   
			closeOnConfirm: false,  
			loseOnCancel: false 
		}, 
		function(){
			serviceFactory.delectDeviceBox(id).success(function(response){
				if(response.code == 0){
					swal("", "删除成功.", "success");
					$scope.searchClip();
				}
			})
		});
    	
    }
    
     
})
.controller('diagramCtrl', function($rootScope,$scope,$location,$state) {
    $rootScope.curLink = $state.current.name;

})
//添加或编辑sns
.controller('editSNCtrl',function($rootScope,$scope,$location,$state,$stateParams,serviceFactory){
    $rootScope.curLink = $state.current.name;
    $scope.boxNumber = $stateParams.code;
    //根据id获取数据
    $scope.parame = {
    		'boxNumber' : $scope.boxNumber,
    		'start' : '0',
			'limit' : '10'
    	}
    serviceFactory.getDeviceBoxList($scope.parame).success(function(response){
    		console.log(response);
    		if(response.data.rows[0].sns != null ){
    			var snsedit = response.data.rows[0].sns;
    			$scope.sn1 = snsedit[0];
    			$scope.sn2 = snsedit[1];
    			$scope.sn3 = snsedit[2];
    			$scope.sn4 = snsedit[3];
    			$scope.sn5 = snsedit[4];
    			$scope.sn6 = snsedit[5];
    			$scope.sn7 = snsedit[6];
    		}
    	});

     
    $scope.deviceType = "1";
    $scope.saveSns = function(){
    	$scope.snsList = $scope.sn1 + "," + $scope.sn2 + "," + $scope.sn3 + "," + $scope.sn4 + "," + $scope.sn5 + "," + $scope.sn6 + "," + $scope.sn7;
	    console.log($scope.snsList);
	    $scope.paramers = {
	    	'boxNumber' : $stateParams.code,
	    	'deviceType' : $scope.deviceType,
	    	'sns' : $scope.snsList.toString()
	    }
    	serviceFactory.addOrUpdateSNs($scope.paramers).success(function(response){
    		if(response.code == 0){
    			swal("", "成功", "success");
    		}
    		console.log(response);
    	})
    }
})
.controller('clipsinCtrl',function($rootScope,$scope,$location,$state,$alert){
    $rootScope.curLink = $state.current.name;
    $scope.okClipsin = function(){
    	$alert({
			title: '', 
			content: '导入成功！', 
			placement: 'top', 
			container:'#app-panel',
			type: 'success', 
			duration:'2',
			show: true});
    }
})
;
})();
 