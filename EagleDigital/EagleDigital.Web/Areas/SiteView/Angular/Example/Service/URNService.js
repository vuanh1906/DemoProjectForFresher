'use strict';

app.factory('uRnService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var uRnService = {
        SaveURN: function (data) {
            var dataSave = $rootScope.OrderDetail.ConvertDataToSave(data);
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveURN', JSON.stringify(dataSave)).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return uRnService;
}]);