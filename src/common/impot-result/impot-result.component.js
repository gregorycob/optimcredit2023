(function () {
    "use strict";
    
    angular.module('common')
    .component('impotResult', {
      templateUrl: 'src/common/impot-result/impot-result.html',
      bindings: {
        details: '<',
        numberDisplay: '&'
      }
    });
    
})();
    