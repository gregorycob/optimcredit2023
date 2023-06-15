(function () {
    "use strict";

    angular.module('common')
    .component('capitalResult', {
      templateUrl: 'src/common/capital-result/capital-result.html',
      bindings: {
        calcResult: '<'
      }
    });
    
})();
    