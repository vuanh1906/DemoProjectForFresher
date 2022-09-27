'use strict';

app.factory('memorialServiceDataService', ['$http', '$q','$rootScope', function ($http, $q,$rootScope) {
    var memorialServiceDataService = {
        SaveMemorialServiceData: function (data) {
            var dataSave = $rootScope.OrderDetail.ConvertDataToSave(data);
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveMemorialServiceData', JSON.stringify(dataSave)).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return memorialServiceDataService;
}]);