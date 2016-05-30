'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])
  //弹夹状态
  .filter('clipStatusFilter', function(){
        return function(code){
            var result = code;
            switch(code){
            	case 0 : result = "未占用";break;
            	case 1 : result = "已占用";break;
            }
            return result;
        }
    })
  .filter('deviceType',function(){
    return function(code){
      var result = code;
      switch(code){
        case 1 : result ="3G"; break;
      }
      return result;
    }
  })
  ;
