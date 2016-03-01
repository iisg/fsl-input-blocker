angular.module('demo', ['ui.bootstrap', 'ui.bootstrap.tpls', 'fsl.bootstrap.inputblocker'])
.controller('DemoCtrl', function($scope) {
  $scope.selected = undefined;
  $scope.browsers = [
    {name: 'Safari', icon: 'safari', address: 'https://en.wikipedia.org/wiki/Safari_(web_browser)'},
    {name: 'Chrome', icon: 'chrome', address: 'https://en.wikipedia.org/wiki/Google_Chrome'},
    {name: 'Firefox', icon: 'firefox', address: 'https://en.wikipedia.org/wiki/Firefox'},
    {name: 'Opera', icon: 'opera', address: 'https://en.wikipedia.org/wiki/Opera_(web_browser)'},
    {name: 'Internet Explorer', icon:'internet-explorer', address: 'https://en.wikipedia.org/wiki/Internet_Explorer'}
  ];
})
