(function () {

angular.module('SimpleFormsApp', ['common']);

angular.module('SimpleFormsApp')
.controller('CalculationController', CalculationController);

console.log("load app module");

CalculationController.$inject = ['$scope', 'ImpotService'];
function CalculationController($scope, ImpotService) {
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
    calcCtrl.response = undefined;
    
    console.log("submit click");
    console.log('reg', calcCtrl);
    console.log('$scope.decl', calcCtrl.decl);
    calcCtrl.declSubmitted = JSON.parse(JSON.stringify(calcCtrl.decl));
    console.log('declSubmitted', calcCtrl.declSubmitted);
    calcCtrl.completed = true;

    var impotResultPromise = ImpotService.getImpot(calcCtrl.declSubmitted);
    impotResultPromise.then(function(responseObj) {
      console.log("ctrl to process response", responseObj);
      calcCtrl.response = responseObj;
    })
  };
}

})();
