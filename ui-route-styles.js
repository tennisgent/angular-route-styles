/**
 * Created by Zack Boman on 1/31/14.
 * UI Router version by Jorick van Hees on 2/27/14.
 * http://www.zackboman.com or tennisgent@gmail.com
 */

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
					$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
						
						// Remove old styles
						if(fromState && fromState.views){
							angular.forEach(fromState.views, function(view){
								if(view.css){
									if(!Array.isArray(view.css)){
										view.css = [view.css];
									}
									angular.forEach(view.css, function(sheet){
										delete scope.routeStyles[sheet];
									});
								}
							});
						}
						
						// Add new styles
						if(toState && toState.views){
							angular.forEach(toState.views, function(view){
								if(view.css){
									if(!Array.isArray(view.css)){
										view.css = [view.css];
									}
									angular.forEach(view.css, function(sheet){
										scope.routeStyles[sheet] = sheet;
									});
									
								}
							});
						}
					});
				}
			};
		}
	]);

})();
