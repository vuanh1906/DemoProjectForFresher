'use strict';

app.factory('createDomainInforService', ['$q', '$location', '$http', function($q, $location, $http) {
    var domainInforService = {};

    domainInforService.LoadDataDetails = function () {
        var deferred = $q.defer();
        $http.get('GetModelForCreate').then(function(results) {
            deferred.resolve(results.data);
            return results.data;
        });
        return deferred.promise;
    };

    domainInforService.SaveAdd = function (model) {
        var deferred = $q.defer();
        
        $http.post('Create',model).then(function (results) {
            deferred.resolve(results);
            return results;
        });
        return deferred.promise;
    };

    return domainInforService;

}]);