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
  //故障类别
  .filter('faultType',function(){
      return function(code){
        var result = parseInt(code);
        switch(result){
          case 1 : result = "银行卡读卡器正常";break;
          case 2 : result = "银行卡读卡器故障";break;
          case 3 : result = "银行卡读卡器离线";break;

          case 4 : result = "加密键盘正常";break;
          case 5 : result = "加密键盘故障";break;
          case 6 : result = "加密键盘离线";break;

          case 7 : result = "内部标签阅读器正常";break;
          case 8 : result = "内部标签阅读器故障";break;
          case 9 : result = "内部标签阅读器离线";break;

          case 10 : result = "外部标签阅读器正常";break;
          case 11 : result = "外部标签阅读器故障";break;
          case 12 : result = "外部标签阅读器离线";break;

          case 13 : result = "出货设备推货装置正常";break;
          case 14 : result = "出货设备推货装置故障";break;
          case 15 : result = "出货设备推货装置离线";break;

          case 16 : result = "出货设备传动装置正常";break;
          case 17 : result = "出货设备传动装置故障";break;
          case 18 : result = "出货设备传动装置离线";break;

          case 19 : result = "出货设备前门装置正常";break;
          case 20 : result = "出货设备前门装置故障";break;
          case 21 : result = "出货设备前门装置离线";break;

          case 22 : result = "出货设备回收门装置正常";break;
          case 23 : result = "出货设备回收门装置故障";break;
          case 24 : result = "出货设备回收门装置离线";break;

          case 25 : result = "打印机正常";break;
          case 26 : result = "打印机故障";break;
          case 27 : result = "打印机缺纸";break;

          case 28 : result = "扫描枪正常";break;
          case 29 : result = "扫描枪故障";break;

          case 30 : result = "机具状态正常";break;
          case 31 : result = "机具状态离线";break;
        }
        return result;
      }
  })

  ;
