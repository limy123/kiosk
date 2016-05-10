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
                //console.log($element.parent('.nav').children('li').html());

                $element.toggleClass('active');
                console.log($(e.target));
                 
            });
        }
    };
})