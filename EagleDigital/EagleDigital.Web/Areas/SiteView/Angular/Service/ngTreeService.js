'use strict';

app.factory('ngTreeService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var ngTreeService = {
        GetAllTree: function () {
            var deferred = $q.defer();
            $http.post('/SiteView/Home/GetAllTree').then(function (results) {
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
            $http.post('/SiteView/Home/Delete', { id: id}).then(function (results) {
                deferred.resolve(results);
                return results;
            });
            return deferred.promise;
        }
        //,
        //SearchListItemCOD: function (keyword, trCode) {
        //    var deferred = $q.defer();
        //    var model = {
        //        Keyword: keyword,
        //        TrCode: trCode
        //    }
        //    $http.post('/ManageAffairs/GetItemInfo', JSON.stringify(model)).then(function (results) {
        //        deferred.resolve(results);
        //        return results;
        //    });
        //    return deferred.promise;
        //},
        //SearchListItem_Successed : function() {
        //    var deferred = $q.defer();
        //    $http.post('/ManageAffairs/SearchListItem_Successed').then(function (results) {
        //        deferred.resolve(results);
        //        return results;
        //    });
        //    return deferred.promise;
        //},
        //SubmitAffair: function (data) {
        //    var deferred = $q.defer();
        //    $http.post('/ManageAffairs/SubmitAffair', JSON.stringify(data)).then(function (results) {
        //        deferred.resolve(results);
        //        return results;
        //    });
        //    return deferred.promise;
        //}

    };

    return ngTreeService;

}]);