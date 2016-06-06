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
        'equipmentEdit',
        {
            url : '/equipmentEdit/:id',
            templateUrl : 'view/equipment/equipment_edit.html',
            controller: "equipmentEditCtrl"
        });
    $stateProvider.state(
    	'equipmentDetail',
    	{  
            url:'/detail/:id',
    		templateUrl:'view/equipment/equipment_detail.html',
    		controller:"equipmentDetailCtrl"
    	});
    
    $stateProvider.state(
        'maps',
        {  
            url:'/maps',
            templateUrl:'view/equipment/map.html',
            controller:"mapsCtrl"
        });


    $stateProvider.state(
        'faultList',
        {  
            url:'/faultList',
            templateUrl:'view/faultManagement/faultList.html',
            controller:"faultListCtrl"
        });
    $stateProvider.state(
        'historyRecord',
        {  
            url:'/historyRecord',
            templateUrl:'view/faultManagement/historyRecord.html',
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
        'editSN',
        {  
            url:'/editSN/:code',
            templateUrl:'view/clipManagement/editSN.html',
            controller:"editSNCtrl"
        });
    $stateProvider.state(
        'clipsin',
        {  
            url:'/clipsin',
            templateUrl:'view/clipManagement/clipsIn.html',
            controller:"clipsinCtrl"
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
            templateUrl:'view/orderManagement/orderList.html',
            controller:"orderListCtrl"
        });
    $stateProvider.state(
        'returnDepositList',
        {  
            url:'/returnDepositList',
            templateUrl:'view/orderManagement/returnDeposit.html',
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
