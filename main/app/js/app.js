'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'ui.router','pascalprecht.translate','ui.bootstrap'])
   

  /*设置多语言*/
  .config(['$translateProvider',function($translateProvider){
        var lang = window.localStorage.lang || 'cn';
           $translateProvider.preferredLanguage(lang);
           $translateProvider.useStaticFilesLoader({
            prefix: '/app/i18n/',
            suffix:'.json'
         });
    }]);
