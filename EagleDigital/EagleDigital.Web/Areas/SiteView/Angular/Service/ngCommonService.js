'use strict';

app.factory('ngCommonService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

    var ngCommonService = {

        GetListApproveReject : function() {
                var deferred = $q.defer();
                $http.get('/Utl/GetApproveReject').then(function (results) {
                    deferred.resolve(results);
                    return results;
                });
                return deferred.promise;
        },
        GetListTransactionType : function() {
                var deferred = $q.defer();
                $http.get('/Utl/GetAffairTrCodeForm').then(function (results) {
                    deferred.resolve(results);
                    return results;
                });
                return deferred.promise;
        },
        GetAffairCause: function (data) {
            var deferred = $q.defer();
            $http.post('/Utl/GetAffairCause', JSON.stringify(data)).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }

        //GetFilePdf: function (data) {
        //    var deferred = $q.defer();
        //    $http.get('/DocuSign/GenFileGoodsServicesPdf').then(function (results) {
        //        deferred.resolve(results.data);
        //        return results;
        //    });
        //    return deferred.promise;
        //},

        //CallDocusignFormFinalStepComplete3Forms: function (data) {
        //    var deferred = $q.defer();
        //    $http.post('/DocuSign/FinalStepComplete3Forms', JSON.stringify(data)).then(function (results) {
        //        deferred.resolve(results.data);
        //        return results;
        //    });
        //    return deferred.promise;
        //},
        //DownloadGoodsServices_WhenFirstLoad: function (data) {
        //    var deferred = $q.defer();
        //    $http.post('/DocuSign/DownloadGoodsServices_WhenFirstLoad', JSON.stringify(data)).then(function (results) {
        //        deferred.resolve(results.data);
        //        return results;
        //    });
        //    return deferred.promise;
        //},
        //ClearSection: function () {
        //    var deferred = $q.defer();
        //    $http.post('/DocuSign/ClearSection').then(function (results) {
        //        deferred.resolve(results.data);
        //        return results;
        //    });
        //    return deferred.promise;
        //},
        //SendMainCompletedOrder: function (data) {
        //    var deferred = $q.defer();
        //    $http.post('/Email/SendMainCompletedOrder', data).then(function (results) {
        //        deferred.resolve(results.data);
        //        return results;
        //    });
        //    return deferred.promise;
        //},
       
        //CheckIsSignFinalStepComplete3Forms: function () {
        //    var deferred = $q.defer();
        //    $http.post('/DocuSign/CheckIsSignFinalStepComplete3Forms').then(function (results) {
        //        deferred.resolve(results.data);
        //        return results;
        //    });
        //    return deferred.promise;
        //}
    };

    return ngCommonService;
}]);