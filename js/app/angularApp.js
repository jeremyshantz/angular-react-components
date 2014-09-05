(function () {
    'use strict';

    var app = angular.module("demo", []);

    // a factory to wrap the call to window.FormData
    app.factory('FormData', [function () {

        var data = window.FormData;

        return {
            get: function get(name) {
                return data.find(function (item) { return item.name === name; });
            }
        };
    }]);

    app.directive('outer', function () {
        return {
            restrict: 'E',
            scope: {},
            transclude: true,
            controller: ['$scope', function ($scope) {

                this.scope = $scope; // expose scope to inner directive

            }],
            template: '<div ng-show="model.visible" class="jumbotron"><h4>Wrapper for {{model.name}} </h4><div ng-transclude></div></div>'
        };
    });

    app.directive('inner', [ 'FormData', function (data) {
        return {
            restrict: 'E',
            scope: {},
            require: '?^outer',
            template: '<div class="well"><h5>Implementation of {{model.message}}</h5>' +
                '<label></label><input type="checkbox" ng-model="model.visible" /> Show</label>'
                +'</div>',
            compile: function compile(tElement, tAttrs, transclude) {

                var model = data.get(tAttrs.name);

                return {
                    pre: function preLink(scope, element, attrs) {

                        scope.model = model;
                    },

                    post: function postLink(scope, element, attrs, parent) {

                        if (parent && parent.scope) {
                            parent.scope.model = model; // attach model to parent scope
                        }
                    }
                }
            }
        };
    }]);

}());