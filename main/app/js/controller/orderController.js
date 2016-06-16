(function(){
'use strict';
 
angular.module('myApp')
 
.controller('orderListCtrl', function($rootScope,$scope,$location,$state,$alert,serviceFactory,$modal,$http,$cookieStore,$filter) {
    $scope.selpage = "1";//跳转到第几页
    $scope.currentPage = 1;
    $scope.numPages = 10;//总共多少页
    $scope.pageSize = "10";//每页显示几条
    $scope.pages = [];
    $scope.cookiess = $cookieStore.get("token");
    cookies = $cookieStore.get("token");
    $rootScope.curLink = $state.current.name;
     
    //获取列表
    $scope.getOrderlist = function(paramers){
      serviceFactory.getOrderlist(paramers).success(function(response){
        console.log(response)
        if(response.code == 0){
          $scope.orderList = response.data.rows;
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
    $scope.getOrderlist($rootScope.paramers);
    //分页
    $scope.onSelectPage = function (page) { 
      $scope.currentPage = page;
       
      $scope.searchOrder();

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
    $scope.searchOrder = function(){
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
      $scope.getOrderlist($scope.parame);
    }

 
})

.controller('returnDepositCtrl', function($rootScope,$scope,$location,$state,$modal,$alert) {
    $rootScope.curLink = $state.current.name;

    


  //绑定checkbox选中和不选中的值
  $scope.selected = []; 
  $scope.selectedTags = []; 
  
  var updateSelected = function(action,id,name){ 
    if(action == 'add' && $scope.selected.indexOf(id) == -1){ 
      $scope.selected.push(id); 
      $scope.selectedTags.push(name); 
    } 
    if(action == 'remove' && $scope.selected.indexOf(id)!=-1){ 
      var idx = $scope.selected.indexOf(id); 
      $scope.selected.splice(idx,1); 
      $scope.selectedTags.splice(idx,1); 
    }
  } 
  
  $scope.updateSelection = function($event, id){ 
    var checkbox = $event.target; 
    var action = (checkbox.checked?'add':'remove'); 
    updateSelected(action,id,checkbox.name); 
  }
  $scope.isSelected = function(id){ 
    return $scope.selected.indexOf(id)>=0; 
  } 
  /////////////////////////

  
})
 
;
})();