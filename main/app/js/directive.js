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
        templateUrl: '',
        replace: true,
        link: function (scope, element, attrs) {
            scope.$watch('totalPages', function (value) {
                scope.pages = [];
                if(value == 0) return;
                //value :获取页面的数据条数
                for (var i = 1; i <= value; i++) {
                    scope.pages.push(i);
                }
                
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
})
//上传组件 有bug
.directive("fileread", [function () {
    return {
        restrict: 'EA',
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}])
//排序升降箭头
.directive("descDir", [function () {
    return {
        restrict: 'EA',
        link: function (scope, element, attributes) {
            element.bind("click", function (event) {
                $(element).parents('th').siblings().find('i').removeClass('font-color');
                $(element).siblings('i').removeClass('font-color');
                $(element).addClass("font-color");
            });
        }
    }
}])
//上传组件
.directive("fileUpload", function (configFactory) {
    return {
        restrict: 'EA',
        scope: {
             
        },
        templateUrl : 'view/template/upload.html',
        link: function (scope, element, attributes) {
            $(element).find('#uploadForm').click(function(event) {
                var formData = new FormData();
                var dfile = $(element).find('#file')[0].files[0];
                if(dfile == "" || dfile == null){
                    alert("请选择文件");
                    /*$alert({
                        title: '', 
                        content: '请选择文件', 
                        placement: 'top', 
                        container:'#uploadModel',
                        type: 'info', 
                        duration:'2',
                        show: true
                    })*/
                    return false;
                }
                var _xlsx = dfile.name.substr(dfile.name.lastIndexOf(".")).toLowerCase();//获得文件后缀名
               
               if(_xlsx !=".xlsx" && _xlsx !=".xlsx"){
                    alert("请上传excel文件!");
                    return false;
                }
                var _cookies = $(element).find('#token').val(cookies);
                formData.append('file', dfile);
                formData.append('token',_cookies);
                console.log(cookies);
                $.ajax({
                    url : configFactory.apiBaseUrl + "/deviceBox/batchUpdateSNs",
                    //url: 'http://192.168.14.35:9090/kop-rim/web/deviceBox/batchUpdateSNs',
                    type: 'POST',
                    cache: false,
                    data: formData,
                    processData: false,
                    contentType: false,

                }).done(function(res) {
                    console.log(res)
                    if(res.code == "-1"){
                        $(element).find('.error').text(res.message)
                    }else{
                         
                        myOtherModal.$promise.then(myOtherModal.hide);//隐藏modal

                        var result = eval("(" + res.message + ")");
                       
                        swal({   
                            title: "",   
                            text: "操作结果:"+ result.msg +",是否需要下载本次操作结果？",   
                            type: "warning",   
                            showCancelButton: true,   
                            confirmButtonColor: "#DD6B55",   
                            confirmButtonText: "取消",   
                            cancelButtonText: "下载",   
                            closeOnConfirm: false,  
                            loseOnCancel: false 
                        }, 
                        function(isConfirm){   
                            if (isConfirm) {    
                                location.reload();
                            } else {     
                                //下载
                                //var _url = "http://192.168.14.35:9090/kop-rim"+result.url;
                                var _url = configFactory.apiBaseUrl+result.url;
                                window.location = _url;
                            }
                    });
                }
                }).fail(function(res) {});
 
  
            });
        }
    }
})
;