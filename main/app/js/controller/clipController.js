(function(){
'use strict';
 
angular.module('myApp')
//新增弹夹
.controller('clipAddCtrl', function($rootScope,$scope,$state,$location,$modal,$alert,serviceFactory,$filter) {
	$rootScope.curLink = $state.current.name;
	$scope.clipNum = "5"; 
	var myOtherModal = $modal({
		scope: $scope, templateUrl: 'view/clipManagement/addModel.html',
		show: false,animation:'am-fade-and-slide-top'});
	$scope.showModal = function() {
		
		serviceFactory.addDeviceBox($scope.clipNum).success(function(response){
            if(response.code == 0 ){
                $scope.clips = response.data;
                myOtherModal.$promise.then(myOtherModal.show);
            }else if(response.code == result_code){
                serviceFactory.loginTimeout(response.message);
            }else{
                //提示框
                $alert({
                    title: '', 
                    content: $filter("translate")("添加失败") + ":" + response.message, 
                    placement: 'top', 
                    container:'#app-panel',
                    type: 'info', 
                    duration:'2',
                    show: true
                });
            }
			
		});
	};
	$scope.addClipBtn = function(){
		//隐藏弹出框
		myOtherModal.$promise.then(myOtherModal.hide);
		//提示框
		$alert({
			title: '', 
			content:  $filter("translate")("添加成功"), 
			placement: 'top', 
			container:'#app-panel',
			type: 'success', 
			duration:'2',
			show: true
		});
	}
})
//获取弹夹列表
.controller('clipListCtrl', function($rootScope,$scope,$location,$state,$alert,serviceFactory,$modal,$http,$cookieStore,$filter) {
	$scope.selpage = "1";//跳转到第几页
    $scope.currentPage = 1;
    $scope.numPages = 10;//总共多少页
    $scope.pageSize = "10";//每页显示几条
    $scope.pages = [];
    $scope.cookiess = $cookieStore.get("token");
    cookies = $cookieStore.get("token");
    $rootScope.curLink = $state.current.name;
     
    //获取列表
    $scope.getDeviceBox = function(paramers){
    	serviceFactory.getDeviceBoxList(paramers).success(function(response){
    		console.log(response)
    		if(response.code == 0){
    			$scope.clipsList = response.data.rows;
    			$scope.numPages = Math.ceil(response.data.totalCount / $scope.pageSize);
				
    			$scope.totalPages = ($scope.numPages) >= 10 ? "10" : $scope.numPages;//超过10页则显示10个

    		}else if(response.code == result_code){
                serviceFactory.loginTimeout(response.message);
            }else{
    			$alert({
    				title: '', 
					content: $filter("translate")("请求出错") + ":" + response.massage, 
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
       
        $scope.searchClip();

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
    $scope.searchClip = function(){
    	$scope.parame = {
    		'boxNumber' : $scope.boxNumber,
    		'deviceType' : $scope.deviceType,
    		'status' : $scope.status,
    		'startTime' : ($scope.fromDate == 'undefined' || $scope.fromDate == "" || $scope.fromDate == null) ? undefined: serviceFactory.formatDateTime($scope.fromDate,' 00:00:00'),
    		'endTime' : ($scope.untilDate == 'undefined' || $scope.untilDate == "" || $scope.untilDate == null) ? undefined : serviceFactory.formatDateTime($scope.untilDate,' 23:59:59'),
    		'start' : $scope.pageSize*($scope.currentPage-1),
			'limit' : $scope.pageSize,
            'token' :$cookieStore.get("token")
    	}
        console.log($scope.parame);
    	$scope.getDeviceBox($scope.parame);
    }
    //删除弹夹
    $scope.delectDeviceBox = function(id){
    	swal({   
			title: "",   
			text: $filter("translate")("确定删除") + id + "?",   
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: $filter("translate")("确定删除"),   
			cancelButtonText: $filter("translate")("取消"),   
			closeOnConfirm: false,  
			loseOnCancel: false 
		}, 
		function(){
			serviceFactory.delectDeviceBox(id).success(function(response){
				if(response.code == 0){
					swal("", $filter("translate")("删除成功"), "success");
					$scope.searchClip();
				}else if(response.code == result_code){
                    serviceFactory.loginTimeout(response.message);
                }else{
                    swal("", $filter("translate")("删除失败"), "error");
                }
			})
		});
    }
    //上传文件
    myOtherModal = $modal({
		scope: $scope, templateUrl: 'view/clipManagement/uploadFile.html',
		show: false,animation:'am-fade-and-slide-top'});
    console.log(myOtherModal)
    $scope.showUploadModel = function(){
		myOtherModal.$promise.then(myOtherModal.show);
    }
    //文件上传
    /*$scope.formData={};
    $scope.uploadForm = function(){
    	console.log($scope.formData);
	    $http({
	        method  : 'POST',
	        url     :  configFactory.apiBaseUrl +'/deviceBox/batchUpdateSNs',
	        data    : $.param($scope.formData),  // pass in data as strings
	        headers: {"Content-Type": "multipart/form-data"}  
	    })
        .success(function(data) {
            console.log(data);
 
             
        });
    }
*/

    /*$scope.uploadFile = function(file){
    	console.log(file);
    	Upload.upload({
            url:  configFactory.apiBaseUrl +'/deviceBox/batchUpdateSNs',
            data: {file: file},
            headers: {"Content-Type": "multipart/form-data"}
        }).then(function (response) {
        	console.log(response)
             
        }, function (response) {
            console.log('Error status: ' + response.status);
        }, function (response) {
           
        });
    	 
    	
    }*/
    //提示
    $scope.showTip = function(title){
        $scope.tooltip = {
          "title": title
          
        };
    }
    
     
})
.controller('diagramCtrl', function($rootScope,$scope,$location,$state) {
    $rootScope.curLink = $state.current.name;

})
//添加或编辑sns
.controller('editSNCtrl',function($rootScope,$scope,$location,$state,$stateParams,serviceFactory,$cookieStore,$filter){
    $rootScope.curLink = $state.current.name;
    $scope.boxNumber = $stateParams.code;
    if($stateParams.type == "edit"){
        //根据id获取数据
        $scope.parame = {
        		'boxNumber' : $scope.boxNumber,
        		'start' : '0',
    			'limit' : '10',
                'token' : $cookieStore.get("token")
        	}
        serviceFactory.getDeviceBoxList($scope.parame).success(function(response){
    		console.log(response);
            if(response.code == 0){
                //if(response.data.rows.length != 0)
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
                
            }else if(response.code == result_code){
                serviceFactory.loginTimeout(response.message);
            }else{
                $alert({
                    title: '', 
                    content: $filter("translate")("请求出错"), 
                    placement: 'top', 
                    container:'#app-panel',
                    type: 'info', 
                    duration:'2',
                    show: true});
            }
    	});
    }
    ///////////////////////////////
    //校验
    $scope.validSn = function(sns){
        if(sns == ' ' || sns == undefined || sns == null || sns.length == 0){
            return true;
        }else if(sns.length != 16){
         return false;
        }
        var reg = new RegExp("/^[a-zA-Z0-9]{16,16}$|^[a-zA-Z0-9]{16,16}$|^[a-zA-Z]{16,16}$|^[0-9]{16,16}$/");
        if(reg.test(sns)){
            return true;
        }else{
            return false
        }
    }
     
    $scope.deviceType = "1";
    $scope.validSnChange = function(sns){
        return $scope.validSn(sns);
    }
    $scope.saveSns = function(){
        if(!$scope.validSn($scope.sn1)){
            return;
        }
        if(!$scope.validSn($scope.sn2)){
            return;
        }
        if(!$scope.validSn($scope.sn3)){
            return;
        }
        if(!$scope.validSn($scope.sn4)){
            return;
        }
        if(!$scope.validSn($scope.sn5)){
            return;
        }
        if(!$scope.validSn($scope.sn6)){
            return;
        }
        if(!$scope.validSn($scope.sn7)){
            return;
        }
        $scope.sn1 ==null?$scope.sn1=' ':$scope.sn1.replace(/^\s+|\s+$/g,"");
        $scope.sn2 ==null?$scope.sn2=' ':$scope.sn2.replace(/^\s+|\s+$/g,"");
        $scope.sn3 ==null?$scope.sn3=' ':$scope.sn3.replace(/^\s+|\s+$/g,"");
        $scope.sn4 ==null?$scope.sn4=' ':$scope.sn4.replace(/^\s+|\s+$/g,"");
        $scope.sn5 ==null?$scope.sn5=' ':$scope.sn5.replace(/^\s+|\s+$/g,"");
        $scope.sn6 ==null?$scope.sn6=' ':$scope.sn6.replace(/^\s+|\s+$/g,"");
        $scope.sn7 ==null?$scope.sn7=' ':$scope.sn7.replace(/^\s+|\s+$/g,"");
    	$scope.snsList = $scope.sn1 + "," + $scope.sn2 + "," + $scope.sn3 + "," + $scope.sn4 + "," + $scope.sn5 + "," + $scope.sn6 + "," + $scope.sn7;
	  
	    $scope.paramers = {
	    	'boxNumber' : $stateParams.code,
	    	'deviceType' : $scope.deviceType,
	    	'sns' : $scope.snsList.toString(),
            'token' : $cookieStore.get("token")
	    }
         
        console.log($scope.paramers);
    	serviceFactory.addOrUpdateSNs($scope.paramers).success(function(response){
    		if(response.code == 0){
    			swal("", $filter("translate")("保存成功"), "success");
                $state.go("layout.clipList");
    		}else if(response.code == result_code){
                serviceFactory.loginTimeout(response.message);
            }else{
                swal("", $filter("translate")("保存失败"), "error");
            }
    		console.log(response);
    	});
        
    }
})
 
;
})();
 