'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'ngRoute','pascalprecht.translate']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: "myCtrl1"});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: "myCtrl2"});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }])

  /*设置多语言*/
  .config(['$translateProvider',function($translateProvider){
        var lang = window.localStorage.lang || 'cn';
           $translateProvider.preferredLanguage(lang);
           $translateProvider.useStaticFilesLoader({
            prefix: '/app/i18n/',
            suffix:'.json'
         });
    }]);
