'use strict';

 
angular.module('myApp', [
  'myApp.filters', 
  'ui.router',
  'pascalprecht.translate',
  'ngSanitize',
  'ui.bootstrap',
  'ngAnimate',
  'mgcrea.ngStrap',
  'mgcrea.ngStrap.alert'
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
  
  /*.config(['$httpProvider',function ($httpProvider) {
	    $httpProvider.interceptors.push('UserInterceptor');
	}])*/
  ;
