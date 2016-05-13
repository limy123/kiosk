'use strict';

angular.module('myApp')
.directive('toggleClass', function(){
    return {
        restrict: 'EA',
        scope: {
            toggleClass: '@'
        },
        link: function($scope, $element){
            $element.children('.auto').on('click', function(e){
                $element.siblings().removeClass('active');
                $element.toggleClass('active');
                //console.log($(e.target));
            });
        }
    };
})
//日期控件
.directive('myDatepicker',function(){
    return{
        restrict: "EA",
         
        scope:{
            start:'=start',
            end : '=end'
        },
        template:'<input id="tostart" class="Wdate" ng-model="start" type="text" ' +
        ' onFocus="var toend=$dp.$(\'toend\');WdatePicker({onpicked:function(){toend.focus();$(this).trigger(\'change\')   },maxDate:$(\'#toend\').val()  })"/>'+
        '至<input id="toend" onchange="" ng-model="end" class="Wdate" type="text" '+
        ' onFocus="WdatePicker({minDate:$(\'#tostart\').val() })"/>'
         
    };
    /*return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            minDate: '@',
        },
        link: function (scope, element, attr, ngModel) {
            element.val(ngModel.$viewValue);
            function onpicking(dp) {
                var date = dp.cal.getNewDateStr();
                scope.$apply(function () {
                    ngModel.$setViewValue(date);
                });
            }
            element.bind('click', function () {
                WdatePicker({
                    onpicking: onpicking,
                    dateFmt: 'yyyy-MM-dd',
                    minDate: (scope.minDate || '%y-%M-%d'),
                })
            });
        }
    };*/
        
        
})