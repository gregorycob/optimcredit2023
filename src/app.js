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

    calcCtrl.declSubmitted = JSON.parse(JSON.stringify(calcCtrl.decl));
    console.log('cloned form: ', calcCtrl.declSubmitted);
    calcCtrl.completed = true;

    var impotResultPromise = ImpotService.getImpot(calcCtrl.declSubmitted);
    impotResultPromise.then(function(responseObj) {
      console.log("copying object to ctrl: ", responseObj);
      calcCtrl.response = responseObj;
    })
  };
}

})();
