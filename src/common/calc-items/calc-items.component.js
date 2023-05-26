(function () {
    "use strict";
    
    angular.module('common')
    .component('calcItems', {
      templateUrl: 'src/common/calc-items/calc-items.html',
      bindings: {
        details: '<',
        numberDisplay: '&'
      }
    });
    
})();
    