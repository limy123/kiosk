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
  .filter('breakStatu',function(){
    return function(code){
      var result = code;
      switch(code){
        case 0 : result = "正常";break;
        case 1 : result = "离线";break;
        case 2 : result = "维修中";break;
        case 3 : result = "故障";break;
        
      }
      return result;
      /*RUNNING("0","正常"),
      OFFLINE("1","离线"),
      REPAIR("2","维修"),
      FAULT("3","故障");*/
    }
  })

  ;
