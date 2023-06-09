(function () {

angular.module('App', ['common'])
.config(config);

console.log("load app module");

config.$inject = ['$urlRouterProvider', '$stateProvider'];
function config($urlRouterProvider, $stateProvider) {
    
    console.log("load app config");

    // If user goes to a path that doesn't exist, redirect to public root
  $urlRouterProvider.otherwise('/calcul-impot-sur-les-revenus');

  $stateProvider
  .state('impot', {
    url: '/calcul-impot-sur-les-revenus',
    templateUrl: 'src/common/calcul-impot/calcul-impot.html',
    controller: 'CalculImpotController',
    controllerAs: 'calcCtrl'
  })
  .state('mentionslegales', {
    url: '/mentions-legales',
    templateUrl: 'src/common/mentions-legales.html'
  })
  .state('renteViagere', {
    url: '/rente-viagere',
    templateUrl: 'src/common/rente-viagere/rente-viagere.html',
    controller: 'CalculRenteViagereController',
    controllerAs: 'calcCtrl'
  })
  .state('tauxEndettement', {
    url: '/taux-endettement',
    templateUrl: 'src/common/taux-endettement/taux-endettement.html',
    controller: 'CalculTauxEndettementController',
    controllerAs: 'calcCtrl'
  });

}

})();
