(function () {    
    angular.module('common')
    .controller('CalculRenteViagereController', CalculRenteViagereController);
    
    console.log("load CalculRenteViagere controller");
    
    CalculRenteViagereController.$inject = ['$scope', '$filter','ImpotService'];
    function CalculRenteViagereController($scope, $filter, ImpotService) {
      var calcCtrl = this;
    
      console.log("init CalculRenteViagere RController");
    
      calcCtrl.rente = {
        age: 62,
        capital: 80000,
        indexInflation: true,
        tauxAnnuel: 3.3,
        renteMensuelle: 369.0,
        sexe: "Homme"
      }
    
      calcCtrl.arrondi = function(x) {
        return Math.round(x);
      }
    
      console.log("default value done");
    
      calcCtrl.recalcRente = function () {
        var impotResultPromise = ImpotService.getRente(calcCtrl.rente);
        impotResultPromise.then(function(responseObj) {
          console.log("copying object to ctrl");
          calcCtrl.rente.renteMensuelle = Math.round(responseObj.renteMensuelle);
        })
      };

      calcCtrl.recalcCapital = function () {
        var impotResultPromise = ImpotService.getCapital(calcCtrl.rente);
        impotResultPromise.then(function(responseObj) {
          console.log("copying object to ctrl");
          calcCtrl.rente.capital = Math.round(responseObj.presentValue);
        })
      };

      calcCtrl.displayNombre = function(x) {
        var nbStr = $filter('number')(x, 0);
        return nbStr;
      }
    }
    
    })();
    