'use strict';

app.controller("MemorialPackageItemsController", ['memorialPackageItemsService', '$scope', '$rootScope', '$timeout', function (memorialPackageItemsService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 3;
    

    $scope.IsSubmitForm = false;

    $scope.MemorialPackageItems = {
        ValidateFunction: function () {
            $.validator.addMethod("Selection", function (value, element) {
                return value.Id.trim() != "0";
            }, "This field is required.");

            var rules = {
                Selection: {
                    required: true
                }
            }

            var frmMemorialPackageItems = $('.frmMemorialPackageItems');
            var errorHandlerMemorialPackageItems = $('.errorHandlerMemorialPackageItems', frmMemorialPackageItems);
            frmMemorialPackageItems.validate({
                rules: rules,
                submitHandler: function (form) {
                    errorHandlerMemorialPackageItems.hide();
                },
                invalidHandler: function (event, validator) {
                    errorHandlerMemorialPackageItems.show();
                },
                validateOnInit: true
            });
            errorHandlerMemorialPackageItems.hide();
        },
        ValidateForm: function () {
            if (!$("#frmMemorialPackageItems").valid()) {
                return false;
            }
            return true;
        },
        SaveMemorialPackageItems: function () {
            if ($scope.MemorialPackageItems.ValidateForm()) {
                $rootScope.IsSaveDone = false;
                $rootScope.OrderDetail.FuntionSave.IsValid = true;
                var data = {};
                data.OrderId = $rootScope.OrderDetail.Model.Id;
                data.Step = $rootScope.OrderDetail.Model.Step;
                data.MemorialPackageItems = [];
                data.MemorialPackages = [];
                for (var i = 0; i < $rootScope.OrderDetail.SelectionData.MemorialPackage.List.length; i++) {
                    if ($rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].CountPackageItem == 0 && $rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].IsCheck) {
                        var itemO = $rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].Id;
                        data.MemorialPackages.push(itemO);
                    } else {
                        if ($rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].MemorialPackageItemSelect != '' && $rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].IsCheck) {
                            var item = $rootScope.OrderDetail.SelectionData.MemorialPackage.List[i].MemorialPackageItemSelect;
                            data.MemorialPackageItems.push(item);
                        }
                    }
                }
                memorialPackageItemsService.SaveMemorialPackageItems(data).then(function (result) {
                    if (result.Status == $rootScope.TextContants.Status.Success) {
                        $rootScope.OrderDetail.Model.Id = result.Data.SectionOrderId;
                        $rootScope.OrderDetail.Model.SectionStep = result.Data.SectionStep;
                    }
                    $rootScope.IsSaveDone = true;
                }, function (error) {
                    $rootScope.IsSaveDone = true;
                });
            } else {
                $rootScope.OrderDetail.FuntionSave.IsValid = false;
            }
        }
    }


    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            //// check valid step when F5 or submit link not valid.
            $rootScope.Button.AuthenticationStep();

            $scope.MemorialPackageItems.ValidateFunction();
            $rootScope.OrderDetail.FuntionSave.SaveStep3 = $scope.MemorialPackageItems.SaveMemorialPackageItems;

            $('select').material_select();
        },$rootScope.TextContants.ConfigTimeoutDefault);

        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);


    });

}]);