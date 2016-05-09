(function(){
'use strict';
 
angular.module('myApp')
.controller('equipmentListCtrl', function($scope) {
    $scope.colors = [{
                'id':'1',
                'name':'red'
            },{
                'id':'2',
                'name':'green'
            },{
                'id':'3',
                'name':'blue'
            }];
})
.directive('toggleClass', function(){
    return {
        restrict: 'EA',
        
        scope: {
            toggleClass: '@'
        },
        link: function($scope, $element){
            
            $element.children('.auto').on('click', function(e){
                $element.siblings().removeClass('active');
                //console.log($element.parent('.nav').children('li').html());

                $element.toggleClass('active');
                console.log($(e.target));
                 
            });
        }
    };
})
.controller('equipmentAddCtrl', function($scope) {
    $scope.chk11 = "wwws";

     
})
//设置多语言
.controller('LunchCtrl',function($scope,$translate){
	$scope.selChange = function(lang){
		$translate.use(lang);
	    window.localStorage.lang = lang;
	    window.location.reload();
	    $scope.cur_lang = $translate.use();
	}
	$scope.cur_lang = $translate.use();
})
.controller('menulistCtr',function($scope,serviceFactory){
	serviceFactory.getMenulist().success(function(response){
		$scope.menudate = response;
		console.log($scope.menudate);
	});
	$scope.toggleTwoMenu = function(id){
		$scope.currentId = id;
	}
})

;
})();
 