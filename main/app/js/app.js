'use strict';

var result_code = "6";
var myOtherModal = "";
angular.module('myApp', [
  'myApp.filters', 
  'ui.router',
  'pascalprecht.translate',
  'ngSanitize',
  'ui.bootstrap',
  'ngAnimate',
  'mgcrea.ngStrap',
  'mgcrea.ngStrap.alert',
  'ngFileUpload',
  'ngCookies'
  ])
 
  
   

  /*设置多语言*/
  .config(['$translateProvider',function($translateProvider){
        var lang = window.localStorage.lang || 'cn';
           $translateProvider.preferredLanguage(lang);
           $translateProvider.useStaticFilesLoader({
            prefix: '/app/i18n/',
            suffix:'.json'
         });
    }])
  .factory('configFactory',function(){
    return{
      apiBaseUrl:"http://192.168.14.35:9090/kop-rim/web",
      //apiBaseUrl : "http://192.168.12.12:9090/kop-rim/web",
       
    }
  })

  
  /*.config(['$httpProvider',function ($httpProvider) {
	    $httpProvider.interceptors.push('UserInterceptor');
	}])*/
  ;
