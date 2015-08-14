/**
 * Created by Zack Boman on 1/31/14.
 * http://www.zackboman.com or tennisgent@gmail.com
 */

'use strict';

(function(){

    var mod = angular.module('routeStyles', ['ngRoute']);

    mod.directive('head', ['$rootScope','$compile',
        function($rootScope, $compile){
            return {
                restrict: 'E',
                link: function(scope, elem){
                    var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" >';
                    elem.append($compile(html)(scope));
                    scope.routeStyles = {};
                    $rootScope.$on('$routeChangeStart', function (e, next) {
                        if(next && next.$$route && next.$$route.css){
                            if(!angular.isArray(next.$$route.css)){
                                next.$$route.css = [next.$$route.css];
                            }
                            angular.forEach(next.$$route.css, function(sheet){
                                scope.routeStyles[sheet] = sheet;
                            });
                        }
                    });
                    $rootScope.$on('$routeChangeSuccess', function(e, current, previous) {
                        if (previous && previous.$$route && previous.$$route.css) {
                            if (!angular.isArray(previous.$$route.css)) {
                                previous.$$route.css = [previous.$$route.css];
                            }
                            angular.forEach(previous.$$route.css, function (sheet) {
                                scope.routeStyles[sheet] = undefined;
                            });
                        }
                    });
                }
            };
        }
    ]);

})();
