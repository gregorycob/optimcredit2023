(function () {    
    angular.module('common')
    .controller('CalculTauxEndettementController', CalculTauxEndettementController);
    
    console.log("load CalculTauxEndettementController");
    
    CalculTauxEndettementController.$inject = ['$scope', '$filter','OptimCreditAPIService'];
    function CalculTauxEndettementController($scope, $filter, OptimCreditAPIService) {
      var calcCtrl = this;
    
      console.log("init CalculTauxEndettementController");
    
      calcCtrl.decl = {
        revenus: {
          salaires: 6000,
        },
        charges: {
          creditsDepenses: 500
        },
        investissements: {
          loyers: 500,
          credits: 500
        }
      }
    
      calcCtrl.arrondi = function(x) {
        return Math.round(x);
      }
    
      console.log("default value done");
    
      calcCtrl.recalcRente = function () {
        var impotResultPromise = OptimCreditAPIService.getRente(calcCtrl.rente);
        impotResultPromise.then(function(responseObj) {
          console.log("copying object to ctrl");
          calcCtrl.rente.renteMensuelle = Math.round(responseObj.renteMensuelle);
        })
      };

      calcCtrl.recalcCapital = function () {
        var impotResultPromise = OptimCreditAPIService.getCapital(calcCtrl.rente);
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
    