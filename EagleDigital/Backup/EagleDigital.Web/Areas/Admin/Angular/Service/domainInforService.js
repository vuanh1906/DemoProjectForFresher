'use strict';

app.factory('domainInforService', ['$q', '$location', '$http', function ($q, $location, $http) {
    var domainInforService= {};

    domainInforService.Create = function () {
        var deferred = $q.defer();
        return  $http({
            method: 'GET',
            type:"json",
            url: "DomainInfor/Create"
        }).then(function (results) {
            deferred.resolve(results);
            alert(results.Msg);
        } );
    };

    domainInforService.DeleteDomainInfor = function(id) {
        var deferred = $q.defer();
        $http.get('DomainInfor/Delete?id='+id).then(function (results) {
            deferred.resolve(results.data);
            return results.data;
        });
        return deferred.promise;
    };

    domainInforService.DomainInforList = function () {
        var deferred = $q.defer();
        $http.get('DomainInfor/GetListCategory').then(function (results) {
            deferred.resolve(results.data);
            return results.data;
        });
        return deferred.promise;
    };

    return domainInforService;
    
}]);