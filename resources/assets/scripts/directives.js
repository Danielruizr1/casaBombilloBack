angular.module('cbbackend')
	.directive("rzInput",function(){
              return {
                restrict: "E",
                templateUrl : "/templates/rzinput.html",
                scope: {
                    type: "@",
                    float: "@",
                    label: "@",
                    name: "@",
                    id: "@",
                    error: "=",
                    ngRequired: "@",
                    ngModel: "=",
                    list: "@",
                    addOn: "@",
                    addName: "@",
                    addFunc: "="
                },
              }
    })
 .directive("rzTextarea",function(){
              return {
                restrict: "E",
                templateUrl : "/templates/rztextarea.html",
                scope: {
                    maxlength: "@",
                    rows: '@',
                    label: "@",
                    name: "@",
                    id: "@",
                    error: "=",
                    ngRequired: "@",
                    ngModel: "=",
                },
              }
    })
 .directive("rzSelect",function(){
              return {
                restrict: "E",
                templateUrl : "/templates/rzselect.html",
                scope: {
                    label: "@",
                    name: "@",
                    id: "@",
                    error: "=",
                    ngRequired: "@",
                    options: "=",
                    ngModel: "=",
                    filterr: "=",
                    
                },
              }
    });