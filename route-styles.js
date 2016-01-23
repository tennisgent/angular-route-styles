/**
 * Created by Zack Boman on 1/31/14.
 * http://www.zackboman.com or tennisgent@gmail.com
 */

(function(){
'use strict';

    angular.module('routeStyles', ['ngRoute'])
    
        .directive('head', ['$rootScope','$compile','$interpolate',
            function($rootScope, $compile, $interpolate){
                // this allows for support of custom interpolation symbols
                var startSym = $interpolate.startSymbol(),
                    endSym = $interpolate.endSymbol(),
                    html = ['<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="',startSym,'cssUrl',endSym,'">'].join('');
                return {
                    restrict: 'E',
                    link: function(scope, elem){
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
                                if (current.$$route && current.$$route.css && !angular.isArray(current.$$route.css)) {
                                    current.$$route.css = [current.$$route.css];
                                }
                                angular.forEach(previous.$$route.css, function (sheet) {
                                    if (!current.$$route || !current.$$route.css || current.$$route.css.indexOf(sheet) === -1) {
                                        // Only remove if not also required in the current page.
                                        scope.routeStyles[sheet] = undefined;
                                    }
                                });
                            }
                        });
                    }
                };
            }
        ]);

})();
