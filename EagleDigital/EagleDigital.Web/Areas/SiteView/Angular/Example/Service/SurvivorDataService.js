'use strict';

app.factory('survivorDataService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var survivorDataService = {
        SaveSurvivorData: function (data) {
            var dataSave = $rootScope.OrderDetail.ConvertDataToSave(data);
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveSurvivorData', JSON.stringify(dataSave)).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return survivorDataService;
}]);