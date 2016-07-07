'use strict';

var result_code = "10";//登录已过期或未登录
var myOtherModal = "";//上传文件弹出框
var cookies = "";
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
     // apiBaseUrl:"http://192.168.14.42:9090/kop-rim/web",
      apiBaseUrl:"http://192.168.10.88:9090/kop-rim/web",
      //apiBaseUrl : "http://192.168.12.12:9090/kop-rim/web",


    }
  })
  
  
 
  ;

 