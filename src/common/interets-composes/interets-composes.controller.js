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
    
      calcCtrl.arithFactor = function(compoundFactor, nbPeriods) {
        if (compoundFactor == 1.0) {
          return nbPeriods;
        }
        return (Math.pow(compoundFactor, nbPeriods) - 1.0) / (compoundFactor - 1.0);
      }

      calcCtrl.getForecast = function(compoundFactor, initialCapital, monthlyPayment, nbYears) {
        var res = {};

        res.numberOfYears = nbYears;
        res.numberOfPeriods = nbYears * 12.0;
        res.initialCapital = initialCapital;
        res.capitalFactor = Math.pow(compoundFactor, res.numberOfPeriods);
        res.arithFactor = calcCtrl.arithFactor(compoundFactor, res.numberOfPeriods)
        res.capitalEnd = Math.round(
          calcCtrl.ic.capital * res.capitalFactor
          +  monthlyPayment * res.arithFactor
        );
        res.epargne = res.numberOfPeriods * monthlyPayment;
        res.interestGains = res.capitalEnd - (res.initialCapital + res.epargne);

        return res;
      }

      calcCtrl.calculForward = function() {
        var monthlyCompound = Math.pow(1 + (calcCtrl.ic.tauxAnnuel / 100.0), 1.0/12.0) ;

        calcCtrl.resultats = {};

        calcCtrl.resultats.r5y = calcCtrl.getForecast(monthlyCompound, calcCtrl.ic.capital, calcCtrl.ic.epargneMensuelle,   5.0);
        calcCtrl.resultats.r10y = calcCtrl.getForecast(monthlyCompound, calcCtrl.ic.capital, calcCtrl.ic.epargneMensuelle, 10.0);
        calcCtrl.resultats.r15y = calcCtrl.getForecast(monthlyCompound, calcCtrl.ic.capital, calcCtrl.ic.epargneMensuelle, 15.0);
        calcCtrl.resultats.r20y = calcCtrl.getForecast(monthlyCompound, calcCtrl.ic.capital, calcCtrl.ic.epargneMensuelle, 20.0);

      }

      calcCtrl.displayNombre = function(x) {
        var nbStr = $filter('number')(x, 0);
        return nbStr;
      }


    calcCtrl.calculForward();
    }
    
    })();
    