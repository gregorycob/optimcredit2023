(function () {
    "use strict";
        
    angular.module('common')
    .service('ImpotService', ImpotService);
    
    console.log("load ImpotService");
    
    ImpotService.$inject = ['$http', 'ApiPath'];
    function ImpotService($http, ApiPath) {
        var service = this;

        console.log("init ImpotService");

        service.getImpot = function(decl) {

            // default values
            var declObj = {};

            //declObj.salaire2 = 0;
            //declObj.autresRevenus = 0;
            //declObj.reductionImpot = 0;

            // clean data prep
            declObj.salaire1 = service.numberOrZero(decl.salaire);
            declObj.nbEnfants = service.numberOrZero(decl.nbEnfants);
            declObj.chargesDeductibles = service.numberOrZero(decl.charges);
            declObj.situationFamiliale = decl.situationFamiliale;
            declObj.gardeAlternee = decl.gardeAlternee;
                        
            console.log("sending request with: ", declObj);

            var targetUrl = ApiPath + '/api/Impot';

            return $http({
                method: 'POST',
                url: targetUrl,
                data: declObj
            }).then(function(response) {
                    console.log("http response", response)
                    return response.data;
                });
        }

        service.numberOrZero = function(obj) {
            if (obj === undefined)
                return 0;
            else if (obj === null)
                return 0;
            else
                return Number(obj);
        }
    }

})();
