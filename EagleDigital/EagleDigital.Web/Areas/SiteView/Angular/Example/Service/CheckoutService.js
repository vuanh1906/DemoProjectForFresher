'use strict';

app.factory('checkoutService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var checkoutService = {
        SaveCheckout : function(data) {
            var deferred = $q.defer();
                    $http.post('/Checkout/SaveCheckout', JSON.stringify(data)).then(function (results) {
                        deferred.resolve(results.data);
                        return results;
                    });
           return deferred.promise;
        }
        //SaveCheckout: function (data) {
        //    var returnValue;
        //    $.ajax({
        //        type: 'POST',
        //        async: false,
        //        contentType: 'application/json; charset=utf-8',
        //        url: '/Checkout/SaveCheckout',
        //        data: JSON.stringify(data),
        //        success: function (result) {
        //            returnValue= result;
        //        }
        //    });
        //    return returnValue;
        //}

    }

    return checkoutService;
}]);