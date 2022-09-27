'use strict';

app.factory('burialCemeterySetupService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {


    var burialCemeterySetupService = {
        SaveBurialCemeterySetup: function (data) {
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveBurialCemeterySetup', JSON.stringify(data)).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });

            return deferred.promise;
        }
    };
    return burialCemeterySetupService;

}])