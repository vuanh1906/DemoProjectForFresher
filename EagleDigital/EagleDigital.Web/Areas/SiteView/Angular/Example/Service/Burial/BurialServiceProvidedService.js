'use strict';

app.factory('burialServiceProvidedService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
  var burialServiceProvidedService = {
        SaveBurialServiceProvided: function (data) {
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveBurialServiceProvided', JSON.stringify(data)).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return burialServiceProvidedService;
}])