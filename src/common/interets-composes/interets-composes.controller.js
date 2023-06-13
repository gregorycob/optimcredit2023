(function () {    
    angular.module('common')
    .controller('CalculInteretsComposesController', CalculInteretsComposesController);
    
    console.log("load CalculInteretsComposesController");
    
    CalculInteretsComposesController.$inject = ['$scope', '$filter','OptimCreditAPIService'];
    function CalculInteretsComposesController($scope, $filter, OptimCreditAPIService) {
      var calcCtrl = this;
    
      console.log("init CalculInteretsComposesController");
    
      calcCtrl.ic = {
        tauxAnnuel: 3.05,
        capital: 45000,
        indexInflation: false,
        epargneMensuelle: 450.0,
      }
    
      calcCtrl.arrondi = function(x) {
        return Math.round(x);
      }
    
      console.log("default value done");
    
      calcCtrl.calculForward = function() {
        var monthlyCompound = Math.pow(1 + (calcCtrl.ic.tauxAnnuel / 100.0), 1.0/12.0) ;

        calcCtrl.resultats = {};

        calcCtrl.resultats.r5y = OptimCreditAPIService.getForwardValue(monthlyCompound, calcCtrl.ic.capital, calcCtrl.ic.epargneMensuelle,   5.0);
        calcCtrl.resultats.r10y = OptimCreditAPIService.getForwardValue(monthlyCompound, calcCtrl.ic.capital, calcCtrl.ic.epargneMensuelle, 10.0);
        calcCtrl.resultats.r15y = OptimCreditAPIService.getForwardValue(monthlyCompound, calcCtrl.ic.capital, calcCtrl.ic.epargneMensuelle, 15.0);
        calcCtrl.resultats.r20y = OptimCreditAPIService.getForwardValue(monthlyCompound, calcCtrl.ic.capital, calcCtrl.ic.epargneMensuelle, 20.0);
      }

      calcCtrl.displayNombre = function(x) {
        var nbStr = $filter('number')(x, 0);
        return nbStr;
      }


    calcCtrl.calculForward();
    }
    
    })();
    