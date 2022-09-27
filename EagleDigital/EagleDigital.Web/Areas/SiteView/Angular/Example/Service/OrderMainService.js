'use strict';

app.factory('orderMainService', ['$http', '$q', function ($http, $q) {
    var orderMainService = {
        GetSelectionData : function() {
            var deferred = $q.defer();
            $http.get('/AtNeedOrder/GetSelectionData').then(function(results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        },
        //GetSelectionData: function () {
        //    var resultValue;
        //    $.ajax({
        //        async: false,
        //        url : "/AtNeedOrder/GetSelectionData",
        //        type: "POST",
        //        dataType: "json",
        //        success: function (results) {
        //            resultValue = results;
        //        }
        //    });
        //    return resultValue;
        //}
        GetOrderDetails : function() {
            var deferred = $q.defer();
            $http.get('/AtNeedOrder/GetOrderDetails').then(function (results) {
                deferred.resolve(results.data);
                return results;
            });
            return deferred.promise;
        }
    };
    return orderMainService;
}]);