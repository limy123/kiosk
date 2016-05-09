(function(){
	'use strict';
	angular.module('myApp')
	.factory('serviceFactory',function($http){
		return {
			getMenulist : function(){
				var url = "json/menu.json";
				return $http.get(url);
			},
			getModel :function(){

			}
		}
	})


})();