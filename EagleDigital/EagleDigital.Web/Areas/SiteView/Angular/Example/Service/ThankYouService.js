'use strict';

app.factory('thankYouService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var thankYouService = {
        SaveThankYou: function (data) {
            var dataSave = $rootScope.OrderDetail.ConvertDataToSave(data);

            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveThankYou', JSON.stringify(dataSave)).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return thankYouService;
}]);