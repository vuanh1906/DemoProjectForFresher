'use strict';

app.controller("PickupRemainsController", ['pickupRemainsService', '$scope', '$rootScope', '$timeout', function (pickupRemainsService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 5;
    

    $scope.PickupRemains = {
        ValidateFunction: function () {
          
            var rules = {
            }

            var messages = {
            }

            var frmPickupRemains = $('.frmPickupRemains');
            frmPickupRemains.validate({
                errorElement: 'div',
                rules: rules,
                messages:messages,
                submitHandler: function (form) {
                },
                invalidHandler: function (event, validator) {
                },
                validateOnInit: true
            });
        },
        ValidateForm: function () {
            if (!$("#frmPickupRemains").valid()) {
                return false;
            }
            return true;
        },
        SavePickupRemains: function () {
            $scope.PickupRemains.ValidateFunction();
            if ($scope.PickupRemains.ValidateForm()) {
                $rootScope.OrderDetail.FuntionSave.IsValid = true;
                $rootScope.OrderDetail.Model.PickupRemainId = $rootScope.OrderDetail.SelectionData.PickupRemain.Choose.Id;
                $rootScope.OrderDetail.Model.RecipientRemains_CountryId = $rootScope.OrderDetail.SelectionData.Country_RecipientRemains.Choose.Id;
                var data = $rootScope.OrderDetail.Model;

                pickupRemainsService.SavePickupRemains(data).then(function (result) {
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
    }

    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            //// check valid step when F5 or submit link not valid.
            $rootScope.Button.AuthenticationStep();

            $rootScope.OrderDetail.FuntionSave.SaveStep5 = $scope.PickupRemains.SavePickupRemains;
            $('.ZipCode').mask('99999');
            $('select').material_select();
            Materialize.updateTextFields();
        },$rootScope.TextContants.ConfigTimeoutDefault);

        //$timeout(function () {
        //    Materialize.updateTextFields();
        //}, $rootScope.TextContants.ConfigWaitTime);

    });


}]);