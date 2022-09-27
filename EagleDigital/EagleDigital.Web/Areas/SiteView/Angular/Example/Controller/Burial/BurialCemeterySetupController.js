'use strict';

app.controller("BurialCemeterySetupController", ['burialCemeterySetupService', '$scope', '$rootScope', '$timeout', function (burialCemeterySetupService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 6;

    $scope.BurialCemeterySetup = {
        ValidateFunction: function () {

        },
        ValidateForm: function () {
            return true;
        },
        SelectPackage : function(id) {
            for (var i = 0; i < $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List.length; i++) {
                if ($rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List[i].Id != id) {
                    $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List[i].IsCheck = false;
                }
            }
        },
        SaveBurialCemeterySetup : function() {
            if ($scope.BurialCemeterySetup.ValidateForm()) {
                $rootScope.OrderDetail.FuntionSave.IsValid = true;
                var data = {};
                data.OrderId = $rootScope.OrderDetail.Model.Id;
                data.Step = $rootScope.OrderDetail.Model.Step;
                data.BurialMemorialPackages = $rootScope.OrderDetail.SelectionData.BurialMemorialPackages.List;
                data.BurialMemorialPackageItems = $rootScope.OrderDetail.SelectionData.BurialMemorialPackageItems.List;

                burialCemeterySetupService.SaveBurialCemeterySetup(data).then(function (result) {
                    if (result.Status == $rootScope.TextContants.Status.Success) {
                        $rootScope.OrderDetail.Model.Id = result.Data.SectionOrderId;
                        $rootScope.OrderDetail.Model.SectionStep = result.Data.SectionStep;
                    }
                }, function (error) {
                });
            } else {
                $rootScope.OrderDetail.FuntionSave.IsValid = false;
            }
        }



    //    SaveMemorialPackageItems: function () {
    //    if ($scope.MemorialPackageItems.ValidateForm()) {
    //        $rootScope.OrderDetail.FuntionSave.IsValid = true;
    //        var data = {};
    //        data.OrderId = $rootScope.OrderDetail.Model.Id;
    //        data.Step = $rootScope.OrderDetail.Model.Step;

    //        data.MemorialPackageItems = [];
    //        data.MemorialPackages = [];
                
    //        for (var i = 0; i < $rootScope.OrderDetail.SelectionData.MemorialPackage.List.length; i++) {
    //            if ($rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].CountPackageItem == 0 && $rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].IsCheck) {
    //                var itemO = $rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].Id;
    //                data.MemorialPackages.push(itemO);
    //            } else {
    //                if ($rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].MemorialPackageItemSelect != '' && $rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].IsCheck) {
    //                    var item = $rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].MemorialPackageItemSelect;
    //                    data.MemorialPackageItems.push(item);
    //                }
    //            }
    //        }

    //        memorialPackageItemsService.SaveMemorialPackageItems(data).then(function (result) {
    //            if (result.Status == $rootScope.TextContants.Status.Success) {
    //                $rootScope.OrderDetail.Model.Id = result.Data.SectionOrderId;
    //                $rootScope.OrderDetail.Model.SectionStep = result.Data.SectionStep;
    //            }
    //        }, function (error) {
    //        });
    //    } else {
    //        $rootScope.OrderDetail.FuntionSave.IsValid = false;
    //    }
    //}




    }


    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            //// check valid step when F5 or submit link not valid.
            $rootScope.Button.AuthenticationStep();

            $scope.BurialCemeterySetup.ValidateFunction();
            $rootScope.OrderDetail.FuntionSave.SaveStep6 = $scope.BurialCemeterySetup.SaveBurialCemeterySetup;

            $('select').material_select();
            Materialize.updateTextFields();
        }, $rootScope.TextContants.ConfigTimeoutDefault);


        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);


    });


}])