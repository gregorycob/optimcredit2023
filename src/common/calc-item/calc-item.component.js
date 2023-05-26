(function () {
    "use strict";
    
    angular.module('common')
    .component('calcItem', {
      templateUrl: 'src/common/calc-item/calc-item.html',
      bindings: {
        details: '<',
        numberDisplay: '&'
      }
    });
    
})();
    