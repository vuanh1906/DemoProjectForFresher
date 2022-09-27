'use strict';

app.controller("ThankYouController", ['$scope', '$rootScope', '$location', '$timeout', 'thankYouService', function ($scope, $rootScope, $location, $timeout, thankYouService) {
    $rootScope.OrderDetail.Model.Step = 12;


    $scope.ThankYou = {
        SaveThankYou: function () {
           
            $rootScope.IsSaveDone = false;

            var data = angular.copy($rootScope.OrderDetail.Model);
            $rootScope.OrderDetail.Model.DetailPrice = angular.copy($rootScope.OrderDetail.DetailPrice);

            data.DetailPrice = angular.copy($rootScope.OrderDetail.DetailPrice);

            // Set price has tax.
            data.DetailPrice.URNPrice = $rootScope.TextContants.MathRound($rootScope.OrderDetail.Model.DetailPrice.URNPrice * (1 + $rootScope.OrderDetail.DetailPrice.Tax));
            data.DetailPrice.CasketPreferencePrice = $rootScope.MenuConfig.DynamicMenu.Cremation.PriceMenu.Details.CheckShowCasket() ? $rootScope.TextContants.MathRound($rootScope.OrderDetail.DetailPrice.GetCasketPrice() * (1 + $rootScope.OrderDetail.DetailPrice.Tax)) : 0;
            data.DetailPrice.BurialPackagePrice = $rootScope.TextContants.MathRound($rootScope.OrderDetail.Model.DetailPrice.BurialPackagePrice + $rootScope.OrderDetail.DetailPrice.Tax * ($rootScope.OrderDetail.DetailPrice.BurialPackagePriceItemHasInPackage + $rootScope.OrderDetail.DetailPrice.CasketPreferencePriceHasInPackage));
            data.DetailPrice.VaultSelectionPrice = $rootScope.TextContants.MathRound($rootScope.OrderDetail.Model.DetailPrice.VaultSelectionPrice * (1 + $rootScope.OrderDetail.DetailPrice.Tax));
            data.DetailPrice.BasePrice = $rootScope.MenuConfig.DynamicMenu.Cremation.PriceMenu.Details.CheckShowBasePrice() ? $rootScope.OrderDetail.Model.DetailPrice.BasePrice : 0;
            data.DetailPrice.LocationPrice = $rootScope.OrderDetail.DetailPrice.LocationCremationPrice;
            //
            thankYouService.SaveThankYou(data).then(function (result) {
                if (result.Status == $rootScope.TextContants.Status.Success) {
                    $rootScope.OrderDetail.Model.Id = result.Data.SectionOrderId;
                    $rootScope.OrderDetail.Model.SectionStep = result.Data.SectionStep;
                    // $location.path("/Checkout");
                }
                $rootScope.IsSaveDone = true;
            }, function (error) {
                $rootScope.IsSaveDone = true;
            });
        }
    }

    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            $(window).on('load resize', function() {
                $('.thanks-body').css('width', 'auto');
                if ($(window).width() < 600) {
                    $('.thanks-body').width($('.terms-main').width());
                }
            });
            //// check valid step when F5 or submit link not valid.
            $rootScope.Button.AuthenticationStep();
            $rootScope.OrderDetail.FuntionSave.SaveStep12 = $scope.ThankYou.SaveThankYou;
        });
    });


}]);