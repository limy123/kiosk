'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp')
  .config(function($routeProvider) {
    $routeProvider.when('/equipmentList', {templateUrl: 'view/equipment/equipment_list.html', controller: "equipmentListCtrl"});
    $routeProvider.when('/equipmentAdd', {templateUrl: 'view/equipment/equipment_add.html', controller: "equipmentAddCtrl"});
    $routeProvider.otherwise({redirectTo: '/equipmentList'});
  });
