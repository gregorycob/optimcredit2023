(function () {    
    angular.module('common')
    .controller('CalculCreditController', CalculCreditController);
    
    console.log("load CalculCreditController");
    
    CalculCreditController.$inject = ['$scope', '$filter','OptimCreditAPIService'];
    function CalculCreditController($scope, $filter, OptimCreditAPIService) {
      var calcCtrl = this;
    
      console.log("init CalculCreditController");
    
      calcCtrl.credit = {
        tauxAnnuel : 3.3,
        mensualite : 1200,
        duree : 20,
        tauxAssurance : 0.44,
        modeTauxAssurance : "tauxMoyen"
      }
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
    
      calcCtrl.calculMontant = function() {

        //var monthlyCompound = Math.pow(1 + (calcCtrl.credit.tauxAnnuel / 100.0), 1.0/12.0) ;
        var monthlyCompound = 1.0 + calcCtrl.credit.tauxAnnuel / 100.0 / 12.0 ; // taux bancaire linéaire
        var monthlyAssurance = calcCtrl.credit.tauxAssurance / 12.0;
        var nbOfPeriods = calcCtrl.credit.duree * 12.0;

        var m = OptimCreditAPIService.getMontantCredit(monthlyCompound, calcCtrl.credit.mensualite, nbOfPeriods, monthlyAssurance);

        calcCtrl.credit.montant = Math.round(m);

        calcCtrl.credit.mensualiteStr = Math.min(calcCtrl.credit.mensualite, 5000);
      }

      calcCtrl.changeMensualiteBySlider = function() {
        calcCtrl.credit.mensualite = parseInt(calcCtrl.credit.mensualiteStr);
        calcCtrl.calculMontant();
      }

      calcCtrl.displayNombre = function(x) {
        var nbStr = $filter('number')(x, 0);
        return nbStr;
      }


    calcCtrl.calculMontant();
    }
    
    })();
    