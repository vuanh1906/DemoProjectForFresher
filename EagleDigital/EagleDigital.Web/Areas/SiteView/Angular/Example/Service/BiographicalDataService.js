'use strict';

app.factory('biographicalDataService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var biographicalDataService = {
        SaveBiographicalData: function (data) {
            var dataSave = $rootScope.OrderDetail.ConvertDataToSave(data);
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveBiographicalData', JSON.stringify(dataSave)).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return biographicalDataService;
}]);