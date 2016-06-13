'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('layout',{
            url:'/layout',
            templateUrl:'view/common/layout.html'
        })
        .state(
        	'layout.equipmentList', 
        	{  
                url:'/equipmentList',
                views : {
                    'content' : {
                        templateUrl:'view/equipment/equipment_list.html', 
                        controller: "equipmentListCtrl"
                    }
                }
        		
        	})
        .state(
        	'layout.equipmentAdd', 
        	{
                url:'/equipmentAdd',
                views : {
                    'content' : {
                        templateUrl:'view/equipment/equipment_add.html', 
                        controller: "equipmentAddCtrl"
                    }
                }
        		
        	})
        .state(
            'layout.equipmentEdit',
            {
                url : '/equipmentEdit/:id',
                views : {
                    'content' : {
                        templateUrl : 'view/equipment/equipment_edit.html',
                        controller: "equipmentEditCtrl"
                    }
                }
                
            })
        .state(
        	'layout.equipmentDetail',
        	{  
                url:'/detail/:id',
                views : {
                    'content' : {
                        templateUrl:'view/equipment/equipment_detail.html',
                        controller:"equipmentDetailCtrl"
                    }
                }
        		
        	})
        .state(
            'layout.maps',
            {  
                url:'/maps',
                views:{
                    'content':{
                        templateUrl:'view/equipment/map.html',
                        controller:"mapsCtrl"
                    }
                }
                
            })
        .state(
            'layout.faultList',
            {  
                url:'/faultList',
                views:{
                    'content':{
                        templateUrl:'view/faultManagement/faultList.html',
                        controller:"faultListCtrl"
                    }
                }
                
            })
        .state(
            'layout.historyRecord',
            {  
                url:'/historyRecord',
                views:{
                    'content':{
                        templateUrl:'view/faultManagement/historyRecord.html',
                        controller:"historyRecordCtrl"
                    }
                }
                
            })
        .state(
            'layout.clipAdd',
            {  
                url:'/clipAdd',
                views :{
                    'content':{
                        templateUrl:'view/clipManagement/clipAdd.html',
                        controller:"clipAddCtrl"
                    }
                }
                
            })
        .state(
            'layout.clipList',
            {  
                url:'/clipList',
                views:{
                    'content':{
                        templateUrl:'view/clipManagement/clipList.html',
                        controller:"clipListCtrl"
                    }
                }
                
            })
        .state(
            'layout.editSN',
            {  
                url:'/editSN/:code/:type',
                views:{
                    'content':{
                        templateUrl:'view/clipManagement/editSN.html',
                        controller:"editSNCtrl"
                    }
                }
                
            })
        .state(
            'layout.clipsin',
            {  
                url:'/clipsin',
                views:{
                    'content':{
                        templateUrl:'view/clipManagement/clipsIn.html',
                        controller:"clipsinCtrl"
                    }
                }
                
            })
        .state(
            'layout.diagram',
            {  
                url:'/diagram',
                views : {
                    'content':{
                        templateUrl:'view/clipManagement/diagram.html',
                        controller:"diagramCtrl"
                    }
                }
                
            })
        .state(
            'layout.orderList',
            {  
                url:'/orderList',
                views:{
                    'content':{
                        templateUrl:'view/orderManagement/orderList.html',
                        controller:"orderListCtrl"
                    }
                }
                
            })
        .state(
            'layout.returnDepositList',
            {  
                url:'/returnDepositList',
                views:{
                    'content':{
                        templateUrl:'view/orderManagement/returnDeposit.html',
                        controller:"returnDepositCtrl"
                    }
                }
                
            })
        .state(
            'layout.dates',
            {  
                url:'/dates',
                views:{
                    'content':{
                        templateUrl:'view/dateStatistics/dates.html',
                        controller:"datesCtrl"
                    }
                }
                
            }) 

        .state(
            'login', 
            {  
                url:'/login',
                templateUrl:'view/login/login.html', 
                controller: "loginCtrl"
            });
    
    $urlRouterProvider.otherwise(
    	'layout/equipmentList'
    );
  });
