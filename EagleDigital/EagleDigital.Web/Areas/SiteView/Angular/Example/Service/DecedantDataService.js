'use strict';

app.factory('decedantDataService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var decedantDataService = {
        SaveDecedantData: function (data) {
            var dataSave = $rootScope.OrderDetail.ConvertDataToSave(data);
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveDecedantData', JSON.stringify(dataSave)).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return decedantDataService;
}]);