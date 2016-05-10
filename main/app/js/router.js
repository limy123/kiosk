'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state(
    	'equipmentList', 
    	{  
            url:'/equipmentList',
    		templateUrl:'view/equipment/equipment_list.html', 
    		controller: "equipmentListCtrl"
    	});
    $stateProvider.state(
    	'equipmentAdd', 
    	{
            url:'/equipmentAdd',
    		templateUrl:'view/equipment/equipment_add.html', 
    		controller: "equipmentAddCtrl"
    	});
    $stateProvider.state(
    	'equipmentDetail',
    	{  
            url:'/detail/:id',
    		templateUrl:'view/equipment/equipment_detail.html',
    		controller:"equipmentDetailCtrl"
    	}
    	);
    $urlRouterProvider.otherwise(
    	  '/equipmentList'
    );
  });
