'use strict';

app.controller("BurialPackageController", ['burialPackageService', '$scope', '$rootScope', '$timeout', function (burialPackageService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 2;

    $scope.BurialLoaded = false;

    $scope.BurialPackage = {
        MaxHeight: 0,
        SetMaxHeight : function() {
            //var maxCount = 0;
            //for (var i = 0; i < $rootScope.OrderDetail.SelectionData.BurialPackages.List.length; i++) {
            //    var countTemp = $rootScope.OrderDetail.SelectionData.BurialPackages.List[i].ListBurialPackageOption.length;
            //    maxCount = countTemp > maxCount ? countTemp : maxCount;
            //}
            //$scope.BurialPackage.MaxHeight = 860 + maxCount * 19;

            var maxHeight = 0;

            if ($(window).width() > 480) {
                $('.burial-col .card').each(function () {
                    var currentHeight = $(this).outerHeight();
                    if (currentHeight > maxHeight) {
                        maxHeight = currentHeight;
                    }
                });
                //$('.burial-col .card').outerHeight(maxHeight);
                $scope.BurialPackage.MaxHeight = maxHeight;
            }
        },
        ValidateFunction: function () {

        },
        ValidateForm: function () {
            return true;
        },
        SelectBurialPackage: function (name, id, price) {
            var oldPackageType = $rootScope.OrderDetail.BurialPackageName;
            var newPackageType = name;
            if (oldPackageType != newPackageType) {
                $rootScope.OrderDetail.Model.IsChangePackageType = true;
            } else {
                $rootScope.OrderDetail.Model.IsChangePackageType = false;
            }

            $rootScope.OrderDetail.Model.BurialPackageId = id;
            $rootScope.OrderDetail.BurialPackagePrice = price;
            $rootScope.OrderDetail.BurialPackageName = name;

            //
            $rootScope.Billing.ClearDataWhenChangeBurialPackage();
            //
            $rootScope.Billing.SettingPacketForBurial();

            if (!$scope.$$phase) $scope.$apply();
            $rootScope.Button.Next();
        },
        SaveBurialPackage : function() {
            if ($scope.BurialPackage.ValidateForm()) {
                $rootScope.OrderDetail.FuntionSave.IsValid = true;
                var data = $rootScope.OrderDetail.Model;
                burialPackageService.SaveBurialPackage(data).then(function (result) {
                    if (result.Status == $rootScope.TextContants.Status.Success) {
                        $rootScope.OrderDetail.Model.Id = result.Data.SectionOrderId;
                        $rootScope.OrderDetail.Model.SectionStep = result.Data.SectionStep;
                    }
                }, function(error) {
                });
            } else {
                $rootScope.OrderDetail.FuntionSave.IsValid = false;
            }
        }
    }



    $scope.$on('$viewContentLoaded', function () {

        $timeout(function () {
            $rootScope.Button.AuthenticationStep();
            $scope.BurialPackage.ValidateFunction();
            $scope.BurialPackage.SetMaxHeight();
            $rootScope.OrderDetail.FuntionSave.SaveStep2 = $scope.BurialPackage.SaveBurialPackage;
        }, $rootScope.TextContants.ConfigTimeoutDefault);

        $timeout(function () {
            $scope.BurialPackage.SetMaxHeight();
            $scope.BurialLoaded = true;
        }, $rootScope.TextContants.ConfigTimeoutBurialPackage);
    });

}])