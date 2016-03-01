angular.module('fslab.inputblocker', []).directive 'fslabInputBlocker', ($compile) ->
  inputBlocker = """
<span
  class="form-control input-blocker"
  disabled="disabled">
  <span ng-if='!inputBlocker'>
    {{viewValue()}}
  </span>
  <span ng-if="inputBlocker"
    ng-include='inputBlocker'>
  </span>
  <div class="input-blocker-button text-danger"
    ng-click="clearModel()">
    <span class="fa fa-edit"></span>
  </div>
</span>
"""
  require: 'ngModel'
  scope:
    value: '=ngModel'
    inputBlocker: '@fslabInputBlocker'
  link: (scope, element, attrs, ngModel) ->
    element.addClass('has-input-blocker')
    element.after($compile(inputBlocker)(scope))
    scope.viewValue = () ->
      ngModel.$viewValue
    scope.clearModel = () ->
      ngModel.$setViewValue(null)
      ngModel.$render()
      element[0].focus()

    render = ngModel.$render
    ngModel.$render = () ->
      element.toggleClass('input-blocker-active', !!ngModel.$modelValue)
      render()