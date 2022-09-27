'use strict';

app.factory('startOverviewService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var startOverviewService = {
        CheckIsHasSection: function () {
            var deferred = $q.defer();
            $http.post('/DocuSign/CheckIsHasSection').then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        },
        ClearSection : function() {
            var deferred = $q.defer();
            $http.post('/DocuSign/ClearSection').then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return startOverviewService;
}]);