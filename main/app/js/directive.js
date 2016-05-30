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
})
//分页
.directive('paging', function () {
    return {
        restrict: 'E',
        //scope: {
        //    numPages: '=',
        //    currentPage: '=',
        //    onSelectPage: '&'
        //},
        template: '',
        replace: true,
        link: function (scope, element, attrs) {
            scope.$watch('totalPages', function (value) {
                scope.pages = [];
                //value :获取页面的数据条数
                for (var i = 1; i <= value; i++) {
                    scope.pages.push(i);
                }
                console.log(scope.currentPage)
                if (scope.currentPage > value) {
                    scope.selectPage(value);
                }
            });
            scope.isActive = function (page) {
                return scope.currentPage === page;
            };
            scope.selectPage = function (page) {
                if (!scope.isActive(page)) {
                    scope.currentPage = page;
                    scope.onSelectPage(page);
                }
            };
            scope.selectPrevious = function () {
                if (!scope.noPrevious()) {
                    scope.selectPage(scope.currentPage - 1);
                }
            };
            scope.selectNext = function () {
                if (!scope.noNext()) {
                    scope.selectPage(scope.currentPage + 1);
                }
            };
            scope.noPrevious = function () {
                return scope.currentPage == 1;
            };
            scope.noNext = function () {
                return scope.currentPage == scope.numPages;
            };
 
        }
    };
});