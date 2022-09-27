'use strict';

app.controller('createDomainInforController', ['$scope', '$location', '$q', '$http', 'createDomainInforService', function ($scope, $location, $q, $http, createDomainInforService) {
    $scope.model = [];
    $scope.model.Id = 0;
    $scope.domainList = [];
    //$scope.model.domainChoose = '';
    $scope.tabNameList = [];
   //$scope.model.tabNameChoose = '';
    $scope.model.Content = '';

    $scope.LoadDataDetails = function() {
        createDomainInforService.LoadDataDetails().then(function(results) {
            $scope.domainList = results.DomainList;
            $scope.model.DomainId = results.DomainList[0].Id;
            $scope.tabNameList = results.TabNameList;
            $scope.model.TabNameId = results.TabNameList[0].Id;
          //  $scope.model.content = results.data.content;
        },function(status) {
        });
    };


    $scope.SaveAdd = function () {
        var model = {
            "Id":        $scope.model.Id,
            "DomainId" :  $scope.model.DomainId,
         // "Content":   $scope.model.Content
            "Content": $("#editor").data("kendoEditor").value(),
            "TabNameId": $scope.model.TabNameId
        };
        // public int Id { get; set; }
        //public int DomainId { get; set; }
        //public int TabNameId { get; set; }
        //public string Content { get; set; }
        createDomainInforService.SaveAdd(model).then(function (results) {
            ////$scope.model.domainInforList = results.data;
            window.location.href = 'Admin/DomainInfor/Index';
        }, function (status) {
        });
    };
    

   

    $scope.LoadDataDetails();

}]);