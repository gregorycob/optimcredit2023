(function () {

angular.module('SimpleFormsApp',[]);

angular.module('SimpleFormsApp')
.controller('CalculationController', CalculationController);

CalculationController.$inject = ['$scope'];
function CalculationController($scope) {
  var calcCtrl = this;

  console.log("init Controller");

  calcCtrl.decl = {
    salaire: 24000,
    nbEnfants: '2',
    gardeAlternee: false
  };

  calcCtrl.arrondi = function(x) {
    return Math.round(x);
  }

  console.log("default value done");

  calcCtrl.submit = function () {
    console.log("submit click");
    console.log('reg', calcCtrl);
    console.log('$scope.decl', $scope.decl);
    calcCtrl.declSubmitted = JSON.parse(JSON.stringify(calcCtrl.decl));
    console.log('declSubmitted', calcCtrl.declSubmitted);
    calcCtrl.completed = true;
  };
}

})();
