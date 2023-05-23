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
            var declObj = {
                "salaire2": 0,
                "autresRevenus": 600,
                "reductionImpot": 500,
              };

            declObj.salaire1 = decl.salaire;
            if (decl.charges === undefined)
            {
                declObj.chargesDeductibles = 0;
            } else {
                declObj.chargesDeductibles = Number(decl.charges);
            }
            declObj.situationMaritale = 0;
            declObj.situationFamiliale = decl.situationFamiliale;
            declObj.nbEnfants = Number(decl.nbEnfants);
            
            console.log("sending request with: ", declObj);

            var targetUrl = ApiPath + '/api/Impot';

            return $http({
                method: 'POST',
                url: targetUrl,
                data: declObj
            }).then(function(response) {
                    console.log("response", response)
                    return response.data;
                });
        }
    }

})();
