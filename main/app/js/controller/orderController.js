(function(){
'use strict';
 
angular.module('myApp')
 
.controller('orderListCtrl', function($rootScope,$scope,$state,$location,serviceFactory) {
	$rootScope.curLink = $state.current.name;

  serviceFactory.getOrderlist($rootScope.paramers).success(function(response){
      console.log(response);
  })

 
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