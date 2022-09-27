'use strict';

app.factory('pickupRemainsService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var pickupRemainsService = {
        SavePickupRemains: function (data) {
            var dataSave = $rootScope.OrderDetail.ConvertDataToSave(data);
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SavePickupRemains', dataSave).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return pickupRemainsService;
}]);