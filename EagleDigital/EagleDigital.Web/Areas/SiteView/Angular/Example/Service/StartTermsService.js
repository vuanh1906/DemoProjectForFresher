'use strict';

app.factory('startTermsService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var startTermsService = {
        SaveStartTerms: function (data) {
            var dataSave = $rootScope.OrderDetail.ConvertDataToSave(data);
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveStartTerms', dataSave).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        },
        SendMailCreateOrder: function (data) {
            var deferred = $q.defer();
            $http.post('/Email/SendMailCreateOrder', data).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return startTermsService;
}]);