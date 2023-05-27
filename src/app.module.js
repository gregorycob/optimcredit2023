(function () {

angular.module('App', ['common'])
.config(config);

console.log("load app module");

config.$inject = ['$urlRouterProvider', '$stateProvider'];
function config($urlRouterProvider, $stateProvider) {
    
    console.log("load app config");

    // If user goes to a path that doesn't exist, redirect to public root
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('public', {
    url: '/',
    templateUrl: 'src/common/calcul-impot/calcul-impot.html',
    controller: 'CalculImpotController',
    controllerAs: 'calcCtrl'
  });

}

})();
