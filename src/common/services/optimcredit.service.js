(function () {
    "use strict";
        
    angular.module('common')
    .service('OptimCreditAPIService', OptimCreditAPIService);
    
    console.log("load OptimCreditAPIService");
    
    OptimCreditAPIService.$inject = ['$http', 'ApiPath'];
    function OptimCreditAPIService($http, ApiPath) {
        var service = this;

        console.log("init OptimCreditAPIService");

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

        service.getRente = function(decl) {
            var declObj = {};
            declObj.sexe = decl.sexe;
            declObj.yearlyAmount = 1000.0;
            if (decl.indexInflation === true) {
                declObj.yearlyRate = decl.tauxAnnuel - 2.0;
            } else {
                declObj.yearlyRate = decl.tauxAnnuel;
            }
            declObj.age = decl.age;

            console.log("sending request with: ", declObj);

            var targetUrl = ApiPath + '/api/PresentValue';

            return $http({
                method: 'POST',
                url: targetUrl,
                data: declObj
            }).then(function(response) {
                    console.log("http response", response)
                    response.data.renteMensuelle = 1000.0 * decl.capital / response.data.presentValue / 12.0;
                    console.log("rente: ", response.data.renteMensuelle);
                    return response.data;
                });
            
        }

        service.getCapital = function(decl) {
            var declObj = {};
            declObj.sexe = decl.sexe;
            declObj.yearlyAmount = decl.renteMensuelle * 12.0;
            if (decl.indexInflation === true) {
                declObj.yearlyRate = decl.tauxAnnuel - 2.0;
            } else {
                declObj.yearlyRate = decl.tauxAnnuel;
            }
            declObj.age = decl.age;

            console.log("sending request with: ", declObj);

            var targetUrl = ApiPath + '/api/PresentValue';

            return $http({
                method: 'POST',
                url: targetUrl,
                data: declObj
            }).then(function(response) {
                    console.log("http response", response)
                    return response.data;
                });
            
        }

        service.getTauxEndettement = function(obj) {
            var objCopy = JSON.parse(JSON.stringify(obj));
            console.log('getTauxEndettement - sending: ', objCopy);    
            
            var targetUrl = ApiPath + '/api/TauxEndettement';

            return $http({
                method: 'POST',
                url: targetUrl,
                data: objCopy
            }).then(function(response) {
                    console.log("http response", response)
                    return response.data;
                });
        }


        service.arithFactor = function(compoundFactor, nbPeriods) {
            if (compoundFactor == 1.0) {
              return nbPeriods;
            }
            return (Math.pow(compoundFactor, nbPeriods) - 1.0) / (compoundFactor - 1.0);
        }
    
        service.getForwardValue = function(compoundFactor, initialCapital, monthlyPayment, nbYears) {
            var res = {};

            console.log("getForwardValue");
    
            res.numberOfYears = nbYears;
            res.numberOfPeriods = nbYears * 12.0;
            res.initialCapital = initialCapital;
            res.capitalFactor = Math.pow(compoundFactor, res.numberOfPeriods);
            res.arithFactor = service.arithFactor(compoundFactor, res.numberOfPeriods)
            res.capitalEnd = Math.round(
              initialCapital * res.capitalFactor
              +  monthlyPayment * res.arithFactor
            );
            res.epargne = res.numberOfPeriods * monthlyPayment;
            res.interestGains = res.capitalEnd - (res.initialCapital + res.epargne);
    
            return res;
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
