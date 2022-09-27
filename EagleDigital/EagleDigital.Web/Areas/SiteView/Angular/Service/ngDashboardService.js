'use strict';

app.factory('ngDashboardService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var ngDashboardService = {
        GetListNotify: function () {
            var deferred = $q.defer();
            $http.post('/SiteView/Home/GetListNotify').then(function (results) {
                deferred.resolve(results);
                return results;
            });
            return deferred.promise;
        },
        GetListNews: function () {
            var deferred = $q.defer();
            $http.post('/SiteView/Home/GetListNews').then(function (results) {
                deferred.resolve(results);
                return results;
            });
            return deferred.promise;
        },


        SaveItem: function (model) {
            var deferred = $q.defer();
            $http.post('/SiteView/Home/SaveItem', JSON.stringify(model)).then(function (results) {
                deferred.resolve(results);
                return results;
            });
            return deferred.promise;
        },
        Delete: function (id) {
            var deferred = $q.defer();
            $http.post('/SiteView/Home/Delete', { id: id }).then(function (results) {
                deferred.resolve(results);
                return results;
            });
            return deferred.promise;
        }
    };

    return ngDashboardService;

}]);