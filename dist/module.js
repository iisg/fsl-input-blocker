angular.module('fslab.inputblocker', []).directive('fslabInputBlocker', ["$compile", "$timeout", function($compile, $timeout) {
  var inputBlockerTemplate;
  inputBlockerTemplate = "<span class=\"form-control input-blocker\" readonly>\n  <span ng-if='!inputBlocker'>\n    {{viewValue()}}\n  </span>\n  <span ng-if=\"inputBlocker\"\n    ng-include='inputBlocker'>\n  </span>\n  <div class=\"input-blocker-button text-danger\"\n    ng-click=\"clearModel()\"\n    ng-keypress='clearModel()'\n    tabindex=\"0\">\n    <span class=\"fa fa-fw fa-edit\"></span>\n  </div>\n</span>";
  return {
    require: 'ngModel',
    scope: {
      value: '=ngModel',
      inputBlocker: '@fslabInputBlocker'
    },
    link: function(scope, element, attrs, ngModel) {
      var inputBlocker, inputBlockerButton, render;
      element.addClass('has-input-blocker');
      inputBlocker = $compile(inputBlockerTemplate)(scope);
      element.after(inputBlocker);
      inputBlockerButton = angular.element(inputBlocker[0].querySelector(".input-blocker-button"));
      element.bind('blur', function() {
        return $timeout(function() {
          return inputBlockerButton[0].focus();
        }, 200);
      });
      scope.viewValue = function() {
        return ngModel.$viewValue;
      };
      scope.clearModel = function() {
        ngModel.$setViewValue(null);
        ngModel.$render();
        return element[0].focus();
      };
      render = ngModel.$render;
      return ngModel.$render = function() {
        element.toggleClass('input-blocker-active', !!ngModel.$modelValue);
        return render();
      };
    }
  };
}]);
