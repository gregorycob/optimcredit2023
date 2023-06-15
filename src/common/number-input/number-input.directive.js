(function () {    
    angular.module('common')
    .directive('numberInput', numberInputDirective);

    console.log("init number-input directive");

    numberInputDirective.$inject = ['$filter'];
    function numberInputDirective($filter) {
        return {
          require: 'ngModel',
          link: function(scope, elem, attrs, ngModelCtrl) {
      
            ngModelCtrl.$formatters.push(function(modelValue) {
                return setDisplayNumber(modelValue, true);
            });
      
            ngModelCtrl.$parsers.push(function(viewValue) {
                throw new Error('directive only for read-only input fields');
            });
      
            function setDisplayNumber(val, formatter) {
                return $filter('number')(val, 0);
            }

          }
        };
    };    
})();