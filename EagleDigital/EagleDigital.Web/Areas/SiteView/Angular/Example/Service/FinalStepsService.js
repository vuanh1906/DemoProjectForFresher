'use strict';

app.factory('finalStepsService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {


    var finalStepsService = {
        GetFilePdf : function(data) {
            var deferred = $q.defer();
            $http.get('/DocuSign/GenFileGoodsServicesPdf').then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        },

        //CallDocusignGoodsServices: function (data) {
        //    var deferred = $q.defer();
        //    $http.post('/DocuSign/DocusignGoodsServices', JSON.stringify(data)).then(function (results) {
        //        deferred.resolve(results.data);
        //        return results;
        //    });
        //    return deferred.promise;
        //},
        //CallDocusignFormLegal: function (data) {
        //    var deferred = $q.defer();
        //    $http.post('/DocuSign/LegalNext', JSON.stringify(data)).then(function (results) {
        //        deferred.resolve(results.data);
        //        return results;
        //    });
        //    return deferred.promise;
        //},
        //CallDocusignFormCremation : function(data) {
        //    var deferred = $q.defer();
        //    $http.post('/DocuSign/Cremation', JSON.stringify(data)).then(function (results) {
        //        deferred.resolve(results.data);
        //        return results;
        //    });
        //    return deferred.promise;
        //},

        CallDocusignFormFinalStepComplete3Forms: function (data) {
                var deferred = $q.defer();
                $http.post('/DocuSign/FinalStepComplete3Forms', JSON.stringify(data)).then(function (results) {
                    deferred.resolve(results.data);
                    return results;
                });
                return deferred.promise;
        },
        DownloadGoodsServices_WhenFirstLoad: function (data) {
            var deferred = $q.defer();
            $http.post('/DocuSign/DownloadGoodsServices_WhenFirstLoad', JSON.stringify(data)).then(function (results) {
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
        },
        SendMainCompletedOrder: function (data) {
            var deferred = $q.defer();
            $http.post('/Email/SendMainCompletedOrder', JSON.stringify(data)).then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        },
        //CheckIsSignLegalNext : function() {
        //    var deferred = $q.defer();
        //    $http.post('/DocuSign/CheckIsSignLegalNext').then(function (results) {
        //        deferred.resolve(results.data);
        //        return results;
        //    });
        //    return deferred.promise;
        //},
        //CheckIsSignGoodsServices: function () {
        //    var deferred = $q.defer();
        //    $http.post('/DocuSign/CheckIsSignGoodsServices').then(function (results) {
        //        deferred.resolve(results.data);
        //        return results;
        //    });
        //    return deferred.promise;
        //},
        //CheckIsSignCremation  : function() {
        //    var deferred = $q.defer();
        //    $http.post('/DocuSign/CheckIsSignCremation').then(function (results) {
        //        deferred.resolve(results.data);
        //        return results;
        //    });
        //    return deferred.promise;
        //}

        CheckIsSignFinalStepComplete3Forms : function() {
                var deferred = $q.defer();
                $http.post('/DocuSign/CheckIsSignFinalStepComplete3Forms').then(function (results) {
                    deferred.resolve(results.data);
                    return results;
                });
                return deferred.promise;
        }

    };

    return finalStepsService;
}]);