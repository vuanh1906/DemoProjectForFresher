'use strict';

app.factory('updateDomainInforService', ['$q', '$location', '$http', function ($q, $location, $http) {
    var domainInforService = {};
    
    domainInforService.LoadDataDetails = function (id) {
        var deferred = $q.defer();
        $http.get('GetModelForUpdate?id=' + id).then(function (results) {
            deferred.resolve(results.data);
            return results.data;
        });
        return deferred.promise;
    };
    

    domainInforService.SaveAdd = function (model) {
        var deferred = $q.defer();

        $http.post('Update', model).then(function (results) {
            deferred.resolve(results);
            return results;
        });
        return deferred.promise;
    };

    return domainInforService;
    


}]);
