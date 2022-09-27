'use strict';


app.controller('VaultSelectionController', ['vaultSelectionService', '$scope', '$rootScope', '$timeout', function (vaultSelectionService, $scope, $rootScope, $timeout) {
    $rootScope.OrderDetail.Model.Step = 4;

    $scope.VaultSelection = {
        ValidateFunction: function () {
        },
        ValidateForm: function () {
            return true;
        },
        SelectVaultSelection: function (name, id, price) {
            $rootScope.OrderDetail.Model.VaultSelectionId = id;
            $rootScope.OrderDetail.VaultSelectionPrice = price;
            $rootScope.OrderDetail.VaultSelectionName = name;
        },
        SaveVaultSelection: function () {
            if ($scope.VaultSelection.ValidateForm()) {
                $rootScope.OrderDetail.FuntionSave.IsValid = true;
                //$rootScope.OrderDetail.Model.Burial_VaultType = $rootScope.OrderDetail.SelectionData.ListVaultType.Choose != null ? $rootScope.OrderDetail.SelectionData.ListVaultType.Choose.Name : "";
                $rootScope.OrderDetail.Model.VaultSelectionId = $rootScope.OrderDetail.SelectionData.VaultSelection.Choose != null ? $rootScope.OrderDetail.SelectionData.VaultSelection.Choose.Id : "";
                var data = $rootScope.OrderDetail.Model;
                vaultSelectionService.SaveVaultSelection(data).then(function (result) {
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

            $rootScope.Button.AuthenticationStep();
            $scope.VaultSelection.ValidateFunction();
            $rootScope.OrderDetail.FuntionSave.SaveStep4 = $scope.VaultSelection.SaveVaultSelection;

            $('select').material_select();
            var $grid = $('.urn-grid').imagesLoaded(function () {
                $grid.masonry({
                    columnWidth: '.grid-sizer',
                    gutter: '.gutter-sizer',
                    itemSelector: '.urn-item',
                    percentPosition: true
                });
            });
            $(".urn-item .card").click(function () {
                $(this).parent().parent().find(".checkmark").detach();
                $(this).parent().parent().find(".blur").removeClass("active");
                $(this).find(".img").append('<div class="checkmark"><i class="fa fa-check-circle"></i></div>');
                $(this).find(".blur").addClass("active");
            });
        }, $rootScope.TextContants.ConfigTimeoutDefault);

      

    });
}]);