angular.module('fsl.bootstrap.inputblocker', []).directive('fslInputBlocker', ["$compile", function($compile) {
  var inputBlocker;
  inputBlocker = "<span\n  class=\"form-control input-blocker\"\n  disabled=\"disabled\">\n  <span ng-if='!inputBlocker'>\n    {{viewValue()}}\n  </span>\n  <span ng-if=\"inputBlocker\"\n    ng-include='inputBlocker'>\n  </span>\n  <div class=\"input-blocker-button text-danger\"\n    ng-click=\"clearModel()\">\n    <span class=\"fa fa-edit\"></span>\n  </div>\n</span>";
  return {
    require: 'ngModel',
    scope: {
      value: '=ngModel',
      inputBlocker: '@fslInputBlocker'
    },
    link: function(scope, element, attrs, ngModel) {
      var render;
      element.addClass('has-input-blocker');
      element.after($compile(inputBlocker)(scope));
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
