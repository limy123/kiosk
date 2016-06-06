(function(){
	'use strict';
	angular.module('myApp')
	.factory('serviceFactory',function($http,configFactory,$cookieStore){
		return {
			formatDateTime : function (date) {  
			    var y = date.getFullYear();  
			    var m = date.getMonth() + 1;  
			    m = m < 10 ? ('0' + m) : m;  
			    var d = date.getDate();  
			    d = d < 10 ? ('0' + d) : d;
			    return y + '-' + m + '-' + d +' 00:00:00';  
			},
			//获取当前日期 ：2016-05-31 16:54:10
			CurentTime : function(){
				var now = new Date();
		        var year = now.getFullYear();       //年
		        var month = now.getMonth() + 1;     //月
		        var day = now.getDate();            //日
		       
		        var hh = now.getHours();            //时
		        var mm = now.getMinutes();          //分
		        var ss = now.getSeconds();
		       
		        var clock = year + "-";
		       
		        if(month < 10)
		            clock += "0";
		       
		        clock += month + "-";
		       
		        if(day < 10)
		            clock += "0";
		           
		        clock += day + " ";
		       
		        if(hh < 10)
		            clock += "0";
		           
		        clock += hh + ":";
		        if (mm < 10) clock += '0'; 
		        clock += mm + ":";
		        
		        if(ss < 10) clock +='0';
		        clock +=ss;


		        return(clock); 
			},
			//获取时间
			getLongTime : function(date1,date2){
				var s1 = date1.getTime(),s2 = date2.getTime();
				var total = (s2 - s1)/1000;

				var day = parseInt(total / (24*60*60));//计算整数天数
				var afterDay = total - day*24*60*60;//取得算出天数后剩余的秒数
				var hour = parseInt(afterDay/(60*60));//计算整数小时数
				var afterHour = total - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
				var min = parseInt(afterHour/60);//计算整数分
				var afterMin = total - day*24*60*60 - hour*60*60 - min*60;//取得算出分后剩余的秒数

				var longTime = day*24+hour + "h " + min + "m" + "|" + total;
				return longTime;
			},
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
				return $http.post(url,paramers);
			},
			getCountry : function(){
				var url = configFactory.apiBaseUrl + "/base/location/getCountry";
				var paramers = {'token' : $cookieStore.get("token")}
				return $http.post(url,paramers, {
	                headers: {
	                    'Accept-Language': 'en_US'
	                }
	            });
			},
			getProvince : function(countryCode){
				var url = configFactory.apiBaseUrl + "/base/location/getProvince";

				var paramers = {
					'countryCode' : countryCode,
					'token' : $cookieStore.get("token")
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
					'provinceCode' : provinceCode,
					'token' : $cookieStore.get("token")
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
				console.log($cookieStore.get("token") + "-----------------");
				console.log(paramers)
				var url = configFactory.apiBaseUrl + "/kiosk/query";
				return $http.post(url,paramers,{
					headers: {
	                    /*'token': */
	                }
				});
			},
			addKiosk : function(paramers){	
				var url = configFactory.apiBaseUrl + "/kiosk/add";
				console.log(paramers);
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
				console.log(url);
				console.log(id)
				return $http.post(url);
			},
			//故障列表//////////////////////
			getBreakDownList : function(paramers){
				var url = configFactory.apiBaseUrl + "/breakDownHistory/query";
				console.log(paramers)
				return $http.post(url,paramers);
			},
			getBreakDownHisList : function(paramers){
				var url = configFactory.apiBaseUrl + "/breakDownHistory/queryHis";
				return $http.post(url,paramers);
			},
			//弹夹/////////////////////////
			addDeviceBox : function(count){
				var url = configFactory.apiBaseUrl + "/deviceBox/create";

				var paramers ={"count" : parseInt(count)};
				console.log(paramers);
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
			},
			upload : function(fileName){
				var url = configFactory.apiBaseUrl + "/deviceBox/batchUpdateSNs";
				return $http.post(url,fileName);
			}

			

		}
	})



})();