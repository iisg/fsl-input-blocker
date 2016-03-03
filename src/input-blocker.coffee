angular.module('fslab.inputblocker', []).directive 'fslabInputBlocker', ($compile, $timeout) ->
  inputBlockerTemplate = """
<span class="form-control input-blocker" readonly>
  <span ng-if='!inputBlocker'>
    {{viewValue()}}
  </span>
  <span ng-if="inputBlocker"
    ng-include='inputBlocker'>
  </span>
  <div class="input-blocker-button text-danger"
    ng-click="clearModel()"
    ng-keypress='clearModel()'
    tabindex="0">
    <span class="fa fa-fw fa-edit"></span>
  </div>
</span>
"""
  require: 'ngModel'
  scope:
    value: '=ngModel'
    inputBlocker: '@fslabInputBlocker'
  link: (scope, element, attrs, ngModel) ->
    element.addClass('has-input-blocker')
    inputBlocker = $compile(inputBlockerTemplate)(scope)
    element.after(inputBlocker)
    inputBlockerButton = angular.element(inputBlocker[0].querySelector(".input-blocker-button"))
    element.bind 'blur', ->
      $timeout ->
        inputBlockerButton[0].focus()
      , 200 # give it some time before setting focus, hence other directives may try to focus back on original element
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
