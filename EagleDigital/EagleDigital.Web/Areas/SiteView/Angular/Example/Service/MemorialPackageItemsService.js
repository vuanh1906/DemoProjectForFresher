'use strict';

app.factory('memorialPackageItemsService', ['$http', '$q', function ($http, $q) {
    var memorialPackageItemsService = {
        SaveMemorialPackageItems: function (data) {
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveMemorialPackageItems', JSON.stringify(data)).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });

            return deferred.promise;
        }
    };
    return memorialPackageItemsService;
}]);