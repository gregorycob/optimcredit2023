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
        investissements: [
          {
            loyer: 650,
            credit: 450
          }
        ]
      }
    
      calcCtrl.arrondi = function(x) {
        return Math.round(x);
      }
    
      console.log("default value done");
    
      calcCtrl.submit = function () {
        var impotResultPromise = OptimCreditAPIService.getTauxEndettement(calcCtrl.decl);
        impotResultPromise.then(function(responseObj) {
          // calcCtrl.scenarios = responseObj; // this will not work - cannot use array of object with ng-repeat
          console.log("copying response as array of object into a list");
          var scenarioList = [];
          for(var o in responseObj.scenarios) {
            scenarioList.push(responseObj.scenarios[o]);
          }
          calcCtrl.scenarios = scenarioList;
          console.log("calcCtrl.scenarios is now: ", calcCtrl.scenarios);
        })
      };

      calcCtrl.displayNombre = function(x) {
        var nbStr = $filter('number')(x, 0);
        return nbStr;
      }
    }
    
    })();
    