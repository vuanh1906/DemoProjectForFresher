'use strict';

app.factory('burialOptionService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var burialOptionService = {
        SaveBurialOption: function (data) {
            var dataSave = $rootScope.OrderDetail.ConvertDataToSave(data);
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveBurialOption', dataSave).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return burialOptionService;
}]);