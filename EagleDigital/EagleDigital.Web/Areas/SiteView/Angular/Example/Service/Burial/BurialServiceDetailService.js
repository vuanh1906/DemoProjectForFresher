'use strict';

app.factory('burialServiceDetailService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
   var burialServiceDetailService = {
        SaveBurialServiceDetail: function (data) {
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveBurialServiceDetail', JSON.stringify(data)).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return burialServiceDetailService;
}])