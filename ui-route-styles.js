/**
 * Created by Zack Boman on 1/31/14.
 * UI Router version by Jorick van Hees on 2/27/14.
 * http://www.zackboman.com or tennisgent@gmail.com
 */

(function(){
	'use strict';

    angular.module('routeStyles', ['ui.router'])

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
						$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
							// Remove old styles
							if (fromState && fromState.css) {
								if(!angular.isArray(fromState.css)){
									fromState.css = [fromState.css];
								}
								angular.forEach(fromState.css, function(sheet){
									delete scope.routeStyles[sheet];
								});
							}
							if(fromState && fromState.views){
								angular.forEach(fromState.views, function(view){
									if(view.css){
										if(!angular.isArray(view.css)){
											view.css = [view.css];
										}
										angular.forEach(view.css, function(sheet){
											scope.routeStyles[sheet] = undefined;
										});
									}
								});
							}
							
							// Add new styles
							if(toState && toState.views){
								angular.forEach(toState.views, function(view){
									if(view.css){
										if(!angular.isArray(view.css)){
											view.css = [view.css];
										}
										angular.forEach(view.css, function(sheet){
											scope.routeStyles[sheet] = sheet;
										});
										
									}
								});
							}
							if (toState && toState.css) {
								if(!angular.isArray(toState.css)){
									toState.css = [toState.css];
								}
								angular.forEach(toState.css, function(sheet){
									scope.routeStyles[sheet] = sheet;
								});
							}
						});
					}
				};
			}
		]);

})();
