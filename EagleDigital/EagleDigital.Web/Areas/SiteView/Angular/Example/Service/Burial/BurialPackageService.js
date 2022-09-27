'use strict';

app.factory('burialPackageService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var burialPackageService = {
        SaveBurialPackage: function (data) {
            var dataSave = $rootScope.OrderDetail.ConvertDataToSave(data);
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveBurialPackage', dataSave).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return burialPackageService;
}])