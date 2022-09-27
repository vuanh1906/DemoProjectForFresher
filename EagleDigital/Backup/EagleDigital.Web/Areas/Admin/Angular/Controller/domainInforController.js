'use strict';

app.controller('domainInforController', ['$scope','$location', '$q', '$http', 'domainInforService', function ($scope,$location, $q, $http, domainInforService) {
    $scope.model = [];
    $scope.model.domainInforList = [];
    
    $scope.ClickSearch = function() {
        $scope.Create();
    };


    $scope.Create = function () {
        //$.ajax({
        //    type: 'GET',
        //    contentType: 'application/json; charset=utf-8',
        //    url: 'DomainInfor/Create',
        //    success: function (data) {
        //        //$scope.model.domainInforList = data.data;
        //        //$scope.$apply();
        //    }
        //});
        
        window.location.href = 'Admin/DomainInfor/Create';
        //domainInforService.Create().
        //    then(function(results) {
        //        //this callback will be called asynchronously when the response is available
        //        //$scope.model.supplierList = results.data;
        //        ////Done with AJAX loading
        //        //$scope.model.isAjaxInProgress = false;
        //    }, function(status) {
        //        ////If an error occurs, returns response with an error status.
        //        //$scope.model.errorMessage = "Error occurred status:" + status;
        //        ////Done with AJAX loading
        //        //$scope.model.isAjaxInProgress = false;

        //    });
    };
    

    $scope.EditDomainInfor = function(id) {
        window.location.href = 'Admin/DomainInfor/Update?id='+id;
    };

    $scope.RemoveDomainInfor = function (id) {
        domainInforService.DeleteDomainInfor(id).then(function (results) {
            if(results.Status=="OK") {
                location.reload();
            }
          //  $scope.model.domainInforList = results.data;
        }, function (status) {
        });
    };
   
    $scope.LoadListDataDomainInfor = function () {
        domainInforService.DomainInforList().then(function (results) {
            $scope.model.domainInforList = results.data;
        },function (status) {
        });
        

        //$.ajax({
        //    type: 'GET',
        //    contentType: 'application/json; charset=utf-8',
        //    url: 'DomainInfor/GetListCategory',
        //    success: function (data) {
        //        $scope.model.domainInforList = data.data;
        //        $scope.$apply();
        //    }
        //});
    };
    
    $scope.LoadListDataDomainInfor();

}]);