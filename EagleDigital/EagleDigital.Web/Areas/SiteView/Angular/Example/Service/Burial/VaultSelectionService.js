'use strict';

app.factory('vaultSelectionService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var vaultSelectionService = {
        SaveVaultSelection: function (data) {
            var dataSave = $rootScope.OrderDetail.ConvertDataToSave(data);
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveVaultSelection', JSON.stringify(dataSave)).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return vaultSelectionService;
}]);