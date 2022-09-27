'use strict';

app.factory('casketPreferenceService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var casketPreferenceService = {
        SaveCasketPreference: function (data) {
            var dataSave = $rootScope.OrderDetail.ConvertDataToSave(data);
            var deferred = $q.defer();
            $http.post('/AtNeedOrder/SaveCasketPreference', JSON.stringify(dataSave)).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return casketPreferenceService;
}]);