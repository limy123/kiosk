(function(){
	'use strict';
	angular.module('myApp')
	.factory('serviceFactory',function($http,configFactory){
		return {
			getMenulist : function(){
				var url = "json/menu.json";
				/*var url = configFactory.apiBaseUrl + "/auth/getResource";*/
				return $http.get(url);
			},
			getModel :function(){
				var url = configFactory.apiBaseUrl + "";
				return $http.get(url);
				
			},
			loginIn:function(userName,pwd){
				var url = configFactory.apiBaseUrl + "/auth/login";
				var paramers = {
					'userName' : userName,
					'password' : pwd
				}
				console.log(url);
				return $http.post(url,paramers);
			},
			getCountry : function(){
				var url = configFactory.apiBaseUrl + "/base/location/getCountry";
				return $http.post(url, {
	                headers: {
	                    'Accept-Language': 'en_US'
	                }
	            });
			},
			getProvince : function(countryCode){
				var url = configFactory.apiBaseUrl + "/base/location/getProvince";
				var paramers = {
					'countryCode' : countryCode
				}

				return $http.post(url,paramers, {
	                headers: {
	                    'Accept-Language': 'en_US'
	                }
	            });
			},
			getCity : function(provinceCode){
				var url = configFactory.apiBaseUrl + "/base/location/getCity";
				var paramers = {
					'provinceCode' : provinceCode
				}
				return $http.post(url,paramers, {
	                headers: {
	                    'Accept-Language': 'en_US'
	                }
	            });
			},
			getCustomerList : function(){
				var url = configFactory.apiBaseUrl + "/customer/getAll";
				return $http.get(url);
			},
			//柜子/////////////////////////
			getKioskList : function(paramers){
				var url = configFactory.apiBaseUrl + "/kiosk/query";
				return $http.post(url,paramers);
			},
			addKiosk : function(paramers){	
				var url = configFactory.apiBaseUrl + "/kiosk/add";
				return $http.post(url,paramers);
			},
			getkioskDetail : function(id){
				var url = configFactory.apiBaseUrl +"/kiosk/query/" + id;
				return $http.post(url);
			},
			deleteKiosk : function(id){
				var url = configFactory.apiBaseUrl +"/kiosk/disable/" + id;
				return $http.post(url);
			},
			updateKiosk : function(paramers){
				var url = configFactory.apiBaseUrl + "/kiosk/update";
				return $http.post(url,paramers);
			},
			//校验柜子简码是否唯一
			isKioskNo : function(id){
				var url = configFactory.apiBaseUrl + "/kiosk/check/" + id;
				return $http.post(url);
			},
			//故障列表//////////////////////
			getBreakDownList : function(paramers){
				var url = configFactory.apiBaseUrl + "/breakDown/query";
				return $http.post(url,paramers);
			},
			//弹夹/////////////////////////
			addDeviceBox : function(count){
				var url = configFactory.apiBaseUrl + "/deviceBox/create";
				var paramers = parseInt(count);
				return $http.post(url,paramers);
			},
			getDeviceBoxList : function(paramers){
				var url = configFactory.apiBaseUrl + "/deviceBox/query";
				return $http.post(url,paramers);
			},
			addOrUpdateSNs : function(paramers){
				var url = configFactory.apiBaseUrl + "/deviceBox/addOrUpdateSNs";
				 //skych5913uu896d7
				return $http.post(url,paramers);
			},
			delectDeviceBox : function(id){
				var url = configFactory.apiBaseUrl +"/deviceBox/disable/" + id;
				return $http.post(url);
			}
			

		}
	})


})();