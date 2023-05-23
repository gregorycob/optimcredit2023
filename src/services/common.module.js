(function() {
    "use strict";
    
    angular.module('common', [])
    .constant('ApiPath', 'https://gc-impots-freetry.azurewebsites.net')
    .config(config);
    
    console.log("load common module");

    config.$inject = ['$httpProvider'];
    function config($httpProvider) {
      // $httpProvider.interceptors.push('loadingHttpInterceptor');
    }
    
    })();
    