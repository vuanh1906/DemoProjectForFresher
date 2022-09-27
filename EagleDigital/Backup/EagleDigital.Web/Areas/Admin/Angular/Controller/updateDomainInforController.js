'use strict';

app.controller('updateDomainInforController', ['$scope', '$location', '$q', '$http', 'updateDomainInforService', function ($scope, $location, $q, $http, updateDomainInforService) {
    $scope.model = [];
    $scope.model.Id = $("#hdId").val();
    $scope.domainList = [];
    $scope.tabNameList = [];
 //   $scope.model.Content = '';

    $scope.LoadDataDetails = function () {
        updateDomainInforService.LoadDataDetails($scope.model.Id).then(function (results) {
            $scope.domainList = results.DomainList;
            $scope.model.DomainId = results.Model.DomainId;
            $scope.tabNameList = results.TabNameList;
            $scope.model.TabNameId = results.Model.TabNameId;
         //   $scope.model.Content = results.Model.Content;
            $("#editor").data("kendoEditor").value(results.Model.Content);
        }, function (status) {
        });
    };
    
    $scope.SaveAdd = function () {
        var model = {
            "Id": $scope.model.Id,
            "DomainId": $scope.model.DomainId,
            "Content": $("#editor").data("kendoEditor").value(),
            "TabNameId": $scope.model.TabNameId
        };
        updateDomainInforService.SaveAdd(model).then(function (results) {
            window.location.href = 'Admin/DomainInfor/Index';
        }, function (status) {
        });
    };
    

    $scope.LoadDataDetails();

}]);