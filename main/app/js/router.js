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
    	});


    $stateProvider.state(
        'faultList',
        {  
            url:'/faultList',
            templateUrl:'view/faultMangement/faultList.html',
            controller:"faultListCtrl"
        });
    $stateProvider.state(
        'historyRecord',
        {  
            url:'/historyRecord',
            templateUrl:'view/faultMangement/historyRecord.html',
            controller:"historyRecordCtrl"
        });
    $stateProvider.state(
        'clipAdd',
        {  
            url:'/clipAdd',
            templateUrl:'view/clipManagement/clipAdd.html',
            controller:"clipAddCtrl"
        });
    $stateProvider.state(
        'clipList',
        {  
            url:'/clipList',
            templateUrl:'view/clipManagement/clipList.html',
            controller:"clipListCtrl"
        });
    $stateProvider.state(
        'diagram',
        {  
            url:'/diagram',
            templateUrl:'view/clipManagement/diagram.html',
            controller:"diagramCtrl"
        });
    $stateProvider.state(
        'orderList',
        {  
            url:'/orderList',
            templateUrl:'view/orderMangement/orderList.html',
            controller:"orderListCtrl"
        });
    $stateProvider.state(
        'returnDepositList',
        {  
            url:'/orderList',
            templateUrl:'view/orderMangement/returnDeposit.html',
            controller:"returnDepositCtrl"
        });
    $stateProvider.state(
        'dates',
        {  
            url:'/dates',
            templateUrl:'view/dateStatistics/dates.html',
            controller:"datesCtrl"
        });




    $stateProvider.state(
        'login', 
        {  
            url:'/login',
            templateUrl:'view/login/login.html', 
            controller: "loginCtrl"
        });
    $urlRouterProvider.otherwise(
    	  '/equipmentList'
    );
  });
